const fs = require('fs');
const path = require('path');
const perf_hooks = require('perf_hooks');

const performanseObserver1 = new perf_hooks.PerformanceObserver((items, observer) => {
    const entry = items.getEntriesByName('uniqueValues').pop();
    console.log(`${entry.name}: ${entry.duration}`);
    observer.disconnect();
});
performanseObserver1.observe({ entryTypes: ['measure', 'function'] });

const performanseObserver2 = new perf_hooks.PerformanceObserver((items, observer) => {
    const entry = items.getEntriesByName('existInNFiles').pop();
    console.log(`${entry.name}: ${entry.duration}`);
    observer.disconnect();
});
performanseObserver2.observe({ entryTypes: ['measure', 'function'] });

const dirPath = path.join(__dirname, 'files-2M/');

const getAllPhrase = dirname => {
    const allFilesContent = [];
    fs.readdirSync(dirname).map((filename) => {
        allFilesContent.push(fs.readFileSync(dirname + filename, 'utf-8')
            .split('\n'));
    });
    return allFilesContent; //returns array of arrays
};

let uniqueValues = () => {
    let unique = new Set(getAllPhrase(dirPath).flat());
    return unique;
};
uniqueValues = perf_hooks.performance.timerify(uniqueValues);

let existInNFiles = (n) => {
    const values = getAllPhrase(dirPath);
    let valuesWithoutDuplicates = [];
    for (i = 0; i < values.length; i += 1) {
        const usernames = new Set(values[i]); // removes duplicates from arrays
        valuesWithoutDuplicates.push(Array.from(usernames)); // creates common array with usernames-arrays
    };
    const flattedArray = valuesWithoutDuplicates.flat();
    
    let count = {};
    for (let elem of flattedArray) {
        count[elem] === undefined ? count[elem] = 1 : count[elem] += 1;
    }
    let result = [];
    for (key in count) {
        if (count[key] >= n) {
            result.push(key);
        }
    }
    return result;
};
existInNFiles = perf_hooks.performance.timerify(existInNFiles);

console.log('Unique values: ', uniqueValues().size);
console.log('Exist in all files: ', existInNFiles(20).length);
console.log('Exist in at least 10 files: ', existInNFiles(10).length);

// Unique values:  129240
// Exist in all files:  441
// Exist in at least 10 files:  73245
// uniqueValues: 2823.8865000009537
// existInAllFiles: 2984.5171999931335
// existInAtLeast10Files: 2615.340800046921