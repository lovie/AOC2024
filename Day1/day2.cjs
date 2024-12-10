"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function readCsvToArray(filePath) {
    // Read the file synchronously
    var fileContent = fs.readFileSync(filePath, 'utf-8');
    // Split the content by lines
    var lines = fileContent.split('\n').filter(function (line) { return line.trim() !== ''; });
    // Map each line to an IntPair
    var septs = lines.map(function (line) {
        var septs = line.split(',').map(Number);
        return septs;
    });
    return septs;
}
function isUnsafe(input) {
    var maxdiff = 0;
    maxdiff = input.reduce(function (accum, current, index) {
        var diff = index > 0 ? input[index - 1] - input[index] : 0;
        if (index > 0 && diff === 0)
            return 4000;
        else if (diff >= 0 && accum >= 0)
            return diff > accum ? diff : accum;
        else if (diff <= 0 && accum <= 0)
            return diff < accum ? diff : accum;
        else
            return 4000;
    }, 0);
    console.log(maxdiff);
    return Math.abs(maxdiff) > 3;
}
function hello() {
    console.log("hello");
}
function main() {
    var intSept = [];
    // Example usage
    try {
        intSept = readCsvToArray('input.csv');
        var unSafeCollection = intSept.map(function (x) { return isUnsafe(x); });
        var count = unSafeCollection.filter(function (x) { return x === false; }).length;
        console.log("Count of false unsafes is" + count);
    }
    catch (error) {
        console.error('Error reading CSV file:', error.message);
    }
}
main();
