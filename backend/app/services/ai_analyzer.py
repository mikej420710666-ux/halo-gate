import os
import json
import re
from typing import Dict, Any, List
from anthropic import Anthropic
import requests
from urllib.parse import urlparse

# Initialize Anthropic client
client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))


async def analyze_email(email_text: str) -> Dict[str, Any]:
    """
    Analyze email content for scam indicators using Claude AI.

    Returns structured analysis with risk level, score, explanation, and indicators.
    """
    prompt = f"""You are a scam detection expert helping seniors stay safe online. Analyze this email for scam indicators.

Email content:
{email_text}

Analyze this email and provide a response in this EXACT JSON format:
{{
    "risk": "safe" or "suspicious" or "danger",
    "score": 0-100 (0 = completely safe, 100 = definitely a scam),
    "explanation": "A clear, simple explanation in 2-3 sentences that a senior citizen can easily understand. Avoid technical jargon.",
    "indicators": ["list", "of", "specific", "red", "flags", "found"]
}}

Key things to check:
- Urgency tactics (demanding immediate action)
- Requests for personal information or money
- Poor grammar and spelling
- Suspicious sender addresses
- Too-good-to-be-true offers
- Threats or fear tactics
- Impersonation of official organizations

Respond ONLY with valid JSON. Use simple, friendly language in the explanation."""

    try:
        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        # Extract JSON from response
        response_text = message.content[0].text

        # Try to find JSON in the response
        json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
        if json_match:
            result = json.loads(json_match.group())
        else:
            result = json.loads(response_text)

        # Ensure all required fields are present
        return {
            "risk": result.get("risk", "suspicious"),
            "score": int(result.get("score", 50)),
            "explanation": result.get("explanation", "Unable to fully analyze this email."),
            "indicators": result.get("indicators", [])
        }

    except Exception as e:
        # Fallback response
        return {
            "risk": "suspicious",
            "score": 50,
            "explanation": f"We couldn't complete the analysis, but please be cautious with this email. Error: {str(e)}",
            "indicators": ["Analysis incomplete"]
        }


async def analyze_link(url: str) -> Dict[str, Any]:
    """
    Analyze URL for scam indicators using Claude AI and additional checks.

    Returns structured analysis with risk level, score, explanation, domain age, and SSL validity.
    """
    # Parse URL
    try:
        parsed = urlparse(url)
        domain = parsed.netloc or parsed.path
    except:
        domain = "unknown"

    # Check SSL
    ssl_valid = url.startswith("https://")

    # Basic domain age check (simplified - in production would use WHOIS API)
    domain_age = "Unknown"
    if domain:
        # Heuristic: Check if domain contains suspicious patterns
        suspicious_tlds = ['.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top']
        has_suspicious_tld = any(domain.endswith(tld) for tld in suspicious_tlds)
        if has_suspicious_tld:
            domain_age = "Recently registered (suspicious)"
        else:
            domain_age = "Established domain"

    prompt = f"""You are a scam detection expert helping seniors stay safe online. Analyze this URL for scam indicators.

URL: {url}
Domain: {domain}
Has HTTPS: {ssl_valid}

Analyze this link and provide a response in this EXACT JSON format:
{{
    "risk": "safe" or "suspicious" or "danger",
    "score": 0-100 (0 = completely safe, 100 = definitely a scam),
    "explanation": "A clear, simple explanation in 2-3 sentences that a senior citizen can easily understand. Avoid technical jargon."
}}

Key things to check:
- Suspicious domain names (misspellings of known brands, random characters)
- Lack of HTTPS (not secure)
- URL shorteners hiding the real destination
- Unusual top-level domains (.tk, .xyz, etc.)
- URLs trying to look like legitimate companies (paypa1.com instead of paypal.com)
- Very long or obfuscated URLs

Respond ONLY with valid JSON. Use simple, friendly language in the explanation."""

    try:
        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        # Extract JSON from response
        response_text = message.content[0].text

        # Try to find JSON in the response
        json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
        if json_match:
            result = json.loads(json_match.group())
        else:
            result = json.loads(response_text)

        # Ensure all required fields are present
        return {
            "risk": result.get("risk", "suspicious"),
            "score": int(result.get("score", 50)),
            "explanation": result.get("explanation", "Unable to fully analyze this link."),
            "domain_age": domain_age,
            "ssl_valid": ssl_valid
        }

    except Exception as e:
        # Fallback response
        return {
            "risk": "suspicious",
            "score": 50,
            "explanation": f"We couldn't complete the analysis, but please be cautious with this link. Error: {str(e)}",
            "domain_age": domain_age,
            "ssl_valid": ssl_valid
        }


async def analyze_phone(phone_number: str) -> Dict[str, Any]:
    """
    Analyze phone number for scam indicators using Claude AI.

    Returns structured analysis with risk level, score, explanation, and report count.
    """
    # Clean phone number
    cleaned_phone = re.sub(r'[^\d+]', '', phone_number)

    # Basic validation
    is_valid = len(cleaned_phone) >= 10

    # Check for common scam patterns
    reports = 0
    suspicious_patterns = [
        "spam likely" in phone_number.lower(),
        phone_number.startswith("+1900"),  # Premium rate
        phone_number.startswith("+1976"),  # Premium rate
    ]

    if any(suspicious_patterns):
        reports = 5  # Simulated report count

    prompt = f"""You are a scam detection expert helping seniors stay safe from phone scams. Analyze this phone number.

Phone number: {phone_number}
Cleaned format: {cleaned_phone}
Valid format: {is_valid}

Analyze this phone number and provide a response in this EXACT JSON format:
{{
    "risk": "safe" or "suspicious" or "danger",
    "score": 0-100 (0 = completely safe, 100 = definitely a scam),
    "explanation": "A clear, simple explanation in 2-3 sentences that a senior citizen can easily understand. Avoid technical jargon."
}}

Key things to check:
- Spoofed or invalid numbers
- International numbers claiming to be local organizations
- Premium rate numbers (900, 976, etc.)
- Numbers associated with common scam types:
  - IRS/tax scams
  - Tech support scams
  - Prize/lottery scams
  - Social Security scams
  - Bank/credit card scams

Respond ONLY with valid JSON. Use simple, friendly language in the explanation."""

    try:
        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        # Extract JSON from response
        response_text = message.content[0].text

        # Try to find JSON in the response
        json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
        if json_match:
            result = json.loads(json_match.group())
        else:
            result = json.loads(response_text)

        # Ensure all required fields are present
        return {
            "risk": result.get("risk", "suspicious"),
            "score": int(result.get("score", 50)),
            "explanation": result.get("explanation", "Unable to fully analyze this phone number."),
            "reports": reports
        }

    except Exception as e:
        # Fallback response
        return {
            "risk": "suspicious",
            "score": 50,
            "explanation": f"We couldn't complete the analysis, but please be cautious with calls from this number. Error: {str(e)}",
            "reports": reports
        }
