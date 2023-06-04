const inquirer = require('inquirer');
const { mainQuestions, shortLinkQuestion } = require('./questions');
const { getTinyUrl } = require('./tiny-url-api');
const { uploadFile } = require('./uploader');


const userDialog = async () => {
    await inquirer
        .prompt(mainQuestions)
        .then(answers => {
            let parseLink = path.parse(answers.pictureURL);
            let imgLink = answers.pictureURL;
            let newFileName = answers.newName;
        });
};

const shortenRequest = async () => {
    await inquirer
        .prompt(shortLinkQuestion).then(answers => {
            if (answers.shorten === 'No') {
                process.exit(0);
            }
            else {
                getTinyUrl(id);
            }
            process.exit(0);
        });
};

userDialog();


