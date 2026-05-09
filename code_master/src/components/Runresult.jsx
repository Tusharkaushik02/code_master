import React, { useState, useEffect } from 'react'

function SubmitData() {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 100);
  }, []);

  const result = {
    status: "Accepted",
    runtime: "32 ms",
    runtimePercentile: "87.4",
    memory: "14.5 MB",
    memoryPercentile: "72.1",
    output: "true",
    expected: "true",
    testCases: { passed: 3, total: 3 },
  }

  const isAccepted = result.status === "Accepted";
  const statusColor = isAccepted ? '#00b7a2' : '#ffb4ab';

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

        {/* Status Header */}
        <div
          className="flex items-center gap-3 p-4 rounded-lg mb-5"
          style={{
            background: isAccepted ? 'rgba(0,184,163,0.08)' : 'rgba(255,55,95,0.08)',
            border: `1px solid ${isAccepted ? 'rgba(0,184,163,0.2)' : 'rgba(255,55,95,0.2)'}`,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={statusColor}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <div>
            <p className="text-xl font-bold" style={{ color: statusColor }}>{result.status}</p>
            <p className="text-xs" style={{ color: '#d9c3ad' }}>
              {result.testCases.passed}/{result.testCases.total} test cases passed
            </p>
          </div>
        </div>

        {/* Stats with Percentiles */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="p-4 rounded-lg" style={{ background: '#19120a', border: '1px solid #a18d7a' }}>
            <p className="text-xs mb-1" style={{ color: '#d9c3ad', fontFamily: "'JetBrains Mono', monospace" }}>Runtime</p>
            <p className="text-xl font-bold" style={{ color: '#f0e0d1' }}>{result.runtime}</p>
            <div className="mt-2">
              <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-full rounded-full" style={{ width: `${result.runtimePercentile}%`, background: '#00b7a2' }} />
              </div>
              <p className="text-xs mt-1" style={{ color: '#d9c3ad' }}>Beats {result.runtimePercentile}%</p>
            </div>
          </div>
          <div className="p-4 rounded-lg" style={{ background: '#19120a', border: '1px solid #a18d7a' }}>
            <p className="text-xs mb-1" style={{ color: '#d9c3ad', fontFamily: "'JetBrains Mono', monospace" }}>Memory</p>
            <p className="text-xl font-bold" style={{ color: '#f0e0d1' }}>{result.memory}</p>
            <div className="mt-2">
              <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-full rounded-full" style={{ width: `${result.memoryPercentile}%`, background: '#ffa116' }} />
              </div>
              <p className="text-xs mt-1" style={{ color: '#d9c3ad' }}>Beats {result.memoryPercentile}%</p>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="p-4 rounded-lg mb-3" style={{ background: '#000000', border: '1px solid #a18d7a' }}>
          <p className="text-xs mb-2" style={{ color: '#d9c3ad', fontFamily: "'JetBrains Mono', monospace" }}>Output</p>
          <p style={{ color: '#00b7a2', fontFamily: "'JetBrains Mono', monospace", fontSize: '14px' }}>{result.output}</p>
        </div>
        <div className="p-4 rounded-lg" style={{ background: '#19120a', border: '1px solid #a18d7a' }}>
          <p className="text-xs mb-2" style={{ color: '#d9c3ad', fontFamily: "'JetBrains Mono', monospace" }}>Expected</p>
          <p style={{ color: '#f0e0d1', fontFamily: "'JetBrains Mono', monospace", fontSize: '14px' }}>{result.expected}</p>
        </div>
      </div>
    </div>
  )
}

export default SubmitData