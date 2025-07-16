const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = 3001;
const BASE_DIR = path.join(__dirname, 'mcp_files');
app.use(express.json());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, BASE_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });
app.post('/create', (req, res) => {
  const { filename, content } = req.body;
  const filePath = path.join(BASE_DIR, filename);
  fs.writeFile(filePath, content || '', (err) => {
    if (err) return res.status(500).send('Error creating file');
    res.send('File created');
  });
});
app.post('/edit', (req, res) => {
  const { filename, content } = req.body;
  const filePath = path.join(BASE_DIR, filename);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) return res.status(404).send('File not found');
    fs.writeFile(filePath, content, (err) => {
      if (err) return res.status(500).send('Error editing file');
      res.send('File edited');
    });
  });
});
app.post('/delete', (req, res) => {
  const { filename } = req.body;
  const filePath = path.join(BASE_DIR, filename);
  fs.unlink(filePath, (err) => {
    if (err) return res.status(404).send('File not found or error deleting');
    res.send('File deleted');
  });
});
app.post('/upload', upload.array('files'), (req, res) => {
  res.send('Files uploaded');
});
if (!fs.existsSync(BASE_DIR)) {
  fs.mkdirSync(BASE_DIR);
}
app.listen(PORT, () => {
  process.stdout.write('MCP server running on port ' + PORT);
}); 