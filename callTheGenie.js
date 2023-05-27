const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
require('colors');
const rl = readline.createInterface({ input, output });

const callTheGenie = (inputData) => {
    rl.question(`${'What would you like to do, my Lord?'.green.bold}
          ${'1) Sort words by name (from A to Z)'.blue.bold}
          ${'2) Show digits in ascending order'.yellow.bold}
          ${'3) Show digits in descending order'.blue.bold}
          ${'4) Words by quantity of letters'.yellow.bold}
          ${'5) Only unique words'.blue.bold}
          ${'6) Only unique values'.yellow.bold}
  ${'Please, make a wish [1-6] and press ENTER or press EXIT for kicking out the genie \n'.green.bold}`, 
  (answer) => {
    const variants = ['1', '2', '3', '4', '5', '6', 'exit'];
    if (!variants.includes(answer)) {
      console.log("Oops, wrong choice! Try again, I believe in you, my Lord!");
      exit();
    }
    const wish = answer.toLowerCase().trim();
    switch (wish) {
      case 'exit': {
        exit();
        break;
      }
      case '1': {
        console.log([...inputData.split(' ').filter(el => {
          if (isNaN(+el)) return el;
      }).sort()]);
      break;
      };
      case '2': {
        console.log([...inputData.split(' ').filter(el => {
          if (!isNaN(+el)) return el;
      }).sort((a, b) => a - b)]);
      break;
      };
      case '3': {
        console.log([...inputData.split(' ').filter(el => {
          if (!isNaN(+el)) return el;
      }).sort((a, b) => b - a)]);
      break;
      };
      case '4': {
        console.log([...inputData.split(' ').filter(el => {
          if (isNaN(Number(el))) return el;
      }).sort((a, b) => a.length - b.length)]);
      break;
      };
      case '5': {
        const onlyWords = [...inputData.split(' ').filter(el => {
          if (isNaN(+el)) return el;
      })];
     
        console.log(onlyWords.filter((el, index, array) => 
        array.indexOf(el) === index
      ));
  
      break;
      };
      case '6': {
        console.log([...inputData.split(' ').filter((el, index, array) => 
        array.indexOf(el) === index
      )]);
      break;
      };
    };
    console.log("Would you like to make another wish?")
    askQuestion();
  })};

  module.exports = callTheGenie;