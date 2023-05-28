const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs/promises');

const mainQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "Tell me, please, your name:",
        default: 'John Dou'
    },
    {
        type: 'list',
        name: 'gender',
        message: "Tell me, please, your gender:",
        choices: ['male', 'female', 'third gender'],
        default : 'male',
    },
    {
        type: 'input',
        name: 'age',
        message: "How old are you?:",
        validate: age => {
            if (isNaN(age)) return 'Invalid format of age, please enter a number'
            else return true
        },
        default: '18',
    },
    {
        type: 'confirm',
        name: 'askAgain',
        message: 'Would you like add another user? - Press Enter',
        default: true,
    },
];

const searchQuestion = [
    {
        type: 'input',
        name: 'findUserByName',
        message: 'Enter the username to search',
    }
];

const db = path.join(__dirname, 'users.txt');

const userList = async () => {
    try {
        const data = await fs.readFile(db, 'utf-8'); 
        return [...JSON.parse(data.toString())];
    }
    catch(error) {
        console.log(error.message);
    }
};

const addNewUser = async({name, age, gender}) => {
    try{
    const users = await userList();
    const newUser = {
            name: name.trim(),
            gender,
            age: age.trim(),
    };
        if (newUser.name !== '') {
            users.push(newUser);
            await fs.writeFile(db, JSON.stringify(users, null, 2));
        }
        else throw new Error('Please, enter the username');
    }
    catch (error) {
        console.error(error.message);
    }
};

const findUserByName = async (name) => {
    try {
    const users = await userList();
    const result = users.forEach((person) => {
    const personName = person.name.toLowerCase();
    if (personName.startsWith(name.toLowerCase())) {
        result.push(person);
    }
    });
    return result || null;
    }
    catch (error) {
        console.log('User not found');
    }
};

const userDialog = async () => {
  await inquirer
    .prompt(mainQuestions)
    .then(answers => {
      addNewUser(answers);
      userDialog();
    });
}

const userSearch = async () => { 
   
    await inquirer
        .prompt(searchQuestion).then(((answer) => {
        if (answer.choice === 'No') {
            process.exit(0);
        } else {
            findUserByName();
        }
    }));
}


userDialog();