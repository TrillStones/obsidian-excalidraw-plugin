//see for more info about the hack: https://github.com/zsviczian/obsidian-excalidraw-plugin/issues/1406
//source: https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.1/es5/tex-svg-full.min.js
//1. replace all CaSeSeNsItIvE in tex-svg-full.min.js : MathJax to ExcalidrawMathJax
//2. save file as "mathjax.js" to Vault root
/* Execute the following script and paste result here
ea = ExcalidrawAutomate
f = app.vault.getAbstractFileByPath("mathjax.js");
x = await app.vault.read(f);
ea.compressToBase64(btoa(unescape(encodeURIComponent(x))));
*/