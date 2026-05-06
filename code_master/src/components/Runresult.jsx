import React from 'react'

function SubmitData() {

  // dummy result (later connect with backend)
  const result = {
    status: "Accepted", // or "Wrong Answer"
    runtime: "32 ms",
    memory: "14.5 MB",
    output: "true",
    expected: "true"
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">

      {/* STATUS */}
      <h2
        className={`text-xl font-bold mb-4
          ${result.status === "Accepted" ? "text-green-600" : "text-red-600"}
        `}
      >
        {result.status}
      </h2>

      {/* STATS */}
      <div className="flex gap-6 mb-4">
        <div>
          <p className="text-gray-500 text-sm">Runtime</p>
          <p className="font-semibold">{result.runtime}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Memory</p>
          <p className="font-semibold">{result.memory}</p>
        </div>
      </div>

      {/* OUTPUT SECTION */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-sm text-gray-500">Output</p>
        <p className="font-mono">{result.output}</p>

        <p className="text-sm text-gray-500 mt-2">Expected</p>
        <p className="font-mono">{result.expected}</p>
      </div>

    </div>
  )
}

export default SubmitData