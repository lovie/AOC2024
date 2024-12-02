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


function loadInput(filename:string) {
    // Example usage
    try {
        const filePath = 'path/to/your/file.csv'; // Replace with your file path
        const intPairs = readCsvToArray(filePath);
        console.log(intPairs);
    } catch (error) {
        console.error('Error reading CSV file:', error.message);
}
