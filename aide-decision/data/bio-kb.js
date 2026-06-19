/* ============================================================================
 * INTERPRÉTATION BIOLOGIQUE — base de connaissances (côté médecin).
 * Sources : « Manuel du Généraliste — Du Symptôme au Diagnostic » (fiches 43-63),
 * Dr Mario Fuiano ; complément hématologie (fiches 64+) d'après MémoBio (contenu
 * d'accès libre). Aide à l'interprétation d'un résultat anormal — à confronter
 * à la clinique. Ne remplace pas le médecin/biologiste.
 *
 * Format : { id, num, anomalie, specialite, definition,
 *            premiere_intention:[...], causes:[{cause, signe, examens:[...]}],
 *            tableaux?:[{titre, entetes:[...], lignes:[[...]]}],
 *            red_flags:[...], conduite:[...] }
 * ========================================================================== */
window.BIOKB = [
  {
    id: "ts_hemostase_primaire", num: 43, anomalie: "Allongement du temps de saignement / hémostase primaire",
    specialite: "Hémostase",
    definition: "Saignement de type hémostase primaire = cutanéo-muqueux (purpura pétéchial, épistaxis, gingivorragies, ménorragies), à distinguer des hématomes/hémarthroses (coagulation).",
    premiere_intention: ["NFS-plaquettes EN PREMIER (éliminer une thrombopénie)", "Rechercher antiagrégants (aspirine, AINS, clopidogrel)", "Puis évoquer une maladie de Willebrand (la plus fréquente des maladies hémorragiques constitutionnelles)"],
    causes: [
      { cause: "Thrombopénie", signe: "plaquettes basses (1re cause à éliminer)", examens: ["NFS-plaquettes"] },
      { cause: "Maladie de Willebrand", signe: "saignements muqueux + ATCD familial, TCA parfois allongé", examens: ["Dosage facteur Willebrand / facteur VIII"] },
      { cause: "Thrombopathie médicamenteuse", signe: "aspirine / AINS / antiagrégants", examens: ["Revue de l'ordonnance"] },
      { cause: "Thrombopathies acquises", signe: "urémie, dysglobulinémie, syndrome myéloprolifératif", examens: ["Créatinine, électrophorèse, NFS"] }
    ],
    red_flags: ["Thrombopénie profonde (risque hémorragique)", "Saignement actif sous antiagrégants"],
    conduite: ["Éliminer thrombopénie et antiagrégants avant d'évoquer une thrombopathie constitutionnelle."]
  },
  {
    id: "tca", num: 44, anomalie: "Allongement du TCA (temps de céphaline activée)",
    specialite: "Hémostase",
    definition: "Le test de correction (mélange plasma malade + témoin) est l'orientation clé.",
    premiere_intention: ["Éliminer une héparinothérapie (cause n°1 d'allongement isolé)", "Test de correction : CORRIGE = déficit en facteur ; NE CORRIGE PAS = anticoagulant circulant"],
    causes: [
      { cause: "Héparine", signe: "cause la plus fréquente d'allongement isolé", examens: ["Vérifier traitement / héparinémie"] },
      { cause: "Hémophilie A (VIII) / B (IX)", signe: "garçon, hémarthroses/hématomes, TCA allongé + TP normal", examens: ["Dosage facteurs VIII et IX"] },
      { cause: "Maladie de Willebrand", signe: "TCA ± allongé (baisse du VIII)", examens: ["Facteur Willebrand, VIII"] },
      { cause: "Anticoagulant circulant (anti-VIII, lupique/SAPL)", signe: "TCA non corrigé par le témoin → thrombose, pas hémorragie", examens: ["Test de correction, anticoagulant lupique, anti-cardiolipine"] }
    ],
    red_flags: ["Hémophilie sévère (saignement)", "SAPL (risque thrombotique malgré TCA allongé)"],
    conduite: ["Toujours éliminer l'héparine d'abord, puis faire le test de correction."]
  },
  {
    id: "tp_bas", num: 45, anomalie: "Allongement du TP / temps de Quick (TP bas)",
    specialite: "Hémostase",
    definition: "Le FACTEUR V est le discriminant majeur entre insuffisance hépatocellulaire et carence en vitamine K.",
    premiere_intention: ["Vérifier un traitement par AVK (INR)", "Doser le facteur V : V BAS = insuffisance hépatocellulaire ; V NORMAL = carence en vitamine K"],
    causes: [
      { cause: "AVK", signe: "allongement attendu/recherché", examens: ["INR"] },
      { cause: "Insuffisance hépatocellulaire", signe: "TP bas + facteur V BAS", examens: ["Facteur V, bilan hépatique"] },
      { cause: "Carence en vitamine K", signe: "TP bas + facteur V NORMAL (cholestase, malabsorption, ATB) ; corrigé par vit. K", examens: ["Facteur V, test de correction par vitamine K"] },
      { cause: "CIVD", signe: "TP bas + plaquettes ↓ + fibrinogène ↓ + D-dimères ↑↑", examens: ["Plaquettes, fibrinogène, D-dimères"] }
    ],
    red_flags: ["Insuffisance hépatique aiguë (TP < 50 %, facteur V effondré)", "CIVD", "Surdosage AVK avec hémorragie"],
    conduite: ["Toute baisse aiguë du TP impose le dosage du facteur V."]
  },
  {
    id: "tt", num: 46, anomalie: "Allongement du temps de thrombine (TT)",
    specialite: "Hémostase",
    definition: "Le TT explore la dernière étape (fibrinogène → fibrine).",
    premiere_intention: ["Éliminer l'héparine (neutralisée par la protamine)", "Doser le fibrinogène pour trancher"],
    causes: [
      { cause: "Héparine / contamination", signe: "allonge le TT, neutralisé par la protamine", examens: ["Vérifier héparine, temps de reptilase"] },
      { cause: "Hypo/dysfibrinogénémie", signe: "constitutionnelle ou acquise (IHC, CIVD)", examens: ["Dosage du fibrinogène"] },
      { cause: "Présence d'inhibiteurs", signe: "dysglobuline, PDF élevés", examens: ["Électrophorèse, PDF/D-dimères"] }
    ],
    red_flags: ["CIVD avec consommation du fibrinogène", "Hépatopathie sévère"],
    conduite: ["Allongement isolé = héparine le plus souvent, ou anomalie du fibrinogène."]
  },
  {
    id: "hemostase_hereditaire", num: 47, anomalie: "Anomalie héréditaire de l'hémostase",
    specialite: "Hémostase",
    definition: "L'arbre généalogique et le TYPE de saignement orientent le diagnostic.",
    premiere_intention: ["Préciser le type de saignement : cutanéo-muqueux (Willebrand) vs hématomes/hémarthroses (hémophilie)", "Enquête familiale : transmission liée à l'X (hémophilie) vs autosomique (Willebrand)"],
    causes: [
      { cause: "Maladie de Willebrand", signe: "la plus fréquente, autosomique, saignements muqueux", examens: ["Facteur Willebrand, VIII"] },
      { cause: "Hémophilie A / B", signe: "liée à l'X, garçons, hémarthroses", examens: ["Facteurs VIII / IX"] },
      { cause: "Thrombophilies constitutionnelles", signe: "facteur V Leiden, mutation II, déficits AT/PC/PS → versant thrombotique", examens: ["Bilan de thrombophilie (ATCD thrombotiques précoces, fausses couches)"] }
    ],
    red_flags: ["Hémophilie sévère (hémarthroses invalidantes)", "Thrombophilie majeure (récidive thrombo-embolique)"],
    conduite: ["Adresser à un centre spécialisé (CRC-MHC) pour confirmation et prise en charge."]
  },
  {
    id: "electrophorese", num: 48, anomalie: "Anomalies de l'électrophorèse des protéines sériques",
    specialite: "Hématologie",
    definition: "Un pic ÉTROIT dans les gamma = composant monoclonal (immunofixation) ; une élévation polyclonale « en dôme » = réactionnelle.",
    premiere_intention: ["Devant un pic étroit : immunofixation pour typer le composant monoclonal", "Rechercher des signes de myélome (CRAB)"],
    causes: [
      { cause: "Pic monoclonal étroit (gamma)", signe: "myélome, MGUS, Waldenström (IgM)", examens: ["Immunofixation, protéinurie de Bence-Jones, NFS, calcémie, créatinine"] },
      { cause: "Hypergammaglobulinémie polyclonale", signe: "inflammation chronique, hépatopathie, infections, auto-immunité", examens: ["CRP, bilan hépatique, sérologies"] },
      { cause: "Bloc bêta-gamma", signe: "très évocateur de cirrhose", examens: ["Bilan hépatique"] },
      { cause: "Hypogammaglobulinémie", signe: "déficit immunitaire, fuite (néphrotique), myélome à chaînes légères", examens: ["Dosage pondéral des Ig, protéinurie"] }
    ],
    red_flags: ["Myélome (CRAB : hyperCalcémie, Rénale, Anémie, Bone/os)", "Waldenström symptomatique", "Amylose AL"],
    conduite: ["Pic monoclonal → immunofixation + recherche des critères de malignité (CRAB)."]
  },
  {
    id: "hypereosinophilie", num: 49, anomalie: "Hyperéosinophilie",
    specialite: "Hématologie",
    definition: "Démarche « médicament, parasite, atopie » couvre l'immense majorité des cas.",
    premiere_intention: ["Rechercher un médicament récent (1re cause en France) — penser DRESS", "Rechercher une parasitose (voyage, helminthiase)", "Évaluer un terrain atopique"],
    causes: [
      { cause: "Hyperéosinophilie médicamenteuse", signe: "la plus fréquente ; DRESS si fièvre + éruption + atteinte viscérale", examens: ["Revue de l'ordonnance, bilan hépatique/rénal si DRESS"] },
      { cause: "Parasitoses helminthiques", signe: "selon voyage et cycle (phase d'invasion)", examens: ["Examen parasitologique des selles, sérologies"] },
      { cause: "Atopie", signe: "asthme, rhinite, eczéma, urticaire", examens: ["Contexte clinique"] },
      { cause: "Causes systémiques / malignes", signe: "vascularite à ANCA (Churg-Strauss), lymphome, SHE, néoplasie", examens: ["ANCA, imagerie, avis spécialisé"] }
    ],
    red_flags: ["DRESS (atteinte viscérale)", "Syndrome hyperéosinophilique (atteinte cardiaque)", "Vascularite (Churg-Strauss)", "Anguillulose maligne avant immunosuppression"],
    conduite: ["Éosinophilie + fièvre + DRESS = urgence d'arrêt du médicament. Traiter une anguillulose avant toute corticothérapie."]
  },
  {
    id: "inversion_formule", num: 50, anomalie: "Inversion de la formule sanguine (lymphocytes > neutrophiles)",
    specialite: "Hématologie",
    definition: "Inversion physiologique chez le jeune enfant. Chez l'adulte, une hyperlymphocytose persistante (> 1 mois) impose un immunophénotypage.",
    premiere_intention: ["Replacer dans le contexte (âge, syndrome viral)", "Si hyperlymphocytose persistante de l'adulte : immunophénotypage (LLC)"],
    causes: [
      { cause: "Lymphocytose réactionnelle virale", signe: "jeune, syndrome viral, MNI (syndrome mononucléosique)", examens: ["MNI-test, sérologies EBV/CMV/toxo, VIH"] },
      { cause: "Syndrome lymphoprolifératif", signe: "sujet âgé, hyperlymphocytose persistante", examens: ["Immunophénotypage lymphocytaire (LLC)"] },
      { cause: "Coqueluche", signe: "hyperlymphocytose + toux quinteuse", examens: ["PCR coqueluche"] }
    ],
    red_flags: ["Leucémie aiguë (cytopénies + blastes)", "LLC à fort compte / syndrome de Richter", "Primo-infection VIH (à ne pas manquer)"],
    conduite: ["Penser systématiquement à la primo-infection VIH devant un syndrome mononucléosique."]
  },
  {
    id: "hyperglycemie", num: 51, anomalie: "Hyperglycémie de l'adulte",
    specialite: "Endocrinologie",
    definition: "Diagnostic biologique (seuils OMS). Le syndrome cardinal rapide chez un sujet jeune/maigre = type 1 (risque de cétose).",
    premiere_intention: ["Affirmer le diabète : glycémie à jeun ≥ 1,26 g/L (×2) / HbA1c / glycémie ≥ 2 g/L + symptômes", "Rechercher des signes de cétose / déshydratation (urgence)", "Distinguer type 1 (jeune, maigre, cétose) vs type 2"],
    causes: [
      { cause: "Diabète de type 2", signe: "surpoids, insulinorésistance, > 40 ans, souvent asymptomatique", examens: ["HbA1c, bilan métabolique"] },
      { cause: "Diabète de type 1", signe: "jeune, maigre, syndrome cardinal rapide, cétose", examens: ["Cétonémie, auto-anticorps (GAD, IA2)"] },
      { cause: "Acidocétose / coma hyperosmolaire", signe: "urgences métaboliques (cétose vs déshydratation majeure)", examens: ["Gaz du sang, cétonémie, ionogramme, osmolalité"] },
      { cause: "Diabète secondaire", signe: "corticoïdes, pancréatopathie, hémochromatose, endocrinopathie", examens: ["Selon contexte"] }
    ],
    red_flags: ["Acidocétose diabétique", "Coma hyperosmolaire", "Hyperglycémie + infection/sepsis"],
    conduite: ["Haleine acétonique + dyspnée de Kussmaul = acidocétose → urgence."]
  },
  {
    id: "hypercalcemie", num: 52, anomalie: "Hypercalcémie",
    specialite: "Endocrinologie",
    definition: "La PTH tranche : élevée/inadaptée = hyperparathyroïdie primaire ; FREINÉE = cause non parathyroïdienne (néoplasie surtout). Ces 2 causes = 90 %.",
    premiere_intention: ["Doser la PTH (discriminant majeur)", "Interpréter sur la calcémie corrigée / calcium ionisé", "Rechercher une néoplasie si PTH freinée"],
    causes: [
      { cause: "Hyperparathyroïdie primaire", signe: "PTH normale-haute/élevée (inadaptée), calcémie modérée, fortuite", examens: ["PTH, calciurie, échographie/scintigraphie parathyroïdienne"] },
      { cause: "Hypercalcémie maligne", signe: "PTH BASSE + néoplasie (métastases, myélome, PTHrp)", examens: ["Imagerie, électrophorèse, PTHrp"] },
      { cause: "Iatrogène", signe: "vitamine D, thiazidiques, lithium, syndrome des buveurs de lait", examens: ["Revue de l'ordonnance, 25-OH vit. D"] },
      { cause: "Granulomatose", signe: "sarcoïdose (calcitriol ↑)", examens: ["1,25-OH vit. D, imagerie thoracique"] }
    ],
    red_flags: ["Hypercalcémie maligne aiguë (> 3,5 mmol/L : troubles du rythme, coma)", "Néoplasie sous-jacente", "Insuffisance rénale, déshydratation"],
    conduite: ["Hypercalcémie sévère symptomatique = urgence (hydratation, avis spécialisé)."]
  },
  {
    id: "hyperkaliemie", num: 53, anomalie: "Hyperkaliémie",
    specialite: "Néphrologie",
    definition: "Toujours éliminer une FAUSSE hyperkaliémie (hémolyse de prélèvement). Le danger est CARDIAQUE et non corrélé aux symptômes : l'ECG guide l'urgence.",
    premiere_intention: ["Éliminer une fausse hyperkaliémie (garrot, hémolyse, thrombocytose/hyperleucocytose)", "ECG immédiat (ondes T amples/pointues, élargissement QRS, bradycardie)", "Rechercher cause iatrogène (bloqueurs du SRAA) ± insuffisance rénale"],
    causes: [
      { cause: "Hyperkaliémie iatrogène", signe: "IEC/ARA2 + épargneur potassique + AINS ± IR", examens: ["Revue de l'ordonnance"] },
      { cause: "Insuffisance rénale", signe: "défaut d'excrétion", examens: ["Créatinine, DFG"] },
      { cause: "Transfert / lyse cellulaire", signe: "acidose, rhabdomyolyse, lyse tumorale, hémolyse", examens: ["Gaz du sang, CPK, LDH, uricémie"] },
      { cause: "Hypoaldostéronisme", signe: "Addison, hyporéninisme du diabétique", examens: ["Cortisol, rénine/aldostérone"] }
    ],
    red_flags: ["Hyperkaliémie menaçante (ECG modifié) = URGENCE (gluconate de Ca, etc.)", "QRS élargis / bradycardie (risque d'arrêt)", "Insuffisance rénale aiguë"],
    conduite: ["ECG modifié → urgence : gluconate de calcium, insuline-glucose, etc."]
  },
  {
    id: "hypokaliemie", num: 54, anomalie: "Hypokaliémie",
    specialite: "Néphrologie",
    definition: "HTA + hypokaliémie = orientation forte vers un hyperaldostéronisme. Risque majeur : troubles du rythme (surtout sous digitaliques).",
    premiere_intention: ["Préciser le mécanisme : pertes digestives vs rénales vs transfert", "ECG (ondes U, troubles du rythme)", "Si HTA associée : explorer un hyperaldostéronisme"],
    causes: [
      { cause: "Pertes digestives", signe: "diarrhée/vomissements/laxatifs", examens: ["Chlorurie, contexte"] },
      { cause: "Pertes rénales iatrogènes", signe: "diurétiques hypokaliémiants (cause n°1)", examens: ["Kaliurèse, revue ordonnance"] },
      { cause: "Hyperaldostéronisme", signe: "HTA + hypokaliémie + kaliurèse inadaptée", examens: ["Rénine/aldostérone (Conn)"] },
      { cause: "Transfert", signe: "alcalose, β2-mimétiques, insuline", examens: ["Gaz du sang"] }
    ],
    red_flags: ["Troubles du rythme (potentialisés par digitaliques)", "Hypokaliémie profonde < 2,5 (paralysie, rhabdomyolyse)", "Torsades de pointes (si QT long associé)"],
    conduite: ["Corriger le potassium ET le magnésium ; vigilance accrue sous digoxine."]
  },
  {
    id: "hyponatremie", num: 55, anomalie: "Hyponatrémie",
    specialite: "Néphrologie",
    definition: "Démarche : éliminer les fausses → évaluer la VOLÉMIE + osmolalités. Le danger neurologique dépend de la RAPIDITÉ ; la correction doit être LENTE.",
    premiere_intention: ["Éliminer une fausse hyponatrémie (hyperglycémie, hyperprotidémie/lipidémie)", "Évaluer la volémie (hypo / hyper / euvolémie)", "Osmolalités sang/urines, natriurèse"],
    causes: [
      { cause: "Hyponatrémie hypovolémique", signe: "pertes + déshydratation extracellulaire", examens: ["Natriurèse, clinique"] },
      { cause: "Hyponatrémie hypervolémique", signe: "IC, cirrhose, syndrome néphrotique (œdèmes)", examens: ["BNP, bilan hépatique, protéinurie"] },
      { cause: "SIADH (euvolémique)", signe: "natriurèse conservée, urines inadaptées concentrées ; cancers, médicaments, SNC, poumon", examens: ["Osmolalité U, TSH, cortisol"] },
      { cause: "Endocrinien", signe: "hypothyroïdie, insuffisance surrénale", examens: ["TSH, cortisol 8h"] }
    ],
    red_flags: ["Hyponatrémie aiguë symptomatique (convulsions, coma)", "Correction trop rapide (myélinolyse centro-pontine)", "Insuffisance surrénale aiguë méconnue"],
    conduite: ["Corriger lentement (risque de myélinolyse) ; forme aiguë symptomatique = urgence (sérum salé hypertonique en milieu adapté)."]
  },
  {
    id: "hyperphosphoremie", num: 56, anomalie: "Hyperphosphorémie",
    specialite: "Néphrologie",
    definition: "L'insuffisance rénale est de loin la cause la plus fréquente. Aiguë + hypoCa + hyperK + hyperuricémie = syndrome de lyse tumorale.",
    premiere_intention: ["Évaluer la fonction rénale (cause n°1)", "Interpréter le couple Ca/P et la PTH", "Rechercher une lyse cellulaire si aiguë"],
    causes: [
      { cause: "Insuffisance rénale", signe: "défaut d'excrétion, contexte d'IRC", examens: ["Créatinine, Ca/P, PTH"] },
      { cause: "Lyse cellulaire", signe: "lyse tumorale (+ hyperuricémie + hyperK + hypoCa), rhabdomyolyse", examens: ["Uricémie, K, Ca, LDH, CPK"] },
      { cause: "Hypoparathyroïdie", signe: "P haut + Ca bas + PTH basse", examens: ["PTH, calcémie"] },
      { cause: "Apports / vitamine D excessive", signe: "iatrogène (laxatifs/lavements phosphatés)", examens: ["Interrogatoire, 25-OH vit. D"] }
    ],
    red_flags: ["Syndrome de lyse tumorale", "Hypocalcémie symptomatique associée", "Calcifications métastatiques (produit Ca×P élevé)"],
    conduite: ["Suspecter un syndrome de lyse tumorale en contexte oncologique (urgence)."]
  },
  {
    id: "hyperprolactinemie", num: 57, anomalie: "Hyperprolactinémie",
    specialite: "Endocrinologie",
    definition: "Avant l'IRM, éliminer les 3 « faux coupables » : grossesse, médicaments, hypothyroïdie. PRL très élevée (> 150-200 ng/mL) → macroprolactinome.",
    premiere_intention: ["Éliminer grossesse, stress du prélèvement", "Rechercher un médicament hyperprolactinémiant", "Doser la TSH", "Si syndrome tumoral (céphalées, hémianopsie) → IRM hypophysaire sans délai"],
    causes: [
      { cause: "Hyperprolactinémie médicamenteuse", signe: "psychotropes, antiémétiques dopaminergiques (très fréquent)", examens: ["Revue de l'ordonnance"] },
      { cause: "Adénome à prolactine", signe: "micro/macroadénome ; PRL souvent très élevée si macro", examens: ["IRM hypophysaire"] },
      { cause: "Hypothyroïdie", signe: "TRH ↑ stimule la PRL", examens: ["TSH"] },
      { cause: "Déconnexion hypothalamo-hypophysaire", signe: "macroadénome non sécrétant comprimant la tige (PRL modérée)", examens: ["IRM hypophysaire"] }
    ],
    red_flags: ["Macroadénome compressif (champ visuel, apoplexie hypophysaire)", "Ne pas confondre avec hypothyroïdie (réversible)"],
    conduite: ["Macroadénome + troubles visuels = avis neurochirurgical/endocrinologique urgent."]
  },
  {
    id: "ggt", num: 58, anomalie: "Augmentation isolée des gamma-GT",
    specialite: "Hépatologie",
    definition: "Une élévation ISOLÉE des GGT (PAL et transaminases normales) est le plus souvent banale. C'est l'association GGT + PAL qui définit la cholestase.",
    premiere_intention: ["Vérifier que l'élévation est isolée (PAL, transaminases normales)", "Rechercher alcool, surpoids/stéatose, inducteurs enzymatiques", "Si GGT + PAL → imagerie des voies biliaires"],
    causes: [
      { cause: "Alcool / stéatose métabolique", signe: "les 2 causes dominantes d'élévation isolée", examens: ["Échographie hépatique, bilan métabolique"] },
      { cause: "Induction enzymatique médicamenteuse", signe: "GGT ↑ isolée, sans cholestase vraie", examens: ["Revue de l'ordonnance"] },
      { cause: "Cholestase débutante", signe: "GGT + PAL élevées ensemble", examens: ["Échographie / imagerie biliaire"] },
      { cause: "Foie cardiaque", signe: "contexte d'insuffisance cardiaque", examens: ["BNP, échocardiographie"] }
    ],
    red_flags: ["Cholestase (GGT + PAL) → obstacle biliaire / cancer", "Hépatopathie alcoolique avancée"],
    conduite: ["GGT isolées ne justifient pas d'emblée un bilan lourd ; réévaluer après réduction des facteurs."]
  },
  {
    id: "cytolyse", num: 59, anomalie: "Élévation des transaminases (cytolyse hépatique)",
    specialite: "Hépatologie",
    definition: "Le rapport ASAT/ALAT, l'ampleur (> 10N = hépatite aiguë) et la prise de médicaments guident. Toute cytolyse aiguë impose la mesure du TP (facteur V).",
    premiere_intention: ["Quantifier (modérée < 5N vs majeure > 10N) et la cinétique", "Rechercher alcool (ASAT>ALAT), stéatose, médicaments (paracétamol)", "Sérologies virales (B, C, A, E)", "TP / facteur V si aiguë (gravité)"],
    causes: [
      { cause: "Stéatopathie métabolique / alcoolique", signe: "cytolyse modérée chronique, la plus fréquente", examens: ["Échographie, bilan métabolique"] },
      { cause: "Hépatite médicamenteuse / toxique", signe: "paracétamol (massive), antituberculeux, statines, azolés", examens: ["Paracétamolémie, revue ordonnance"] },
      { cause: "Hépatite virale", signe: "B/C chronique, A/E aiguë", examens: ["Sérologies virales"] },
      { cause: "Cytolyse extra-hépatique", signe: "musculaire (CPK), hémolyse, hyperthyroïdie", examens: ["CPK, haptoglobine, TSH"] }
    ],
    tableaux: [
      { titre: "Marqueurs de cytolyse",
        entetes: ["Enzyme", "Spécificité"],
        lignes: [
          ["ALAT", "La plus spécifique du foie (cytosol des hépatocytes)"],
          ["ASAT", "Foie et muscle (cœur) ; généralement < ALAT, SAUF origine alcoolique (déficit en pyridoxal, cofacteur de l'ALAT) → ASAT > ALAT"],
          ["LDH", "Non spécifique : marqueur de souffrance cellulaire"]
        ] }
    ],
    red_flags: ["Hépatite fulminante (TP ↓, facteur V ↓, encéphalopathie)", "Intoxication au paracétamol", "Hépatite ischémique (foie de choc)"],
    conduite: ["Cytolyse majeure + TP bas/encéphalopathie = urgence (centre d'hépatologie).", "Étiologies : hépatites virales, alcooliques, médicamenteuses (paracétamol) ou toxiques (amanite phalloïde), mononucléose, cirrhose, certaines cholestases.", "Après 50 ans, environ 50 % des hépatites cytolytiques sont d'origine médicamenteuse → revue systématique de l'ordonnance."]
  },
  {
    id: "dyslipidemie", num: 60, anomalie: "Élévation du cholestérol (dyslipidémie)",
    specialite: "Métabolisme",
    definition: "Exploration des anomalies lipidiques (EAL) à interpréter selon le risque CV global. Bilan après 12 h de jeûne : aspect du sérum, triglycérides, cholestérol total, HDL, LDL calculé (Friedewald). Avant de traiter : éliminer une cause secondaire.",
    premiere_intention: ["EAL après 12 h de jeûne : aspect du sérum, TG, cholestérol total, HDL ; LDL par la formule de Friedewald", "Friedewald : LDL (g/L) = CT − HDL − (TG/5) — non applicable si TG ≥ 4 g/L → dosage direct du LDL", "Un rapport cholestérol total / HDL > 5 = marqueur de risque CV", "2e intention : apo AI, apo B, Lp(a) ; lipidogramme (type III : présence d'IDL)"],
    causes: [
      { cause: "Dyslipidémie commune / polygénique", signe: "la plus fréquente, multifactorielle", examens: ["Bilan lipidique, FdR CV"] },
      { cause: "Hypercholestérolémie familiale", signe: "LDL très élevé + xanthomes + ATCD CV précoces", examens: ["Dépistage familial, score clinique"] },
      { cause: "Dyslipidémie secondaire", signe: "hypothyroïdie, syndrome néphrotique, IRC, cholestase, alcool, iatrogène (corticoïdes, œstroprogestatifs, β-bloquants, diurétiques)", examens: ["TSH, glycémie, créatinine, protéinurie", "Bilan hépatique"] },
      { cause: "Hypertriglycéridémie majeure", signe: "risque de pancréatite aiguë", examens: ["Triglycérides, lipase si douleur"] }
    ],
    tableaux: [
      { titre: "Facteurs de risque CV (HAS) et facteur protecteur",
        entetes: ["Facteur", "Score"],
        lignes: [
          ["Âge : > 50 ans (homme), > 60 ans (femme)", "+1"],
          ["ATCD familial coronarien précoce (parent 1er degré : H < 55 ans, F < 65 ans)", "+1"],
          ["Tabagisme actuel ou arrêté < 3 ans", "+1"],
          ["HTA permanente (traitée ou non)", "+1"],
          ["HDL cholestérol < 0,4 g/L", "+1"],
          ["Protecteur : HDL cholestérol > 0,6 g/L", "−1"]
        ] },
      { titre: "Cible de LDL cholestérol selon le nombre de FdR",
        entetes: ["Catégorie", "Cible LDL"],
        lignes: [
          ["Aucun facteur de risque", "< 2,2 g/L (5,7 mmol/L)"],
          ["1 facteur de risque", "< 1,9 g/L (4,9 mmol/L)"],
          ["2 facteurs de risque", "< 1,6 g/L (4,1 mmol/L)"],
          ["> 2 facteurs de risque", "< 1,3 g/L (3,4 mmol/L)"],
          ["ATCD de maladie cardio-vasculaire", "< 1 g/L (2,6 mmol/L)"]
        ] },
      { titre: "Cible de LDL chez le diabétique (HAS)",
        entetes: ["Profil", "Cible LDL"],
        lignes: [
          ["Diabète < 5 ans, sans FdR additionnel ni microangiopathie", "< 1,9 g/L"],
          ["Au plus 1 FdR additionnel au diabète", "< 1,6 g/L"],
          ["≥ 2 FdR additionnels, diabète < 10 ans", "< 1,3 g/L"],
          ["ATCD CV, ou très haut risque (atteinte rénale, diabète > 10 ans + ≥ 2 FdR, risque > 20 %/10 ans)", "< 1 g/L"]
        ] },
      { titre: "Mécanisme d'action des hypolipémiants",
        entetes: ["Classe", "Mécanisme"],
        lignes: [
          ["Statines", "↓ synthèse hépatique du cholestérol (inhibition HMG-CoA réductase) ; ↑ catabolisme des LDL (surexpression des R-LDL)"],
          ["Fibrates", "↓ synthèse hépatique ; ↑ catabolisme des VLDL ; ↑ lipolyse (LPL) ; agonistes PPAR"],
          ["Résines", "↓ absorption intestinale du cholestérol et du cycle entéro-hépatique des acides biliaires ; ↑ R-LDL ; ↓ vitamines liposolubles"],
          ["Ézétimibe", "↓ absorption du cholestérol alimentaire et biliaire (transporteur des entérocytes) sans toucher vitamines/TG/acides biliaires"],
          ["Acide nicotinique", "Action sur la fibre lisse artériolaire ; effet hypocholestérolémiant (métabolisme des catécholamines, oxydation du cholestérol)"]
        ] },
      { titre: "Impact sur le bilan lipidique",
        entetes: ["Fraction", "Statines (+ézétimibe)", "Fibrates", "Résines", "Ézétimibe", "Ac. nicotinique"],
        lignes: [
          ["Cholestérol total", "↓ 20-50 %", "↓ 10-30 %", "↓ 7-10 %", "↓ 13 %", "↓ 10-20 %"],
          ["LDL cholestérol", "↓ 15-60 %", "↓ 10-30 %", "↓ 15-18 %", "↓ 19 %", "↓ 8-22 %"],
          ["HDL cholestérol", "↑ 5-12 %", "↑ 10-15 %", "↑ 3 %", "↓ 3 %", "↑ 16-26 %"],
          ["Triglycérides", "↓ 15-30 %", "↓ 40-50 %", "↑ 5 %", "↓ 8 %", "↓ 11-34 %"]
        ] }
    ],
    red_flags: ["Hypertriglycéridémie majeure (TG > 10 g/L) → risque de pancréatite aiguë", "Hypercholestérolémie familiale (LDL très élevé, xanthomes, risque CV précoce)", "Association fibrate + statine déconseillée (risque de rhabdomyolyse) — réservée au spécialiste", "Pas de bilan lipidique justifié au-delà de 80 ans"],
    conduite: ["Xanthomes tendineux / arc cornéen avant 45 ans → suspecter une forme familiale, dépistage familial.", "Toujours éliminer une dyslipidémie secondaire (hypothyroïdie, néphrotique, IRC, cholestase, alcool, iatrogène) avant de traiter.", "Hygiéno-diététique d'abord (AGS → AGMI/AGPI, oméga-3, fibres, poids, activité, alcool) ; médicament si objectif non atteint à 3 mois (d'emblée en prévention secondaire).", "Hypercholestérolémie (IIa/IIb/III) : statine ± résine/ézétimibe ; hypertriglycéridémie majeure : fibrate. Bilan normal → contrôle ≤ 1 fois/5 ans."]
  },
  {
    id: "cpk", num: 61, anomalie: "Élévation des CPK (créatine-kinase)",
    specialite: "Muscle",
    definition: "Vérifier d'abord l'origine MUSCULAIRE (vs effort/IM/comitialité). CPK massives + myoglobinurie = rhabdomyolyse (surveiller kaliémie et fonction rénale).",
    premiere_intention: ["Confirmer l'origine musculaire (myalgies, faiblesse, urines foncées)", "Rechercher une cause iatrogène (STATINE ± fibrate, neuroleptiques)", "Surveiller kaliémie et fonction rénale si rhabdomyolyse"],
    causes: [
      { cause: "Rhabdomyolyse", signe: "CPK très élevées + myalgies + myoglobinurie → risque IRA et hyperkaliémie", examens: ["Kaliémie, créatinine, BU (myoglobinurie)"] },
      { cause: "Myopathie iatrogène", signe: "statines (myalgies + CPK ↑), syndrome malin des neuroleptiques (urgence)", examens: ["Revue ordonnance, température/conscience"] },
      { cause: "Myosite inflammatoire", signe: "déficit proximal + CPK ↑ (dermato/polymyosite)", examens: ["EMG, auto-anticorps, avis spécialisé"] },
      { cause: "Hypothyroïdie", signe: "CPK ↑ + signes d'hypothyroïdie", examens: ["TSH"] }
    ],
    red_flags: ["Rhabdomyolyse (IRA, hyperkaliémie)", "Syndrome malin des neuroleptiques", "Myocardite / SCA (préférer la troponine)"],
    conduite: ["Sous statine : myalgies + CPK élevées → arrêt (risque majoré par les fibrates)."]
  },
  {
    id: "ldh", num: 62, anomalie: "Lacticodéshydrogénase (LDH) élevée",
    specialite: "Non spécifique",
    definition: "Marqueur de lyse cellulaire NON spécifique : n'a de valeur qu'interprété dans un contexte. Éliminer une hémolyse (de prélèvement ou vraie).",
    premiere_intention: ["Éliminer une hémolyse de prélèvement", "Rechercher une hémolyse vraie : LDH ↑ + haptoglobine ↓ + bilirubine libre ↑", "Replacer dans le contexte (néoplasie, nécrose tissulaire)"],
    causes: [
      { cause: "Hémolyse", signe: "vraie (anémie hémolytique) ou artefactuelle", examens: ["Haptoglobine, bilirubine libre, frottis (schizocytes)"] },
      { cause: "Néoplasie / hémopathie", signe: "lymphome (valeur pronostique), tumeurs à fort turn-over", examens: ["Imagerie, avis hématologique"] },
      { cause: "Nécrose tissulaire", signe: "infarctus, rhabdomyolyse, ischémie", examens: ["Troponine, CPK selon contexte"] },
      { cause: "Autres", signe: "hépatopathie, macro-LDH, atteinte musculaire", examens: ["Bilan orienté"] }
    ],
    red_flags: ["Anémie hémolytique aiguë (MAT : LDH ↑ + schizocytes + thrombopénie → urgence)", "Syndrome de lyse tumorale", "Lymphome agressif"],
    conduite: ["LDH ↑ + schizocytes + thrombopénie = microangiopathie thrombotique → urgence."]
  },
  {
    id: "anemie", num: 63, anomalie: "Conduite à tenir devant une anémie",
    specialite: "Hématologie",
    definition: "L'algorithme repose sur le VGM + les réticulocytes. Évaluer d'abord la TOLÉRANCE.",
    premiere_intention: ["Évaluer la tolérance (dyspnée, angor, tachycardie → transfusion)", "Orienter par le VGM (micro / macro / normocytaire)", "Réticulocytes si normocytaire (régénérative vs arégénérative)"],
    causes: [
      { cause: "Anémie microcytaire ferriprive", signe: "ferritine basse → CHERCHER le saignement (digestif si homme/femme ménopausée)", examens: ["Ferritine, endoscopies digestives"] },
      { cause: "Anémie macrocytaire carentielle", signe: "B12/folates, alcool, hypothyroïdie, myélodysplasie", examens: ["B12, folates, TSH, myélogramme si besoin"] },
      { cause: "Anémie normocytaire régénérative", signe: "hémolyse (LDH ↑, haptoglobine ↓) ou saignement aigu", examens: ["Réticulocytes, haptoglobine, LDH, bilirubine"] },
      { cause: "Anémie normocytaire arégénérative", signe: "inflammation, IRC (EPO ↓), insuffisance médullaire", examens: ["CRP, créatinine, myélogramme si pancytopénie"] }
    ],
    red_flags: ["Mauvaise tolérance (angor, défaillance) → transfusion", "Saignement actif", "Pancytopénie (leucémie aiguë, aplasie)", "Anémie hémolytique avec schizocytes (MAT)"],
    conduite: ["Microcytaire ferriprive chez homme/femme ménopausée = saignement digestif jusqu'à preuve du contraire (endoscopies)."]
  },
  {
    id: "anemie_microcytaire", num: 64, anomalie: "Anémie microcytaire (démarche diagnostique)",
    specialite: "Hématologie",
    definition: "Anémie (Hb < 120 g/L chez l'homme, < 110 g/L chez la femme) avec VGM < 80 fL. Le bilan martial est la clé. Trois grands cadres : ferriprive, inflammatoire, β-thalassémie mineure.",
    premiere_intention: ["Confirmer la microcytose (VGM < 80 fL) sur l'hémogramme", "Ferritine + CRP en première intention (carence martiale vs inflammation)", "Coefficient de saturation de la transferrine (CST) ; récepteurs solubles de la transferrine (RsTf) si inflammation associée", "Électrophorèse de l'hémoglobine si bilan martial normal (thalassémie)"],
    causes: [
      { cause: "Anémie ferriprive", signe: "ferritine basse, CST bas, RsTf augmentés ; saignements chroniques (gynéco chez la femme, digestifs chez l'homme/femme ménopausée), carence d'apport (grossesses répétées, nourrissons)", examens: ["Ferritine", "CST", "Endoscopies digestives", "Bilan gynécologique"] },
      { cause: "Anémie inflammatoire", signe: "ferritine normale ou augmentée, CST bas, VS et CRP augmentées ; maladies de système (LED, PR), néoplasies, infections chroniques", examens: ["CRP, VS", "Ferritine", "RsTf (non modifiés par l'inflammation)"] },
      { cause: "β-thalassémie mineure", signe: "microcytose marquée contrastant avec une anémie modérée, pseudo-polyglobulie, bilan martial normal, HbA2 > 3,5 %", examens: ["Électrophorèse de l'hémoglobine"] },
      { cause: "Anémie sidéroblastique / saturnisme", signe: "causes plus rares ; intoxication au plomb", examens: ["Plombémie", "Myélogramme (sidéroblastes en couronne)"] }
    ],
    tableaux: [
      { titre: "Diagnostic biologique d'une anémie microcytaire",
        entetes: ["", "Ferriprive", "Inflammatoire", "β-thalassémie mineure"],
        lignes: [
          ["Numération", "Hypochrome microcytaire peu régénérative", "Hypochrome microcytaire arégénérative (après phase normochrome normocytaire), ± PNN ↑", "Microcytose, hypochromie ± anémie, pseudo-polyglobulie"],
          ["Fer sérique", "Diminué", "Diminué", "N"],
          ["Transferrine / CTFT", "Augmentées", "Diminuées", "N"],
          ["Coeff. saturation transferrine (CST)", "Diminué", "Diminué", "N"],
          ["Ferritine", "Diminuée", "Augmentée", "N"],
          ["Récepteurs solubles transferrine (RsTf)", "Augmentés", "N", "N"],
          ["VS", "N", "Augmentée", "N"],
          ["Protéines de l'inflammation (CRP, Fg)", "N", "Augmentées", "N"],
          ["Électrophorèse de l'hémoglobine", "N", "N", "HbA2 > 3,5 %"]
        ] }
    ],
    red_flags: ["Anémie ferriprive chez l'homme ou la femme ménopausée → saignement digestif jusqu'à preuve du contraire (endoscopies)", "Mauvaise tolérance (angor, dyspnée, tachycardie)"],
    conduite: ["Toute anémie ferriprive impose la recherche d'un saignement chronique.", "Sels de fer au cours des repas ; crise réticulocytaire à J7-J10 ; poursuivre jusqu'à normalisation de la ferritine (~6 mois).", "Cinétique ferriprive : ferritine / transferrine > fer sérique / RsTf > hypochromie > microcytose > anémie ; la normalisation sous traitement se fait en sens inverse.", "La ferritine peut être normale si carence martiale + inflammation chronique : les RsTf, non influencés par l'inflammation, permettent le diagnostic."]
  },
  {
    id: "anemie_hemolytique", num: 65, anomalie: "Anémie hémolytique (démarche et classification)",
    specialite: "Hématologie",
    definition: "Anémie par destruction accrue des hématies, normochrome normocytaire régénérative (réticulocytes élevés). Classification : corpusculaire (souvent constitutionnelle) vs extracorpusculaire (souvent acquise).",
    premiere_intention: ["Confirmer l'hémolyse : réticulocytes élevés, haptoglobine effondrée, bilirubine non conjuguée et LDH augmentées", "Frottis sanguin (schizocytes → MAT, sphérocytes, drépanocytes…)", "Test de Coombs direct : différencie hémolyse immunologique vs non immunologique", "Apprécier la tolérance et le caractère aigu ou chronique"],
    causes: [
      { cause: "Corpusculaire — membrane", signe: "sphérocytose (Minkowski-Chauffard), elliptocytose", examens: ["Frottis", "Ektacytométrie / résistances osmotiques"] },
      { cause: "Corpusculaire — hémoglobine", signe: "drépanocytose, thalassémies", examens: ["Électrophorèse de l'hémoglobine"] },
      { cause: "Corpusculaire — enzymatique", signe: "déficit en G6PD, en pyruvate-kinase", examens: ["Dosages enzymatiques érythrocytaires"] },
      { cause: "Extracorpusculaire — mécanique (MAT)", signe: "SHU, PTT : schizocytes + thrombopénie", examens: ["Frottis (schizocytes)", "Plaquettes", "Avis hématologique urgent"] },
      { cause: "Extracorpusculaire — infectieux / toxique", signe: "paludisme (retour de zone d'endémie), toxiques", examens: ["Frottis / goutte épaisse", "Contexte d'exposition"] },
      { cause: "Extracorpusculaire — immunologique", signe: "AHAI : Coombs direct positif", examens: ["Test de Coombs direct"] }
    ],
    tableaux: [
      { titre: "Classification des anémies hémolytiques",
        entetes: ["Mécanisme", "Corpusculaire (souvent constitutionnelle)", "Extracorpusculaire (souvent acquise)"],
        lignes: [
          ["Membrane / mécanique", "Sphérocytose, elliptocytose", "Mécanique : SHU, PTT (MAT)"],
          ["Hémoglobine / infectieux", "Drépanocytose, thalassémies", "Infectieux : paludisme…"],
          ["Enzyme / toxique-immuno", "Déficit en G6PD, pyruvate-kinase", "Toxique ; immunologique : AHAI"]
        ] }
    ],
    red_flags: ["Hémolyse aiguë : fièvre, frissons, nausées, malaise, douleurs lombaires/abdominales, état de choc", "Schizocytes + thrombopénie = microangiopathie thrombotique (SHU/PTT) → urgence hématologique", "Paludisme à évoquer au retour de zone d'endémie", "Mauvaise tolérance de l'anémie"],
    conduite: ["Hémolyse aiguë = signes généraux marqués ; hémolyse chronique = ictère, urines foncées, splénomégalie.", "Coombs direct positif → AHAI ; négatif → orienter vers une cause corpusculaire ou mécanique.", "MAT (schizocytes + thrombopénie) = urgence : avis spécialisé immédiat."]
  },
  {
    id: "ahai", num: 66, anomalie: "Anémie hémolytique auto-immune (AHAI)",
    specialite: "Hématologie",
    definition: "Anémie hémolytique liée à des auto-anticorps dirigés contre un antigène de surface de l'hématie ; cause la plus fréquente des anémies hémolytiques extracorpusculaires. Deux types : auto-Ac chauds (50-70 %) et auto-Ac froids.",
    premiere_intention: ["Confirmer l'hémolyse : anémie normochrome normocytaire régénérative, haptoglobine ↓, bilirubine non conjuguée ↑, LDH ↑", "Test de Coombs direct (test direct à l'antiglobuline) : Ig et/ou complément fixés sur le GR", "Préciser le type : chaud (IgG ± complément, anti-Rh, optimum 37 °C) vs froid (IgM, anti-i, optimum < 22 °C)", "Rechercher systématiquement une cause secondaire"],
    causes: [
      { cause: "Auto-Ac chauds — idiopathique", signe: "≈ 50 % des cas, hémolyse souvent chronique", examens: ["Coombs direct (IgG ± complément)"] },
      { cause: "Auto-Ac chauds — secondaire", signe: "LED (rechercher un lupus, surtout si thrombopénie auto-immune associée = syndrome d'Evans), hémopathie lymphoïde (LNH, LLC, dysglobulinémie), α-méthyldopa", examens: ["Anticorps antinucléaires", "NFS, électrophorèse, imagerie"] },
      { cause: "Auto-Ac froids — hémoglobinurie a frigore", signe: "auto-anticorps biphasiques (fixation à froid, hémolyse à chaud), rare", examens: ["Test de Donath-Landsteiner"] },
      { cause: "Auto-Ac froids — secondaire (infections)", signe: "Mycoplasma pneumoniae, EBV (anti-i), CMV, rougeole, oreillons — surtout chez l'enfant", examens: ["Sérologies", "Coombs (complément)"] },
      { cause: "Maladie des agglutinines froides", signe: "IgM monoclonale (anti-i), crises hémolytiques au froid ; idiopathique ou hémopathie lymphoïde (lymphome lymphoplasmocytaire)", examens: ["Recherche d'agglutinines froides", "Électrophorèse / immunofixation"] }
    ],
    tableaux: [
      { titre: "AHAI à auto-anticorps chauds vs froids",
        entetes: ["", "Auto-Ac chauds (50-70 %)", "Auto-Ac froids"],
        lignes: [
          ["Anticorps", "IgG ± complément (souvent anti-Rh), optimum 37 °C", "IgM (anti-i), optimum < 22 °C"],
          ["Tableau", "Hémolyse plutôt chronique", "Crises hémolytiques déclenchées par le froid"],
          ["Étiologies", "Idiopathique (50 %) ; LED, hémopathie lymphoïde, α-méthyldopa…", "HPN a frigore ; infections (Mycoplasma, EBV, CMV…) ; agglutinines froides (hémopathie lymphoïde)"]
        ] },
      { titre: "Tests à l'antiglobuline (Coombs)",
        entetes: ["Test", "Principe"],
        lignes: [
          ["Coombs direct (37 °C / 4 °C)", "Met en évidence les Ig et/ou le complément fixés sur les hématies du patient (antiglobulines polyspécifiques, puis monospécifiques si positif)"],
          ["Test d'élution", "Élue les anticorps fixés sur les hématies du patient et détermine leur spécificité sur des hématies de phénotype connu"],
          ["Coombs indirect", "Recherche les anticorps libres dans le sérum sur hématies de phénotype connu ; titrage par dilutions successives"]
        ] }
    ],
    red_flags: ["Hémolyse aiguë (fièvre, frissons, état de choc)", "Syndrome d'Evans (AHAI + thrombopénie auto-immune) → rechercher un lupus", "Mauvaise tolérance → transfusion (avec précautions, sang réchauffé si Ac froids)"],
    conduite: ["Test de Coombs direct = examen clé ; test d'élution et Coombs indirect précisent la spécificité de l'anticorps.", "Toujours rechercher une cause secondaire (LED, hémopathie lymphoïde, infection, médicament).", "Traitements selon le type : corticothérapie, immunoglobulines IV, immunosuppresseurs, anti-CD20 (rituximab), splénectomie ; pour les formes à Ac froids, protection contre le froid."]
  },
  {
    id: "thrombopenie", num: 67, anomalie: "Thrombopénie (plaquettes basses)",
    specialite: "Hématologie",
    definition: "Plaquettes < 150 G/L. Éliminer d'abord une FAUSSE thrombopénie (agrégats à l'EDTA, satellitisme, microcaillot). Mécanismes : centrale (défaut de production), périphérique (destruction/consommation), répartition (hypersplénisme) ou hémodilution.",
    premiere_intention: ["Éliminer une fausse thrombopénie : contrôle sur tube citraté + frottis (agrégats, satellitisme)", "Apprécier le risque hémorragique (purpura, muqueuses) et la profondeur de la thrombopénie", "NFS + frottis : autres lignées, schizocytes (→ MAT), blastes", "Bilan d'hémostase (TP, TCA, fibrinogène, D-dimères) ; myélogramme si origine centrale suspectée"],
    causes: [
      { cause: "Fausse thrombopénie", signe: "agrégats (EDTA), satellitisme, microcaillot — plaquettes normales sur citrate", examens: ["Contrôle sur tube citraté", "Frottis sanguin"] },
      { cause: "Centrale (défaut de production)", signe: "carence B9/B12, alcoolisme aigu, aplasie / envahissement médullaire / myélodysplasie / myélofibrose, iatrogène, constitutionnelle", examens: ["B12/folates", "Myélogramme", "Revue des médicaments"] },
      { cause: "Périphérique — auto-immune", signe: "PTAI ; LED, SAPL, Sjögren ; hémopathies (LLC, Hodgkin) ; immuno-allergique (héparine → TIH, quinine, sulfamides, rifampicine, pénicilline, digoxine) ; infections virales", examens: ["Coombs plaquettaire", "ACAN", "Sérologies virales", "Recherche TIH si héparine"] },
      { cause: "Périphérique — consommation (MAT / CIVD)", signe: "PTT, SHU, CIVD : schizocytes, troubles de l'hémostase ; parasitaires (paludisme, toxoplasmose, leishmaniose)", examens: ["Frottis (schizocytes)", "TP/TCA, fibrinogène, D-dimères", "Avis urgent"] },
      { cause: "Allo-immune", signe: "post-transfusionnelle ; allo-immunisation materno-fœtale", examens: ["Contexte", "Recherche d'allo-anticorps"] },
      { cause: "Répartition / hémodilution", signe: "hypersplénisme (HTP, hémopathies, infections) ; transfusions / perfusions massives ; hypothermie ; thrombopénie gestationnelle", examens: ["Échographie (rate, foie)", "Contexte clinique"] }
    ],
    tableaux: [
      { titre: "Signes hémorragiques et seuils",
        entetes: ["Manifestation", "Fréquence / seuil"],
        lignes: [
          ["Purpura cutané (pétéchial)", "≈ 80 %"],
          ["Hémorragie muqueuse", "≈ 40 % (adulte)"],
          ["Hémorragie rétinienne", "si plaquettes < 20 G/L → fond d'œil"]
        ] }
    ],
    red_flags: ["Thrombopénie profonde < 20 G/L (hémorragie spontanée possible) → fond d'œil, avis urgent", "Schizocytes + thrombopénie = microangiopathie thrombotique (PTT/SHU) → urgence", "Thrombopénie + CIVD / sepsis", "Thrombopénie sous héparine (TIH) → arrêt de l'héparine + avis", "Syndrome hémorragique actif"],
    conduite: ["Toujours éliminer une fausse thrombopénie avant tout bilan.", "Découverte récente avec schizocytes, CIVD ou syndrome hémorragique = urgence.", "Le PTAI est un diagnostic d'élimination (voir fiche dédiée)."]
  },
  {
    id: "ptai", num: 68, anomalie: "Purpura thrombopénique auto-immun (PTAI / PTI)",
    specialite: "Hématologie",
    definition: "Thrombopénie périphérique par auto-anticorps anti-plaquettes. Diagnostic d'ÉLIMINATION. Forme aiguë (surtout l'enfant de 2-6 ans, incidence ≈ 4/100 000/an) ou chronique (surtout l'adulte, prédominance féminine).",
    premiere_intention: ["Thrombopénie isolée, régénérative (VPM et plaquettes réticulées augmentés, > 20-30 %)", "NFS et frottis normaux par ailleurs (pas de schizocytes, pas de blastes)", "Exclure les autres causes : médicaments, infections, MAT, hémopathie, carence", "Sérologies virales (rubéole, VZV, VIH, EBV), ACAN, bilirubine, transaminases"],
    causes: [
      { cause: "PTAI aigu", signe: "surtout l'enfant (2-6 ans), début brutal, plaquettes < 20 G/L, manifestations hémorragiques, parfois précédé d'une infection virale", examens: ["NFS, frottis", "Sérologies virales"] },
      { cause: "PTAI chronique", signe: "surtout l'adulte, sex-ratio F/H ≈ 3, thrombopénie modérée (50-80 G/L), manifestations modérées, rémissions spontanées rares", examens: ["Suivi NFS", "ACAN"] },
      { cause: "Formes secondaires à rechercher", signe: "LED / SAPL, hémopathie lymphoïde (LLC), VIH / VHC, médicaments", examens: ["ACAN", "Sérologies VIH/VHC", "Revue médicamenteuse"] }
    ],
    tableaux: [
      { titre: "PTAI aigu vs chronique",
        entetes: ["", "Aigu", "Chronique"],
        lignes: [
          ["Terrain", "Surtout l'enfant (2-6 ans)", "Surtout l'adulte, F/H ≈ 3"],
          ["Début", "Brutal, parfois post-viral", "Insidieux"],
          ["Plaquettes", "< 20 G/L", "Modérée (50-80 G/L)"],
          ["Hémorragie", "Manifestations possibles", "Modérées ou absentes"],
          ["Évolution", "Guérison fréquente", "Rémissions spontanées rares"]
        ] }
    ],
    red_flags: ["Plaquettes < 20 G/L avec syndrome hémorragique → fond d'œil, avis hématologique urgent", "Hémorragie muqueuse abondante ou signe neurologique (hémorragie intracrânienne, rare mais grave)"],
    conduite: ["Diagnostic d'élimination : thrombopénie isolée régénérative, autres causes exclues.", "Coombs plaquettaire positif dans ≈ 80 % (auto-Ac anti-GpIIbIIIa, anti-GpIb/IX) ; myélogramme (avant corticoïdes chez l'adulte ou si atypie) = moelle riche en mégacaryocytes.", "Plaquettes réticulées > 20-30 % (caractère périphérique).", "Traitement selon profondeur et risque : abstention/surveillance, corticoïdes, immunoglobulines IV ; 2e ligne : agonistes du TPO, rituximab, splénectomie."]
  },
  {
    id: "mat", num: 69, anomalie: "Microangiopathie thrombotique (MAT) — PTT / SHU",
    specialite: "Hématologie",
    definition: "Occlusion de la microcirculation par des thrombi plaquettaires → triade : anémie hémolytique mécanique (schizocytes), thrombopénie périphérique de consommation, ischémie d'organe. PTT (Moschcowitz) = auto-immun (anti-ADAMTS13) → défaut de clivage du facteur von Willebrand et thrombi (rares déficits congénitaux). SHU = infectieux (ECEH O157:H7) avec vérotoxines altérant l'endothélium, surtout rénal. URGENCE diagnostique et thérapeutique.",
    premiere_intention: ["Affirmer l'hémolyse mécanique : schizocytes au frottis, haptoglobine effondrée, LDH très élevé, bilirubine non conjuguée ↑, réticulocytes ↑, test de Coombs NÉGATIF", "Thrombopénie de consommation (périphérique), souvent < 50 G/L", "Hémostase NORMALE (TP, TCA, fibrinogène) — distingue la MAT de la CIVD", "Évaluer l'atteinte d'organe : créatinine (rein), examen neurologique, troponine ; activité ADAMTS13 (< 10 % → PTT)"],
    causes: [
      { cause: "PTT (Moschcowitz)", signe: "déficit sévère en ADAMTS13 (< 10 %) → défaut de clivage du facteur von Willebrand ; auto-immun (anti-ADAMTS13) ou congénital (Upshaw-Schulman) ; signes neurologiques fluctuants (confusion, céphalées, troubles visuels), fièvre, purpura, ecchymoses, ictère à urines foncées", examens: ["Activité ADAMTS13 + anticorps anti-ADAMTS13", "Frottis (schizocytes)"] },
      { cause: "SHU typique (post-diarrhée)", signe: "surtout l'enfant ; E. coli entérohémorragique O157:H7 (vérotoxines) ; diarrhée ou colite hémorragique précédant l'atteinte rénale (au premier plan), parfois troubles neurologiques", examens: ["Coproculture (gélose sorbitol-MacConkey)", "Recherche de vérotoxines (PCR), sérodiagnostic", "Créatinine, urée"] },
      { cause: "SHU atypique", signe: "dérégulation de la voie alterne du complément ; insuffisance rénale, formes familiales / récidivantes", examens: ["Exploration du complément (CH50, C3, facteurs H/I)"] },
      { cause: "MAT secondaires", signe: "grossesse (HELLP, pré-éclampsie), cancer, médicaments, greffe, VIH, HTA maligne", examens: ["Contexte", "Bilan étiologique orienté"] }
    ],
    tableaux: [
      { titre: "Diagnostic biologique d'une MAT",
        entetes: ["Paramètre", "Résultat"],
        lignes: [
          ["Anémie", "Hémolytique mécanique, régénérative"],
          ["Frottis", "Schizocytes (> 1 %)"],
          ["Haptoglobine", "Effondrée"],
          ["LDH / bilirubine libre", "Augmentés"],
          ["Test de Coombs", "Négatif (hémolyse non immune)"],
          ["Plaquettes", "Thrombopénie (consommation)"],
          ["TP / TCA / fibrinogène", "Normaux (≠ CIVD)"],
          ["ADAMTS13", "< 10 % → PTT"]
        ] },
      { titre: "PTT vs SHU (orientation)",
        entetes: ["", "PTT", "SHU"],
        lignes: [
          ["Mécanisme", "Déficit en ADAMTS13 (< 10 %)", "Shiga-toxine (typique) / complément (atypique)"],
          ["Terrain", "Adulte", "Enfant surtout (forme typique)"],
          ["Atteinte dominante", "Neurologique (fluctuante)", "Rénale (insuffisance rénale aiguë)"],
          ["Élément clé", "ADAMTS13 effondré", "STEC / Shiga-toxine ; complément si atypique"],
          ["Traitement", "Échanges plasmatiques en urgence", "Support ; éculizumab si atypique"]
        ] }
    ],
    red_flags: ["MAT = urgence vitale : schizocytes + thrombopénie, Coombs négatif, hémostase normale → avis hématologique et échanges plasmatiques en urgence (PTT)", "NE PAS transfuser de plaquettes dans le PTT (aggrave les thromboses) sauf hémorragie vitale", "Atteinte neurologique (confusion, déficit, convulsion) ou cardiaque", "Insuffisance rénale aiguë"],
    conduite: ["Toute association schizocytes + thrombopénie impose d'évoquer une MAT et de demander un avis spécialisé immédiat.", "Hémostase normale oriente vers MAT plutôt que CIVD ; ADAMTS13 effondré confirme le PTT.", "PTT : échanges plasmatiques en urgence, corticoïdes, rituximab, caplacizumab. SHU typique : traitement de support. SHU atypique : éculizumab."]
  },
  {
    id: "tih", num: 70, anomalie: "Thrombopénie induite par l'héparine (TIH)",
    specialite: "Hématologie",
    definition: "Thrombopénie survenant sous héparine. Type 1 : précoce, bénigne, non immune. Type 2 : immuno-allergique (anticorps anti-PF4-héparine), PARADOXALEMENT thrombogène — urgence diagnostique et thérapeutique.",
    premiere_intention: ["Surveiller la numération plaquettaire sous héparine (cinétique +++)", "Calculer la chute : type 2 = plaquettes < 100 G/L ou baisse > 40 % au-delà du 5e jour (plus tôt si exposition récente à l'héparine)", "Recherche d'anticorps anti-PF4-héparine (détecte IgG, A, M)", "Tests fonctionnels (activation plaquettaire héparine-dépendante, IgG) ; évaluent la réactivité croisée avec le danaparoïde"],
    causes: [
      { cause: "TIH de type 1", signe: "avant le 5e jour, plaquettes > 100 G/L, réversible, asymptomatique, sans anticorps anti-PF4 ; 10-20 % des traitements hépariniques", examens: ["Surveillance plaquettaire (pas d'anticorps)"] },
      { cause: "TIH de type 2", signe: "après le 5e jour (sauf ré-exposition récente), plaquettes < 100 G/L ou chute > 40 %, thromboses veineuses voire artérielles, rarement hémorragies ; 1-5 % des HNF, 0,1-0,2 % des HBPM", examens: ["Anticorps anti-PF4-héparine", "Tests fonctionnels d'activation plaquettaire"] }
    ],
    tableaux: [
      { titre: "TIH type 1 vs type 2",
        entetes: ["", "Type 1", "Type 2"],
        lignes: [
          ["Mécanisme", "Non immun (effet direct)", "Immuno-allergique (anti-PF4-héparine)"],
          ["Délai", "< 5e jour", "> 5e jour (plus tôt si ré-exposition)"],
          ["Plaquettes", "> 100 G/L", "< 100 G/L ou chute > 40 %"],
          ["Clinique", "Asymptomatique, réversible", "Thromboses veineuses/artérielles, rares hémorragies"],
          ["Fréquence", "10-20 % des traitements", "1-5 % (HNF), 0,1-0,2 % (HBPM)"]
        ] }
    ],
    red_flags: ["TIH de type 2 = urgence : thrombopénie + thromboses sous héparine → arrêt immédiat de toute héparine", "Ne pas attendre la confirmation biologique si forte suspicion clinique", "Rechercher une thrombose (veineuse ou artérielle) et une CIVD associée"],
    conduite: ["Dès la suspicion clinique ou biologique : ARRÊT de l'héparinothérapie + contrôle quotidien des plaquettes.", "Anticoagulation de relais par danaparoïde (risque de réactivité croisée mais activité anti-Xa étalonnée contrôlable) ou lépirudine/argatroban (pas de réactivité croisée mais activité non dosable en routine).", "La remontée rapide des plaquettes après arrêt de l'héparine conforte le diagnostic.", "Rechercher une CIVD (PDF/D-dimères, facteur V, complexes solubles).", "Ne jamais ré-introduire d'héparine ; tracer l'allergie."]
  },
  {
    id: "syndrome_mononucleosique", num: 71, anomalie: "Syndrome mononucléosique",
    specialite: "Hématologie",
    definition: "Présence dans le sang périphérique de grandes cellules lymphoïdes hyperbasophiles. Formule : lymphocytose > 50 % et lymphocytes activés (hyperbasophiles) > 10 %. Le plus souvent d'origine virale (EBV ++).",
    premiere_intention: ["Hémogramme + frottis : lymphocytose > 50 %, lymphocytes activés > 10 %", "MNI test (anticorps hétérophiles) en première intention", "Sérologie EBV (cause la plus fréquente)", "Selon le tableau : sérologie CMV, toxoplasmose, VIH (± Ag p24), sérologies hépatites"],
    causes: [
      { cause: "Mononucléose infectieuse (EBV)", signe: "cause la plus fréquente ; angine, adénopathies, asthénie, splénomégalie ; rash si prise d'ampicilline/amoxicilline", examens: ["MNI test", "Sérologie EBV (VCA IgM/IgG, EBNA)"] },
      { cause: "Primo-infection à CMV", signe: "souvent fièvre isolée prolongée ; MNI test négatif", examens: ["Sérologie CMV (IgM)", "PCR CMV"] },
      { cause: "Primo-infection VIH", signe: "syndrome pseudo-grippal, angine, éruption, adénopathies ; à évoquer systématiquement", examens: ["Sérologie VIH + Ag p24 (test combiné)", "Charge virale si doute"] },
      { cause: "Toxoplasmose", signe: "adénopathies (cervicales), fébricule, asthénie ; sujet immunocompétent", examens: ["Sérologie toxoplasmose (IgM/IgG)"] },
      { cause: "Hépatites virales", signe: "présentation avec ictère / cytolyse", examens: ["Sérologies hépatites (A, B, C)"] },
      { cause: "Cause médicamenteuse", signe: "éruption cutanée (ampicilline), allergie médicamenteuse / DRESS", examens: ["Imputabilité médicamenteuse"] }
    ],
    tableaux: [
      { titre: "Orientation selon la présentation",
        entetes: ["Présentation", "Évoquer", "Examens"],
        lignes: [
          ["Angine", "MNI (EBV), primo-infection VIH", "MNI test, sérologie EBV, sérologie VIH ± Ag p24"],
          ["Adénopathies", "MNI, toxoplasmose, VIH", "MNI test, sérologies EBV / toxoplasmose / VIH ± Ag p24"],
          ["Éruption cutanée", "MNI (sous ampicilline), allergie médicamenteuse", "MNI test, sérologie EBV"],
          ["Fièvre isolée", "CMV", "Sérologie CMV"],
          ["Ictère", "Hépatite", "Sérologies hépatites"]
        ] }
    ],
    red_flags: ["Toujours évoquer une primo-infection VIH (sérologie combinée + Ag p24) — enjeu individuel et de santé publique", "Rupture de rate (rare) dans la MNI : douleur de l'hypochondre gauche → éviter les sports de contact si splénomégalie", "Complications : thrombopénie / AHAI auto-immune, hépatite sévère, angine très hypertrophique avec gêne respiratoire"],
    conduite: ["EBV = cause la plus fréquente : MNI test + sérologie EBV en première intention.", "MNI test négatif → élargir : CMV, toxoplasmose, VIH (± Ag p24), hépatites.", "Éviter l'amoxicilline/ampicilline (rash) ; repos, abstention des sports de contact en cas de splénomégalie."]
  },
  {
    id: "llc", num: 72, anomalie: "Leucémie lymphoïde chronique (LLC)",
    specialite: "Hématologie",
    definition: "Hémopathie lymphoïde B mature : accumulation de petits lymphocytes B monoclonaux. Souvent asymptomatique, découverte sur une hyperlymphocytose ; sinon adénopathies, complications infectieuses. Incidence 3-10/100 000/an, âge médian 64 ans, sex-ratio H/F ≈ 2.",
    premiere_intention: ["Hémogramme : lymphocytose > 4 G/L persistante, ± anémie, ± thrombopénie", "Frottis : petits lymphocytes matures monomorphes, ombres de Gumprecht", "Immunophénotypage lymphocytaire (score de Matutes) = examen clé du diagnostic", "Évaluer le retentissement : adénopathies, splénomégalie, infections, cytopénies"],
    causes: [
      { cause: "Leucémie lymphoïde chronique", signe: "petits lymphocytes matures, ombres de Gumprecht, score de Matutes 4-5", examens: ["Immunophénotypage (score de Matutes)"] },
      { cause: "Autre syndrome lymphoprolifératif B", signe: "lymphome en phase leucémique (manteau, folliculaire, splénique…) ; score de Matutes < 4", examens: ["Immunophénotypage, cytogénétique", "Biopsie ganglionnaire si besoin"] },
      { cause: "Lymphocytose réactionnelle", signe: "infection (virale, coqueluche), transitoire, polyclonale", examens: ["Contexte clinique, contrôle de l'hémogramme"] }
    ],
    tableaux: [
      { titre: "Score de Matutes (immunophénotypage) — LLC si 4-5 (3 dans 5 % des cas)",
        entetes: ["Antigène", "1 point si", "0 point si"],
        lignes: [
          ["CD5", "Positif", "Négatif"],
          ["CD23", "Positif", "Négatif"],
          ["CD22 ou CD79b", "Faible expression", "Expression normale"],
          ["FMC7", "Négatif", "Positif"],
          ["Ig de surface", "Faible expression", "Normale ou forte"]
        ] },
      { titre: "Facteurs de mauvais pronostic",
        entetes: ["Domaine", "Marqueurs"],
        lignes: [
          ["Immunophénotype", "CD38+, ZAP70+"],
          ["Cytogénétique", "Délétion 17p (TP53), délétion 11q23"],
          ["Moléculaire", "Chaînes lourdes d'Ig (IgVH) non mutées"],
          ["Évolutivité", "Temps de doublement lymphocytaire < 1 an, cytologie atypique, score de Matutes faible"],
          ["Biologie", "LDH et β2-microglobuline élevées"]
        ] }
    ],
    red_flags: ["Cytopénies auto-immunes associées (AHAI, PTAI)", "Complications infectieuses récidivantes (hypogammaglobulinémie)", "Syndrome de Richter : transformation en lymphome agressif (AEG, adénopathie en croissance rapide, LDH ↑)", "Délétion 17p / TP53 muté : forme de mauvais pronostic"],
    conduite: ["Diagnostic = hyperlymphocytose B clonale + score de Matutes 4-5 (3 dans 5 % des cas).", "Classer (stades de Binet A/B/C) ; nombreuses formes indolentes relevant d'une simple surveillance.", "Bilan pronostique : FISH (17p, 11q), statut mutationnel IgVH, β2-microglobuline.", "Traiter les formes symptomatiques / évolutives ; prévention et traitement des infections."]
  },
  {
    id: "waldenstrom", num: 73, anomalie: "Maladie de Waldenström (macroglobulinémie)",
    specialite: "Hématologie",
    definition: "Lymphome lymphoplasmocytaire sécrétant une IgM monoclonale. Manifestations liées à l'infiltration (adénopathies, spléno/hépatomégalie, cytopénies, amaigrissement) et à l'IgM (hyperviscosité, cryoglobulinémie, neuropathie, Raynaud). Incidence ≈ 0,5/100 000/an, adulte après 60 ans, sex-ratio H/F ≈ 2-2,5.",
    premiere_intention: ["Électrophorèse des protéines sériques : pic monoclonal IgM (souvent κ) + baisse des Ig polyclonales ; immunofixation pour typer", "Hémogramme : anémie normochrome normocytaire arégénérative, thrombopénie (~40 %), ± hyperlymphocytose (~40 %) ; frottis en rouleaux", "VS très augmentée, hyperprotidémie", "Myélogramme : infiltration lymphoplasmocytaire polymorphe > 20 %"],
    causes: [
      { cause: "Pic monoclonal IgM", signe: "IgM monoclonale (souvent κ), baisse des Ig polyclonales", examens: ["EPP, immunofixation", "Dosage pondéral des Ig"] },
      { cause: "Syndrome d'hyperviscosité", signe: "troubles neurologiques et visuels, céphalées, hémorragies muqueuses", examens: ["Fond d'œil", "Viscosité sérique"] },
      { cause: "Cryoglobulinémie (~15 %)", signe: "syndrome de Raynaud, purpura, acrosyndrome", examens: ["Recherche de cryoglobuline (prélèvement à 37 °C)"] },
      { cause: "Atteinte rénale / chaînes légères (~50 %)", signe: "protéinurie de Bence Jones", examens: ["Protéinurie de Bence Jones", "Électrophorèse des protéines urinaires"] },
      { cause: "Infiltration médullaire", signe: "infiltration polymorphe > 20 % (lymphocytes, lymphoplasmocytes, plasmocytes)", examens: ["Myélogramme / BOM", "Phosphatase acide tartrate-résistante (cytochimie)"] }
    ],
    tableaux: [
      { titre: "Anomalies biologiques caractéristiques",
        entetes: ["Examen", "Anomalie"],
        lignes: [
          ["Électrophorèse", "Pic monoclonal IgM (souvent κ) + ↓ des Ig polyclonales"],
          ["VS / protides", "VS ↑↑, hyperprotidémie"],
          ["Hémogramme", "Anémie normochrome normocytaire arégénérative, thrombopénie (40 %), ± hyperlymphocytose (40 %)"],
          ["Frottis", "Hématies en rouleaux (rouleau-formation)"],
          ["Cytochimie", "Phosphatase acide tartrate-résistante"],
          ["Urines", "Protéinurie de Bence Jones (50 %)"],
          ["Autres", "Cryoglobuline (15 %)"],
          ["Myélogramme", "Infiltration lymphoplasmocytaire polymorphe > 20 %"]
        ] },
      { titre: "Waldenström vs myélome multiple",
        entetes: ["", "Waldenström", "Myélome multiple"],
        lignes: [
          ["Immunoglobuline", "IgM monoclonale", "IgG ou IgA (ou chaînes légères)"],
          ["Cellule", "Lymphoplasmocyte", "Plasmocyte"],
          ["Os", "Pas de lésion lytique typique", "Lésions lytiques, hypercalcémie"],
          ["Particularité", "Hyperviscosité, cryoglobuline", "Insuffisance rénale, douleurs osseuses"]
        ] }
    ],
    red_flags: ["Syndrome d'hyperviscosité symptomatique (troubles neuro/visuels, hémorragies) → urgence (plasmaphérèse)", "Anémie sévère ou cytopénies profondes", "Neuropathie périphérique, cryoglobulinémie symptomatique"],
    conduite: ["Diagnostic : IgM monoclonale + infiltration médullaire lymphoplasmocytaire (> 20 %).", "Distinguer du myélome (IgG/IgA, plasmocytes, lésions osseuses) : Waldenström = IgM, lymphoplasmocyte, hyperviscosité.", "Formes asymptomatiques : surveillance ; traiter si symptômes (hyperviscosité, cytopénies, AEG).", "Hyperviscosité symptomatique : plasmaphérèse en urgence, puis traitement spécifique (rituximab ± chimiothérapie, inhibiteurs de BTK)."]
  },
  {
    id: "myelome", num: 74, anomalie: "Myélome multiple (maladie de Kahler)",
    specialite: "Hématologie",
    definition: "Prolifération plasmocytaire monoclonale médullaire sécrétant une immunoglobuline (le plus souvent IgG) ou des chaînes légères. Manifestations : douleurs osseuses / fractures spontanées, atteinte rénale, hypercalcémie, anémie, AEG, troubles neuro/visuels. Incidence ≈ 4/100 000/an, âge médian 65-70 ans.",
    premiere_intention: ["Électrophorèse + immunofixation des protéines sériques : pic monoclonal + baisse des Ig polyclonales", "Dosage des chaînes légères libres sériques ; protéinurie de Bence Jones (chaînes légères urinaires)", "Retentissement : calcémie, créatinine (DFG), NFS (anémie ± thrombopénie), frottis en rouleaux", "Myélogramme : plasmocytose > 10 % (morphologie ± atypique), complété par BOM ; immunophénotypage CD138+ / CD38+ / CD56+ / CD19−"],
    causes: [
      { cause: "Atteinte osseuse", signe: "douleurs osseuses, fractures spontanées, lésions lytiques, hypercalcémie", examens: ["TDM faible dose / IRM / TEP corps entier", "Calcémie"] },
      { cause: "Atteinte rénale", signe: "insuffisance rénale (tubulopathie à chaînes légères, hypercalcémie)", examens: ["Créatinine, DFG", "Protéinurie de Bence Jones"] },
      { cause: "Atteinte hématologique", signe: "anémie ± thrombopénie (infiltration médullaire) ; frottis en rouleaux ± quelques plasmocytes", examens: ["NFS, frottis", "Myélogramme / BOM"] },
      { cause: "Composant monoclonal", signe: "gammapathie monoclonale (IgG/IgA), baisse des Ig polyclonales", examens: ["EPP, immunofixation", "Chaînes légères libres sériques"] }
    ],
    tableaux: [
      { titre: "Atteintes d'organe évocatrices (CRAB)",
        entetes: ["Critère", "Manifestation"],
        lignes: [
          ["C — Calcémie", "Hypercalcémie"],
          ["R — Rein", "Insuffisance rénale (créatinine ↑)"],
          ["A — Anémie", "Anémie (± thrombopénie)"],
          ["B — os (Bone)", "Lésions lytiques, douleurs, fractures"]
        ] },
      { titre: "Type de composant monoclonal",
        entetes: ["Isotype", "Fréquence"],
        lignes: [
          ["IgG", "60-65 %"],
          ["IgA", "20 %"],
          ["Chaînes légères seules (κ ou λ)", "15 %"]
        ] },
      { titre: "Facteurs pronostiques",
        entetes: ["Domaine", "Marqueurs"],
        lignes: [
          ["Biologie", "β2-microglobuline, albumine (ISS), LDH, CRP"],
          ["Cytogénétique", "t(4;14), délétion 17p, délétion 13"],
          ["Tumeur", "Importance du pic d'Ig et de la protéinurie de Bence Jones, morphologie plasmocytaire, indice cinétique"],
          ["Classification", "Durie et Salmon ; ISS / R-ISS"]
        ] }
    ],
    red_flags: ["Hypercalcémie symptomatique (confusion, déshydratation) → urgence", "Insuffisance rénale aiguë (tubulopathie à chaînes légères, hypercalcémie)", "Compression médullaire (douleur rachidienne + déficit neurologique) → urgence", "Anémie sévère, infections récidivantes (immunodépression)"],
    conduite: ["Diagnostic : plasmocytose médullaire monoclonale + composant monoclonal + atteinte d'organe (CRAB).", "Distinguer du MGUS (asymptomatique, pic faible, plasmocytose < 10 %) et de Waldenström (IgM).", "Bilan d'extension osseuse (TDM faible dose / IRM / TEP) ; pronostic par ISS/R-ISS et cytogénétique.", "Prise en charge spécialisée ; traiter l'hypercalcémie et la douleur, prévenir les complications osseuses (biphosphonates) et rénales."]
  },
  {
    id: "tricholeucocytes", num: 75, anomalie: "Leucémie à tricholeucocytes",
    specialite: "Hématologie",
    definition: "Syndrome lymphoprolifératif B chronique rare (≈ 2 % des leucémies de l'adulte), à prédominance masculine. Triade : splénomégalie, cytopénies (avec MONOCYTOPÉNIE caractéristique), tricholeucocytes circulants. Mutation BRAF V600E quasi constante.",
    premiere_intention: ["Hémogramme : pancytopénie — anémie normochrome normocytaire arégénérative, thrombopénie, leuconeutropénie et MONOCYTOPÉNIE (évocatrice)", "Frottis : tricholeucocytes (1-25 %) à contour chevelu", "Immunophénotypage : profil B (CD19/20/22), CD25+, CD103+, CD11c+, CD123+, annexine A1+, Ig de surface fortement exprimée ; CD5−/CD23−/CD10−, score de Matutes 0-1", "Cytochimie : phosphatase acide tartrate-résistante (TRAP) ; BOM (myélofibrose réticulinique, ponction médullaire souvent blanche) ; mutation BRAF V600E"],
    causes: [
      { cause: "Leucémie à tricholeucocytes", signe: "monocytopénie, tricholeucocytes chevelus, CD25/CD103/CD11c/CD123/annexine A1+, TRAP+, BRAF V600E", examens: ["Immunophénotypage", "BOM, TRAP", "Recherche BRAF V600E"] },
      { cause: "Lymphome splénique de la zone marginale", signe: "splénomégalie, lymphocytes villeux ; CD103−, annexine A1−", examens: ["Immunophénotypage", "BOM"] },
      { cause: "LLC / autre syndrome lymphoprolifératif B", signe: "CD5+, score de Matutes 4-5 (LLC)", examens: ["Immunophénotypage (score de Matutes)"] }
    ],
    tableaux: [
      { titre: "Morphologie du tricholeucocyte (frottis)",
        entetes: ["Caractère", "Description"],
        lignes: [
          ["Taille / proportion", "12-25 µm ; 1-25 % des éléments"],
          ["Rapport nucléo-cytoplasmique", "0,5-0,7"],
          ["Noyau", "Arrondi, ovalaire, encoché ou réniforme ; sans nucléole ; chromatine fine"],
          ["Cytoplasme", "Faiblement basophile, contour irrégulier à prolongements (aspect chevelu)"],
          ["Granulations", "Généralement absentes"]
        ] },
      { titre: "Immunophénotype",
        entetes: ["Positifs", "Négatifs"],
        lignes: [
          ["CD19, CD20, CD22, HLA-DR", "CD5"],
          ["CD25, CD103, CD11c, CD123", "CD23"],
          ["Annexine A1 ; Ig de surface fortement exprimée", "CD10"]
        ] }
    ],
    red_flags: ["Neutropénie et monocytopénie → infections (parfois atypiques / mycobactéries) : vigilance en cas de fièvre", "Cytopénies profondes (anémie, thrombopénie) symptomatiques", "Splénomégalie volumineuse"],
    conduite: ["Évoquer devant splénomégalie + pancytopénie avec MONOCYTOPÉNIE et tricholeucocytes circulants.", "Confirmer : immunophénotype (CD103/CD25/CD11c/annexine A1), TRAP, BOM (myélofibrose, moelle souvent inaspirable), mutation BRAF V600E.", "Distinguer du lymphome splénique de la zone marginale (CD103−, annexine A1−).", "Prise en charge spécialisée : analogues des purines (cladribine, pentostatine) ; abstention si asymptomatique."]
  },
  {
    id: "lmc", num: 76, anomalie: "Leucémie myéloïde chronique (LMC)",
    specialite: "Hématologie",
    definition: "Syndrome myéloprolifératif chronique lié à la fusion BCR-ABL (chromosome Philadelphie, t(9;22)). Splénomégalie + hyperleucocytose avec myélémie. Évolution possible en 3 phases (chronique → accélérée → transformation aiguë). Incidence 1-2/100 000/an, âge médian 30-50 ans, sex-ratio H/F ≈ 1,1-1,2.",
    premiere_intention: ["Hémogramme : hyperleucocytose franche, MYÉLÉMIE marquée (toutes les formes granuleuses), basophilie ± éosinophilie, ± thrombocytose", "Myélogramme : moelle très riche, prédominance granuleuse SANS blocage de maturation, mégacaryocytes nombreux et petits", "Caryotype : chromosome Philadelphie t(9;22) ; biologie moléculaire BCR-ABL (RT-PCR)", "Biochimie : hyperuricémie, LDH ↑, vitamine B12 ↑"],
    causes: [
      { cause: "Leucémie myéloïde chronique", signe: "myélémie + basophilie, splénomégalie, BCR-ABL / Ph1 positif", examens: ["Caryotype (Ph1)", "BCR-ABL (RT-PCR)"] },
      { cause: "Réaction leucémoïde", signe: "infection/inflammation, pas de basophilie, BCR-ABL négatif", examens: ["CRP, contexte", "BCR-ABL négatif"] },
      { cause: "Autres SMP (Ph1 négatifs)", signe: "polyglobulie de Vaquez, thrombocytémie essentielle, myélofibrose primitive", examens: ["JAK2 V617F, CALR, MPL", "BOM"] }
    ],
    tableaux: [
      { titre: "Hémogramme évocateur",
        entetes: ["Paramètre", "Anomalie"],
        lignes: [
          ["Leucocytes", "Hyperleucocytose franche"],
          ["Myélémie", "+++ (myélocytes, métamyélocytes, PNN…)"],
          ["Basophiles / éosinophiles", "Basophilie ± éosinophilie"],
          ["Plaquettes", "± thrombocytose"],
          ["Biochimie", "Hyperuricémie, LDH ↑, vitamine B12 ↑"]
        ] },
      { titre: "Phases évolutives",
        entetes: ["Phase", "Caractéristiques"],
        lignes: [
          ["Chronique", "Forme habituelle au diagnostic, bonne réponse au traitement"],
          ["Accélérée", "Blastes 10-19 %, basophilie ≥ 20 %, cytopénies/thrombocytose réfractaires"],
          ["Transformation aiguë (blastique)", "Blastes ≥ 20 % : leucémie aiguë (myéloïde ou lymphoïde)"]
        ] }
    ],
    red_flags: ["Hyperleucocytose majeure avec leucostase (troubles neuro/visuels, priapisme, détresse respiratoire) → urgence", "Phase accélérée / transformation blastique (blastes en augmentation, basophilie, cytopénies)", "Syndrome de lyse (hyperuricémie) en début de traitement"],
    conduite: ["Diagnostic = SMP avec myélémie + chromosome Philadelphie / BCR-ABL.", "Confirmer par caryotype (Ph1) et RT-PCR BCR-ABL (référence pour le suivi de la réponse moléculaire).", "Traitement par inhibiteurs de tyrosine kinase (imatinib et suivants) — pronostic transformé.", "Surveiller la réponse moléculaire ; rechercher un passage en phase accélérée/blastique."]
  },
  {
    id: "vaquez", num: 77, anomalie: "Polyglobulie de Vaquez (maladie de Vaquez)",
    specialite: "Hématologie",
    definition: "Syndrome myéloprolifératif chronique JAK2+ avec production excessive de globules rouges (± leucocytes / plaquettes). Risque thrombo-hémorragique. Incidence 3-5/100 000/an, âge médian ~60 ans, plus fréquente chez l'homme.",
    premiere_intention: ["Confirmer la polyglobulie vraie : Hte/Hb élevés (H : Hte > 54 %, Hb > 18 g/dL ; F : Hte > 47 %, Hb > 17 g/dL) ± hyperleucocytose ± thrombocytose", "Mutation JAK2 (V617F) — critère majeur", "EPO sérique (typiquement basse/normale) pour éliminer une polyglobulie secondaire", "Selon les cas : volume globulaire isotopique, BOM (hyperplasie, mégacaryocytes), pousse spontanée des progéniteurs érythroïdes"],
    causes: [
      { cause: "Polyglobulie de Vaquez (primitive)", signe: "JAK2+, EPO basse, splénomégalie, prurit aquagénique, érythrose cutanéo-muqueuse", examens: ["JAK2 V617F", "EPO sérique (basse)"] },
      { cause: "Polyglobulie secondaire", signe: "hypoxie chronique (BPCO, SAOS, altitude, tabac) ou tumeur sécrétant l'EPO (rein…), EPO élevée", examens: ["EPO sérique (élevée)", "Gaz du sang / SaO2, imagerie rénale"] },
      { cause: "Fausse polyglobulie (hémoconcentration)", signe: "déshydratation, syndrome de Gaisböck ; volume globulaire normal", examens: ["Volume globulaire isotopique", "Contexte clinique"] }
    ],
    tableaux: [
      { titre: "Seuils hématologiques (polyglobulie)",
        entetes: ["", "Homme", "Femme"],
        lignes: [
          ["Hématocrite", "> 54 %", "> 47 %"],
          ["Hémoglobine", "> 18 g/dL", "> 17 g/dL"],
          ["Globules rouges", "> 6 T/L", "> 5,5 T/L"],
          ["Volume globulaire total", "> 36 mL/kg", "> 32 mL/kg"]
        ] },
      { titre: "Arguments biologiques en faveur de Vaquez",
        entetes: ["Examen", "Résultat"],
        lignes: [
          ["JAK2", "Mutation V617F (critère majeur)"],
          ["EPO sérique", "Basse ou normale"],
          ["Progéniteurs érythroïdes", "Pousse spontanée in vitro"],
          ["VS", "Diminuée"],
          ["Autres", "LDH ↑, uricémie ↑, TS ↑, PAL leucocytaires > 100"],
          ["SaO2", "> 92 % (pas d'hypoxie)"],
          ["Moelle (BOM)", "Hyperplasie, excès de mégacaryocytes ; myélofibrose tardive"]
        ] }
    ],
    red_flags: ["Complications thrombotiques (AVC, IDM, thrombose veineuse, Budd-Chiari) ou hémorragiques", "Hématocrite très élevé → hyperviscosité (céphalées, troubles visuels, vertiges)", "Transformation : myélofibrose secondaire, leucémie aiguë"],
    conduite: ["Affirmer la polyglobulie vraie (volume globulaire) puis primitive (JAK2+, EPO basse) vs secondaire (EPO élevée, hypoxie).", "Objectif : hématocrite < 45 % (saignées) ; aspirine à faible dose ; cytoréduction (hydroxyurée) selon le risque.", "Contrôler les facteurs de risque vasculaire ; surveiller la transformation.", "Le prurit aquagénique et l'érythrose sont évocateurs."]
  },
  {
    id: "thrombocytemie_essentielle", num: 78, anomalie: "Thrombocytémie essentielle",
    specialite: "Hématologie",
    definition: "Syndrome myéloprolifératif chronique avec thrombocytose persistante d'origine clonale (souvent JAK2+, parfois CALR/MPL). Souvent asymptomatique ; risque thrombotique (artériel ++) et hémorragique, ± splénomégalie. Incidence 1-2,5/100 000/an, âge médian ~50-60 ans, sex-ratio H/F ≈ 1.",
    premiere_intention: ["Confirmer une thrombocytose persistante : plaquettes > 600 G/L vérifiées à 2 reprises à ≥ 2 mois d'intervalle", "Éliminer une thrombocytose réactionnelle (cause la plus fréquente)", "Biologie moléculaire : JAK2 V617F (puis CALR, MPL) ; étude de la clonalité", "BOM : mégacaryocytes nombreux, de grande taille, hypersegmentés (« ramure de cerf »), sans fibrose"],
    causes: [
      { cause: "Thrombocytémie essentielle (clonale)", signe: "JAK2+ (ou CALR/MPL), thrombocytose persistante, mégacaryocytes en ramure de cerf", examens: ["JAK2 V617F / CALR / MPL", "BOM", "Clonalité, PRV-1, pousse spontanée des progéniteurs, TPO"] },
      { cause: "Thrombocytose réactionnelle", signe: "carence martiale, inflammation/infection, cancer, post-splénectomie, rebond après thrombopénie, stress", examens: ["Ferritine, CRP", "Contexte clinique"] },
      { cause: "Autre syndrome myéloprolifératif", signe: "polyglobulie de Vaquez (Hte élevé), LMC (Ph1+), myélofibrose", examens: ["Hémogramme, JAK2 / BCR-ABL", "BOM"] }
    ],
    tableaux: [
      { titre: "Critères diagnostiques",
        entetes: ["Type", "Critère"],
        lignes: [
          ["Base", "Plaquettes > 600 G/L > 2 mois + mutation JAK2"],
          ["Complémentaire", "Pas de cause de thrombocytose réactionnelle"],
          ["Complémentaire", "Hématocrite < 51 % (homme) ou < 47 % (femme)"],
          ["Complémentaire", "Bilan martial normal"],
          ["Complémentaire", "BOM : absence de fibrose"],
          ["Complémentaire", "Absence de Ph1 / réarrangement BCR-ABL"],
          ["Complémentaire", "Pas de signe cytogénétique ou morphologique de SMD"]
        ] },
      { titre: "Causes de thrombocytose réactionnelle",
        entetes: ["Catégorie", "Exemples"],
        lignes: [
          ["Carence", "Carence en fer"],
          ["Inflammation / infection", "Pathologies inflammatoires et infectieuses"],
          ["Néoplasie", "État cancéreux sous-jacent"],
          ["Hématologique", "Rebond après thrombopénie ; suite immédiate de splénectomie"],
          ["Divers", "Stress"]
        ] }
    ],
    red_flags: ["Accidents thrombotiques (artériels ++ : AVC, IDM, ischémie) ou hémorragiques", "Thrombocytose extrême → risque hémorragique paradoxal (maladie de Willebrand acquise)", "Transformation : myélofibrose, leucémie aiguë"],
    conduite: ["Affirmer une thrombocytose clonale persistante et éliminer une cause réactionnelle (ferritine, CRP, contexte).", "Pseudo-hyperkaliémie possible (libération plaquettaire) — recontrôler la kaliémie sur plasma.", "Évaluer le risque thrombotique (âge, ATCD, JAK2) ; aspirine à faible dose ; cytoréduction (hydroxyurée) selon le risque.", "Surveiller la transformation (myélofibrose, LAM)."]
  },
  {
    id: "myelofibrose", num: 79, anomalie: "Splénomégalie myéloïde chronique (myélofibrose primitive)",
    specialite: "Hématologie",
    definition: "Syndrome myéloprolifératif chronique (JAK2+, Ph1 négatif) avec fibrose médullaire progressive et hématopoïèse extra-médullaire (splénomégalie). Tableau d'érythromyélémie avec dacryocytes. Incidence 0,5-1,5/100 000/an, âge médian 67 ans, sex-ratio H/F ≈ 1.",
    premiere_intention: ["Hémogramme : anémie normochrome normocytaire ; érythromyélémie (myélémie + érythroblastes + blastes) ; plaquettes variables (N, ↑ ou ↓)", "Frottis : dacryocytes (hématies en larme), anisopoïkilocytose, érythroblastes (5-20 %), macroplaquettes, noyaux de mégacaryocytes circulants, anneaux de Cabot", "BOM (indispensable) : fibrose médullaire ; moelle souvent inaspirable", "Biologie moléculaire : JAK2 V617F (ou CALR/MPL) ; chromosome Ph1 NÉGATIF"],
    causes: [
      { cause: "Myélofibrose primitive", signe: "dacryocytes + érythromyélémie, splénomégalie, JAK2+ / Ph1−, fibrose à la BOM", examens: ["BOM", "JAK2 / CALR / MPL"] },
      { cause: "Myélofibrose secondaire", signe: "évolution d'une autre SMP (Vaquez, thrombocytémie essentielle), envahissement néoplasique, toxique", examens: ["Antériorité hématologique", "BOM"] },
      { cause: "Autre splénomégalie / érythromyélémie", signe: "envahissement médullaire (métastases, lymphome), infections graves", examens: ["BOM", "Imagerie, contexte"] }
    ],
    tableaux: [
      { titre: "Frottis sanguin évocateur",
        entetes: ["Élément", "Anomalie"],
        lignes: [
          ["Hématies", "Anisopoïkilocytose, dacryocytes (en larme), anneaux de Cabot"],
          ["Érythroblastes", "5-20 % (érythromyélémie)"],
          ["Lignée granuleuse", "Myélémie, polynucléose, quelques blastes"],
          ["Plaquettes", "Macroplaquettes, noyaux de mégacaryocytes circulants"]
        ] },
      { titre: "Stades histologiques (BOM)",
        entetes: ["Stade", "Histologie"],
        lignes: [
          ["I", "Forme hyperplasique, réticuline augmentée"],
          ["II", "Fibrose collagène mutilante"],
          ["III", "Ostéomyélosclérose"]
        ] }
    ],
    red_flags: ["Cytopénies sévères (anémie transfusion-dépendante, thrombopénie, neutropénie → infections/saignements)", "Splénomégalie volumineuse compliquée (infarctus splénique, hypertension portale)", "Transformation en leucémie aiguë", "Altération de l'état général marquée (fièvre, sueurs, amaigrissement)"],
    conduite: ["Évoquer devant splénomégalie + érythromyélémie avec dacryocytes ; confirmer par BOM (fibrose) et biologie moléculaire (JAK2+, Ph1−).", "Distinguer myélofibrose primitive vs secondaire (évolution d'une Vaquez/TE) et des autres envahissements médullaires.", "Évaluer le pronostic (scores type IPSS/DIPSS) ; prise en charge spécialisée.", "Traitements : soutien (transfusions), inhibiteurs de JAK (ruxolitinib), allogreffe dans les formes à haut risque."]
  },
  {
    id: "lal", num: 80, anomalie: "Leucémie aiguë lymphoïde (LAL)",
    specialite: "Hématologie",
    definition: "Prolifération clonale de précurseurs lymphoïdes (lymphoblastes) envahissant la moelle. URGENCE diagnostique. Deux pics : enfant (2-10 ans, 75 %) et adulte > 50 ans. Incidence 1,5/100 000/an, sex-ratio H/F ≈ 1,3.",
    premiere_intention: ["Hémogramme : pancytopénie (anémie normochrome normocytaire arégénérative, neutropénie, thrombopénie) ; blastose circulante très variable (0 → 100 G/L)", "Myélogramme (urgent) : moelle riche, blastose médullaire > 90 % (parfois moelle hypocellulaire/fibreuse ~10 %)", "Immunophénotypage : LAL B (85 %, ≥ 2 marqueurs parmi CD19, CD22, cCD79a) ou LAL T (cCD3+)", "Cytogénétique / biologie moléculaire : Ph1 (t(9;22)), t(4;11)(11q23)… ; ponction lombaire (atteinte méningée)"],
    causes: [
      { cause: "LAL B (85 %)", signe: "≥ 2 marqueurs parmi CD19, CD22, cCD79a ; stades EGIL B-I à B-IV (B commune CD10+ = 60 %)", examens: ["Immunophénotypage", "Cytogénétique (Ph1, t(4;11))"] },
      { cause: "LAL T (cCD3+)", signe: "expression du cCD3 ; stades T-I à T-IV ; souvent masse médiastinale, hyperleucocytose", examens: ["Immunophénotypage", "Imagerie thoracique"] },
      { cause: "Diagnostic différentiel", signe: "LAM (myéloperoxydase+, corps d'Auer), syndrome mononucléosique, aplasie médullaire", examens: ["Cytochimie (MPO)", "Immunophénotypage"] }
    ],
    tableaux: [
      { titre: "LAL B — classification EGIL",
        entetes: ["Stade", "CD10", "Cµ", "sIg"],
        lignes: [
          ["B-I (pro-B)", "−", "−", "−"],
          ["B-II (B commune, 60 %)", "+", "−", "−"],
          ["B-III (pré-B)", "±", "+", "−"],
          ["B-IV (B mature)", "±", "±", "+"]
        ] },
      { titre: "LAL T (cCD3+) — classification EGIL",
        entetes: ["Stade", "CD7", "CD2/CD5/CD8", "CD1a", "sCD3"],
        lignes: [
          ["T-I (pro-T)", "+", "−", "−", "−"],
          ["T-II (pré-T)", "+", "≥ 1 positif", "−", "−"],
          ["T-III (thymocytes communs)", "±", "≥ 1 (CD4+ et CD8+)", "+", "±"],
          ["T-IV (T mature)", "±", "≥ 1 (CD4+ ou CD8+)", "−", "+"]
        ] },
      { titre: "Syndrome de lyse tumorale (surtout Burkitt)",
        entetes: ["Paramètre", "Variation"],
        lignes: [
          ["Potassium", "↑"],
          ["Phosphate", "↑"],
          ["Uricémie", "↑"],
          ["Calcium", "↓"],
          ["Créatininémie", "↑ (insuffisance rénale)"]
        ] }
    ],
    red_flags: ["Urgence : pancytopénie fébrile (neutropénie → sepsis), syndrome hémorragique (thrombopénie / CIVD)", "Syndrome de lyse tumorale (surtout Burkitt) : K ↑, phosphate ↑, uricémie ↑, Ca ↓, IRA", "Hyperleucocytose majeure (leucostase) ; atteinte neuroméningée", "Masse médiastinale (LAL T) → compression"],
    conduite: ["Suspicion de leucémie aiguë = urgence : avis hématologique immédiat et myélogramme.", "Prévenir/traiter le syndrome de lyse (hyperhydratation, hypo-uricémiants) dans les formes prolifératives (Burkitt).", "Bilan : immunophénotype, cytogénétique (Ph1 → inhibiteur de tyrosine kinase), ponction lombaire (atteinte méningée).", "Prise en charge spécialisée (chimiothérapie, ± TKI si Ph1+, allogreffe selon le risque)."]
  },
  {
    id: "lam", num: 81, anomalie: "Leucémie aiguë myéloïde (LAM)",
    specialite: "Hématologie",
    definition: "Prolifération clonale de blastes myéloïdes envahissant la moelle (blastose ≥ 20 %). URGENCE diagnostique. Incidence ≈ 3/100 000/an, âge médian ~60 ans.",
    premiere_intention: ["Hémogramme : pancytopénie (anémie normochrome normocytaire arégénérative, neutropénie, thrombopénie) ; blastose circulante variable (0 → 100 G/L) ± monocytose / basophilie / éosinophilie", "Myélogramme (urgent) : moelle riche, blastose médullaire 20-100 %", "Cytochimie : myéloperoxydase (MPO+), estérases non spécifiques (composante monocytaire) ; immunophénotypage, cytogénétique / biologie moléculaire", "Rechercher une CIVD (surtout LAM 3) ; ponction lombaire si atteinte méningée"],
    causes: [
      { cause: "Leucémie aiguë myéloïde", signe: "blastes myéloïdes MPO+, corps d'Auer, blastose médullaire ≥ 20 %", examens: ["Myélogramme, MPO", "Immunophénotypage, cytogénétique"] },
      { cause: "LAM 3 (promyélocytaire)", signe: "promyélocytes hypergranuleux, fagots de corps d'Auer, CIVD ; t(15;17) → urgence (ATRA)", examens: ["Recherche de CIVD", "t(15;17) / PML-RARA"] },
      { cause: "Diagnostic différentiel", signe: "LAL (MPO−), syndrome myélodysplasique, réaction leucémoïde", examens: ["Cytochimie, immunophénotype"] }
    ],
    tableaux: [
      { titre: "Classification FAB",
        entetes: ["Type", "Description (fréquence)"],
        lignes: [
          ["LAM 0", "Sans différenciation (2 %)"],
          ["LAM 1", "Peu différenciée (20 %)"],
          ["LAM 2", "Avec différenciation (30 %) : corps d'Auer"],
          ["LAM 3", "Promyélocytaire (10 %) : hypergranuleux, fagots de corps d'Auer → CIVD"],
          ["LAM 3 variant", "Hyperleucocytaire, hypogranuleux, noyau bilobé"],
          ["LAM 4", "Myélo-monocytaire (15 %) : monocytose sang > 5 G/L, moelle > 20 %"],
          ["LAM 5", "Monoblastique (15 %) : monocytose médullaire > 15 %"],
          ["LAM 6", "Érythroleucémie (5 %) : > 50 % d'érythroblastes"],
          ["LAM 7", "Mégacaryocytaire (2 %)"]
        ] },
      { titre: "Cytochimie / orientation",
        entetes: ["Marqueur", "Signification"],
        lignes: [
          ["Myéloperoxydase (MPO)", "Lignée granuleuse (LAM) ; négatif dans la LAL"],
          ["Estérases non spécifiques", "Composante monocytaire (LAM 4 / 5)"],
          ["Corps d'Auer", "Spécifiques de la lignée myéloïde"]
        ] }
    ],
    red_flags: ["Urgence : neutropénie fébrile (sepsis), syndrome hémorragique / CIVD (surtout LAM 3)", "LAM 3 promyélocytaire = urgence (CIVD) → ATRA sans attendre", "Hyperleucocytose majeure → leucostase (détresse respiratoire, troubles neurologiques)", "Syndrome de lyse tumorale", "Hypertrophie gingivale / leucémides (formes monocytaires)"],
    conduite: ["Suspicion de leucémie aiguë = urgence : avis hématologique immédiat et myélogramme.", "MPO+ et corps d'Auer orientent vers la LAM (vs LAL, MPO−).", "LAM 3 (t(15;17), PML-RARA) : rechercher et traiter la CIVD, débuter l'ATRA sans délai.", "Bilan : immunophénotype, cytogénétique / biologie moléculaire (pronostic) ; prévenir le syndrome de lyse ; prise en charge spécialisée."]
  },
  {
    id: "smd", num: 82, anomalie: "Syndromes myélodysplasiques (SMD)",
    specialite: "Hématologie",
    definition: "Hémopathies clonales de la cellule souche : hématopoïèse inefficace → cytopénie(s) réfractaire(s) + dysplasie médullaire, avec blastose < 20 % (≥ 20 % = LAM). Risque de transformation en LAM. Touche surtout le sujet âgé.",
    premiere_intention: ["Hémogramme : cytopénie(s) réfractaire(s) (anémie souvent macrocytaire arégénérative ± neutropénie ± thrombopénie)", "Frottis : signes de dysplasie ; compter les blastes ; éliminer carences (B12/folates), alcool, médicaments, causes réactionnelles", "Myélogramme : dysplasie ≥ 1 lignée, % de blastes, sidéroblastes en couronne (coloration de Perls), recherche de corps d'Auer", "Caryotype médullaire (ex. délétion 5q) ; classer (OMS) et stratifier le pronostic (IPSS-R)"],
    causes: [
      { cause: "SMD (clonal)", signe: "cytopénie réfractaire + dysplasie, blastes < 20 %, anomalie cytogénétique (5q−…)", examens: ["Myélogramme + coloration de Perls", "Caryotype médullaire"] },
      { cause: "Cytopénie réactionnelle / carentielle", signe: "carence B12/folates, alcool, médicaments, infection, toxique", examens: ["B12, folates", "Bilan d'élimination"] },
      { cause: "Excès de blastes ≥ 20 %", signe: "leucémie aiguë myéloïde (au-delà du cadre SMD)", examens: ["Myélogramme", "Immunophénotypage"] }
    ],
    tableaux: [
      { titre: "Classification OMS des SMD",
        entetes: ["Classification OMS", "Sang", "Moelle"],
        lignes: [
          ["Anémie réfractaire (AR)", "Blastes absents ou < 1 % ; anémie", "Blastes < 5 % ; dysérythropoïèse (< 15 % de sidéroblastes en couronne)"],
          ["AR avec sidéroblastes en couronne (ARSI)", "Blastes absents ; anémie", "Blastes < 5 % ; dysérythropoïèse pure, > 15 % de sidéroblastes en couronne"],
          ["Cytopénie réfractaire avec dysplasie multilignée (CRDM)", "Blastes absents ou < 1 % ; pas de corps d'Auer ; monocytes < 1 G/L ; bi- ou pancytopénie", "Blastes < 5 % ; dysplasie > 10 % des cellules d'au moins 2 lignées ; < 15 % de sidéroblastes en couronne"],
          ["CRDM avec sidéroblastes en couronne (CRDM-SC)", "Blastes absents ou < 1 % ; pas de corps d'Auer ; monocytes < 1 G/L ; bi- ou pancytopénie", "Blastes < 5 % ; dysplasie > 10 % des cellules d'au moins 2 lignées ; ≥ 15 % de sidéroblastes en couronne"],
          ["AR avec excès de blastes type 1 (AREB-1)", "Blastes < 5 % ; pas de corps d'Auer ; monocytes < 1 G/L ; cytopénies", "Blastes 5-10 % ; pas de corps d'Auer ; dysplasie d'une ou plusieurs lignées"],
          ["AR avec excès de blastes type 2 (AREB-2)", "Blastes 5-19 % ; corps d'Auer possible ; monocytes < 1 G/L ; cytopénies", "Blastes 10-19 % ; corps d'Auer possible ; dysplasie d'une ou plusieurs lignées"],
          ["SMD inclassable (SMD-U)", "Blastes absents ou < 1 % ; cytopénies", "Blastes < 5 % ; pas de corps d'Auer ; dysplasie sur une seule lignée (granulocytaire ou mégacaryocytaire)"],
          ["SMD avec délétion 5q− isolée", "Blastes absents ou < 1 % ; anémie ; plaquettes N ou ↑", "Blastes < 5 % ; pas de corps d'Auer ; mégacaryocytes N ou ↑ (noyau non lobé) ; del 5(q21;q32)"]
        ] }
    ],
    red_flags: ["Excès de blastes (AREB-2, blastes 10-19 %) : risque élevé de transformation en LAM", "Présence de corps d'Auer (forme à excès de blastes)", "Cytopénies profondes : neutropénie fébrile, syndrome hémorragique, anémie mal tolérée", "Caryotype défavorable (IPSS-R élevé)"],
    conduite: ["Diagnostic d'élimination : exclure carences (B12/folates), alcool, médicaments, causes réactionnelles avant de retenir un SMD.", "Myélogramme avec coloration de Perls (sidéroblastes en couronne) et caryotype = indispensables.", "Classer (OMS) et stratifier le risque (IPSS-R) : conditionne la prise en charge.", "Bas risque : soutien (transfusions, EPO, chélation du fer) ; haut risque : agents hypométhylants, allogreffe ; le 5q− isolé répond au lénalidomide."]
  },
  {
    id: "lmmc", num: 83, anomalie: "Leucémie myélomonocytaire chronique (LMMC)",
    specialite: "Hématologie",
    definition: "Hémopathie clonale à la frontière SMD / SMP, définie par une monocytose sanguine persistante (> 1 G/L > 3 mois) avec dysplasie, sans chromosome Philadelphie et blastose < 20 %. Touche surtout le sujet âgé, prédominance masculine.",
    premiere_intention: ["Hémogramme : MONOCYTOSE > 1 G/L persistante (> 3 mois) ; forme dysplasique (pancytopénie) ou proliférative (hyperleucocytose)", "Frottis : anomalies morphologiques des monocytes (formes proliférantes), blastose sanguine souvent présente (parfois faible)", "Myélogramme : moelle hypercellulaire avec dysmyélopoïèse (dysgranulopoïèse, dysérythropoïèse, dysmégacaryocytopoïèse) ; blastose < 20 %", "Caryotype + biologie moléculaire ; éliminer Ph1 / BCR-ABL et les autres causes de monocytose"],
    causes: [
      { cause: "LMMC (clonale)", signe: "monocytose > 1 G/L > 3 mois + dysplasie / anomalie clonale ; Ph1 négatif ; blastes < 20 %", examens: ["Myélogramme, caryotype", "Biologie moléculaire"] },
      { cause: "Monocytose réactionnelle", signe: "infections (tuberculose, endocardite…), inflammation, cancers, sortie d'aplasie", examens: ["Bilan infectieux / inflammatoire", "Contexte clinique"] },
      { cause: "Autre hémopathie", signe: "LMC (Ph1+), LAM monocytaire (blastes ≥ 20 %), autre SMD/SMP", examens: ["BCR-ABL", "Myélogramme (blastes)"] }
    ],
    tableaux: [
      { titre: "Critères OMS (LMMC)",
        entetes: ["Critère", "Seuil / condition"],
        lignes: [
          ["Monocytose sanguine", "> 1 G/L pendant > 3 mois"],
          ["Chromosome Ph1 / BCR-ABL", "Absent"],
          ["Blastose médullaire", "< 20 % (myéloblastes + monoblastes + promonocytes)"],
          ["Dysplasie", "≥ 1 lignée ; si absente : anomalie cytogénétique clonale, monocytose réellement > 3 mois, autres causes exclues"]
        ] },
      { titre: "Formes hématologiques",
        entetes: ["Forme", "Hémogramme"],
        lignes: [
          ["Dysplasique / pancytopénique (~50 %)", "Neutropénie, anémie macrocytaire, thrombopénie, monocytose"],
          ["Proliférative", "Hyperleucocytose, monocytose, anémie, thrombopénie"]
        ] }
    ],
    red_flags: ["Excès de blastes / évolution vers une LAM", "Cytopénies profondes (infections, hémorragies, anémie mal tolérée)", "Forme proliférative avec hyperleucocytose, splénomégalie volumineuse", "Localisations extra-hématologiques (cutanées, séreuses)"],
    conduite: ["Affirmer une monocytose clonale persistante (> 1 G/L, > 3 mois) et éliminer une monocytose réactionnelle et la LMC (Ph1−).", "Myélogramme + caryotype indispensables ; apprécier dysplasie et blastose.", "Stratifier le risque (scores spécifiques LMMC) ; prise en charge spécialisée.", "Traitements : soutien, hydroxyurée (formes prolifératives), agents hypométhylants, allogreffe selon le risque."]
  },
  {
    id: "willebrand", num: 84, anomalie: "Maladie de Willebrand",
    specialite: "Hémostase",
    definition: "Maladie hémorragique constitutionnelle la plus fréquente (~1 % de la population, surtout formes frustes). Déficit quantitatif (types 1 et 3) ou qualitatif (type 2) du facteur Willebrand. Transmission autosomique dominante (sauf types 2N et 3, récessifs). Saignements cutanéo-muqueux ; rares hématomes profonds / hémarthroses.",
    premiere_intention: ["Interrogatoire +++ (score hémorragique, ATCD familiaux, saignements provoqués : chirurgie, dents de sagesse)", "Formes frustes : TS et TCA peu sensibles → doser directement l'antigène du vWF (vWF:Ag)", "Bilan : vWF:Ag, activité cofacteur de la ristocétine (vWF:RCo), facteur VIII, rapport vWF:RCo/vWF:Ag", "Typage : étude des multimères et agrégation à la ristocétine ; un syndrome inflammatoire même mineur peut masquer une forme fruste"],
    causes: [
      { cause: "Type 1 (70-80 %)", signe: "déficit quantitatif partiel ; rapport vWF:RCo/vWF:Ag ≈ 1", examens: ["vWF:Ag, vWF:RCo, FVIII"] },
      { cause: "Type 2 (15-25 %)", signe: "déficit qualitatif ; rapport vWF:RCo/vWF:Ag < 0,7 (sauf 2N)", examens: ["Multimères", "Agrégation à la ristocétine"] },
      { cause: "Type 3 (< 5 %)", signe: "déficit quantitatif sévère (vWF effondré, FVIII bas) ; transmission récessive", examens: ["vWF:Ag effondré, FVIII"] }
    ],
    tableaux: [
      { titre: "Sous-types de la maladie de Willebrand",
        entetes: ["Type", "Mécanisme", "Multimères de haut poids moléculaire"],
        lignes: [
          ["1 (70-80 %)", "Déficit quantitatif partiel", "Présents"],
          ["2A", "↓ affinité vWF–GPIb plaquettaire", "Absents"],
          ["2B", "↑ affinité vWF–GPIb (thrombopénie possible)", "Diminués"],
          ["2M", "↓ affinité vWF–GPIb plaquettaire", "Présents (tous)"],
          ["2N", "↓ affinité vWF–facteur VIII", "Présents"],
          ["3 (< 5 %)", "Déficit quantitatif sévère", "Absents (vWF effondré)"]
        ] },
      { titre: "Bilan d'hémostase",
        entetes: ["Test", "Résultat"],
        lignes: [
          ["Temps de saignement (Ivy)", "Allongé (sauf formes frustes et 2N)"],
          ["Temps d'occlusion (PFA)", "Allongé (sauf 2N)"],
          ["TCA", "Allongé (parallèle au FVIII et au TS)"],
          ["Plaquettes", "Diminuées dans le type 2B"],
          ["Facteur VIII", "Diminué"],
          ["vWF:Ag", "Diminué (sauf type 2)"],
          ["vWF:RCo (cofacteur ristocétine)", "Diminué (sauf 2N)"],
          ["Rapport vWF:RCo / vWF:Ag", "≈ 1 (types 1, 3, 2N) ; < 0,7 (type 2)"],
          ["Agrégation à faible dose de ristocétine", "Augmentée dans le type 2B"]
        ] },
      { titre: "Facteurs modifiant le vWF",
        entetes: ["Sens", "Facteurs"],
        lignes: [
          ["↑ vWF / FVIII", "Stress, exercice, inflammation, grossesse, œstroprogestatifs"],
          ["↓ vWF", "Groupe sanguin O"]
        ] }
    ],
    red_flags: ["Saignement actif ou chirurgie programmée chez un patient à risque → avis spécialisé et prévention", "Type 3 (déficit sévère) : risque d'hématomes profonds, d'hémarthroses", "Type 2B : thrombopénie (ne pas confondre avec un PTI ; desmopressine à éviter)", "Inflammation / grossesse pouvant masquer une forme fruste (faux négatif)"],
    conduite: ["Diagnostic guidé par l'interrogatoire (score hémorragique) puis dosages (vWF:Ag, vWF:RCo, FVIII, rapport).", "Typer (multimères, ristocétine) : la prise en charge en dépend — desmopressine (DDAVP) surtout efficace dans le type 1, à éviter dans le type 2B (aggrave la thrombopénie).", "Concentrés de vWF (± FVIII) dans les formes sévères ou avant un geste à risque ; éviter aspirine / AINS.", "Recontrôler à distance d'un épisode inflammatoire pour ne pas méconnaître une forme fruste."]
  },
  {
    id: "bilan_coagulation", num: 85, anomalie: "Anomalie du bilan de coagulation (démarche)",
    specialite: "Hémostase",
    definition: "Démarche d'interprétation d'un bilan d'hémostase anormal. Le TP explore la voie extrinsèque + commune (VII, X, V, II, fibrinogène), le TCA la voie intrinsèque + commune (système contact PK/KHPM, XII, XI, IX, VIII + commune), le TT/temps de reptilase la fibrinoformation. Facteurs vitamine K-dépendants : II, VII, IX, X (et protéines C et S).",
    premiere_intention: ["Vérifier le préanalytique : absence de caillot, hématocrite 30-56 %, délai prélèvement-analyse < 4 h, tube correctement rempli", "Identifier le profil : TP abaissé isolé / TCA allongé isolé / TCA allongé + TP abaissé", "Devant un TCA allongé isolé : test de correction (indice de Rosner) — corrige (déficit) vs ne corrige pas (anticoagulant circulant)", "Confronter au contexte (traitement anticoagulant ++) et compléter par les dosages de facteurs"],
    causes: [
      { cause: "TP abaissé isolé", signe: "AVK, carence en vitamine K, cholestase, déficit en facteur VII", examens: ["INR", "Facteur VII", "Bilan hépatique"] },
      { cause: "TCA allongé isolé", signe: "héparine ; déficit (hémophilie A/B, Willebrand, XI, XII/PK/KHPM) ou anticoagulant circulant (lupique, anti-facteur)", examens: ["TT / temps de reptilase", "Test de correction (Rosner)", "Dosages de facteurs"] },
      { cause: "TCA allongé + TP abaissé", signe: "AVK à dose élevée, insuffisance hépatique, CIVD, déficit en facteurs V/II/X", examens: ["Facteur V, fibrinogène", "PDF / D-dimères, plaquettes"] }
    ],
    tableaux: [
      { titre: "Exploration de la coagulation",
        entetes: ["Test", "Voie explorée", "Facteurs"],
        lignes: [
          ["TP (temps de Quick)", "Extrinsèque + commune", "VII, X, V, II, I (fibrinogène)"],
          ["TCA", "Intrinsèque + commune", "Système contact (PK, KHPM), XII, XI, IX, VIII + commune"],
          ["TT / temps de reptilase", "Fibrinoformation", "Fibrinogène (I), action de la thrombine"]
        ] },
      { titre: "TP abaissé isolé",
        entetes: ["Cause", "Orientation"],
        lignes: [
          ["AVK (INR faible)", "Contexte médicamenteux"],
          ["Déficit en vitamine K", "Cinétique de décroissance : VII > IX > X > II"],
          ["Syndrome cholestatique", "Bilirubine conjuguée, PAL, 5'NU"],
          ["Déficit en facteur VII", "Dosage du facteur VII"]
        ] },
      { titre: "TCA allongé isolé",
        entetes: ["Situation", "Étiologies"],
        lignes: [
          ["Héparine (HNF)", "TT allongé, temps de reptilase normal"],
          ["Test de correction — Rosner < 12 (corrige)", "Déficit : hémophilie A (VIII), hémophilie B (IX), maladie de Willebrand, déficit en XI, déficit en XII / PK / KHPM"],
          ["Rosner > 15 (ne corrige pas), TCK allongé", "Anticorps anti-facteur"],
          ["Rosner > 15 (ne corrige pas), TCK normal", "Anticoagulant circulant de type lupique"]
        ] },
      { titre: "TCA allongé + TP abaissé",
        entetes: ["Cause", "Orientation"],
        lignes: [
          ["AVK (INR élevé) / relais héparine-AVK", "Contexte médicamenteux"],
          ["Insuffisance hépatique", "Protéines, albumine, facteur V abaissés"],
          ["CIVD", "PDF / D-dimères, complexes solubles, facteur V et plaquettes abaissés"],
          ["Déficit en facteurs V, II ou X", "Voie commune"]
        ] }
    ],
    red_flags: ["Syndrome hémorragique actif avec anomalie du bilan → urgence", "CIVD (TCA ↑ + TP ↓ + thrombopénie + D-dimères ↑) : contexte grave (sepsis, obstétrique, cancer)", "Surdosage en AVK (INR élevé) avec saignement", "Anticoagulant circulant lupique : risque paradoxal THROMBOTIQUE (SAPL), pas hémorragique"],
    conduite: ["Toujours éliminer une cause préanalytique avant d'interpréter.", "TCA allongé isolé : le test de correction (Rosner) distingue déficit (corrige) et anticoagulant circulant (ne corrige pas).", "Un allongement isolé du TCA sans saignement, ne corrigeant pas, évoque un anticoagulant lupique (risque thrombotique).", "Confronter systématiquement au traitement anticoagulant et au contexte (foie, sepsis)."]
  },
  {
    id: "hemophilie_a", num: 86, anomalie: "Hémophilie A (déficit en facteur VIII)",
    specialite: "Hémostase",
    definition: "Déficit constitutionnel en facteur VIII, transmission récessive liée à l'X (1/5000 garçons ; 1/3 de néo-mutations, sans antécédent familial). Saignements de type hématome / hémarthrose. Sévérité selon le taux de facteur VIII.",
    premiere_intention: ["Interrogatoire +++ : antécédents familiaux (liés à l'X), symptomatologie hémorragique (hémarthroses, hématomes)", "TS normal (différencie de la maladie de Willebrand) ; allongement ISOLÉ du TCA (et du TCK)", "Test de correction : indice de Rosner < 12 (corrige) ; dosage du facteur VIII (déficit isolé)", "Rechercher un anticorps anti-VIII (dilutions linéaires après incubation 2 h à 37 °C) ; biologie moléculaire"],
    causes: [
      { cause: "Hémophilie A (déficit FVIII)", signe: "TCA allongé isolé, Rosner < 12, facteur VIII bas isolé, TS normal", examens: ["Dosage du facteur VIII", "TCA, indice de Rosner"] },
      { cause: "Diagnostic différentiel", signe: "maladie de Willebrand (TS souvent allongé, vWF bas), hémophilie B (déficit IX), anticoagulant circulant (Rosner > 15)", examens: ["vWF:Ag / vWF:RCo, facteur IX", "Test de correction"] },
      { cause: "Femme conductrice", signe: "FVIII/vWF:Ag < 0,8 (80 %), FVIII < 50 % (30 %)", examens: ["Facteur VIII, vWF:Ag", "Biologie moléculaire (certitude)"] }
    ],
    tableaux: [
      { titre: "Classification (taux de facteur VIII)",
        entetes: ["Forme", "Facteur VIII"],
        lignes: [
          ["Sévère", "< 1 %"],
          ["Modérée", "1-5 %"],
          ["Mineure", "5-50 %"]
        ] },
      { titre: "Diagnostic prénatal (formes sévères)",
        entetes: ["Étape", "Terme / prélèvement"],
        lignes: [
          ["Diagnostic du sexe", "10 SA (trophoblaste)"],
          ["Analyse moléculaire", "14 SA (cellules amniotiques)"],
          ["Dosage du facteur VIII", "18 SA (sang de cordon)"]
        ] },
      { titre: "Bilan d'hémostase",
        entetes: ["Test", "Résultat"],
        lignes: [
          ["Temps de saignement (TS)", "Normal (≠ maladie de Willebrand)"],
          ["TCA (et TCK)", "Allongement isolé"],
          ["Indice de Rosner", "< 12 (corrige → déficit)"],
          ["Facteur VIII", "Déficit isolé (augmente en cas d'inflammation)"],
          ["Anticorps anti-VIII", "Absents (dilutions linéaires après 2 h à 37 °C)"]
        ] }
    ],
    red_flags: ["Hémorragie grave : hémarthrose, hématome compressif, hémorragie cérébrale, saignement post-traumatique ou chirurgical", "Apparition d'un anticorps anti-FVIII (inhibiteur, 15-30 %) → inefficacité du traitement substitutif", "CONTRE-INDICATION de l'aspirine et des AINS", "Forme mineure : TCA peu sensible (faux négatif) — se fier à l'interrogatoire"],
    conduite: ["Diagnostic : TCA allongé isolé qui corrige (Rosner < 12) + déficit isolé en FVIII ; TS normal écarte une maladie de Willebrand.", "Le FVIII augmente avec l'inflammation (peut masquer une forme mineure) ; sensibilité du TCA faible et variable selon les réactifs.", "Traitement substitutif par facteur VIII ; recherche systématique d'anticorps anti-FVIII lors des transfusions.", "Éducation : carte d'hémophile, éviction aspirine/AINS, prise en charge en centre de traitement de l'hémophilie."]
  },
  {
    id: "hemophilie_b", num: 87, anomalie: "Hémophilie B (déficit en facteur IX)",
    specialite: "Hémostase",
    definition: "Déficit constitutionnel en facteur IX, transmission récessive liée à l'X (1/25 000 garçons ; ~20 % des hémophilies). Cliniquement indiscernable de l'hémophilie A (hématomes, hémarthroses) ; le diagnostic repose sur le dosage du facteur IX.",
    premiere_intention: ["Interrogatoire : antécédents familiaux (liés à l'X), symptomatologie hémorragique (hémarthroses, hématomes)", "Allongement ISOLÉ du TCA (et du TCK) ; indice de Rosner < 12 (corrige)", "Dosage du facteur IX (déficit isolé) — différencie de l'hémophilie A", "Biologie moléculaire ; FIX physiologiquement bas à la naissance (15-50 %) : interpréter avec prudence chez le nouveau-né"],
    causes: [
      { cause: "Hémophilie B (déficit FIX)", signe: "TCA allongé isolé, Rosner < 12, facteur IX bas isolé", examens: ["Dosage du facteur IX", "TCA, indice de Rosner"] },
      { cause: "Diagnostic différentiel", signe: "hémophilie A (déficit VIII), maladie de Willebrand (TS allongé, vWF bas), anticoagulant circulant (Rosner > 15)", examens: ["Facteur VIII, vWF", "Test de correction"] }
    ],
    tableaux: [
      { titre: "Classification (taux de facteur IX)",
        entetes: ["Forme", "Facteur IX"],
        lignes: [
          ["Sévère", "< 1 %"],
          ["Modérée", "1-5 %"],
          ["Mineure", "5-50 %"]
        ] },
      { titre: "Hémophilie A vs B",
        entetes: ["", "Hémophilie A", "Hémophilie B"],
        lignes: [
          ["Déficit", "Facteur VIII", "Facteur IX"],
          ["Fréquence", "~80 % (1/5000)", "~20 % (1/25 000)"],
          ["Transmission", "Récessive liée à l'X", "Récessive liée à l'X"],
          ["Inhibiteur (anticorps)", "15-30 %", "~2 %"],
          ["Bilan", "TCA isolé, Rosner < 12, FVIII bas", "TCA isolé, Rosner < 12, FIX bas"]
        ] }
    ],
    red_flags: ["Hémorragie grave : hémarthrose, hématome compressif, hémorragie cérébrale, saignement post-traumatique ou chirurgical", "Apparition d'un anticorps anti-FIX (inhibiteur, ~2 %)", "CONTRE-INDICATION de l'aspirine et des AINS", "Forme mineure : TCA peu sensible (faux négatif) — se fier à l'interrogatoire"],
    conduite: ["Profil identique à l'hémophilie A (TCA allongé isolé, Rosner < 12) : c'est le DOSAGE qui distingue (FIX bas vs FVIII bas).", "Chez le nouveau-né, le FIX est physiologiquement bas (15-50 %) : interpréter avec prudence / recontrôler.", "Traitement substitutif par facteur IX ; surveiller l'apparition d'un inhibiteur.", "Éducation : carte d'hémophile, éviction aspirine/AINS, prise en charge en centre de traitement de l'hémophilie."]
  },
  {
    id: "sapl", num: 88, anomalie: "Syndrome des antiphospholipides (SAPL)",
    specialite: "Hémostase",
    definition: "Thrombophilie auto-immune définie par l'association d'AU MOINS 1 critère clinique (thrombose ou morbidité obstétricale) ET d'AU MOINS 1 critère biologique (anticorps antiphospholipides persistants). Primitif ou associé à un lupus.",
    premiere_intention: ["Circonstances : maladie auto-immune (lupus), thrombose veineuse/artérielle inexpliquée, pertes fœtales à répétition, thrombopénie inexpliquée, allongement isolé du TCA découvert fortuitement", "Dépistage du lupus anticoagulant : TCA (sensibilité selon l'activateur : silice ++, kaolin −), TTd (temps de Quick dilué, thromboplastine au 1/500), dRVVT (active directement le facteur X, insensible à l'héparine via polybrène)", "Principe : allongement NON corrigé par l'ajout de plasma témoin + dépendance aux phospholipides (raccourcissement par addition de PL)", "Anticorps anti-PL par ELISA : anti-cardiolipides, anti-β2-GP1 (isotypes IgG/IgM) ; autres selon contexte (anti-PE, anti-prothrombine, anti-annexine V)", "Confirmer la PERSISTANCE : 2 prélèvements à ≥ 12 semaines d'intervalle ; rechercher un lupus (ACAN, anti-ADN natif)"],
    causes: [
      { cause: "Critère clinique — thrombose", signe: "≥ 1 thrombose objectivée (imagerie de référence ou histopathologie)", examens: ["Imagerie (écho-Doppler, angio-TDM…)"] },
      { cause: "Critère clinique — obstétrical", signe: "mort fœtale ≥ 10e semaine, prématurité < 34e semaine (éclampsie/insuffisance placentaire), ≥ 3 fausses couches < 10e semaine", examens: ["Bilan obstétrical"] },
      { cause: "Critère biologique", signe: "lupus anticoagulant et/ou anti-cardiolipides et/ou anti-β2-GP1, persistants ≥ 12 semaines", examens: ["Lupus anticoagulant (ISTH)", "Anti-cardiolipides, anti-β2-GP1 (ELISA)"] }
    ],
    tableaux: [
      { titre: "Critères cliniques (≥ 1 requis)",
        entetes: ["Type", "Définition"],
        lignes: [
          ["Thrombose", "≥ 1 thrombose objectivée par imagerie de référence ou histopathologie"],
          ["Obstétrical — mort fœtale", "≥ 1 mort fœtale inexpliquée ≥ 10e semaine de gestation (morphologie normale)"],
          ["Obstétrical — prématurité", "≥ 1 naissance < 34e semaine pour éclampsie, prééclampsie grave ou insuffisance placentaire (nouveau-né normal)"],
          ["Obstétrical — fausses couches", "≥ 3 avortements spontanés consécutifs < 10e semaine, sans cause anatomique/hormonale ni chromosomique"]
        ] },
      { titre: "Critères biologiques (≥ 2 reprises, ≥ 12 semaines d'intervalle)",
        entetes: ["Anticorps", "Précisions"],
        lignes: [
          ["Lupus anticoagulant", "Mis en évidence selon les recommandations de l'ISTH"],
          ["Anti-cardiolipides (IgG/IgM)", "Titre > 40 GPL ou MPL, ou > 99e percentile ; méthode ELISA standardisée"],
          ["Anti-β2-GP1 (IgG/IgM)", "Titre > 40 GPL ou MPL, ou > 99e percentile ; méthode ELISA standardisée"]
        ] },
      { titre: "Tests du lupus anticoagulant — interprétation (M = malade, T = témoin)",
        entetes: ["Test", "Calcul", "Négatif", "Positif"],
        lignes: [
          ["TCA", "Indice de Rosner : (M − T) × 100 / M", "< 12", "> 15"],
          ["TTd (temps de thromboplastine dilué)", "(M + T) / T", "< 1,15", "> 1,20"],
          ["dRVVT", "Ratio normalisé : (M/T screen) / (M/T confirm)", "< 1,20", "> 1,20"]
        ] }
    ],
    red_flags: ["SAPL catastrophique (CAPS) : thromboses multiples avec défaillance multiviscérale → urgence vitale", "Thrombose artérielle (AVC, IDM) ou thrombose veineuse étendue", "Morbidité obstétricale (pertes fœtales répétées, prééclampsie sévère)", "Thrombopénie souvent associée (auto-immune ou de consommation ; réaliser un TS, anticoaguler avec précaution)"],
    conduite: ["Diagnostic = 1 critère clinique + 1 critère biologique PERSISTANT (≥ 12 semaines).", "Le lupus anticoagulant allonge le TCA (ne corrige pas au mélange) mais le risque est THROMBOTIQUE, pas hémorragique.", "Rechercher un lupus associé ; éviter les œstroprogestatifs ; contrôler les facteurs de risque vasculaire.", "Traitement : anticoagulation au long cours après thrombose ; en obstétrique, aspirine + HBPM ; avis spécialisé."]
  },
  {
    id: "groupage_abo", num: 89, anomalie: "Groupage sanguin ABO-RH1",
    specialite: "Immuno-hématologie",
    definition: "Le groupage ABO repose sur la concordance de deux épreuves : Beth-Vincent (sérums-tests = recherche des antigènes sur les hématies du patient) et Simonin (hématies-tests = recherche des anticorps naturels dans le sérum). La détermination de l'antigène RH1 (D) utilise un anti-RH1 avec un témoin. Règles de sécurité transfusionnelle strictes.",
    premiere_intention: ["Beth-Vincent (épreuve globulaire) : hématies du patient + sérums anti-A, anti-B, anti-AB", "Simonin (épreuve sérique) : sérum du patient + hématies-tests A et B (anticorps naturels)", "Concordance OBLIGATOIRE Beth-Vincent / Simonin pour valider le groupe ABO", "Détermination RH1 (D) : anti-RH1 + témoin ; un témoin positif rend le résultat ININTERPRÉTABLE"],
    causes: [
      { cause: "Discordance Beth-Vincent / Simonin", signe: "sous-groupes, agglutinines irrégulières, autoanticorps ; Simonin peu fiable chez le nouveau-né (< 6 mois) et le sujet âgé", examens: ["Contrôle, avis immuno-hématologique", "RAI"] },
      { cause: "Témoin RH1 positif", signe: "autoagglutination → détermination RH1 ininterprétable", examens: ["Reprise", "Test à l'antiglobuline"] },
      { cause: "Contexte transfusionnel", signe: "validité du groupe selon les règles (2 prélèvements / 2 déterminations)", examens: ["RAI associée", "Contrôle ultime au lit"] }
    ],
    tableaux: [
      { titre: "Épreuve de Beth-Vincent (sérums-tests sur hématies)",
        entetes: ["Groupe", "Anti-A", "Anti-B", "Anti-AB"],
        lignes: [
          ["A", "+", "−", "+"],
          ["B", "−", "+", "+"],
          ["AB", "+", "+", "+"],
          ["O", "−", "−", "−"]
        ] },
      { titre: "Épreuve de Simonin (hématies-tests sur sérum)",
        entetes: ["Groupe", "Hématies A", "Hématies B"],
        lignes: [
          ["A", "−", "+"],
          ["B", "+", "−"],
          ["AB", "−", "−"],
          ["O", "+", "+"]
        ] },
      { titre: "Détermination de l'antigène RH1 (D)",
        entetes: ["Résultat", "Anti-RH1", "Témoin"],
        lignes: [
          ["RH1 positif (D+)", "+", "−"],
          ["RH-1 négatif (D−)", "−", "−"],
          ["Ininterprétable", "—", "+ (autoagglutination)"]
        ] },
      { titre: "Règles de sécurité (réalisation)",
        entetes: ["Niveau", "Exigence"],
        lignes: [
          ["1 groupage sanguin", "2 prélèvements (1 détermination par prélèvement)"],
          ["1 détermination", "1 réalisation automatisée, OU 2 réalisations manuelles par 2 techniciens différents + double saisie par 2 personnes différentes"]
        ] }
    ],
    red_flags: ["Discordance Beth-Vincent / Simonin → ne pas valider le groupe, avis immuno-hématologique", "Témoin RH1 positif (autoagglutination) → RH1 ininterprétable, reprendre", "Sécurité transfusionnelle : vérifier le respect des 2 prélèvements / 2 déterminations avant toute transfusion", "Urgence vitale sans groupe disponible : culots O (RH−) selon protocole"],
    conduite: ["Valider le groupe ABO uniquement si Beth-Vincent et Simonin CONCORDENT.", "Simonin peu fiable chez le nouveau-né (< 6 mois, anticorps naturels absents) et le sujet âgé/immunodéprimé.", "Compléter par la RAI avant transfusion ; respecter les règles des 2 prélèvements et le contrôle ultime au lit du malade.", "Toute discordance ou témoin positif → contrôle au laboratoire d'immuno-hématologie."]
  },
  {
    id: "phenotypes_erythrocytaires", num: 90, anomalie: "Phénotypes érythrocytaires (systèmes de groupes sanguins)",
    specialite: "Immuno-hématologie",
    definition: "Principaux systèmes antigéniques érythrocytaires (ABO, Rhésus, Kell, MNSs, Kidd, Duffy, Lewis) et fréquences phénotypiques. Importants pour la transfusion (phénotypage, RAI) et la prévention de l'allo-immunisation. Fréquences indicatives (population générale).",
    premiere_intention: ["ABO + RH1 (D) : groupage de base", "Phénotypage RH-KEL1 (Rhésus C/c/E/e + Kell) recommandé, notamment chez la femme en âge de procréer et le polytransfusé", "Phénotype étendu (Kidd, Duffy, MNSs…) si allo-immunisation ou transfusions itératives", "RAI (recherche d'agglutinines irrégulières) avant transfusion"],
    causes: [
      { cause: "Allo-immunisation anti-érythrocytaire", signe: "anticorps irréguliers (anti-RH, anti-KEL, anti-Kidd, anti-Duffy…) après transfusion ou grossesse", examens: ["RAI, identification", "Phénotype étendu"] },
      { cause: "Antigènes à risque", signe: "RH et KEL très immunogènes ; anti-Kidd (Jk) responsables d'hémolyse retardée", examens: ["Phénotypage", "Test de Coombs / élution"] },
      { cause: "Particularités de population", signe: "Fy(a−b−) fréquent chez le sujet noir (résistance à Plasmodium vivax)", examens: ["Phénotype Duffy"] }
    ],
    tableaux: [
      { titre: "ABO",
        entetes: ["Groupe", "Antigène", "Anticorps", "Fréquence"],
        lignes: [
          ["O", "Ni A ni B", "Anti-A + Anti-B", "45 %"],
          ["A", "A", "Anti-B", "42 %"],
          ["B", "B", "Anti-A", "10 %"],
          ["AB", "A + B", "Aucun", "3 %"]
        ] },
      { titre: "Rhésus",
        entetes: ["Phénotype", "Fréquence"],
        lignes: [
          ["D+ C+ E− c− e+", "35 %"],
          ["D+ C+ E− c+ e+", "20 %"],
          ["D+ C+ E+ c+ e+", "13 %"],
          ["D+ C− E+ c+ e+", "12 %"],
          ["D+ C− E− c+ e+", "2 %"],
          ["D− C− E− c+ e+", "15 %"]
        ] },
      { titre: "Kell",
        entetes: ["Phénotype", "Fréquence"],
        lignes: [
          ["Kel:−1,2 (K−k+)", "91 %"],
          ["Kel:1,2 (K+k+)", "8,8 %"],
          ["Kel:1,−2 (K+k−)", "0,2 %"]
        ] },
      { titre: "MNSs",
        entetes: ["Phénotype", "Fréquence"],
        lignes: [
          ["M+N+", "50 %"],
          ["M+N−", "28 %"],
          ["M−N+", "22 %"],
          ["S−s+", "45 %"],
          ["S+s+", "44 %"],
          ["S+s−", "11 %"]
        ] },
      { titre: "Kidd",
        entetes: ["Phénotype", "Fréquence"],
        lignes: [
          ["Jk:1,2 (Jk(a+b+))", "50 %"],
          ["Jk:−1,2 (Jk(a−b+))", "24 %"],
          ["Jk:1,−2 (Jk(a+b−))", "26 %"]
        ] },
      { titre: "Duffy",
        entetes: ["Phénotype", "Fréquence"],
        lignes: [
          ["Fy:1,2 (Fy(a+b+))", "47 %"],
          ["Fy:−1,2 (Fy(a−b+))", "33 %"],
          ["Fy:1,−2 (Fy(a+b−))", "20 %"],
          ["Fy:−1,−2 (Fy(a−b−))", "fréquent chez le sujet noir"]
        ] },
      { titre: "Lewis",
        entetes: ["Phénotype", "Fréquence"],
        lignes: [
          ["Le(a−b+)", "72 %"],
          ["Le(a+b−)", "22 %"],
          ["Le(a−b−)", "6 %"]
        ] }
    ],
    red_flags: ["RAI positive (anticorps anti-érythrocytaire) → sang phénotypé compatible, risque d'hémolyse transfusionnelle", "Femme en âge de procréer RH−1 (D−) ou exposée à KEL1 : prévenir l'allo-immunisation (maladie hémolytique du nouveau-né)", "Anticorps anti-Kidd (Jk) : hémolyse retardée, parfois indétectable (évanescence) — danger transfusionnel", "Phénotype rare → difficulté d'approvisionnement"],
    conduite: ["Respecter le phénotypage RH-KEL1 chez la femme en âge de procréer et le polytransfusé.", "Devant une RAI positive : identifier l'anticorps et transfuser du sang phénotypé compatible.", "Tenir compte des particularités de population (Fy(a−b−) chez le sujet noir).", "Tracer le phénotype ; coordination avec le laboratoire d'immuno-hématologie / l'EFS."]
  },
  {
    id: "diabete_type_1", num: 91, anomalie: "Diabète de type 1",
    specialite: "Endocrinologie",
    definition: "Diabète auto-immun : destruction des cellules β des îlots de Langerhans (auto-anticorps anti-GAD, anti-IA2, anti-îlots/ICA, anti-insuline). Terrain génétique (HLA DR3/DR4) + facteurs environnementaux (viraux : Coxsackie B4, rubéole congénitale). Pré-diabète asymptomatique (~5-10 ans) ; symptômes quand il reste < 10-20 % de cellules β fonctionnelles.",
    premiere_intention: ["Glycémie à jeun > 1,26 g/L (7 mmol/L) à 2 reprises ; glycosurie et cétonurie positives", "Profil évocateur : sujet jeune (< 20 ans), pas d'ATCD familial, début brutal, autres maladies auto-immunes possibles", "2e intention (si doute étiologique) : auto-anticorps anti-GAD, anti-IA2, anti-îlots (ICA), anti-insuline", "Bilan initial : HbA1c, bilan rénal (créatinine, clairance, microalbuminurie), bilan lipidique"],
    causes: [
      { cause: "Arguments pour un diabète de type 1", signe: "sujet jeune < 20 ans, début brutal, cétose, pas d'ATCD familial, auto-anticorps positifs", examens: ["Glycémie, cétonurie", "Auto-Ac anti-GAD/IA2/ICA/insuline"] },
      { cause: "Maladies auto-immunes associées", signe: "thyroïdite auto-immune, maladie cœliaque", examens: ["TSH", "Anticorps anti-transglutaminase (IgA)"] },
      { cause: "Acidocétose révélatrice", signe: "hyperglycémie + cétose + acidose métabolique à trou anionique augmenté, déshydratation", examens: ["Gaz du sang, ionogramme", "Cétonémie / cétonurie"] }
    ],
    tableaux: [
      { titre: "Diagnostic biologique",
        entetes: ["Intention", "Examens"],
        lignes: [
          ["1re intention", "Glycémie à jeun > 1,26 g/L (7 mmol/L) à 2 reprises ; glycosurie et cétonurie +"],
          ["2e intention (doute étiologique)", "Auto-Ac anti-GAD, anti-IA2, anti-îlots (ICA), anti-insuline"]
        ] },
      { titre: "Acidocétose diabétique — anomalies",
        entetes: ["Anomalie", "Mécanisme"],
        lignes: [
          ["Acidose métabolique à trou anionique augmenté", "Corps cétoniques (β-hydroxybutyrate, acétoacétate) ; HCO3− ↓, compensation respiratoire (pCO2 ↓, hyperventilation)"],
          ["Décompensée", "Baisse du pH sanguin"],
          ["Hyperkaliémie", "Acidose → antiport K+/H+ (sortie de K+ vers le plasma)"],
          ["Hyperglycémie", "↓ pénétration cellulaire du glucose + ↑ néoglucogenèse / glycogénolyse"],
          ["Glycosurie, cétonurie", "Polyurie osmotique → déshydratation"],
          ["Déshydratation globale", "Pertes rénales et pulmonaires"]
        ] },
      { titre: "Objectifs et suivi",
        entetes: ["Domaine", "Cible / rythme"],
        lignes: [
          ["HbA1c", "< 7,5 % ; dosage 4 fois/an"],
          ["Pression artérielle", "< 130/80 mmHg"],
          ["Lipides", "HDL > 0,4 g/L, LDL < cible, TG < 1,5 g/L"],
          ["IMC", "< 25 (< 95e percentile chez l'enfant)"],
          ["Bilan annuel", "Glycémie, lipides, créatinine/clairance, microalbuminurie, TSH, auto-Ac selon clinique"]
        ] }
    ],
    red_flags: ["Acidocétose diabétique : hyperglycémie + cétose + acidose, déshydratation, hyperventilation (Kussmaul), odeur acétonique → URGENCE", "Hyperkaliémie (acidose) ou kaliémie « normale » masquant une déplétion potassique globale", "Déshydratation sévère, troubles de conscience", "Syndrome cardinal de l'enfant/jeune (polyurie, polydipsie, amaigrissement) → ne pas retarder la prise en charge"],
    conduite: ["Affirmer le diabète (glycémie > 1,26 g/L × 2) ; rechercher la cétose (urgence si acidocétose).", "Confirmer le type 1 si doute : auto-anticorps (anti-GAD…) ; rechercher les maladies auto-immunes associées (TSH, anti-transglutaminase).", "Éducation thérapeutique +++, insulinothérapie adaptée au mode de vie (schéma basal-bolus), auto-surveillance glycémique.", "Prévention CV (lipides, TA, tabac, poids), vaccinations (grippe, pneumocoque), dépistage des complications (ophtalmo, rénal, neuro, cardio, dentaire)."]
  },
  {
    id: "diabete_type_2", num: 92, anomalie: "Diabète de type 2",
    specialite: "Endocrinologie",
    definition: "Diabète lié à une insulino-résistance des tissus périphériques (muscle ++, foie, tissu adipeux) avec hyperinsulinisme compensateur (10-20 ans), puis épuisement de l'insulino-sécrétion → hyperglycémie. Associé au surpoids / obésité abdominale et au syndrome métabolique (risque cardio-vasculaire).",
    premiere_intention: ["Glycémie à jeun > 1,26 g/L (7 mmol/L) à 2 reprises", "Profil étiologique : âge > 40 ans, IMC > 27, surpoids à répartition abdominale, ATCD familiaux, cétonurie nulle/faible, HTA associée", "Bilan : HbA1c, bilan rénal (créatinine, clairance, microalbuminurie), bilan lipidique", "Dépister le syndrome métabolique (tour de taille, TG, HDL, TA, glycémie)"],
    causes: [
      { cause: "Insulino-résistance", signe: "surcharge pondérale (graisse viscérale, AG libres en compétition avec le glucose, adipokines : leptine/résistine/adiponectine), sédentarité, terrain génétique", examens: ["Tour de taille, IMC", "Insulinémie à jeun > 15 mUI/L (si glycémie < 1,1 g/L)"] },
      { cause: "Syndrome métabolique (IDF 2005)", signe: "obésité centrale + ≥ 2 critères (TG, HDL, TA, glycémie)", examens: ["Tour de taille", "Bilan lipidique, glycémie, TA"] },
      { cause: "Arguments vs diabète de type 1", signe: "âge > 40 ans, IMC élevé, absence de cétose, ATCD familiaux de DT2", examens: ["Cétonurie (nulle/faible)", "Contexte"] }
    ],
    tableaux: [
      { titre: "Syndrome métabolique (IDF 2005)",
        entetes: ["Critère", "Seuil"],
        lignes: [
          ["Obésité centrale (OBLIGATOIRE)", "Tour de taille > 94 cm (homme), > 80 cm (femme)"],
          ["+ au moins 2 parmi :", "—"],
          ["Triglycérides", "> 1,5 g/L"],
          ["HDL cholestérol", "< 0,4 g/L (homme), < 0,5 g/L (femme)"],
          ["Pression artérielle", "≥ 130/85 mmHg"],
          ["Glycémie à jeun", "> 1 g/L (ou diabète de type 2)"]
        ] },
      { titre: "Diagnostic biologique",
        entetes: ["Cible", "Critères"],
        lignes: [
          ["Diabète de type 2", "Glycémie à jeun > 1,26 g/L (7 mmol/L) à 2 reprises"],
          ["Insulino-résistance", "Insulinémie à jeun > 15 mUI/L (interprétable si glycémie < 1,1 g/L)"],
          ["Troubles associés", "TG > 1,7 g/L (1,5 femme), HDL < 0,35 g/L (0,45 femme), ↑ CRP / fibrinogène / ferritine / γGT / ALAT"]
        ] },
      { titre: "Profil clinique",
        entetes: ["Élément", "Description"],
        lignes: [
          ["Terrain", "Surpoids (IMC > 25), graisse abdominale (TT > 94 H / > 80 F)"],
          ["Mode de vie", "Sédentarité"],
          ["Âge / hérédité", "> 40 ans, ATCD familiaux de DT2"],
          ["Comorbidité", "HTA associée"]
        ] },
      { titre: "Objectifs et hygiène de vie",
        entetes: ["Domaine", "Cible"],
        lignes: [
          ["HbA1c", "Cible individualisée (âge, ancienneté, risque d'hypoglycémie) ; dosage 4 fois/an"],
          ["Poids / tour de taille", "IMC < 25 ; TT < 94 cm (H) / < 80 cm (F)"],
          ["Lipides", "HDL > 0,4 g/L, LDL < cible, TG < 1,5 g/L"],
          ["Pression artérielle", "< 130/80 mmHg"],
          ["Hygiène", "Activité physique, sevrage tabagique, limiter l'alcool"]
        ] }
    ],
    red_flags: ["Complications cardio-vasculaires (le syndrome métabolique est prothrombotique, pro-inflammatoire, dyslipidémique, hypertensif)", "Hyperglycémie majeure / coma hyperosmolaire (sujet âgé, déshydratation)", "Découverte tardive avec complications déjà présentes (rétinopathie, néphropathie, neuropathie, pied diabétique)", "Dyslipidémie de type IV/IIb et stéatose hépatique associées"],
    conduite: ["Affirmer le DT2 (glycémie > 1,26 g/L × 2) ; profil : âge > 40 ans, surpoids abdominal, pas de cétose.", "Dépister et prendre en charge le syndrome métabolique global (TA, lipides, poids, tabac).", "Mesures hygiéno-diététiques en première ligne, puis antidiabétiques oraux et/ou insuline ; statine/fibrate, traitement de l'HTA.", "Vaccinations (grippe, pneumocoque) ; dépistage annuel des complications (ophtalmo, rénal, neuro, cardio, pied, dentaire)."]
  },
  {
    id: "diabete_gestationnel", num: 93, anomalie: "Diabète gestationnel (dépistage et diagnostic)",
    specialite: "Endocrinologie",
    definition: "Trouble de la tolérance glucidique apparu ou diagnostiqué pendant la grossesse. Dépistage ciblé (facteurs de risque, dès le début) et entre 24 et 28 SA. Diagnostic par HGPO 75 g (stratégie en 1 temps, CNGOF) ou stratégie en 2 temps (O'Sullivan puis HGPO).",
    premiere_intention: ["Dépistage précoce si facteurs de risque : IMC ≥ 25, âge ≥ 35 ans, ethnie à risque, ATCD personnel d'intolérance/diabète, ATCD familial au 1er degré, ATCD obstétrical (mort fœtale in utero, macrosomie)", "Dépistage de toutes les femmes entre 24 et 28 SA", "Stratégie en 1 temps (CNGOF) : HGPO 75 g (glycémie à jeun, 1 h, 2 h) après 8-14 h de jeûne", "Conditions : ≥ 150 g de glucides/j les 3 jours précédents, activité habituelle, pas de tabac pendant le test ; la glycosurie n'est PAS recommandée"],
    causes: [
      { cause: "Stratégie en 1 temps (CNGOF)", signe: "HGPO 75 g ; 1 valeur anormale pose le diagnostic", examens: ["Glycémie à jeun, 1 h, 2 h"] },
      { cause: "Stratégie en 2 temps", signe: "test d'O'Sullivan (50 g, glycémie à 1 h) = dépistage (20 % des positifs sont des DG), puis HGPO de confirmation", examens: ["O'Sullivan", "HGPO 75 g ou 100 g"] },
      { cause: "Facteurs de risque", signe: "IMC ≥ 25, âge ≥ 35, ethnie, ATCD personnels / familiaux / obstétricaux", examens: ["Dépistage précoce ciblé"] }
    ],
    tableaux: [
      { titre: "HGPO 75 g — valeurs seuils selon les sociétés",
        entetes: ["Société", "À jeun", "1 h", "2 h", "Diagnostic"],
        lignes: [
          ["CNGOF", "0,92 g/L (5,1 mmol/L)", "1,80 g/L (10)", "1,53 g/L (8,5)", "1 valeur anormale"],
          ["OMS", "1,26 g/L (7)", "—", "1,40 g/L (7,8)", "1 valeur anormale"],
          ["ADA", "0,95 g/L (5,3)", "1,80 g/L (10)", "1,55 g/L (8,6)", "2 valeurs / 3"]
        ] },
      { titre: "Test d'O'Sullivan (50 g, glycémie à 1 h)",
        entetes: ["Glycémie à 1 h", "Conclusion"],
        lignes: [
          ["< 1,30 g/L", "Pas de groupe à risque"],
          ["1,30-1,40 g/L", "Peu de risque ; HGPO 75/100 g si patiente à risque"],
          ["1,40-2 g/L", "HGPO 75/100 g pour poser le diagnostic"],
          ["> 2 g/L", "Diabète gestationnel diagnostiqué"]
        ] },
      { titre: "HGPO 100 g — seuils (test positif si 2 valeurs / 4)",
        entetes: ["Société", "À jeun", "1 h", "2 h", "3 h"],
        lignes: [
          ["NDDG", "1,05 g/L (5,8)", "1,90 g/L (10,6)", "1,65 g/L (9,2)", "1,45 g/L (8,1)"],
          ["Carpenter & Coustan", "0,95 g/L (5,3)", "1,80 g/L (10,0)", "1,55 g/L (8,6)", "1,40 g/L (7,8)"]
        ] }
    ],
    red_flags: ["Macrosomie fœtale, hydramnios → surveillance obstétricale rapprochée", "Glycémie à jeun d'emblée élevée : évoquer un diabète préexistant (type 2) méconnu", "Mauvais équilibre glycémique : complications materno-fœtales (pré-éclampsie, dystocie, hypoglycémie néonatale)", "O'Sullivan ne POSE PAS le diagnostic (sauf > 2 g/L) : ne pas étiqueter sur ce seul test"],
    conduite: ["Privilégier la stratégie en 1 temps (HGPO 75 g, seuils CNGOF) ; 1 valeur anormale suffit.", "Le test d'O'Sullivan dépiste mais ne diagnostique pas (confirmer par HGPO), sauf glycémie à 1 h > 2 g/L.", "Respecter les conditions du test (≥ 150 g glucides/j les 3 jours avant, jeûne 8-14 h, pas de tabac).", "En cas de diagnostic : autosurveillance, mesures diététiques ± insuline ; surveillance obstétricale et dépistage du diabète en post-partum."]
  },
  {
    id: "insuffisance_renale_chronique", num: 94, anomalie: "Maladie rénale chronique / insuffisance rénale chronique",
    specialite: "Néphrologie",
    definition: "Maladie rénale chronique (MRC) = DFG < 60 mL/min/1,73 m² pendant ≥ 3 mois, OU atteinte rénale (histologie, imagerie, marqueurs : protéinurie, hématurie, leucocyturie, microalbuminurie chez le diabétique) > 3 mois quel que soit le DFG. Caractère chronique = irréversible et présent depuis > 3 mois.",
    premiere_intention: ["Dépistage des sujets à risque : HTA, diabète, âge > 60 ans, histoire familiale, infections urinaires à répétition, toxiques", "Estimer le DFG (Cockcroft-Gault ou MDRD) + marqueurs : protéinurie, hématurie, leucocyturie, microalbuminurie", "Confirmer (interférences : cimétidine, triméthoprime) et éliminer une IRA (fonctionnelle, obstructive, médicamenteuse, GN rapidement progressive, vasculaire)", "Affirmer la chronicité (> 3 mois) : antériorité, anémie normochrome normocytaire arégénérative, hypocalcémie, petits reins"],
    causes: [
      { cause: "Néphropathie glomérulaire", signe: "protéinurie abondante, hématurie (cylindres hématiques), HTA", examens: ["Protéinurie/24 h", "PBR"] },
      { cause: "Néphropathie tubulo-interstitielle", signe: "leucocyturie (cylindres leucocytaires), protéinurie de faible taux", examens: ["Cytologie urinaire", "Imagerie"] },
      { cause: "Atteinte vasculaire / réno-vasculaire", signe: "HTA, athérome, sténose des artères rénales", examens: ["Écho-Doppler des artères rénales"] },
      { cause: "Causes fréquentes", signe: "diabète, HTA, polykystose, uropathie", examens: ["Glycémie, échographie rénale"] }
    ],
    tableaux: [
      { titre: "Classification (stades)",
        entetes: ["Stade", "DFG (mL/min/1,73 m²)", "Définition"],
        lignes: [
          ["1", "≥ 90 + marqueurs", "MRC sans insuffisance rénale"],
          ["2", "60-89 + marqueurs", "MRC (atteinte légère)"],
          ["3", "30-59", "Insuffisance rénale modérée"],
          ["4", "15-29", "Insuffisance rénale sévère"],
          ["5", "< 15", "Insuffisance rénale terminale"]
        ] },
      { titre: "Marqueurs d'atteinte rénale (seuils)",
        entetes: ["Marqueur", "Seuil"],
        lignes: [
          ["Protéinurie", "> 300 mg/24 h ou protéinurie/créatininurie > 200 mg/g"],
          ["Hématurie", "> 10/mm³ (10 000/mL)"],
          ["Leucocyturie", "> 10/mm³ (10 000/mL)"],
          ["Microalbuminurie", "20-200 µg/min ; 30-300 mg/24 h ; albuminurie/créatininurie > 2 mg/mmol"],
          ["Morphologie", "Asymétrie, contours bosselés, petits reins ou gros reins polykystiques, néphrocalcinose, calcul, hydronéphrose"]
        ] },
      { titre: "Estimation du DFG",
        entetes: ["Méthode", "Particularités"],
        lignes: [
          ["Cockcroft-Gault", "(140 − âge) × poids × K / créatininémie (µmol/L) ; K = 1,24 (H) / 1,04 (F) ; limite si DFG < 30"],
          ["MDRD", "Indépendante du poids ; préférable chez le sujet âgé ; ajuster ×0,742 (femme), ×1,21 (sujet africain)"],
          ["Clairance mesurée (urines 24 h)", "Si > 75 ans, masse musculaire anormale, dénutrition/obésité, doute, suivi de néphrotoxiques"]
        ] },
      { titre: "Prise en charge par stade",
        entetes: ["Stade", "DFG", "Actions"],
        lignes: [
          ["1", "≥ 90 + marqueurs", "Diagnostic étiologique ; traiter les comorbidités (diabète, HTA, dyslipidémie, tabac) ; évaluer la progression ; réduire le risque CV"],
          ["2", "60-89 + marqueurs", "+ néphroprotection : IEC/ARA2 si HTA ou protéinurie, PA < 130/80, hygiène, éviction des néphrotoxiques"],
          ["3", "30-59", "+ traiter les complications (anémie, phospho-calcique, acidose, nutrition) ; préserver le capital veineux ; vacciner VHB"],
          ["4", "15-29", "+ préparer la suppléance"],
          ["5", "< 15", "+ démarrer la suppléance si nécessaire"]
        ] },
      { titre: "Anomalies biologiques de l'IRC",
        entetes: ["Domaine", "Anomalies"],
        lignes: [
          ["Azote / créatinine", "Hyperazotémie, hyperuricémie, hypercréatininémie"],
          ["Phospho-calcique", "Hyperphosphatémie, hypocalcémie (ostéodystrophie rénale)"],
          ["Hématologie", "Anémie normochrome normocytaire arégénérative (microcytaire si carence martiale)"],
          ["Acido-basique", "Acidose métabolique à trou anionique augmenté"],
          ["Protéines", "Hypoprotidémie (↓ β/γ-globulines, ↑ α2-globulines), hypoalbuminémie"],
          ["Ionogramme", "Hyperkaliémie, hyponatrémie, hypermagnésémie"]
        ] },
      { titre: "Ostéodystrophie rénale (physiopathologie)",
        entetes: ["Mécanisme", "Conséquence"],
        lignes: [
          ["Phosphates non filtrés", "Hyperphosphatémie → précipitation phosphocalcique → hypocalcémie"],
          ["Défaut d'hydroxylation rénale (25-OH-D → calcitriol)", "↓ absorption intestinale du calcium → hypocalcémie"],
          ["Hypocalcémie", "Hyperparathyroïdie secondaire (PTH ↑)"],
          ["PTH élevée", "Ostéoclastes → ostéodystrophie ; ↑ réabsorption Ca, ↓ réabsorption des phosphates"]
        ] }
    ],
    red_flags: ["IRA à éliminer en urgence : obstacle, néphrotoxiques (produits de contraste iodés, IEC/ARA2, AINS, aminosides), GN rapidement progressive, cause vasculaire", "Hyperkaliémie menaçante (IRC + IEC/ARA2)", "Anémie sévère (↓ EPO) avec retentissement cardiaque (hypertrophie ventriculaire gauche)", "Sous IEC/ARA2 : créatininémie ↑ > 50 % (sténose bilatérale des artères rénales ?) ou kaliémie > 5,6 mmol/L → réévaluer"],
    conduite: ["Devant un DFG < 60 : confirmer, éliminer une IRA, affirmer la chronicité (> 3 mois ; antériorité, anémie/hypocalcémie, petits reins sauf diabète/amylose/polykystose).", "Bilan : EPP, glycémie, bandelette + protéinurie/24 h, cytologie urinaire, échographie rénale ; orienter l'étiologie (glomérulaire / tubulo-interstitielle / vasculaire).", "Néphroprotection : IEC/ARA2 (HTA/protéinurie), PA < 130/80, contrôle CV, éviction des néphrotoxiques ; surveiller créatinine et kaliémie.", "Anémie : fer IV si ferritine < 100 µg/L ou CST < 20 %, puis agents stimulant l'érythropoïèse ; préparer la suppléance aux stades avancés."]
  },
  {
    id: "syndrome_nephrotique", num: 95, anomalie: "Syndrome néphrotique",
    specialite: "Néphrologie",
    definition: "Définition biologique : protéinurie > 3 g/24 h + hypoprotidémie < 60 g/L + hypoalbuminémie < 30 g/L. « Pur » si pas d'HTA, ni insuffisance rénale, ni hématurie microscopique, et protéinurie sélective ; « impur » dans le cas contraire.",
    premiere_intention: ["Affirmer les 3 critères : protéinurie > 3 g/24 h, protidémie < 60 g/L, albuminémie < 30 g/L (le calcium mesuré baisse, pas le calcium corrigé)", "Caractériser la protéinurie (EPP urinaire) : sélective (> 85 % albumine, clairance IgG/transferrine < 0,1) vs non sélective (albumine + Ig)", "Classer pur / impur (HTA, insuffisance rénale, hématurie microscopique, sélectivité)", "Bilan : EPP sérique, bilan lipidique, hémostase, cytologie urinaire, ionogramme urinaire, bilan martial"],
    causes: [
      { cause: "Protéinurie sélective", signe: "> 85 % d'albumine, clairance IgG/transferrine < 0,1 ; perte des charges anioniques, pas de lésion en microscopie optique", examens: ["EPP urinaire"] },
      { cause: "Protéinurie non sélective", signe: "albumine + protéines de haut poids moléculaire (immunoglobulines) ; lésions en microscopie optique", examens: ["EPP urinaire", "PBR selon contexte"] },
      { cause: "Syndrome néphrotique impur", signe: "HTA, insuffisance rénale, hématurie microscopique ou protéinurie non sélective", examens: ["TA, créatinine, cytologie urinaire"] }
    ],
    tableaux: [
      { titre: "Critères diagnostiques",
        entetes: ["Critère", "Seuil"],
        lignes: [
          ["Protéinurie", "> 3 g/24 h"],
          ["Protidémie", "< 60 g/L"],
          ["Albuminémie", "< 30 g/L (↓ calcium mesuré, calcium corrigé normal)"]
        ] },
      { titre: "Syndrome néphrotique pur vs impur",
        entetes: ["", "Pur", "Impur"],
        lignes: [
          ["HTA", "Absente", "Possible"],
          ["Insuffisance rénale", "Absente", "Possible"],
          ["Hématurie microscopique", "Absente", "Possible"],
          ["Protéinurie", "Sélective", "Non sélective possible"]
        ] },
      { titre: "Conséquences biologiques et complications",
        entetes: ["Domaine", "Anomalie / risque"],
        lignes: [
          ["EPP sérique", "↑ α2 et β-globulines, ↓ γ-globulines ; ↑ VS (hypoprotidémie)"],
          ["Lipides", "Hyperlipidémie mixte type IIb (ou IV) : ↑ VLDL et LDL → statine si résistant"],
          ["Coagulation", "Hypercoagulabilité (↑ facteurs + fuite d'antithrombine) → TVP / EP ; HBPM si albumine < 20-25 g/L puis AVK"],
          ["Immunité", "↓ IgG / IgA → risque infectieux (pneumocoque, Haemophilus, klebsielle)"],
          ["Médicaments", "↑ fraction libre des médicaments liés à l'albumine (AVK, AINS)"],
          ["Fer", "Carence martiale atypique : fer, transferrine et ferritine diminués"],
          ["Ionogramme urinaire", "Hyperaldostéronisme secondaire : ↓ natriurèse, ↑ kaliurèse"]
        ] }
    ],
    red_flags: ["Complication thrombo-embolique (TVP, embolie pulmonaire, thrombose des veines rénales) par hypercoagulabilité", "Syndrome néphrotique sévère (albumine < 20-25 g/L) : anticoagulation préventive", "Infections (pneumocoque, Haemophilus) par hypogammaglobulinémie", "Syndrome néphrotique impur (HTA, IR, hématurie) → étiologie potentiellement grave, avis néphrologique"],
    conduite: ["Affirmer les 3 critères biologiques ; distinguer pur (sélectif, sans HTA/IR/hématurie) et impur.", "Prévenir et surveiller les complications : thrombose (HBPM si albumine < 20-25 g/L), infections, dyslipidémie (statine si résistant).", "Adapter les médicaments fortement liés à l'albumine (↑ fraction libre).", "Avis néphrologique ; PBR selon l'âge et le caractère impur ; traitement étiologique."]
  },
  {
    id: "cholestase", num: 96, anomalie: "Syndrome cholestatique",
    specialite: "Hépatologie",
    definition: "Diminution ou arrêt de l'excrétion biliaire. Marqueurs : ↑ PAL, GGT, 5'-nucléotidase, bilirubine conjuguée. Cliniquement : ictère à urines foncées, prurit, stéatorrhée et décoloration des selles (malabsorption des graisses et des vitamines liposolubles A, D, E, K).",
    premiere_intention: ["Confirmer la cholestase : ↑ PAL, GGT, 5'-nucléotidase, bilirubine conjuguée, cholestérol, acides biliaires totaux", "Retentissement : TP ↓ (carence en vitamine K → facteurs II, VII, IX, X, protéines C et S) ; rechercher une cytolyse associée (ALAT, ASAT, LDH)", "Échographie abdominale en 1re intention : voies biliaires dilatées (obstacle = extra-hépatique) ou non (intra-hépatique)", "Rechercher médicaments, alcool, virus des hépatites"],
    causes: [
      { cause: "Cholestase intra-hépatique", signe: "voies biliaires non dilatées ; hépatite (médicamenteuse, virale, alcoolique), cirrhose, hépatocarcinome, septicémie, cholangite sclérosante, grossesse", examens: ["Sérologies, revue des médicaments", "Échographie, cholangio-IRM"] },
      { cause: "Cholestase extra-hépatique", signe: "voies biliaires dilatées (obstacle) ; lithiase du cholédoque, cancer du pancréas ou du cholédoque, sténose", examens: ["Échographie", "Cholangio-IRM, écho-endoscopie"] }
    ],
    tableaux: [
      { titre: "Anomalies biologiques",
        entetes: ["Sens", "Paramètres"],
        lignes: [
          ["Augmentés", "PAL, GGT, 5'-nucléotidase, bilirubine conjuguée, cholestérol, acides biliaires totaux (dosés surtout chez la femme enceinte)"],
          ["Diminués", "TP, facteurs vitamine K-dépendants (II, VII, IX, X), protéine C, protéine S"],
          ["Si cytolyse associée", "↑ ALAT, ASAT, LDH"]
        ] },
      { titre: "Étiologies",
        entetes: ["Type", "Causes"],
        lignes: [
          ["Intra-hépatique (VB non dilatées)", "Hépatite médicamenteuse / virale / alcoolique, cirrhose, hépatocarcinome, septicémie, cholangite sclérosante, grossesse"],
          ["Extra-hépatique (VB dilatées)", "Lithiase du cholédoque, cancer du pancréas ou du cholédoque, sténose"]
        ] },
      { titre: "Conséquences cliniques",
        entetes: ["Mécanisme", "Manifestation"],
        lignes: [
          ["Accumulation de bilirubine conjuguée", "Ictère, urines foncées"],
          ["Accumulation d'acides biliaires", "Prurit"],
          ["Malabsorption des graisses", "Stéatorrhée, décoloration des selles"],
          ["Carence en vitamine K", "↓ facteurs II/VII/IX/X, protéines C/S → TP abaissé"]
        ] }
    ],
    red_flags: ["Angiocholite : fièvre + ictère + douleur de l'hypochondre droit (triade de Charcot) → urgence", "Obstacle des voies biliaires (lithiase, cancer) → avis chirurgical / endoscopique", "Trouble de la coagulation (carence en vitamine K) avant un geste invasif", "Ictère fébrile, sepsis sur obstacle"],
    conduite: ["Échographie abdominale d'emblée : VB dilatées (extra-hépatique, obstacle) vs non dilatées (intra-hépatique).", "Rechercher une cause médicamenteuse, alcoolique ou virale ; compléter par cholangio-IRM / écho-endoscopie si besoin.", "Traitement étiologique (souvent chirurgical / endoscopique pour les obstacles).", "Symptomatique : prurit → cholestyramine (résine chélatrice des acides biliaires) ; carence en vitamine K → vitamine K parentérale."]
  }
];
