import React from 'react'
import problems from '../dummydata/problemlist'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

function Dashboard() {

  const navigate = useNavigate();
  const { user } = useAuth();

  const total = problems.length;
  const easy = problems.filter(p => p.difficulty === "Easy").length;
  const medium = problems.filter(p => p.difficulty === "Medium").length;
  const hard = problems.filter(p => p.difficulty === "Hard").length;

  // fake solved data (you can replace later)
  const solved = 8;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome Back, {user?.name || 'User'} 👋
        </h1>

        <button
          onClick={() => navigate('/problemlist')}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          Go to Problems
        </button>
      </div>

      {/* USER CARD */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold">{user?.name || 'User'}</h2>
        <p className="text-gray-500">{user?.email || 'Aspiring Software Engineer'}</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-gray-600">Total</h2>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        <div className="bg-green-100 p-6 rounded-xl text-center">
          <h2 className="text-green-700">Easy</h2>
          <p className="text-2xl font-bold text-green-800">{easy}</p>
        </div>

        <div className="bg-yellow-100 p-6 rounded-xl text-center">
          <h2 className="text-yellow-700">Medium</h2>
          <p className="text-2xl font-bold text-yellow-800">{medium}</p>
        </div>

        <div className="bg-red-100 p-6 rounded-xl text-center">
          <h2 className="text-red-700">Hard</h2>
          <p className="text-2xl font-bold text-red-800">{hard}</p>
        </div>

      </div>

      {/* PROGRESS */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4">Your Progress</h2>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-black h-4 rounded-full"
            style={{ width: `${(solved / total) * 100}%` }}
          ></div>
        </div>

        <p className="mt-2 text-gray-600">
          {solved} / {total} problems solved
        </p>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div
          onClick={() => navigate('/problemlist')}
          className="cursor-pointer bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
        >
          <h2 className="font-semibold text-lg">📚 Practice Problems</h2>
          <p className="text-gray-500">Solve coding questions</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="font-semibold text-lg">❤️ Favorites</h2>
          <p className="text-gray-500">View saved problems</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="font-semibold text-lg">📊 Analytics</h2>
          <p className="text-gray-500">Track your performance</p>
        </div>

      </div>

    </div>
  )
}

export default Dashboard