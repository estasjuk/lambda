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
      const originalName = answers.pictureURL.split('/').pop().split('.')[0];
      const newFileName = answers.newName || originalName;
          
      console.log(formattedExtension);
      console.log(pictureLink);
      console.log(originalName);
      console.log(newFileName);

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
    })
    
   ;
};

userDialog();