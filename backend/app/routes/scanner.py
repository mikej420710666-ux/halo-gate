from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Literal
from app.services.ai_analyzer import analyze_email, analyze_link, analyze_phone

router = APIRouter()


# Request Models
class EmailScanRequest(BaseModel):
    text: str = Field(..., description="Email content to analyze")


class LinkScanRequest(BaseModel):
    url: str = Field(..., description="URL to analyze")


class PhoneScanRequest(BaseModel):
    phone: str = Field(..., description="Phone number to analyze")


# Response Models
class EmailScanResponse(BaseModel):
    risk: Literal["safe", "suspicious", "danger"]
    score: int = Field(..., ge=0, le=100, description="Risk score from 0-100")
    explanation: str
    indicators: List[str]


class LinkScanResponse(BaseModel):
    risk: Literal["safe", "suspicious", "danger"]
    score: int = Field(..., ge=0, le=100, description="Risk score from 0-100")
    explanation: str
    domain_age: str
    ssl_valid: bool


class PhoneScanResponse(BaseModel):
    risk: Literal["safe", "suspicious", "danger"]
    score: int = Field(..., ge=0, le=100, description="Risk score from 0-100")
    explanation: str
    reports: int


@router.post("/scan/email", response_model=EmailScanResponse)
async def scan_email(request: EmailScanRequest):
    """
    Analyze email content for scam indicators.

    Returns risk assessment with explanation in senior-friendly language.
    """
    try:
        result = await analyze_email(request.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


@router.post("/scan/link", response_model=LinkScanResponse)
async def scan_link(request: LinkScanRequest):
    """
    Analyze URL for potential scam indicators.

    Checks domain age, SSL validity, and known scam patterns.
    """
    try:
        result = await analyze_link(request.url)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


@router.post("/scan/phone", response_model=PhoneScanResponse)
async def scan_phone(request: PhoneScanRequest):
    """
    Analyze phone number for scam indicators.

    Checks against known scam patterns and provides risk assessment.
    """
    try:
        result = await analyze_phone(request.phone)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
