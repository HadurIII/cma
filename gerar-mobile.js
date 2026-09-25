const fs = require("fs");
const path = require("path");

const root = process.cwd();

let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
let js = fs.readFileSync(path.join(root, "app.js"), "utf8");

const assets = {
  "imagens/logo_1_cropped.svg": "image/svg+xml",
  "imagens/logo_1_outline_cropped.svg": "image/svg+xml",
  "imagens/animais/Banner_1.png": "image/png",
  "imagens/animais/perfil_1.png": "image/png",
  "imagens/animais/perfil_2.png": "image/png",
  "imagens/animais/perfil_3.png": "image/png",
  "imagens/animais/perfil_4.png": "image/png",
};

for (const [rel, mime] of Object.entries(assets)) {
  const file = fs.readFileSync(path.join(root, rel));
  js = js.split(rel).join(`data:${mime};base64,${file.toString("base64")}`);
}

html = html.replace(
  '<link rel="stylesheet" href="styles.css">',
  `<style>\n${css}\n</style>`
);

html = html.replace(
  '<script src="app.js"></script>',
  `<script>\n${js}\n</script>`
);

fs.writeFileSync(path.join(root, "mobile.html"), html, "utf8");

console.log("mobile.html gerado em UTF-8");