const mainQuestions = [
    {
        type: 'input',
        name: 'pictureURL',
        message: "Drag and drop your picture to the terminal and press Enter for upload",
        
    },
    {
        type: 'list',
        name: 'changeName',
        message: (answers) => `Your file name will be ${answers.pictureURL.split('/').pop().split('.')[0]} - Do you want to rename it?`,
        choices: ['Yes', 'No'],
    },
    {
        type: 'input',
        name: 'newName',
        message: 'Enter new name(without file extensions like .jpg, .png):',
        when: (answers) => answers.changeName === 'Yes',
    },
    {
        type: 'list',
        name: 'shorten',
        message: 'Would you like to shorten original link?',
        choices: ['Yes', 'No'],
        when(answers) {
          
          if (answers.changeName === 'No') {
            return answers.pictureURL;
          }
          return answers.newName;
        },
    },
    
];

module.exports = {
    mainQuestions,
};