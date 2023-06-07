const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'googleUploader/credentials.json');

// /**
//  * Reads previously authorized credentials from the save file.
//  *
//  * @return {Promise<OAuth2Client|null>}
//  */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

// /**
//  * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
//  *
//  * @param {OAuth2Client} client
//  * @return {Promise<void>}
//  */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

// /**
//  * Lists the names and IDs of up to 10 files.
//  * @param {OAuth2Client} authClient An authorized OAuth2 client.
//  */
async function listFiles(authClient) {
  const drive = google.drive({version: 'v2', auth: authClient});
  const res = await drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
  });
  const files = res.data.files;
  if (files.length === 0) {
    console.log('No files found.');
    return;
  }

  console.log('Files:');
  files.map((file) => {
    console.log(`${file.name} (${file.id})`);
  });
}

authorize().then(listFiles).catch(console.error);

// https://accounts.google.com/signin/oauth/error/v2?authError=ChVyZWRpcmVjdF91cmlfbWlzbWF0Y2gSqQIK0J3QtdCy0L7Qt9C80L7QttC90L4g0LLRi9C_0L7Qu9C90LjRgtGMINCy0YXQvtC0INCyINC_0YDQuNC70L7QttC10L3QuNC1LCDQv9C-0YHQutC-0LvRjNC60YMg0L7QvdC-INC90LUg0L7RgtCy0LXRh9Cw0LXRgiDQv9GA0LDQstC40LvQsNC8IE9BdXRoIDIuMCBHb29nbGUuCgrQldGB0LvQuCDQstGLINC10LPQviDRgNCw0LfRgNCw0LHQvtGC0YfQuNC6LCDQt9Cw0YDQtdCz0LjRgdGC0YDQuNGA0YPQudGC0LUgVVJJINC_0LXRgNC10L3QsNC_0YDQsNCy0LvQtdC90LjRjyDQsiBHb29nbGUgQ2xvdWQgQ29uc29sZS4KICAabWh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2lkZW50aXR5L3Byb3RvY29scy9vYXV0aDIvd2ViLXNlcnZlciNhdXRob3JpemF0aW9uLWVycm9ycy1yZWRpcmVjdC11cmktbWlzbWF0Y2ggkAMqJgoMcmVkaXJlY3RfdXJpEhZodHRwOi8vbG9jYWxob3N0OjMwMDAvMp0DCAESqQIK0J3QtdCy0L7Qt9C80L7QttC90L4g0LLRi9C_0L7Qu9C90LjRgtGMINCy0YXQvtC0INCyINC_0YDQuNC70L7QttC10L3QuNC1LCDQv9C-0YHQutC-0LvRjNC60YMg0L7QvdC-INC90LUg0L7RgtCy0LXRh9Cw0LXRgiDQv9GA0LDQstC40LvQsNC8IE9BdXRoIDIuM3



