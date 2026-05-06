import React, { useEffect, useState } from 'react'

function Run() {

  const [result, setResult] = useState(null)

  useEffect(() => {
    const fakeResult = {
      status: Math.random() > 0.5 ? "Accepted" : "Wrong Answer",
      runtime: "32 ms",
      memory: "14 MB",
      output: "true",
      expected: "true"
    }
    setResult(fakeResult)
  }, [])

  return (
    <div className="mt-6">
      {result && (
        <div className="bg-white p-6 rounded-xl shadow-lg ">

          {/* STATUS */}
          <h2
            className={`text-xl font-bold mb-4 text-center
              ${result.status === "Accepted"
                ? "text-green-600"
                : "text-red-600"}
            `}
          >
            {result.status}
          </h2>

          {/* STATS */}
          <div className="flex justify-between mb-4 text-sm text-gray-600">
            <div>
              <p>Runtime</p>
              <p className="font-semibold text-black">
                {result.runtime}
              </p>
            </div>

            <div>
              <p>Memory</p>
              <p className="font-semibold text-black">
                {result.memory}
              </p>
            </div>
          </div>

          {/* OUTPUT */}
          <div className="bg-gray-100 p-3 rounded-lg text-sm">
            <p className="text-gray-500">Output</p>
            <p className="font-mono">{result.output}</p>

            <p className="text-gray-500 mt-2">Expected</p>
            <p className="font-mono">{result.expected}</p>
          </div>

        </div>
      )}
    </div>
  )
}

export default Run