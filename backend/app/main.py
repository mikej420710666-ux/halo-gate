from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import scanner

app = FastAPI(
    title="Halo Gate API",
    description="Anti-scam security toolkit API",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(scanner.router, prefix="/api", tags=["scanner"])


@app.get("/")
async def root():
    return {"message": "Halo Gate API - Anti-Scam Security Toolkit"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
