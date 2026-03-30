
## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/qa-bot.git
cd qa-bot
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open http://localhost:3000 in your browser

5. Run Ollama
```bash
ollama serve
```

## 🏗️ Architecture

### Frontend (public/index.html)
- Modern UI with gradient design
- Drag & drop file upload
- Real-time response streaming
- Error handling and loading states

### Backend (index.js)
- Express.js server
- Multer for file handling
- Secure file processing
- Automatic cleanup after analysis

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express
- **File Handling**: Multer
- **AI Processing**: Custom QA Bot implementation

## 🔄 API Endpoints

### POST /query
Upload a file and ask questions about its contents.

```javascript
// Request (multipart/form-data)
{
  file: File,
  query: string
}

// Response
{
  answer: string
}
```


## 🔜 Future Enhancements

- [ ] Support for multiple file formats (PDF, DOCX, TXT)
- [ ] Chat history persistence
- [ ] Document highlighting for answers
- [ ] Batch processing capability
- [ ] Export conversation history


