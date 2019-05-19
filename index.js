const readline = require('readline-sync');

function start() {
    const content = {};

    content.searchTerm = AskAndReturnSearchTerm();
    content.prefix = AskAndReturnPrefix();

    function AskAndReturnSearchTerm() {
        return readline.question('Type a Wikipeadia search term: ');
    }

    function AskAndReturnPrefix() {
        const prefixes = ['Who is', 'What is', 'The history of'];
        const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choone one option: ');
        const selectedPrefixText = prefixes[selectedPrefixIndex]

        return selectedPrefixText;
    }

    console.log(content);
}

start();