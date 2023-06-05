const { google } = require('googleapis')
const fs = require('fs');
const path = require('path');

const uploadFile = async (url, filename) => {

        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(__dirname, 'keysecret.json'),
            scopes: ['https://www.googleapis.com/auth/drive'],
        });
        
        const driveService = google.drive({
            version: "v3",
            auth,
        });
    
        const fileMetadata = {
            name: filename,
            //parents: ['1PYlABoNE0RBB4nZkxXQB-2WiTmnHtbFj'],
        };

        const media = fs.createReadStream(url);
        media.on('error', () => {/* do nothing */ });
    try {
        const file = await driveService.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
        });
        return file.data.id;
    }
    catch (error) { 
        console.log(error);
    };
    };


module.exports = {
    uploadFile,
};