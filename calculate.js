export default function convertTable(arr) {

    //map all data and convert to appropriate values.
    arr.map((obj, i) => {
        if (i !== 0) {
            switch (obj[0]) {
                case "REAL4":
                    if (arr[i + 1][3] === obj[3]) {
                        //combine hex strings
                        let t = obj[2].toString().concat(arr[i + 1][2].toString())
                        obj[2] = real4toFloat(t);
                        obj = arr[i]
                        //delete duplicates
                        arr.splice(i + 1, 1);
                        arr[i][2] = parseFloat(arr[i][2]).toFixed(3)
                    }
                    break;
                case "BCD":
                    if(obj[1] >= 53 && obj[1] <= 55){
                        arr[i][2] = numToDate(new Array(obj[2], arr[i + 1][2],arr[i + 2][2]))
                        arr.splice(i + 1, 2);
                    } else {
                        arr[i][2] = parseInt(obj[2],16).toString(10);
                    }
                    break;
                case "LONG":
                    //hex ffff ffc8 = -56 sign 32bit int
                    if (arr[i + 1][3] === obj[3]) {
                        let t = arr[i + 1][2].toString().concat(obj[2].toString());
                        // num|0 to force 32bit int
                        obj[2] = parseInt(t, 16) | 0;
                        obj = arr[i]
                        arr.splice(i + 1, 1);
                    }
                    break;
                case "INTEGER":
                    //as I understand it, register 92 contains  two values, Working Step and Signal Quality. By splitting the binary of given
                    //value we get two values. With this parsing reg 92=38
                    if (obj[1] == 92) {
                        let t = parseInt(parseInt(obj[2], 16) 
                                    .toString(2)
                                    .slice(0, 4), 2)
                                    .toString(10)
                        arr[i][2] = t.concat(", ",
                            parseInt(parseInt(obj[2], 16)
                                .toString(2)
                                .slice(-6), 2)
                                .toString(10));
                    } else if (obj[1] == 96) {
                        //check for language
                        if(obj[2] == "0") arr[i][2] = "English";
                        else if(obj[2] == "1") arr[i][2] = "Chinese";
                        else arr[i][2] = "Unknown";
                    }
                    //for other values I use the given value. Not sure if these values are correct.
                    else arr[i][2] = parseInt(parseInt(obj[2], 16).toString(2).slice(-10), 2).toString(10);
                    break;
                case "0":
                    //convert back to decimal for unknown types
                    arr[i][2] = parseInt(obj[2], 16).toString();
                    break;

            }

        }
    });
    return arr
}

// ABCD -> CDAB (mid-little-endian) conversion
// converting help from stackoverflow https://stackoverflow.com/a/59855771
function real4toFloat(str) {
    const numToUint8 = (str) =>
        Uint8Array
            .from(str.match(/.{1,2}/g)
                .map((comp) => parseInt(comp, 16))
            );
    const [A, B, C, D] = numToUint8(str);
    const reordered = new Uint8Array([C, D, A, B]);
    return new DataView(reordered.buffer).getFloat32(0)
}

//parse date function
function numToDate(d) {
    let date = new Array()
    console.log(d)
    //datetime values into new array
        d.map((val,i) => {
            date.push(val.substr(0,2));
            date.push(val.substr(2,2));
        })
    let dateString = ''
    //return in correct order as a string
    return dateString.concat("20", date[4], "-", date[5], "-",date[2], "  ",date[3], ":",date[0], ":",date[1] )

}