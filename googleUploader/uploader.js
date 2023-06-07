const { google } = require('googleapis')
const fs = require('fs');


const CLIENT_ID = '931550387686-h7eiaj4va2b9tddis8ln4pve4o9ht7l4.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';
const REFRESH_TOKEN = '1//09YDFvx-bQfnHCgYIARAAGAkSNwF-L9Ir81vqLpVDGo5-FJ3t5nT1-x_S5yV6BZltPA5Y3rOD1sp0V_97lysAxG67jfaybmF6Omw';

const googleDriveFolderID = '14vPJRQBHlqauJEKvlYmWQNsbdXUvyLFO';

const uploadFile = async (url, filename) => {
  console.log(url);
  console.log(filename);

  const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI,
    );

    oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

    const drive = google.drive({
        version: 'v3',
        auth: oauth2Client
    })

//   try {
//   const response = await oauth2Client.getToken(REFRESH_TOKEN);
//   console.log('response', response);
// } catch (error) {
//   console.log('error', error);
// }

    
   try {
        const response = await drive.files.create({
            requestBody: {
                name: filename,
                parents: [googleDriveFolderID],
            },
            media: {
                body: fs.createReadStream(url)
            }
        }
        );
            return response.data?.id;
    } catch (error) {
               console.log(error)
       
    }
}


module.exports = {
    uploadFile,
};

// 'http://localhost:3000/oauth2callback?code=4/0AbUR2VO_Lza59YhdG-6zjKwoHWztb0G5RWIop7ZyeKzHOyjEqal5idUlppULTFrVb-gb4Q&scope=https://www.googleapis.com/auth/drive'