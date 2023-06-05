const inquirer = require('inquirer');
const path = require('path');
const { mainQuestions} = require('./questions');
const { getTinyUrl } = require('./tiny-url-api');
const { uploadFile } = require('./uploader');

const userDialog = async () => {
    await inquirer
        .prompt(mainQuestions)
        .then(answers => {

            const extension = path.parse(answers.pictureURL).ext;
            const formattedExtension = extension.replace("'", "");
            const pictureLink = answers.pictureURL.replaceAll("'", "");
            const newFileName = answers.newName;

            if (answers.shortenLink === 'Yes') {
                uploadFile(pictureLink, newFileName).then(data => {
                
                  getTinyUrl(data);
                  console.log('File successfully loaded!');
            });
            }
            else {
                uploadFile(pictureLink, newFileName).then(data =>
                console.log('File successfully loaded!'),
        );
      }
    })
    .catch(error => {
      console.log(error.message);
    });
}

userDialog();