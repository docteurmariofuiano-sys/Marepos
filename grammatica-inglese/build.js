/* Genera grammatica-inglese.html (versione single-file autonoma)
   inlineando style.css, data.js, translations.js e app.js dentro index.html.
   Uso: node build.js  (dalla cartella grammatica-inglese/) */
const fs = require("fs");
let html = fs.readFileSync("index.html", "utf8");
const css = fs.readFileSync("style.css", "utf8");
const js = ["data.js", "translations.js", "app.js"].map((f) => fs.readFileSync(f, "utf8")).join("\n");
html = html.replace('<link rel="stylesheet" href="style.css">', "<style>\n" + css + "\n</style>");
html = html.replace(
  '<script src="data.js"></' + 'script>\n<script src="translations.js"></' + 'script>\n<script src="app.js"></' + "script>",
  "<script>\n" + js + "\n</" + "script>"
);
if (html.includes('src="data.js"') || html.includes("style.css")) {
  console.error("Inline fallito: controlla i tag in index.html");
  process.exit(1);
}
fs.writeFileSync("grammatica-inglese.html", html);
console.log("OK → grammatica-inglese.html (" + (fs.statSync("grammatica-inglese.html").size / 1024).toFixed(0) + " KB)");
