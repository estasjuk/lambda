const inquirer = require('inquirer');
const path = require('path');
const { mainQuestions} = require('./questions');
const { getTinyUrl } = require('./tiny-url-api');
const { uploadFile } = require('./uploader');

const userDialog = async () => {
  await inquirer
    .prompt(mainQuestions)
    .then(answers => {
      const pictureLink = answers.pictureURL.replaceAll("'", "");
      const originalName = answers.pictureURL.split('/').pop().split('.')[0];
      const newFileName = answers.newName || originalName;

      if (answers.shorten === 'Yes') {
        uploadFile(pictureLink, newFileName).then(id => {
          console.log('File successfully loaded!');
          getTinyUrl(id);
        });
      } else {
        uploadFile(pictureLink, newFileName).then(() =>
          console.log('File successfully loaded!'),
        );
      }
    });
};

userDialog();