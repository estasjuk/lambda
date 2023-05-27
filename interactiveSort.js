const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
require('colors');
const rl = readline.createInterface({ input, output });
const callTheGenie = require('./callTheGenie');

const regexp = /^[a-zA-Z0-9]*$/;

const exit = () => {
    console.log("See you!")
    rl.close();
}

const checkData = (data) =>  {
  if (data.toLowerCase().trim() === 'exit') {
    exit();
  }
  else {
    const formattedData = data.replace(/ /g,'').trim();
    if (!regexp.test(formattedData)) {
      console.log('Invalid input format, please start app again');
      rl.close();
  }
  callTheGenie(data);
  }
}

const askQuestion = () => {
rl.question('Please, enter several words or numbers divided by space. If you want to close app - enter "exit" \n', 
checkData);
}

askQuestion();


