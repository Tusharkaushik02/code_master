import React, { useEffect, useState } from 'react'

function Run() {
  const [result, setResult] = useState(null)
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    const fakeResult = {
      status: Math.random() > 0.5 ? "Accepted" : "Wrong Answer",
      runtime: `${Math.floor(20 + Math.random() * 60)} ms`,
      memory: `${(10 + Math.random() * 10).toFixed(1)} MB`,
      output: "true",
      expected: "true",
      testCases: { passed: Math.random() > 0.5 ? 3 : 2, total: 3 },
    }
    setResult(fakeResult)
    setTimeout(() => setAnimateIn(true), 100)
  }, [])

  if (!result) return null;

  const isAccepted = result.status === "Accepted";
  const statusColor = isAccepted ? '#00b7a2' : '#ffb4ab';
  const statusBg = isAccepted ? 'rgba(0,184,163,0.08)' : 'rgba(255,55,95,0.08)';
  const statusBorder = isAccepted ? 'rgba(0,184,163,0.2)' : 'rgba(255,55,95,0.2)';

  return (
    <div
      className="mt-2"
      style={{
        opacity: animateIn ? 1 : 0,
        transform: animateIn ? 'translateY(0)' : 'translateY(15px)',
        transition: 'all 0.4s ease-out',
      }}
    >
      <div className="p-6 rounded-xl" style={{ background: '#261e15', border: '1px solid #a18d7a' }}>

        {/* Status */}
        <div
          className="flex items-center gap-3 p-4 rounded-lg mb-5"
          style={{ background: statusBg, border: `1px solid ${statusBorder}` }}
        >
          {isAccepted ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill={statusColor}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill={statusColor}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
          )}
          <div>
            <p className="text-lg font-bold" style={{ color: statusColor }}>{result.status}</p>
            <p className="text-xs" style={{ color: '#d9c3ad' }}>
              {result.testCases.passed}/{result.testCases.total} test cases passed
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="p-4 rounded-lg" style={{ background: '#19120a', border: '1px solid #a18d7a' }}>
            <p className="text-xs mb-1" style={{ color: '#d9c3ad', fontFamily: "'JetBrains Mono', monospace" }}>Runtime</p>
            <p className="text-xl font-bold" style={{ color: '#f0e0d1' }}>{result.runtime}</p>
          </div>
          <div className="p-4 rounded-lg" style={{ background: '#19120a', border: '1px solid #a18d7a' }}>
            <p className="text-xs mb-1" style={{ color: '#d9c3ad', fontFamily: "'JetBrains Mono', monospace" }}>Memory</p>
            <p className="text-xl font-bold" style={{ color: '#f0e0d1' }}>{result.memory}</p>
          </div>
        </div>

        {/* Output */}
        <div className="p-4 rounded-lg mb-3" style={{ background: '#000000', border: '1px solid #a18d7a' }}>
          <p className="text-xs mb-2" style={{ color: '#d9c3ad', fontFamily: "'JetBrains Mono', monospace" }}>Output</p>
          <p style={{ color: statusColor, fontFamily: "'JetBrains Mono', monospace", fontSize: '14px' }}>{result.output}</p>
        </div>
        <div className="p-4 rounded-lg" style={{ background: '#19120a', border: '1px solid #a18d7a' }}>
          <p className="text-xs mb-2" style={{ color: '#d9c3ad', fontFamily: "'JetBrains Mono', monospace" }}>Expected</p>
          <p style={{ color: '#f0e0d1', fontFamily: "'JetBrains Mono', monospace", fontSize: '14px' }}>{result.expected}</p>
        </div>
      </div>
    </div>
  )
}

export default Run