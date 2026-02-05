# Halo Gate Backend

FastAPI backend for the anti-scam security toolkit with AI-powered analysis.

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── routes/
│   │   ├── __init__.py
│   │   └── scanner.py       # Scan endpoints
│   ├── services/
│   │   ├── __init__.py
│   │   └── ai_analyzer.py   # Claude AI integration
│   └── utils/
│       └── __init__.py
├── .env                     # Environment variables (API keys)
├── .env.example            # Example environment file
├── requirements.txt        # Python dependencies
└── run.py                  # Application entry point
```

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment variables:
```bash
# Copy .env.example to .env and add your API key
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

4. Run the development server:
```bash
python run.py
```

The API will be available at http://localhost:8000
API documentation: http://localhost:8000/docs

## API Endpoints

### Scan Email
`POST /api/scan/email`
```json
{
  "text": "email content here"
}
```

### Scan Link
`POST /api/scan/link`
```json
{
  "url": "https://example.com"
}
```

### Scan Phone
`POST /api/scan/phone`
```json
{
  "phone": "+1234567890"
}
```

All endpoints return structured risk assessments with senior-friendly explanations.
