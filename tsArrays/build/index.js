"use strict";
Array.prototype.average = function () {
    let sum = 0; // create counter to be sumed all data from array
    for (let i of this) { // loop all of this
        sum += i; //summing data from array
    }
    const average = sum / this.length;
    return average;
};
console.log([1, 2, 3, 4, 5].average());
