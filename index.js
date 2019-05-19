const readline = require('readline-sync');
const robots = {
    text: require('./robots/text.js')
}

async function start() {
    const content = {
        maximumSentences: 7
    };

    content.searchTerm = AskAndReturnSearchTerm();
    content.prefix = AskAndReturnPrefix();

    await robots.text(content);

    function AskAndReturnSearchTerm() {
        return readline.question('Type a Wikipeadia search term: ');
    }

    function AskAndReturnPrefix() {
        const prefixes = ['Who is', 'What is', 'The history of', 'Where is'];
        const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choone one option: ');
        const selectedPrefixText = prefixes[selectedPrefixIndex]

        return selectedPrefixText;
    }

    console.log(JSON.stringify(content, null, 4));
}

start();