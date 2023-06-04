const google = require('googleapis');
import fs from 'fs';

// const API_KEY = 'AIzaSyAzZyk68-gFUtSTAKA6nd7d3io5Grcz4dM';
// const Client_ID = '147689299281-eh84sm23k66di4j18iuqjinpv260r7tl.apps.googleusercontent.com';
// const Client_secret = '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';


const uploadFile = async (url, filename, extension) => {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: './cred.json',
            scopes: ['https://www.googleapis.com/auth/drive'],
        });

        const driveService = google.drive({
            version: 'v3',
            auth,
        });

        const fileMetaData = {
            name: `${filename}${extension}`,
            parents: [API_KEY],
        };

        const media = {
            mimeType: `image/${extension}`,
            body: fs.createReadStream(url),
        };

        const response = await driveService.files.create({
            resource: fileMetaData,
            media,
            field: 'id',
        });

        return response.data.id;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    uploadFile,
};