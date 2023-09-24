interface Array<T> {
    multiply(this: T[], multiplier?: number): number[];                                     //done
    all(this: T[], func: (v: T) => boolean): boolean | undefined;                           //done
    any(this: T[], func: (v: T) => boolean): boolean;                                       //done
    associateBy(this: { [key: string]: any }[], key: string, value?: string): Array<Object>;
    average(this: T[]): number;                                                             //done
    chunked(this: T[], size: number): T[][];                                                //done
    distinctBy(this: T[], func?: Function): object[];                                       //done
    filtering(this: T[], func: (v: T) => boolean): T[];                                     //done
    filterIndexed(this: Array<T>, func: (index: number, v: T) => boolean): T[];             //done
    filterNot(this: T[], func: (v: T) => boolean): T[];                                     //done
    finding(this: T[], func: (v: T) => boolean): T;                                         //done
    findLast(this: T[], func: (v: T) => boolean): T;                                        //done
    flatten(this: T[] | T[][]): T[];                                                        //done
    fold(this: Array<T>, initial: any, func: Function): any;
    maxBy(this: T[]): T;                                                                    //done
    minBy(this: T[]): T;                                                                    //done
    count(this: T[], key: string): number;                                                  //done
    groupBy<V>(this: T[], keySelector: (key: T) => V): Map<T, V[]>;                         //done
    groupBy<K, V>(                                                                          //done
        this: T[],
        keySelector: (key: T) => V,
        transform: (value: T) => K
    ): Map<T, V[]>;
}


  const persons = [
    {
        id: 1,
        name: "Lisa",
        score: 80,
        age: 40,
    },
    {
        id: 2,
        name: "Lina",
        score: 70,
        age: 40,
    },
    {
        id: 3,
        name: "Yuriy",
        score: 80,
        age: 30,
    },
    {
        id: 4,
        name: "Ivan",
        score: 95,
        age: 40,
    },
    {
        id: 5,
        name: "Lisa",
        score: 95,
        age: 45,
    },
]

// Array.prototype.average = function (): number {
//     let sum = 0; 
//     for (let i = 0; i < this.length; i += 1) { 
//         sum += this[i];
//     }
//     const average = sum / this.length;
//     return average
// }
// console.log([1, 3, 3, 7, 5].average());

// Array.prototype.multiply = function (multiplier = 10) {
//     const result: number[] = [];
//     for (let elem of this) {
//         result.push(elem * multiplier)
//     }
//   return result;
// }
// console.log([2, 3, 3, 7, 5].multiply());

// Array.prototype.all = function (predicate) {

//     for (let i = 0; i < this.length; i += 1) {
//       const element = this[i];
  
//       if (!predicate(element)) {
//         return false;
//       }
//       return true;
//     }
//   };
//   console.log(
//     [1, 2, 3, 4, 5].all((value: number) => {
//       return value >= 1;
//     })
//   );

// Array.prototype.any = function (predicate) {
//     for (let i = 0; i <= this.length; i += 1) {
//         const element = this[i];
//         if (predicate(element)) {
//             return true
//         }
//     }
//     return false
// };
// console.log(
//     [1, 2, 3, 4, 5].any((value: number) => {
//       return value >= 5;
//     })
//   );

// Array.prototype.associateBy = function (keySelector, valueTransform = (element) => element) {
//     const answerMap = new Map(); // create dictionary to be filled in cycle
//     for (let i of this) { // loop all of this
//         answerMap.set(keySelector(i), valueTransform(i)); // filling map with data from key selector and valueTransform
//     }
//     return answerMap
// }



// Array.prototype.filtering = function (predicate) {
//     const array = [];
//     for (let i = 0; i < this.length; i++) {
//         if (predicate(this[i])) {
//             array.push(this[i]);
//         }
//     }
//     return array
// };

// console.log([1, 2, 3, 4, 5].filtering((value: number) => {
//           return value >= 3;
//         }))


// Array.prototype.filterNot = function (predicate) {
//             const array = [];
//             for (let i = 0; i < this.length; i++) {
//                 if (!predicate(this[i])) {
//                     array.push(this[i]);
//                 }
//             }
//             return array
//         };
        
// console.log([1, 2, 3, 4, 5].filterNot((value: number) => {
//         return value >= 3;
// }))

// Array.prototype.filterIndexed = function (predicate) {
//     let array = [];
//     for (let i = 0; i < this.length; i += 1) {
//       if (predicate(i, this[i])) {
//         array.push(this[i]);
//       }
//     }
//     return array;
//   };

//   console.log(["Tom", "Mike", "Sam", "Bob", "Alice"].filterIndexed((index, elem) => index % 2 === 0 && elem.length === 3))

// Array.prototype.finding = function (predicate) {
//   for (let i = 0; i < this.length; i += 1) {
//     if (predicate(this[i])) return i;
//   }
//   return null;
// };

// console.log([1, 2, 3, 4, 5].finding((elem: number) => elem >= 10))

// Array.prototype.findLast = function (predicate) {
//     for (let i = this.length; i > 0; i -= 1) {
//         if (predicate(this[i])) {
//             return this[i]
//         }
//     }
//   return null;
// };

// console.log([1, 2, 3, 4, 5].findLast((elem: number) => elem >= 3))

// Array.prototype.flatten = function () {
//     const array = []; 
//     for (let i = 0; i < this.length; i += 1) {
//         array.push(...this[i])
//     }
//     return array
// };

// console.log([[1,2,3],[4,5,6],[]].flatten())

// Array.prototype.maxBy = function () {
//     let max = this[0];
//     for (let i = 1; i < this.length; i += 1) {
//       if (this[i] > max) {
//         max = this[i]
//       }
//     }
//     return max;
//   };

//   console.log([1,3,2,5,6,7].maxBy())

// Array.prototype.minBy = function () {
//     let min = this[0];
//     for (let i = 1; i < this.length; i += 1) {
//       if (this[i] < min) {
//         min = this[i]
//       }
//     }
//     return min;
//   };

//   console.log([1,3,2,5,6,7].minBy())

// Array.prototype.count = function (key: string) {
//     let sum = 0;
//     this.forEach(element => {
//             sum += element[key];
//       })
//     return sum;
// }

// console.log([{city: "A", population: 100}, {city: "B", population: 100}, {city: "B", population: 100}]
// .count("population"))

// Array.prototype.groupBy = function <T, K, V>(
//     keySelector: (key: T) => K,
//     transform?: (value: T) => V
//   ) {
//     const result = new Map();
//     if (!transform) {
//       for (let i = 0; i < this.length; i++) {
//         const group = result.get(keySelector(this[i]));
//         if (!group) {
//           result.set(keySelector(this[i]), [this[i]]);
//         } else {
//           group.push(this[i]);
//         }
//       }
//       return result;
//     }
//     for (let i = 0; i < this.length; i++) {
//       const group = result.get(keySelector(this[i]));
//       if (!group) {
//         result.set(keySelector(this[i]), [transform(this[i])]);
//       } else {
//         group.push(transform(this[i]));
//       }
//     }
//     return result;
//   };

//   console.log(persons.groupBy((item) => item.score));
//   console.log(persons.groupBy((item) => item.score,(item) => item.age ));
  
// Array.prototype.chunked = function (size) {
//     let chunksCount = this.length / size;
//     if (this.length % size !== 0) {                 //определяем количество массивов, если не делится без остатка
//       chunksCount = Math.floor(chunksCount) + 1;
//     }
//     const result = [];
//     for (let i = 0; i < this.length; i += size) { //в цикле нарезаем массив с учетом размера
//       const chunk = this.slice(i, i + size);
//       result.push(chunk);
//     }
//     return result;
//   };

//   console.log([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].chunked(4));

// Array.prototype.distinctBy = function <T>(func?: Function) {
//     if (!func) {
//       return Array.from(new Set(this));
//     } else {
//       const resultArray: T[] = [];
//       this.forEach((element: T) => resultArray.push(func(element)));
//       return Array.from(new Set(resultArray));
//     }
//   };
//   let arr = ["a", "A", "b", "B", "A", "a", "c", "c"]
//   console.log(arr.distinctBy());
//   console.log(arr.distinctBy((el: string) => el.toLowerCase()));

//   let arr2 = [1,1,1,2,3,4,5,4,4,3];
//   console.log(arr2.distinctBy());
//   console.log(arr2.distinctBy((el: number) => el+1));