"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function readCsvToArray(filePath) {
    // Read the file synchronously
    var fileContent = fs.readFileSync(filePath, 'utf-8');
    // Split the content by lines
    var lines = fileContent.split('\n').filter(function (line) { return line.trim() !== ''; });
    // Map each line to an IntPair
    var pairs = lines.map(function (line) {
        var _a = line.split(',').map(Number), a = _a[0], b = _a[1];
        if (isNaN(a) || isNaN(b)) {
            throw new Error("Invalid data found in line: ".concat(line));
        }
        return [a, b];
    });
    return pairs;
}
function calculateDistance(intPairs) {
    var firstList = intPairs.map(function (x) { return x[0]; }).sort();
    var secondList = intPairs.map(function (x) { return x[1]; }).sort();
    var differences = firstList.map(function (n, i) { return Math.abs(n - secondList[i]); });
    var answer = differences.reduce(function (a, b) { return a + b; });
    console.log("The answer is" + answer);
}
function main() {
    var intPairs = [[0, 0]];
    // Example usage
    try {
        intPairs = readCsvToArray('input.csv');
        calculateDistance(intPairs);
    }
    catch (error) {
        console.error('Error reading CSV file:', error.message);
    }
}
main();
