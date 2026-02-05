"use client";

import { useState } from "react";
import Link from "next/link";
import RiskIndicator from "@/app/components/RiskIndicator";

interface ScanResult {
  risk: "safe" | "suspicious" | "danger";
  score: number;
  explanation: string;
  domain_age: string;
  ssl_valid: boolean;
}

export default function LinkScanPage() {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (!url.trim()) {
      setError("Please enter a URL to scan.");
      return;
    }

    setIsScanning(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://localhost:8002/api/scan/link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to scan link");
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
    setUrl("");
    setResult(null);
    setError(null);
  };

  const getActionRecommendations = (risk: string) => {
    switch (risk) {
      case "safe":
        return [
          "This website appears to be legitimate",
          "Still, never enter passwords or credit card info unless you initiated the visit",
          "Look for the padlock icon in your browser's address bar",
          "When in doubt, type the company's official web address yourself"
        ];
      case "suspicious":
        return [
          "Do NOT click this link",
          "Do NOT enter any personal information",
          "If you think this is supposed to be a real company, go to their website by typing the address yourself",
          "Be especially careful of links in emails or text messages"
        ];
      case "danger":
        return [
          "DO NOT visit this website under any circumstances",
          "This is very likely a phishing or scam site",
          "If you already visited it, do NOT enter any information",
          "If you entered passwords, change them immediately",
          "Consider running a virus scan on your computer",
          "Report this link to the FTC at reportfraud.ftc.gov"
        ];
      default:
        return [];
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-xl text-green-600 dark:text-green-400 hover:underline mb-8"
        >
          ← Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Check a Link
          </h1>
          <p className="text-2xl text-gray-700 dark:text-gray-300">
            Paste the website address. We'll check if it's safe.
          </p>
        </div>

        {/* Input Section */}
        {!result && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <label htmlFor="url-input" className="block text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Website Address (URL):
            </label>
            <input
              id="url-input"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full h-[70px] px-6 text-xl border-4 border-gray-300 dark:border-gray-600 rounded-xl focus:border-green-500 focus:outline-none dark:bg-gray-700 dark:text-white"
              disabled={isScanning}
              onKeyDown={(e) => e.key === "Enter" && handleScan()}
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
                  Analyzing link...
                </span>
              ) : (
                "Scan Link"
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
              <p className="text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {result.explanation}
              </p>

              {/* Technical Details */}
              <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-6 mt-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Technical Details:
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-xl font-semibold text-gray-700 dark:text-gray-300 w-48">
                      Secure (HTTPS):
                    </span>
                    <span className={`text-xl ${result.ssl_valid ? "text-green-600" : "text-red-600"} font-bold`}>
                      {result.ssl_valid ? "✓ Yes" : "✗ No"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xl font-semibold text-gray-700 dark:text-gray-300 w-48">
                      Domain Age:
                    </span>
                    <span className="text-xl text-gray-700 dark:text-gray-300">
                      {result.domain_age}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Recommendations */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                What should I do?
              </h2>
              <ul className="space-y-3">
                {getActionRecommendations(result.risk).map((action, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 text-3xl mr-4">→</span>
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
              className="w-full h-[70px] bg-green-600 hover:bg-green-700 text-white text-2xl font-bold rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Scan Another Link
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
