"use client";

import { useState } from "react";
import Link from "next/link";
import RiskIndicator from "@/app/components/RiskIndicator";

interface ScanResult {
  risk: "safe" | "suspicious" | "danger";
  score: number;
  explanation: string;
  indicators: string[];
}

export default function EmailScanPage() {
  const [emailText, setEmailText] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (!emailText.trim()) {
      setError("Please enter some email text to scan.");
      return;
    }

    setIsScanning(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://localhost:8002/api/scan/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: emailText }),
      });

      if (!response.ok) {
        throw new Error("Failed to scan email");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Could not connect to the scanner. Make sure the backend is running.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleReset = () => {
    setEmailText("");
    setResult(null);
    setError(null);
  };

  const getActionRecommendations = (risk: string) => {
    switch (risk) {
      case "safe":
        return [
          "This email appears legitimate",
          "Still, never share passwords or financial info via email",
          "If unsure, contact the sender through official channels"
        ];
      case "suspicious":
        return [
          "Do not click any links in this email",
          "Do not reply or provide any information",
          "Contact the company directly using a phone number from their official website",
          "Delete this email"
        ];
      case "danger":
        return [
          "DELETE this email immediately",
          "Do NOT click any links or attachments",
          "Do NOT reply or provide any information",
          "If you already clicked a link, change your passwords immediately",
          "Consider reporting this to the FTC at reportfraud.ftc.gov"
        ];
      default:
        return [];
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-xl text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          ← Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Check an Email
          </h1>
          <p className="text-2xl text-gray-700 dark:text-gray-300">
            Paste the email text below. We'll tell you if it's a scam.
          </p>
        </div>

        {/* Input Section */}
        {!result && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <label htmlFor="email-text" className="block text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Email Content:
            </label>
            <textarea
              id="email-text"
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              placeholder="Paste the email content here..."
              className="w-full min-h-[300px] p-6 text-xl border-4 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white resize-y"
              disabled={isScanning}
            />

            {error && (
              <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 border-2 border-red-500 rounded-lg">
                <p className="text-xl text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            <button
              onClick={handleScan}
              disabled={isScanning}
              className="w-full mt-6 h-[70px] bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-2xl font-bold rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {isScanning ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-8 w-8 mr-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Analyzing email...
                </span>
              ) : (
                "Scan Email"
              )}
            </button>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="space-y-8">
            {/* Risk Indicator */}
            <RiskIndicator risk={result.risk} score={result.score} />

            {/* Explanation */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Why?
              </h2>
              <p className="text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                {result.explanation}
              </p>
            </div>

            {/* Red Flags */}
            {result.indicators.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Red Flags Found:
                </h2>
                <ul className="space-y-3">
                  {result.indicators.map((indicator, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 text-3xl mr-4">•</span>
                      <span className="text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                        {indicator}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Recommendations */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                What should I do?
              </h2>
              <ul className="space-y-3">
                {getActionRecommendations(result.risk).map((action, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 text-3xl mr-4">→</span>
                    <span className="text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                      {action}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full h-[70px] bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Scan Another Email
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
