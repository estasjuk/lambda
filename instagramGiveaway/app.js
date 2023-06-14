const fs = require('fs');
const path = require('path');
const perf_hooks = require('perf_hooks');

const performanseObserver = new perf_hooks.PerformanceObserver((items, observer) => {
    const entry = items.getEntriesByName('existInNFiles').pop();
    console.log(`${entry.name}: ${entry.duration}`);
    observer.disconnect();
});
performanseObserver.observe({entryTypes: ['measure', 'function']});


const dirPath = path.join(__dirname, 'files-2M/');

const getAllPhrase = dirname => {
    const allFilesContent = [];
    fs.readdirSync(dirname).map((filename) => {
        allFilesContent.push(fs.readFileSync(dirname + filename, 'utf-8')
            .split('\n'));
    });
    return allFilesContent; //array of arrays
};

// Method 1: - uniqueValues1: 15287.311200022697 ms
let uniqueValues1 = () => {
    const values = getAllPhrase(dirPath).flat();
    const uniquePhrases = values.filter((course, index, array) => array.indexOf(course) === index);
    return uniquePhrases.length;
   
};
//uniqueValues1 = perf_hooks.performance.timerify(uniqueValues1);

// Method 2: - uniqueValues2: 205.82129997015 ms
let uniqueValues2 = () => {
    let unique = new Set(getAllPhrase(dirPath).flat());
    return unique;
};
//uniqueValues2 = perf_hooks.performance.timerify(uniqueValues2);

// uniqueValues1();
// uniqueValues2().size;

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
        if (count[key] === n) { 
            result.push(key);
        }
    }
    console.log(result.length);
}

existInNFiles = perf_hooks.performance.timerify(existInNFiles);
existInNFiles(10);
//console.log('Exist in all files: ', existInAllFiles().length);



