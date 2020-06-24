
import express from 'express'
import fs from 'fs'
import { match } from 'assert'
const app = express()
const port = 5000

//get js object
app.get('/', (req, res) => res.send(JSON.stringify(readFile("./raw.txt",1))));

//get raw text
app.get('/raw', (req, res) => {
    console.log("read raw")
    let raw = readFile("./raw.txt", 0);
    return res.send(raw);
});

// option variable
// 0 = string
// 1 = array
function readFile(f, option) {
    //read file
    let file = fs.readFileSync(f,'utf-8');
    //return as string if option = 0
    if(option == 0) return file;
    else if (option == 1) {
        //parse file to array
        var finalArray = new Array();
        let tempArray = file.split("\n");
        tempArray.forEach(val => {
            let a = new Array();
            //regex for date checking
            let dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) (\d\d:\d\d))/g
            if(dateRegex.test(val)) a = val
            else {
                //split value by : separator
                a = val.split(":")
            }
            finalArray.push(a);
        });
        return finalArray;
    }
}

app.listen(port, () => console.log(`port: ${port}`))
