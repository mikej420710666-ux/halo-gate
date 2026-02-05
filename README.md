# Halo Gate

An anti-scam security toolkit designed to help users identify and protect themselves from various types of scams and fraudulent activities.

## Project Structure

```
halo-gate/
├── backend/     # FastAPI REST API
└── frontend/    # Next.js web application
```

## Features (Planned)

- **URL & Domain Analysis**: Check suspicious links and domains for known scam patterns
- **Email Header Verification**: Analyze email headers to detect spoofing and phishing attempts
- **Phone Number Lookup**: Verify phone numbers against known scam databases
- **Phishing Detection**: AI-powered detection of phishing attempts
- **Scam Pattern Recognition**: Identify common scam patterns and tactics

## Quick Start

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The API will be available at http://localhost:8000
API documentation: http://localhost:8000/docs

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The web app will be available at http://localhost:3000

## Tech Stack

### Backend
- FastAPI
- Python 3.9+
- Uvicorn

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

## Development

This project is in early development. The initial setup provides:
- A working FastAPI backend with CORS configured for the frontend
- A Next.js frontend with TypeScript and Tailwind CSS
- Basic project structure ready for feature development

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
