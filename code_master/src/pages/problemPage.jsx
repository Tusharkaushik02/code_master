import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function ProblemPage() {
  const navigate = useNavigate()
  const [showOutput, setShowOutput] = useState(false)

  return (
    <div className="p-6 grid grid-cols-2 gap-6 min-h-screen bg-gray-100">
      {/* LEFT SIDE - PROBLEM DETAILS & OUTPUT */}
      <div className="relative bg-white rounded-xl shadow-md overflow-hidden">
        {/* Problem Details */}
        <div
          className={`absolute inset-0 p-6 overflow-auto transition-all duration-500 ease-in-out ${
            showOutput ? 'opacity-0 -translate-x-full' : 'opacity-100 translate-x-0'
          }`}
        >
          <Outlet />
        </div>

        {/* Output Panel */}
        <div
          className={`absolute inset-0 p-6 overflow-auto transition-all duration-500 ease-in-out ${
            showOutput ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
          }`}
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
              <h3 className="font-semibold text-lg text-gray-800">Execution Results</h3>
              <button
                onClick={() => setShowOutput(false)}
                className="p-2 hover:bg-gray-200 rounded-lg transition"
                title="Close"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Output Content */}
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-green-800">Status: Accepted</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Runtime</p>
                  <p className="text-xl font-bold text-gray-800">32 ms</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Memory</p>
                  <p className="text-xl font-bold text-gray-800">14.5 MB</p>
                </div>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                <p className="text-gray-500 text-xs mb-2">Output</p>
                <p>true</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-2">Expected Output</p>
                <p className="font-mono text-gray-800">true</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (EDITOR) */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
        <Editor
          height="82%"
          defaultLanguage="javascript"
          defaultValue="// Write your solution here"
        />
        <div className="flex gap-3 justify-end p-4 bg-gray-50 border-t border-gray-200">
          <button
            className="px-5 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition font-medium text-sm"
            onClick={() => setShowOutput(true)}
          >
            Run
          </button>
          <button
            className="px-5 py-2 bg-green-600 text-white rounded cursor-pointer hover:bg-green-700 transition font-medium text-sm"
            onClick={() => {
              setShowOutput(true)
              navigate('submit')
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProblemPage