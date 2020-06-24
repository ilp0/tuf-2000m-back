export default function convertTable(arr) {

    //combine real4 hex strings and convert to float
    arr.map((obj, i) => {
        if (i !== 0 ) {
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
                    BCDtoNumber(obj[2])
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
                    //slice int. Not sure if this is the right parsing for it, but reg 92 = 38 with this so its good enough.
                    // I don't know enough about the other values to determine if eg. correct upstream strength is 429
                    if (obj[1] == 92) {
                        let t = parseInt(parseInt(obj[2], 16).toString(2).slice(0, 4), 2).toString(10)
                        arr[i][2] = t.concat(", ", parseInt(parseInt(obj[2], 16).toString(2).slice(-6), 2).toString(10));
                    }
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


// help from stack overflow for converting real4 to float value https://stackoverflow.com/questions/59854184/hex-to-float-mid-little-endian-cdab-hex-to-uint32-big-endian-abcd
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

function BCDtoNumber(bcd) {
    var n = 0;
    var m = 1;
    for (var i = 0; i < bcd.length; i += 1) {
        n += (bcd[bcd.length - 1 - i] & 0x0F) * m;
        n += ((bcd[bcd.length - 1 - i] >> 4) & 0x0F) * m * 10;
        m *= 100;
    }
    return n;
}
