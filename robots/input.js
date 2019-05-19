const readline = require('readline-sync');
const state = require('./state.js');

function robot() {
    const content = {
        maximumSentences: 7
    }

    content.searchTerm = askAndReturnSearchTerm();
    content.prefix = askAndReturnPrefix();
    state.save(content);

    function askAndReturnSearchTerm() {
        return readline.question('Type a Wikipeadia search term: ');
    }

    function askAndReturnPrefix() {
        const prefixes = ['Who is', 'What is', 'The history of', 'Where is'];
        const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choone one option: ');
        const selectedPrefixText = prefixes[selectedPrefixIndex]

        return selectedPrefixText;
    }

}

module.exports = robot;