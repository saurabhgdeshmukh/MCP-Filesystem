const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const SERVER_URL = 'http://localhost:3001';
async function createFile(filename, content) {
  await axios.post(SERVER_URL + '/create', { filename, content });
}
async function editFile(filename, content) {
  await axios.post(SERVER_URL + '/edit', { filename, content });
}
async function deleteFile(filename) {
  await axios.post(SERVER_URL + '/delete', { filename });
}
async function uploadFolder(folderPath) {
  const files = fs.readdirSync(folderPath);
  const form = new FormData();
  files.forEach(file => {
    form.append('files', fs.createReadStream(path.join(folderPath, file)), file);
  });
  await axios.post(SERVER_URL + '/upload', form, { headers: form.getHeaders() });
}
module.exports = { createFile, editFile, deleteFile, uploadFolder }; 