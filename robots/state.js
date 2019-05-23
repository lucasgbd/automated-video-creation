const fs = require('fs');
const contentFilePath = './content.json';
const scriptFilePath = './content/after-effects-script.js';

function save(content) {
    const contentString = JSON.stringify(content);
    return fs.writeFileSync(contentFilePath, contentString);
}

function saveScript(content) {
    const contentScript = JSON.stringify(content);
    const scriptString = `var content = ${contentScript}`;
    return fs.writeFileSync(scriptFilePath, scriptString);
}

function load() {
    const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8');
    const contentJson = JSON.parse(fileBuffer);

    return contentJson;
}

module.exports = {
    save,
    saveScript,
    load
}