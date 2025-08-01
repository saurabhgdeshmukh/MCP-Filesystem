# MCP Filesystem Assignment

This project is a simple MCP (Multi-Client Protocol) server and client system for performing filesystem operations (create, edit, delete files) within a specified folder. It includes a Node.js backend and a React frontend.

## Features
- MCP server for file operations (create, edit, delete, upload)
- React frontend for folder upload and file management via prompt
- Modern, user-friendly interface

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm

### Installation
1. Clone this repository.
2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

#### 1. Start the MCP Server
In one terminal, run:
```
node server.js
```
This will start the backend server on port 3001.

#### 2. Start the Frontend
In another terminal, run:
```
npm run dev
```
This will start the React frontend on http://localhost:3000.

### Usage
- Open http://localhost:3000 in your browser.
- Upload a folder using the provided interface.
- Use the prompt box to create, edit, or delete files. Example prompts:
  - `create test.txt Hello world`
  - `edit test.txt New content`
  - `delete test.txt`
- Uploaded files will be listed below the prompt.

### Project Structure
- `server.js` - Node.js Express server for file operations
- `client.js` - Node.js client for interacting with the server (optional, for scripts)
- `src/` - React frontend source code
- `mcp_files/` - Directory where files are managed (created automatically)

### Notes
- The server only operates on files within the `mcp_files` directory for safety.
- The frontend uses a simple prompt format: `action filename content`.
- Make sure both the backend and frontend are running for full functionality.

### License
This project is for educational purposes.
