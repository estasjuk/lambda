const { google } = require('googleapis');

const CLIENT_ID = '931550387686-h7eiaj4va2b9tddis8ln4pve4o9ht7l4.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/drive',
];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes
});
console.log(url);

// https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive&response_type=code&client_id=931550387686-h7eiaj4va2b9tddis8ln4pve4o9ht7l4.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth2callback