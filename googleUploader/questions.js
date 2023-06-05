const mainQuestions = [
    {
        type: 'input',
        name: 'pictureURL',
        message: "Drag and drop your picture to the terminal and press Enter for upload",
        
    },
    {
        type: 'list',
        name: 'changeName',
        message: (answers) => `Your file name will be ${answers.pictureURL.split('/').pop()}. Do you want to rename it?`,
        choices: ['Yes', 'No'],
    },
    {
        type: 'input',
        name: 'newName',
        message: 'Enter new name(without file extensions like .jpg, .js):',
        when: (answers) => answers.changeName === 'Yes',
    },
    {
        type: 'list',
        name: 'shorten',
        message: 'Would you like to shorten original link?',
        choices: ['Yes', 'No'],
        when(answers) {
          if (answers['newName']) {
            console.log({ newName: answers.newName });
          }
          if (!answers.changeLink) {
            return answers.pictureURL;
          }
          return answers.changeLink;
        },
    },
    
];

module.exports = {
    mainQuestions,
};