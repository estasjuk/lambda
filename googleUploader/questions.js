const mainQuestions = [
    {
        type: 'input',
        name: 'pictureURL',
        message: "Drag and drop your picture to the terminal and press Enter for upload",
        
    },
    {
        type: 'list',
        name: 'changeName',
        message: (answers) => `Your file name will be ${answers.path.split('/').pop()}. Do you want to rename it?`,
        choices: ['Yes', 'No'],
    },
    {
        type: 'input',
        name: 'newName',
        message: 'Enter new name(without file extensions like .jpg, .js):',
        when: (answers) => answers.changeName === 'Yes',
    },
    
];

const shortLinkQuestion = [
    {
        type: 'list',
        name: 'shorten',
        message: 'Would you like to shorten original link?',
        choices: ['Yes', 'No'],
    },
];


module.exports = {
    mainQuestions,
    shortLinkQuestion,
};