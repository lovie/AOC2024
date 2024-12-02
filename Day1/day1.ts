import * as fs from 'fs';

type IntPair = [number, number];


function readCsvToArray(filePath: string): IntPair[] {
    // Read the file synchronously
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // Split the content by lines
    const lines = fileContent.split('\n').filter(line => line.trim() !== '');
    
    // Map each line to an IntPair
    const pairs: IntPair[] = lines.map(line => {
        const [a, b] = line.split(',').map(Number);
        if (isNaN(a) || isNaN(b)) {
            throw new Error(`Invalid data found in line: ${line}`);
        }
        return [a, b];
    });

    return pairs;
}

function calculateDistance(intPairs:IntPair[]) {
    let firstList:number[] = intPairs.map(x=>x[0]).sort();
    let secondList: number[] = intPairs.map(x=>x[1]).sort();

    const differences:number[] = firstList.map((n,i)=>{ return Math.abs(n - secondList[i])});
    const answer = differences.reduce((a,b)=> {return a+b;});
    console.log("The answer is"+ answer);
}

function main() {
    let intPairs:IntPair[] = [[0,0]];
        // Example usage
    try {
           intPairs = readCsvToArray('input.csv');
           calculateDistance(intPairs);
        } catch (error) {
            console.error('Error reading CSV file:', error.message);
        }
}

main();
