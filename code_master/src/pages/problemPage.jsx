import React, { useState } from 'react'
import { useParams, Outlet, useNavigate } from 'react-router-dom'
import Editor from '@monaco-editor/react'

function ProblemPage() {
  const navigate = useNavigate()
  const [showOutput, setShowOutput] = useState(false)
  const [language, setLanguage] = useState('javascript')
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
  ];

  const defaultCode = {
    javascript: '// Write your solution here\nfunction solution() {\n  \n}',
    python: '# Write your solution here\ndef solution():\n    pass',
    java: '// Write your solution here\nclass Solution {\n    \n}',
    cpp: '// Write your solution here\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    \n};',
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setShowOutput(true);
    }, 1500);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setShowOutput(true);
      navigate('submit');
    }, 1500);
  };

  return (
    <div
      className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-0"
      style={{ background: '#19120a', paddingTop: '64px' }}
    >
      {/* LEFT SIDE - PROBLEM DETAILS & OUTPUT */}
      <div
        className="relative overflow-hidden flex flex-col"
        style={{ borderRight: '1px solid #a18d7a', height: 'calc(100vh - 64px)' }}
      >
        {/* Tabs */}
        <div
          className="flex items-center gap-0 shrink-0"
          style={{ borderBottom: '1px solid #a18d7a', background: '#261e15' }}
        >
          {[
            { key: 'description', label: 'Description' },
            { key: 'solutions', label: 'Solutions' },
            { key: 'submissions', label: 'Submissions' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); if (tab.key === 'description') setShowOutput(false); }}
              className="px-5 py-3 text-sm font-medium cursor-pointer transition-all duration-200"
              style={{
                color: activeTab === tab.key ? '#ffa116' : '#d9c3ad',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.key ? '2px solid #ffa116' : '2px solid transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Problem Details */}
        <div
          className="flex-1 overflow-auto p-6"
          style={{
            opacity: showOutput ? 0 : 1,
            transform: showOutput ? 'translateX(-100%)' : 'translateX(0)',
            transition: 'all 0.4s ease-in-out',
            position: showOutput ? 'absolute' : 'relative',
            inset: showOutput ? '48px 0 0 0' : undefined,
          }}
        >
          <Outlet />
        </div>

        {/* Output Panel */}
        <div
          className="flex-1 overflow-auto p-6"
          style={{
            opacity: showOutput ? 1 : 0,
            transform: showOutput ? 'translateY(0)' : 'translateY(100%)',
            transition: 'all 0.4s ease-in-out',
            position: showOutput ? 'relative' : 'absolute',
            inset: showOutput ? undefined : '48px 0 0 0',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-4" style={{ borderBottom: '1px solid #a18d7a' }}>
            <h3 className="font-semibold text-lg" style={{ color: '#f0e0d1' }}>Execution Results</h3>
            <button
              onClick={() => setShowOutput(false)}
              className="p-2 rounded-lg transition-all duration-200 cursor-pointer"
              style={{ color: '#d9c3ad', background: 'transparent', border: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Status */}
          <div className="p-4 rounded-lg mb-4" style={{ background: 'rgba(0,184,163,0.08)', border: '1px solid rgba(0,184,163,0.2)' }}>
            <p className="text-sm font-semibold" style={{ color: '#00b7a2' }}>
              <span style={{ marginRight: '8px' }}>✓</span>Status: Accepted
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-4 rounded-lg" style={{ background: '#261e15', border: '1px solid #a18d7a' }}>
              <p className="text-xs mb-1" style={{ color: '#d9c3ad', fontFamily: "'JetBrains Mono', monospace" }}>Runtime</p>
              <p className="text-xl font-bold" style={{ color: '#f0e0d1' }}>32 ms</p>
            </div>
            <div className="p-4 rounded-lg" style={{ background: '#261e15', border: '1px solid #a18d7a' }}>
              <p className="text-xs mb-1" style={{ color: '#d9c3ad', fontFamily: "'JetBrains Mono', monospace" }}>Memory</p>
              <p className="text-xl font-bold" style={{ color: '#f0e0d1' }}>14.5 MB</p>
            </div>
          </div>

          {/* Console Output */}
          <div className="p-4 rounded-lg" style={{ background: '#000000', border: '1px solid #a18d7a' }}>
            <p className="text-xs mb-2" style={{ color: '#d9c3ad', fontFamily: "'JetBrains Mono', monospace" }}>Output</p>
            <p style={{ color: '#00b7a2', fontFamily: "'JetBrains Mono', monospace", fontSize: '14px' }}>true</p>
          </div>
          <div className="p-4 rounded-lg mt-3" style={{ background: '#261e15', border: '1px solid #a18d7a' }}>
            <p className="text-xs mb-2" style={{ color: '#d9c3ad', fontFamily: "'JetBrains Mono', monospace" }}>Expected Output</p>
            <p style={{ color: '#f0e0d1', fontFamily: "'JetBrains Mono', monospace", fontSize: '14px' }}>true</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - CODE EDITOR */}
      <div className="flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>
        {/* Editor Header */}
        <div
          className="flex items-center justify-between px-4 py-2 shrink-0"
          style={{ background: '#261e15', borderBottom: '1px solid #a18d7a' }}
        >
          <div className="flex items-center gap-3">
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="px-3 py-1.5 rounded-lg text-sm cursor-pointer"
              style={{
                background: '#19120a', color: '#f0e0d1',
                border: '1px solid #a18d7a', outline: 'none',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {languages.map(l => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-lg cursor-pointer transition-all duration-200"
              style={{ color: '#d9c3ad', background: 'transparent', border: 'none' }}
              title="Reset Code"
              onMouseEnter={e => { e.currentTarget.style.color = '#f0e0d1'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#d9c3ad'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
            </button>
            <button
              className="p-2 rounded-lg cursor-pointer transition-all duration-200"
              style={{ color: '#d9c3ad', background: 'transparent', border: 'none' }}
              title="Settings"
              onMouseEnter={e => { e.currentTarget.style.color = '#f0e0d1'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#d9c3ad'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="flex-1">
          <Editor
            height="100%"
            language={language}
            defaultValue={defaultCode[language]}
            theme="vs-dark"
            options={{
              fontSize: 14,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              padding: { top: 16 },
              lineNumbers: 'on',
              glyphMargin: false,
              folding: true,
              lineDecorationsWidth: 8,
              lineNumbersMinChars: 3,
              renderLineHighlight: 'line',
              cursorBlinking: 'smooth',
              cursorSmoothCaretAnimation: 'on',
              smoothScrolling: true,
              bracketPairColorization: { enabled: true },
            }}
          />
        </div>

        {/* Action Bar */}
        <div
          className="flex items-center justify-between px-4 py-3 shrink-0"
          style={{ background: '#261e15', borderTop: '1px solid #a18d7a' }}
        >
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-all duration-200"
              style={{ color: '#d9c3ad', background: 'transparent', border: '1px solid #a18d7a' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#d9c3ad'; e.currentTarget.style.color = '#f0e0d1'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#a18d7a'; e.currentTarget.style.color = '#d9c3ad'; }}
            >
              Console
            </button>
          </div>
          <div className="flex gap-3">
            <button
              id="run-code-btn"
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-2 px-5 py-2 rounded-lg cursor-pointer text-sm font-medium transition-all duration-200"
              style={{
                color: '#f0e0d1', background: 'rgba(255,255,255,0.06)',
                border: '1px solid #a18d7a',
                opacity: isRunning ? 0.6 : 1,
              }}
              onMouseEnter={e => { if (!isRunning) { e.currentTarget.style.borderColor = '#d9c3ad'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#a18d7a'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
            >
              {isRunning ? (
                <svg className="w-4 h-4" style={{ animation: 'spin-slow 1s linear infinite' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" strokeLinecap="round"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              )}
              Run
            </button>
            <button
              id="submit-code-btn"
              onClick={handleSubmit}
              disabled={isRunning}
              className="flex items-center gap-2 px-5 py-2 rounded-lg cursor-pointer text-sm font-semibold transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #00b7a2, #00897b)',
                color: '#fff', border: 'none',
                boxShadow: '0 4px 15px rgba(0,184,163,0.3)',
                opacity: isRunning ? 0.6 : 1,
              }}
              onMouseEnter={e => { if (!isRunning) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,184,163,0.4)'; }}}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,184,163,0.3)'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProblemPage