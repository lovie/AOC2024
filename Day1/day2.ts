import * as fs from 'fs';

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


function 