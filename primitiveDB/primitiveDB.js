const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs/promises');

const mainQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "Tell me, please, your name. For cancel adding users press Enter",
        
    },
    {
        type: 'list',
        name: 'gender',
        message: "Tell me, please, your gender:",
        choices: ['male', 'female', 'third gender'],
        default: 'male',
        when: (answers) => answers.name !== '',
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
        when: (answers) => answers.name !== '',
    },
    
];

const doSearchQuestion = [
    {
        type: 'list',
        choices: ['Yes', 'No'],
        name: 'search',
        message: 'Would you like to search somebody? Choose Y or N and press Enter',
    },
];

const usernameToSearch = [
{
        type: 'input',
        name: 'name',
        message: 'Enter the username to search:',
    },
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
            name,
            gender,
            age,
    };
        if (newUser.name !== '') {
            users.push(newUser);
            await fs.writeFile(db, JSON.stringify(users, null, 2));
        }
        else throw new Error();
    }
    catch (error) {
        console.error(error.message);
    }
};

const findUserByName = async (name) => {
    try {
        const users = await userList();
        const result = users.filter((user) => 
            user.name.toLowerCase().startsWith(name)
        );
        if (result.length) {
            console.log(result);
        }
        else console.log('User not found')
    }
    catch (error) {
        console.log(error);
    }
};

const userDialog = async () => {
    await inquirer
        .prompt(mainQuestions)
        .then(answers => {
            addNewUser(answers);
            if (answers.name === '') {
                searchRequest();
            }
            else userDialog();
        });
};

const searchRequest = async () => {
    await inquirer
        .prompt(doSearchQuestion).then((answer) => {
            if (answer.search === 'No') {
                process.exit(0);
            } else {
                userSearch();
            }
        })
};

const userSearch = async () => { 
   
    await inquirer
        .prompt(usernameToSearch).then(((answer) => {
            findUserByName(answer.name);

    }));
}

userDialog();