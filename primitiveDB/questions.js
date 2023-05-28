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

module.exports = {
    mainQuestions,
    doSearchQuestion,
    usernameToSearch,
};