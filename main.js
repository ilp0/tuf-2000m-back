
import express from 'express'
import fs from 'fs'
const app = express()
const port = 5000

app.get('/', (req, res) => res.send(''))

app.get('/raw', (req, res) => {
    console.log("read raw")
    var raw = readFile("./raw.txt");
    return res.send(raw);
});

function readFile(f) {
    return fs.readFileSync('./raw.txt','utf-8');
}

app.listen(port, () => console.log(`port: ${port}`))
