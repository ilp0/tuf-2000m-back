export default function convertTable(arr) {

    //combine real4 hex strings and convert to float
    arr.map((obj, i) => {
        if(obj[0] =="REAL4") {
            if(obj[2] !== 0) {
            if(arr[i+1][3] === obj[3]) {
                //combine hex strings
                let t = obj[2].toString().concat(arr[i+1][2].toString())
                obj[2] = real4toFloat(t);
                obj = arr[i]
                //delete duplicates
                arr.splice(i+1,1);
            }
        }
        }
    })
    return arr
}


// help from stack overflow for converting real4 to float value https://stackoverflow.com/questions/59854184/hex-to-float-mid-little-endian-cdab-hex-to-uint32-big-endian-abcd
function real4toFloat(str) {
    const numToUint8 = (str) => 
    Uint8Array
        .from(str.match( /.{1,2}/g)
        .map( (comp) => parseInt(comp,16))
        );

    const [A,B,C,D] = numToUint8(str);
    const reordered = new Uint8Array( [ C, D, A, B ] );
    return new DataView(reordered.buffer).getFloat32(0)
}

