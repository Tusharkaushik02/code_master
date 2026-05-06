import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import problems from '../dummydata/problemlist'
function ProblemDetail() {
    const { id } = useParams()
  const navigate=useNavigate()

  const pr = problems.find((p) => p.name === id)

  if (!pr) {
    return (
      <div className="p-10 text-center text-xl">
        Problem not found
      </div>
    )
  }
  return (
    <div><h1 className="text-2xl font-bold mb-2">{pr.name}</h1>

        <p className="text-sm text-gray-500 mb-2">
          {pr.difficulty} • {pr.tag}
        </p>

        <h2 className="font-semibold mt-4">Problem Statement</h2>
        <p className="text-gray-700 mb-4">{pr.statement}</p>

        <h2 className="font-semibold">Explanation</h2>
        <p className="text-gray-700">{pr.explanation}</p></div>
  )
}

export default ProblemDetail