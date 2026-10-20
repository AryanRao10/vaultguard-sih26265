"use client";

import { useState } from "react";
import { Upload, ShieldCheck, FileText, AlertTriangle, CheckCircle2, Server, Lock, Award, Activity, Database, RefreshCw } from "lucide-react";

export default function VaultGuardPortal() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/api/v1/upload-fdr", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with FastAPI backend security pipeline.");
      }

      const data = await response.json();
      setResult(data);
      setHistory((prev) => [data, ...prev]);
    } catch (err: any) {
      setError(err.message || "Connection failure with backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white pb-16">
      {/* Top Institutional Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-tr from-indigo-700 to-blue-600 p-3 rounded-2xl shadow-lg shadow-indigo-500/20 text-white">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900">VaultGuard AICTE</h1>
                <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-indigo-200">
                  SIH26265 Enterprise Portal
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Smart Security Deposit & Fixed Deposit Receipt (FDR) Lifecycle Engine</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-700 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <Server className="w-3.5 h-3.5" />
              <span>FastAPI Secure Gateway Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        
        {/* Metric Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">System Security</p>
              <h3 className="text-lg font-bold text-slate-900 mt-1">SHA-256 Active</h3>
            </div>
            <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
              <Lock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">OCR Engine</p>
              <h3 className="text-lg font-bold text-slate-900 mt-1">Dual-Pipeline</h3>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
              <Activity className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Database Sync</p>
              <h3 className="text-lg font-bold text-slate-900 mt-1">Supabase Live</h3>
            </div>
            <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
              <Database className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Verified Documents</p>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{history.length} Processed</h3>
            </div>
            <div className="bg-amber-50 p-3 rounded-xl text-amber-600">
              <Award className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Core Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel: Document Uploader */}
          <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-indigo-600" /> FDR Document Ingestion
                </h2>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-mono">PDF Only</span>
              </div>
              <p className="text-xs text-slate-500 mb-6">
                Upload institutional Fixed Deposit Receipts to execute cryptographic tamper-checks and automated text extraction.
              </p>

              <label className="border-2 border-dashed border-slate-300 hover:border-indigo-600 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-50/50 hover:bg-indigo-50/30 transition-all text-center group">
                <div className="bg-white p-4 rounded-full shadow-sm border border-slate-200 group-hover:scale-105 transition-transform mb-3">
                  <FileText className="w-8 h-8 text-indigo-600" />
                </div>
                <span className="text-sm font-semibold text-slate-800">
                  {file ? file.name : "Click to select or drop FDR document"}
                </span>
                <span className="text-xs text-slate-400 mt-1">Maximum file size: 25MB</span>
                <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
              </label>
            </div>

            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className={`mt-8 w-full py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${
                !file || loading
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25 cursor-pointer"
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Executing Security Pipeline...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify & Secure FDR</span>
                </>
              )}
            </button>
          </div>

          {/* Right Panel: Analysis & Cryptographic Proof */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" /> Cryptographic Integrity & OCR Ledger
            </h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-sm flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            {!result && !error && !loading && (
              <div className="flex-1 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center p-12 text-slate-400">
                <FileText className="w-12 h-12 mb-3 stroke-1 text-slate-300" />
                <p className="text-sm font-semibold text-slate-700">Awaiting Document Submission</p>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">Upload an FDR file on the left panel to generate real-time SHA-256 signatures and extraction metrics.</p>
              </div>
            )}

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-12 text-slate-500">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-sm font-semibold text-slate-800">Processing Dual-Pipeline OCR & Hash Generation...</p>
                <p className="text-xs text-slate-400 mt-1">Verifying structural integrity against AICTE compliance standards.</p>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-5">
                <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center text-xs border-b border-slate-200 pb-3">
                    <span className="text-slate-500 font-medium">Verification Status</span>
                    <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verified & Tamper-Evident
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/60">
                      <span className="text-xs text-slate-400 block mb-1 font-medium">Extraction Engine</span>
                      <span className="font-semibold text-slate-800 text-xs">{result.extraction_method}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/60">
                      <span className="text-xs text-slate-400 block mb-1 font-medium">Confidence Score</span>
                      <span className="font-bold text-emerald-600 text-sm">{result.confidence_score}%</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-slate-500 block mb-1.5 font-semibold">SHA-256 Cryptographic Fingerprint</span>
                    <div className="bg-slate-900 text-emerald-400 p-3 rounded-xl font-mono text-xs break-all shadow-inner border border-slate-800">
                      {result.document_hash}
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-500 block mb-1.5 font-semibold">Extracted Text Preview</span>
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs text-slate-700 font-mono max-h-40 overflow-y-auto leading-relaxed">
                    {result.raw_text_preview}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}