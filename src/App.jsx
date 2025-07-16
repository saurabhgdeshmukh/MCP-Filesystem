import React, { useState } from 'react';
import axios from 'axios';
function App() {
  const [folderFiles, setFolderFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [editContent, setEditContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [message, setMessage] = useState('');
  const handleFolderUpload = (e) => {
    const files = Array.from(e.target.files);
    setFolderFiles(files);
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file, file.webkitRelativePath || file.name);
    });
    axios.post('/upload', formData).then(() => {
      setMessage('Folder uploaded');
    });
  };
  const handlePrompt = () => {
    const [action, filename, ...contentArr] = prompt.split(' ');
    const content = contentArr.join(' ');
    if (action === 'create') {
      axios.post('/create', { filename, content }).then(() => setMessage('File created'));
    } else if (action === 'edit') {
      axios.post('/edit', { filename, content }).then(() => setMessage('File edited'));
    } else if (action === 'delete') {
      axios.post('/delete', { filename }).then(() => setMessage('File deleted'));
    }
  };
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: 40, minWidth: 350, maxWidth: 420, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontWeight: 700, fontSize: 32, marginBottom: 8, color: '#3730a3', letterSpacing: 1 }}>MCP Filesystem</h2>
        <div style={{ marginBottom: 24, color: '#64748b', fontSize: 16, textAlign: 'center' }}>Upload a folder and use the prompt box to create, edit, or delete files.</div>
        <label htmlFor="folder-upload" style={{ display: 'block', marginBottom: 20, width: '100%' }}>
          <div style={{ border: '2px dashed #a5b4fc', borderRadius: 10, padding: 24, textAlign: 'center', background: '#f8fafc', cursor: 'pointer', transition: 'border 0.2s' }}>
            <span style={{ color: '#6366f1', fontWeight: 600, fontSize: 18 }}>Click or drag a folder here</span>
            <input id="folder-upload" type="file" webkitdirectory="true" directory="true" multiple onChange={handleFolderUpload} style={{ display: 'none' }} />
          </div>
        </label>
        <div style={{ marginTop: 8, width: '100%' }}>
          <input
            type="text"
            placeholder="Prompt (e.g. create test.txt hello)"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 8,
              border: '1px solid #c7d2fe',
              fontSize: 16,
              marginBottom: 12,
              outline: 'none',
              boxSizing: 'border-box',
              background: '#f1f5f9',
              color: '#334155',
              transition: 'border 0.2s'
            }}
          />
          <button
            onClick={handlePrompt}
            style={{
              width: '100%',
              padding: '12px 0',
              borderRadius: 8,
              background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 16,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
              marginBottom: 8,
              transition: 'background 0.2s'
            }}
          >
            Submit
          </button>
        </div>
        {message && <div style={{ marginTop: 16, color: '#059669', fontWeight: 600, fontSize: 16 }}>{message}</div>}
        {folderFiles.length > 0 && (
          <div style={{ marginTop: 24, width: '100%' }}>
            <div style={{ color: '#6366f1', fontWeight: 600, marginBottom: 8 }}>Uploaded Files:</div>
            <ul style={{ maxHeight: 120, overflowY: 'auto', background: '#f1f5f9', borderRadius: 8, padding: 12, fontSize: 14, color: '#334155', margin: 0 }}>
              {folderFiles.map(f => (
                <li key={f.name + f.size} style={{ marginBottom: 4 }}>{f.webkitRelativePath || f.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
export default App; 