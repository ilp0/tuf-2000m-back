
import express from 'express'
import fs from 'fs'
import { match } from 'assert'
const app = express()
const port = 5000

//get js object
app.get('/', (req, res) => res.send(JSON.stringify(readFile("./raw.txt","./descriptions.txt",1))));

//get raw text
app.get('/raw', (req, res) => {
    console.log("read raw")
    let raw = readFile("./raw.txt", "./descriptions.txt", 0);
    return res.send(raw);
});

// option variable
// 0 = string
// 1 = array
function readFile(f, df, option = 0) {
    //read file
    let file = fs.readFileSync(f,'utf-8');
    let descriptionFile
    if(df) descriptionFile = fs.readFileSync(df,'utf-8');
    //return as string if option = 0
    if(option == 0) return file;
    else if (option == 1) {
        //parse file to array
        var finalArray = new Array();
        let tempArray = file.split("\n");
        let tempDescArray;
        if(df) tempDescArray = descriptionFile.split("\n");
        let check62 = 0;
        tempArray.forEach(val => {
            let a = new Array();
            //regex for date checking
            let dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) (\d\d:\d\d))/g
            if(dateRegex.test(val)) a = val
            else {
                //split value by : separator
                a = val.split(":")
                //assign description for register number
                //0-50 are easy
                if(a[0] <= 50) a.push(tempDescArray[Math.round(a[0] / 2)-1])
                //rest is manual labor
                else if (a[0] == 51) a.push(tempDescArray[25])
                else if (a[0] >= 53 && a[0] <= 55 ) a.push(tempDescArray[26])
                else if (a[0] == 56) a.push(tempDescArray[27])
                else if (a[0] == 59) a.push(tempDescArray[28])
                else if (a[0] == 60) a.push(tempDescArray[29])
                else if (a[0] == 61) a.push(tempDescArray[30])
                else if (a[0] == 62) {
                    // 2 different descs for reg 62
                    if(!check62) {
                        a.push(tempDescArray[31])
                        check62 = 1;
                    } else a.push(tempDescArray[32])
                }
                else if (a[0] == 72) a.push(tempDescArray[33])
                else if (a[0] >= 77 && a[0] <= 90) a.push(tempDescArray[Math.round(a[0] / 2)-5])
                else if (a[0] == 92) a.push(tempDescArray[41])
                else if (a[0] == 93) a.push(tempDescArray[42])
                else if (a[0] == 94) a.push(tempDescArray[43])
                else if (a[0] == 96) a.push(tempDescArray[44])
                else if (a[0] == 97) a.push(tempDescArray[45])
                else if (a[0] == 98) a.push(tempDescArray[45])
                else if (a[0] == 99) a.push(tempDescArray[46])
                else if (a[0] == 100) a.push(tempDescArray[46])
                else a.push('');
            }
            finalArray.push(a);
        });
        return finalArray;
    }
}

app.listen(port, () => console.log(`port: ${port}`))
