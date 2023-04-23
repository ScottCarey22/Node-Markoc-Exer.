/** Command-line tool to generate Markov text. */

const fs = require('fs');
const markov = require('./markov')
const axios = require("axios")
const process = require("process")

// make markov machine from input text and generate text from it 

function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

// read files and generate from it
function makeText(path) {
    fs.readFile(path, 'utf8', function cb(err, data) {
        if (err) {
            console.error(`Cannot read File: ${path}:${err}`)
            process.exit(1);
        }
        else {
            generateText(data);
        }
    })
}

// read from URL and generate text
async function makeURLText(url) {
    let res;
    try {
        res = await axios.get(url)
    }
    catch (err) {
        console.error(`Cannot read URL: ${url}: ${err}`)
        process.exit(1);

    }
    generateText(res.data);
}

// command line interpretation and decide what is going on
let [method, path] = process.argv.slice(2);
if (method === 'file') {
    makeText(path)
}

else if (method === "url") {
    makeURLText(path)
}
else {
    console.error(`Unknown input: ${method}`);
    process.exit(1);
}