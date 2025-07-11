# Credit: This script uses the https://github.com/perliedman/svg-control-descriptions repository. Thank you!

import os
import json

symbolsPath = "D:\Things\GitHub\svg-control-descriptions\symbols"
langPath = "D:\Things\GitHub\svg-control-descriptions\symbols\lang.json"
listOfSymbols = []

with open(langPath, "r", encoding="utf-8") as f:
    lang = json.load(f)

for key, value in lang.items():
    symbolId = ""
    symbolName = ""
    symbolKind = ""
    symbolSvg = ""

    for root, dirs, files in os.walk(symbolsPath):
        for file in files:
            if file.startswith(key):
                with open(os.path.join(root, file), "r", encoding="utf-8") as svgFile:
                    symbolSvg = svgFile.read()
                break

    symbolKind = value.get('kind')

    names = value.get('names', {})
    for lang, name in names.items():
        if lang == "en":
            symbolName = name
            break
        
    symbolId = symbolName.lower().replace(" ", "-").replace("'", "").replace(":", "").replace(";", "").replace(",", "").replace("(", "").replace(")", "").replace("/", "")
    
    dictionary = {
        "id": symbolId,
        "name": symbolName,
        "kind": symbolKind,
        "svg": symbolSvg,
    }
    listOfSymbols.append(dictionary)

with open("output.json", "w", encoding="utf-8") as outputFile:
    json.dump(listOfSymbols, outputFile, indent=4, ensure_ascii=False)