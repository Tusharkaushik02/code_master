import React from 'react'
import { useParams } from 'react-router-dom'
import problems from '../dummydata/problemlist'

function ProblemDetail() {
  const { id } = useParams()
  const pr = problems.find((p) => p.name === id)

  if (!pr) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d9c3ad" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M16 16s-1.5-2-4-2-4 2-4 2" strokeLinecap="round" />
          <line x1="9" y1="9" x2="9.01" y2="9" strokeLinecap="round" />
          <line x1="15" y1="9" x2="15.01" y2="9" strokeLinecap="round" />
        </svg>
        <p className="text-lg font-medium mt-4" style={{ color: '#f0e0d1' }}>Problem not found</p>
        <p className="text-sm mt-1" style={{ color: '#d9c3ad' }}>The requested problem does not exist.</p>
      </div>
    )
  }

  const diffColor = pr.difficulty === 'Easy' ? '#00b7a2' : pr.difficulty === 'Medium' ? '#ffc01e' : '#ffb4ab';
  const diffBg = pr.difficulty === 'Easy' ? 'rgba(0,184,163,0.1)' : pr.difficulty === 'Medium' ? 'rgba(255,192,30,0.1)' : 'rgba(255,55,95,0.1)';

  return (
    <div>
      {/* Title */}
      <h1 className="text-2xl font-bold mb-3" style={{ color: '#f0e0d1', fontFamily: "'Inter', sans-serif" }}>
        {pr.name}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-3 mb-6">
        <span
          className="px-3 py-1 rounded-full text-xs font-semibold"
          style={{ color: diffColor, background: diffBg, border: `1px solid ${diffColor}30` }}
        >
          {pr.difficulty}
        </span>
        <span
          className="px-3 py-1 rounded-full text-xs font-medium"
          style={{ color: '#ffa116', background: 'rgba(255,161,22,0.1)', border: '1px solid rgba(255,161,22,0.2)' }}
        >
          {pr.tag}
        </span>
      </div>

      {/* Problem Statement */}
      <div className="mb-6">
        <h2
          className="text-xs font-bold uppercase tracking-wider mb-3"
          style={{ color: '#ffa116', fontFamily: "'JetBrains Mono', monospace" }}
        >
          Problem Statement
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: '#d9c3ad', lineHeight: '1.8' }}>
          {pr.statement}
        </p>
      </div>

      {/* Constraints section (example) */}
      <div className="mb-6 p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #a18d7a' }}>
        <h2
          className="text-xs font-bold uppercase tracking-wider mb-3"
          style={{ color: '#ffa116', fontFamily: "'JetBrains Mono', monospace" }}
        >
          Constraints
        </h2>
        <ul className="space-y-1.5">
          <li className="text-sm flex items-center gap-2" style={{ color: '#d9c3ad' }}>
            <span style={{ color: '#a18d7a' }}>•</span>
            <code style={{ fontFamily: "'JetBrains Mono', monospace", color: '#d9c3ad', fontSize: '13px' }}>
              2 ≤ nums.length ≤ 10⁴
            </code>
          </li>
          <li className="text-sm flex items-center gap-2" style={{ color: '#d9c3ad' }}>
            <span style={{ color: '#a18d7a' }}>•</span>
            <code style={{ fontFamily: "'JetBrains Mono', monospace", color: '#d9c3ad', fontSize: '13px' }}>
              -10⁹ ≤ nums[i] ≤ 10⁹
            </code>
          </li>
        </ul>
      </div>

      {/* Explanation */}
      <div className="mb-6">
        <h2
          className="text-xs font-bold uppercase tracking-wider mb-3"
          style={{ color: '#00b7a2', fontFamily: "'JetBrains Mono', monospace" }}
        >
          Approach Hint
        </h2>
        <div className="p-4 rounded-lg" style={{ background: 'rgba(0,184,163,0.05)', border: '1px solid rgba(0,184,163,0.15)' }}>
          <p className="text-sm leading-relaxed" style={{ color: '#d9c3ad' }}>
            {pr.explanation}
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 pt-4" style={{ borderTop: '1px solid #a18d7a' }}>
        <span className="text-xs" style={{ color: '#d9c3ad' }}>Related Topics:</span>
        <span
          className="px-2.5 py-0.5 rounded-full text-xs font-medium"
          style={{ color: '#ffa116', background: 'rgba(255,161,22,0.1)' }}
        >
          {pr.tag}
        </span>
      </div>
    </div>
  )
}

export default ProblemDetail