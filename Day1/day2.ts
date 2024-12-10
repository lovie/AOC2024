import * as fs from 'fs';
import { connected } from 'process';

type IntSept = number[];


function readCsvToArray(filePath: string): IntSept[] {
    // Read the file synchronously
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // Split the content by lines
    const lines = fileContent.split('\n').filter(line => line.trim() !== '');
    
    // Map each line to an IntPair
    const septs: IntSept[] = lines.map(line => {
        const septs: number[] = line.split(',').map(Number);
        return septs;
    });

    return septs;
}


function isUnsafe(input: IntSept): boolean {
    let maxdiff = 0;
    maxdiff = input.reduce((accum,current, index) => {
        let diff = index > 0 ? input[index-1] - input[index] : 0;
        if (index > 0 && diff === 0)
            return 4000;
        else if (diff >= 0 && accum >= 0)
            return diff > accum ? diff : accum;
        else if (diff <= 0 && accum <= 0) 
            return diff < accum ? diff : accum;
        else
            return 4000;
     },0)
    console.log(maxdiff);
    return Math.abs(maxdiff) > 3;
}

function hello() { 
    console.log("hello");
}

function main() {
    let intSept:IntSept[] = [];
        // Example usage
    try {
           intSept = readCsvToArray('input.csv');
           let unSafeCollection = intSept.map((x)=>{return isUnsafe(x)});
           let count = unSafeCollection.filter((x)=> x === false).length;
           console.log("Count of false unsafes is" + count)
        } catch (error) {
            console.error('Error reading CSV file:', error.message);
        }
}

main();

