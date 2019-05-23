const gm = require('gm').subClass({imageMagick: true});
const state = require('./state.js');
const spawn = require('child_process').spawn;
const path = require('path');
const rootPath = path.resolve(__dirname, '..');

async function robot() {
    const content = state.load();

    await downloadAllImages(content);
    await convertAllImages(content);
    await createYouTubeThumbnail();
    await createAfterEffectsScript(content);
    await renderVideoWithAfterEffects();

    state.save(content);

    async function convertAllImages(content) {
        for (let sentenceIndex = 0; sentenceIndex < content.sentences.length; sentenceIndex++) {
            await convertImage(sentenceIndex);
        }
    }

    async function convertImage(sentenceIndex) {
        return new Promise((resolve, reject) => {
            const inputFile = `./content/${sentenceIndex}-original.png[0]`;
            const outputFile = `./content/${sentenceIndex}-converted.png`;
            const width = 1920;
            const height = 1080;

            console.log(inputFile);
            console.log(outputFile);

        gm()
            .in(inputFile)
            .out('(')
            .out('-clone')
            .out('0')
            .out('-background', 'white')
            .out('-blur', '0x9')
            .out('-resize', `${width}x${height}^`)
            .out(')')
            .out('(')
            .out('-clone')
            .out('0')
            .out('-background', 'white')
            .out('-resize', `${width}x${height}`)
            .out(')')
            .out('-delete', '0')
            .out('-gravity', 'center')
            .out('-compose', 'over')
            .out('-composite')
            .out('-extent', `${width}x${height}`)
            .write(outputFile, (error) => {
                if (error) {
                    return reject(error);
                }

                console.log(`Image converted: ${outputFile}`);
                resolve();
            })
        });
    }

    async function createYouTubeThumbnail() {
        return new Promise((resolve, reject) => {
            gm()
                .in('./content/0-converted.png')
                .write('./content/youtube-thumbnail.jpg', (error) => {
                    if (error) {
                        return reject(error);
                    }

                    console.log('> Creating YouTube thumbnail');
                    resolve();
                });
        });
    }

    async function createAfterEffectsScript(content) {
        await state.saveScript(content);
    }

    async function renderVideoWithAfterEffects() {
        return new Promise((resolve, reject) => {
            const aerenderFilePath = 'C:/Program Files/Adobe/Adobe After Effects CS6/Support Files/aerender';
            const templateFilePath = `${rootPath}/templates/1/new-template.aep`;
            const destinationFilePath = `${rootPath}/content/output.mov`;

            console.log('> Starting After Effects');

            const aerender = spawn(aerenderFilePath, [
                '-comp', 'Main',
                '-project', templateFilePath,
                '-output', destinationFilePath
            ]);

            aerender.stdout.on('data', (data) => {
                process.stdout.write(data);
            });

            aerender.on('close', () => {
                console.log('> After Effects closed');
                resolve();
            })
        });
    }
}

module.exports = robot;