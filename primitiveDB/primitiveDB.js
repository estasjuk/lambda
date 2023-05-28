const inquirer = require('inquirer');

const { userList, addNewUser, findUserByName } = require('./services');
const { mainQuestions, doSearchQuestion, usernameToSearch } = require('./questions');

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