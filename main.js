import express from 'express'

const api = express();

api.get(('/raw', (req, res) => {
    var fs = require('fs');
    let raw = fs.readFileSync('raw.txt','utf-8');
    return res.send(raw);
});