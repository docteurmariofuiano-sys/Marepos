const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const safetyLine = "Outil d'aide à la décision destiné au médecin. Ne remplace pas le jugement clinique.";
const pdfJsPath = "./vendor/pdfjs/pdf.min.mjs";
const pdfJsWorkerPath = "./vendor/pdfjs/pdf.worker.min.mjs";
let pdfJsLoader = null;

function num(id) {
  const raw = $(id)?.value;
  if (raw === undefined || raw === null || String(raw).trim() === "") return null;
  const n = Number(String(raw).replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function val(id) {
  return $(id)?.value?.trim() || "";
}

function selected(selector) {
  return $$(`${selector} input[type="checkbox"]:checked`).map((box) => box.value);
}

function parseNumber(raw) {
  if (raw === null || raw === undefined || raw === "" || raw === "-") return null;
  const n = Number(String(raw).replace(/\u2212/g, "-").replace(",", ".").replace(/[^\d.+-]/g, ""));
  return Number.isFinite(n) ? n : null;
}

function fmtNumber(value, digits = 2) {
  return value === null || value === undefined ? "?" : Number(value).toFixed(digits).replace(".", ",");
}

function fmtPercent(value) {
  return value === null || value === undefined ? "?" : `${Math.round(Number(value))} %`;
}

function foldText(text) {
  return String(text || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}

function normalizeSpiroText(text) {
  return String(text || "")
    .replace(/\u00a0/g, " ")
    .replace(/\u2212/g, "-")
    .replace(/[–—]/g, "-")
    .replace(/[|;]/g, " ")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function findNumber(text, regexes) {
  for (const rgx of regexes) {
    const match = text.match(rgx);
    if (match) return parseNumber(match[1]);
  }
  return null;
}

function numberTokens(line) {
  const matches = String(line || "").match(/-?\d+(?:[,.]\d+)?/g) || [];
  return matches.map(parseNumber).filter((n) => n !== null);
}

function findParamRow(rows, type) {
  return rows.find((line) => {
    if (!/\d/.test(line)) return false;
    const f = foldText(line);
    const isRatio = /(?:VEMS|FEV1)\s*\/\s*(?:CVF|FVC)/.test(f);
    if (type === "ratio") return isRatio;
    if (type === "fvc") return /\b(CVF|FVC)\b/.test(f) && !isRatio && !/\b(VEMS|FEV1)\b/.test(f);
    if (type === "fev1") return /\b(VEMS|FEV1)\b/.test(f) && !isRatio;
    if (type === "tef") return /\b(TEF|FET)\b|TEMPS EXPIRATOIRE/.test(f);
    return false;
  });
}

function parseSpiroFromText(rawText) {
  const clean = normalizeSpiroText(rawText);
  const rows = clean.split("\n").map((line) => line.trim()).filter(Boolean);
  const fvcRow = findParamRow(rows, "fvc");
  const fev1Row = findParamRow(rows, "fev1");
  const ratioRow = findParamRow(rows, "ratio");
  const tefRow = findParamRow(rows, "tef");
  const fvc = numberTokens(fvcRow);
  const fev1 = numberTokens(fev1Row);
  const ratio = numberTokens(ratioRow);
  const tef = numberTokens(tefRow);
  const qualityRow = rows.find((line) => {
    const f = foldText(line);
    return f.includes("NIVEAU") && f.includes("QUALIT");
  });
  const interpretationIndex = rows.findIndex((line) => foldText(line).includes("INTERPR"));
  const fields = {
    "#age": findNumber(clean, [/\(([0-9]{1,3})\s*ans\)/i, /\b([0-9]{1,3})\s*ans\b/i]),
    "#height": findNumber(clean, [/Taille\s+([0-9]{2,3})\s*cm/i]),
    "#weight": findNumber(clean, [/Poids\s+([0-9]{2,3}(?:[,.][0-9])?)\s*kg/i]),
    "#packYears": findNumber(clean, [/Pack[- ]ann\S*\s+([0-9]+(?:[,.][0-9])?)/i]),
    "#fvc": fvc[0] ?? findNumber(clean, [/(?:CVF|FVC)(?!\s*\/)[^0-9\n]{0,20}([0-9]+[,.][0-9]+)/i]),
    "#fvcLln": fvc[1] ?? null,
    "#fvcZ": fvc[2] ?? null,
    "#fvcpct": fvc[3] ?? null,
    "#fev1": fev1[0] ?? findNumber(clean, [/(?:VEMS|FEV1)(?!\s*\/)[^0-9\n]{0,20}([0-9]+[,.][0-9]+)/i]),
    "#fev1Lln": fev1[1] ?? null,
    "#fev1Z": fev1[2] ?? null,
    "#fev1pct": fev1[3] ?? null,
    "#ratio": ratio[0] ?? findNumber(clean, [/(?:VEMS\s*\/\s*CVF|FEV1\s*\/\s*FVC|rapport[^:\n]*)(?:[^0-9]{0,24})(0[,.][0-9]+|[0-9]{1,2}[,.][0-9]+)/i]),
    "#ratioLln": ratio[1] ?? null,
    "#ratioZ": ratio[2] ?? null,
    "#tef": tef[0] ?? null,
    "#pef": findNumber(clean, [/(?:DEP|PEF)[^0-9\n]{0,20}([0-9]+(?:[,.][0-9]+)?)/i])
  };
  if (/\bSexe\s+F\b|femme/i.test(clean)) fields["#sex"] = "f";
  if (/\bSexe\s+M\b|homme/i.test(clean)) fields["#sex"] = "m";
  if (/Non[- ]fumeur|Fumeur\s+Non/i.test(clean)) fields["#tobacco"] = "jamais";
  else if (/Fumeur/i.test(clean)) fields["#tobacco"] = "actif";
  if (qualityRow) fields["#spiroQualityCode"] = qualityRow.replace(/^.*?:\s*/, "").trim();
  if (interpretationIndex >= 0) fields["#labSpiroInterpretation"] = rows[interpretationIndex + 1] || "";
  return { text: clean, fields, qualityCode: fields["#spiroQualityCode"] || "" };
}

function setFieldValue(selector, value) {
  const el = $(selector);
  if (!el || value === null || value === undefined || value === "") return;
  el.value = typeof value === "number" ? String(Number.isInteger(value) ? value : Number(value.toFixed(2))) : String(value);
}

function applyQualityFromText(parsed) {
  const qualityCode = parsed.qualityCode || "";
  const tef = parseNumber(parsed.fields["#tef"]);
  const codeLooksLimited = /\b(CVF|FVC|VEMS|FEV1)\s*(U|D|E|F)\b/i.test(qualityCode);
  const codeLooksGood = /\b(CVF|FVC|VEMS|FEV1)\s*(A|B|C)\b/i.test(qualityCode) && !codeLooksLimited;
  if (qualityCode || tef !== null) {
    ["#qAcceptable", "#qStart", "#qExpiration", "#qRepeatable", "#qNoLeak"].forEach((id) => {
      if ($(id)) $(id).checked = false;
    });
  }
  if (codeLooksGood && $("#qAcceptable")) $("#qAcceptable").checked = true;
  if (tef !== null && tef >= 6 && $("#qExpiration")) $("#qExpiration").checked = true;
}

function isBelowLln(value, lln, zScore, percent) {
  if (value !== null && lln !== null) return value < lln;
  if (zScore !== null) return zScore < -1.64;
  if (percent !== null) return percent < 80;
  return false;
}

function volumeSeverity(percent) {
  if (percent === null) return "";
  if (percent >= 70) return "légère";
  if (percent >= 60) return "modérée";
  if (percent >= 50) return "modérément sévère";
  return "sévère";
}

function updateSpirometry() {
  const fev1 = num("#fev1");
  const fvc = num("#fvc");
  const ratioField = $("#ratio");
  if (fev1 && fvc && ratioField && !ratioField.value) ratioField.value = (fev1 / fvc).toFixed(2);

  const ratio = num("#ratio");
  const lln = num("#ratioLln");
  const threshold = lln ?? 0.70;
  const fevPct = num("#fev1pct");
  const fvcPct = num("#fvcpct");
  const fev1Lln = num("#fev1Lln");
  const fvcLln = num("#fvcLln");
  const fev1Z = num("#fev1Z");
  const fvcZ = num("#fvcZ");
  const tef = num("#tef");
  const dMl = num("#deltaFev1Ml");
  const dPct = num("#deltaFev1Pct");
  const dFvcMl = num("#deltaFvcMl");
  const dFvcPct = num("#deltaFvcPct");
  const qualityCode = val("#spiroQualityCode");
  const labInterpretation = val("#labSpiroInterpretation");
  const qualityChecks = selected("#qualityChecks");
  const qualityOk = ["effort correct", "départ explosif", "expiration suffisante", "reproductibilité acceptable", "absence de fuite évidente"].every((x) => qualityChecks.includes(x));
  const qualityLimiters = [];
  if (qualityCode) qualityLimiters.push(`contrôle qualité labo : ${qualityCode}`);
  if (tef !== null && tef < 6) qualityLimiters.push(`expiration courte : TEF ${fmtNumber(tef)} s`);
  if (qualityChecks.includes("toux ou fuite")) qualityLimiters.push("toux ou fuite signalée");

  const ratioLow = ratio !== null && ratio < threshold;
  const fev1Low = isBelowLln(fev1, fev1Lln, fev1Z, fevPct);
  const fvcLow = isBelowLln(fvc, fvcLln, fvcZ, fvcPct);
  const significantFev = dMl !== null && dMl >= 200 && dPct !== null && dPct >= 12;
  const significantFvc = dFvcMl !== null && dFvcMl >= 200 && dFvcPct !== null && dFvcPct >= 12;

  let profile = "Données insuffisantes";
  let profileLevel = "orange";
  let obstruction = "TVO non évaluable sans rapport VEMS/CVF.";
  let restriction = "Pas d'argument spirométrique isolé suffisant pour conclure à une restriction.";
  let mixed = "Trouble mixte non suspecté sur les données saisies.";
  if (!qualityOk && qualityLimiters.length) {
    profile = "Interprétation prudente";
    profileLevel = "orange";
  }
  if (ratioLow) {
    profile = "Obstructif probable";
    profileLevel = "orange";
    obstruction = `TVO probable : VEMS/CVF ${fmtNumber(ratio)} sous ${lln !== null ? `la LLN ${fmtNumber(lln)}` : "le seuil 0,70 faute de LLN"}.`;
    if (fvcLow) mixed = "CVF basse associée au rapport abaissé : trouble mixte ou piégeage à discuter, à confirmer par volumes pulmonaires.";
  } else if (ratio !== null) {
    profile = fvcLow ? "Restriction suspectée" : "Non obstructif";
    profileLevel = fvcLow ? "orange" : "green";
    obstruction = `Profil non obstructif : VEMS/CVF ${fmtNumber(ratio)} au-dessus du seuil d'interprétation.`;
  }
  if (fvcLow && !ratioLow) {
    const sev = volumeSeverity(fvcPct);
    restriction = `CVF abaissée avec rapport conservé : aspect compatible avec une restriction${sev ? ` ${sev}` : ""}, à confirmer par CPT/TLC et DLCO selon contexte.`;
    if (tef !== null && tef < 6) restriction += " Le TEF court peut sous-estimer la CVF.";
  }
  const reversibility = dMl !== null || dPct !== null || dFvcMl !== null || dFvcPct !== null
    ? (significantFev || significantFvc ? "Réversibilité significative selon seuil classique ≥ 200 ml et ≥ 12 %." : "Réversibilité faible ou non significative selon seuil classique.")
    : "Réversibilité non évaluable.";

  const qualityText = qualityOk
    ? "Qualité déclarée correcte si critères laboratoire confirmés."
    : qualityLimiters.length ? `Qualité limitée : ${qualityLimiters.join("; ")}.` : "Qualité non entièrement documentée.";

  $("#profileBadge").textContent = profile;
  $("#profileBadge").className = `status-pill status-${profileLevel}`;
  $("#interpretationSummary").innerHTML = [
    `<li>${qualityText}</li>`,
    `<li>${obstruction}</li>`,
    `<li>${restriction}</li>`,
    `<li>${mixed}</li>`,
    `<li>${reversibility}</li>`
  ].join("");

  const dataLines = [
    fvc !== null ? `CVF ${fmtNumber(fvc)} L${fvcLln !== null ? `, LLN ${fmtNumber(fvcLln)} L` : ""}${fvcPct !== null ? `, ${fmtPercent(fvcPct)} théorique` : ""}${fvcLow ? " : abaissée" : ""}.` : null,
    fev1 !== null ? `VEMS ${fmtNumber(fev1)} L${fev1Lln !== null ? `, LLN ${fmtNumber(fev1Lln)} L` : ""}${fevPct !== null ? `, ${fmtPercent(fevPct)} théorique` : ""}${fev1Low ? " : abaissé" : ""}.` : null,
    ratio !== null ? `VEMS/CVF ${fmtNumber(ratio)}${lln !== null ? `, LLN ${fmtNumber(lln)}` : ""}.` : null,
    tef !== null ? `TEF ${fmtNumber(tef)} s${tef < 6 ? " : expiration courte" : ""}.` : null,
    labInterpretation ? `Interprétation automatique appareil : ${labInterpretation}.` : null
  ].filter(Boolean);

  $("#spiroOutput").value = [
    `Examen spirométrique de qualité ${qualityOk ? "correcte" : qualityLimiters.length ? "limitée" : "non entièrement documentée"}.`,
    dataLines.join(" "),
    ratioLow ? "L'ensemble est compatible avec un trouble ventilatoire obstructif, sous réserve de la qualité technique et du contexte clinique." : "Pas d'argument spirométrique pour un trouble ventilatoire obstructif sur le rapport VEMS/CVF saisi.",
    fvcLow && !ratioLow ? "Aspect compatible avec un trouble ventilatoire restrictif, à confirmer par EFR complète avec mesure de la CPT/TLC et DLCO." : "",
    ratioLow && fvcLow ? "CVF basse associée : trouble mixte ou distension/piégeage à discuter, volumes pulmonaires nécessaires." : "",
    reversibility,
    qualityLimiters.length ? `Limites : ${qualityLimiters.join("; ")}. Répéter l'examen si doute, discordance clinique ou absence de plateau.` : "Limites : interpréter selon le contexte clinique.",
    "Avis pneumologique si doute diagnostique, discordance clinique/EFR, désaturation, obstruction sévère, restriction suspectée persistante ou besoin d'EFR complète.",
    safetyLine
  ].filter(Boolean).join("\n\n");
}

function pdfItemsToLines(items) {
  const positioned = items
    .filter((item) => item.str && item.str.trim())
    .map((item) => ({ str: item.str.trim(), x: item.transform[4], y: item.transform[5] }))
    .sort((a, b) => Math.abs(b.y - a.y) > 2 ? b.y - a.y : a.x - b.x);
  const lines = [];
  positioned.forEach((item) => {
    const line = lines.find((candidate) => Math.abs(candidate.y - item.y) <= 2);
    if (line) line.items.push(item);
    else lines.push({ y: item.y, items: [item] });
  });
  return lines
    .sort((a, b) => b.y - a.y)
    .map((line) => line.items.sort((a, b) => a.x - b.x).map((item) => item.str).join(" "))
    .join("\n");
}

async function loadPdfJs() {
  if (!pdfJsLoader) {
    pdfJsLoader = import(pdfJsPath).then((pdfjsLib) => {
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(pdfJsWorkerPath, document.baseURI).href;
      return pdfjsLib;
    });
  }
  return pdfJsLoader;
}

async function extractPdfText(file) {
  const pdfjsLib = await loadPdfJs();
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  const pages = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    pages.push(pdfItemsToLines(content.items));
  }
  return pages.join("\n\n");
}

function extractSpiroValues() {
  const text = $("#spiroText").value;
  if (!text.trim()) return;
  const parsed = parseSpiroFromText(text);
  Object.entries(parsed.fields).forEach(([selector, value]) => setFieldValue(selector, value));
  applyQualityFromText(parsed);
  updateSpirometry();
}

function copyText(id) {
  const el = $(`#${id}`);
  if (!el) return;
  el.select();
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(el.value).catch(() => document.execCommand("copy"));
  } else {
    document.execCommand("copy");
  }
}

function resetSpiro() {
  $$("input, textarea, select").forEach((el) => {
    if (el.type === "checkbox") el.checked = false;
    else el.value = "";
  });
  updateSpirometry();
}

function setupSearch() {
  const search = $("#spiroSearch");
  if (!search) return;
  search.addEventListener("input", () => {
    const query = search.value.trim().toLowerCase();
    $$(".step-card, .summary-card").forEach((card) => {
      card.classList.toggle("is-search-hidden", query && !card.textContent.toLowerCase().includes(query));
    });
  });
}

function init() {
  document.addEventListener("input", (event) => {
    if (event.target.matches("input, textarea, select")) updateSpirometry();
  });
  document.addEventListener("change", (event) => {
    if (event.target.matches("input, textarea, select")) updateSpirometry();
  });
  $("#extractSpiro")?.addEventListener("click", extractSpiroValues);
  $("#copyReport")?.addEventListener("click", () => copyText("spiroOutput"));
  $("#resetSpiro")?.addEventListener("click", resetSpiro);
  $("#printSpiro")?.addEventListener("click", () => window.print());
  $("#spiroFile")?.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    $("#fileStatus").textContent = `${file.name} chargé, extraction en cours...`;
    try {
      if (file.type === "application/pdf" || file.name.match(/\.pdf$/i)) {
        const text = await extractPdfText(file);
        if (!text.trim()) throw new Error("Aucun texte exploitable trouvé dans ce PDF.");
        $("#spiroText").value = text;
        $("#fileStatus").textContent = `${file.name} lu automatiquement (${text.length} caractères).`;
        extractSpiroValues();
      } else if (file.type.startsWith("text/") || file.name.match(/\.(txt|csv)$/i)) {
        const reader = new FileReader();
        reader.onload = () => {
          $("#spiroText").value = String(reader.result);
          $("#fileStatus").textContent = `${file.name} lu automatiquement.`;
          extractSpiroValues();
        };
        reader.readAsText(file);
      } else {
        $("#fileStatus").textContent = `${file.name} chargé. Image/scan : coller l'OCR ou saisir les valeurs clés.`;
      }
    } catch (error) {
      $("#fileStatus").textContent = `Lecture PDF impossible : ${error.message}.`;
    }
  });
  setupSearch();
  updateSpirometry();
}

init();
