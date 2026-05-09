import React, { useState, useEffect } from 'react'
import problems from '../dummydata/problemlist'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 100);
  }, []);

  const total = problems.length;
  const easy = problems.filter(p => p.difficulty === "Easy").length;
  const medium = problems.filter(p => p.difficulty === "Medium").length;
  const hard = problems.filter(p => p.difficulty === "Hard").length;

  const solvedEasy = 3;
  const solvedMedium = 2;
  const solvedHard = 0;
  const solved = solvedEasy + solvedMedium + solvedHard;

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  };

  // Activity heatmap (last 12 weeks)
  const weeks = 12;
  const heatmapData = Array.from({ length: weeks * 7 }, () => Math.random() > 0.65 ? Math.ceil(Math.random() * 4) : 0);
  const heatColor = (v) => {
    if (v === 0) return 'rgba(255,255,255,0.03)';
    if (v === 1) return 'rgba(0,184,163,0.2)';
    if (v === 2) return 'rgba(0,184,163,0.4)';
    if (v === 3) return 'rgba(0,184,163,0.6)';
    return 'rgba(0,184,163,0.85)';
  };

  const recentProblems = problems.slice(0, 5);

  const statsCards = [
    { label: 'Total', value: total, color: '#ffa116', bg: 'rgba(255,161,22,0.08)', border: 'rgba(255,161,22,0.15)' },
    { label: 'Easy', value: `${solvedEasy}/${easy}`, color: '#00b7a2', bg: 'rgba(0,184,163,0.08)', border: 'rgba(0,184,163,0.15)' },
    { label: 'Medium', value: `${solvedMedium}/${medium}`, color: '#ffc01e', bg: 'rgba(255,192,30,0.08)', border: 'rgba(255,192,30,0.15)' },
    { label: 'Hard', value: `${solvedHard}/${hard}`, color: '#ffb4ab', bg: 'rgba(255,55,95,0.08)', border: 'rgba(255,55,95,0.15)' },
  ];

  const quickActions = [
    { icon: '📚', title: 'Practice Problems', desc: 'Solve coding questions', path: '/problemlist' },
    { icon: '⭐', title: 'Favorites', desc: 'View saved problems', path: null },
    { icon: '📊', title: 'Analytics', desc: 'Track your performance', path: null },
    { icon: '🏆', title: 'Contests', desc: 'Join weekly contests', path: '/contest' },
  ];

  const progressPercent = total > 0 ? ((solved / total) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen" style={{ background: '#19120a', paddingTop: '80px' }}>
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10"
          style={{
            opacity: animateIn ? 1 : 0,
            transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out',
          }}
        >
          <div className="flex items-center gap-5">
            <div
              className="flex items-center justify-center text-xl font-bold"
              style={{
                width: '72px', height: '72px', borderRadius: '20px',
                background: 'linear-gradient(135deg, #ffa116, #ff6b35)',
                color: '#fff', boxShadow: '0 8px 30px rgba(255,161,22,0.3)',
              }}
            >
              {getInitials(user?.name)}
            </div>
            <div>
              <h1
                className="text-3xl font-bold mb-1"
                style={{ color: '#f0e0d1', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
              >
                Welcome back, {user?.name || 'User'} 👋
              </h1>
              <p className="text-sm" style={{ color: '#d9c3ad' }}>{user?.email || 'Aspiring Software Engineer'}</p>
            </div>
          </div>
          <button
            id="dashboard-goto-problems"
            onClick={() => navigate('/problemlist')}
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #ffa116, #ff6b35)',
              color: '#fff', border: 'none',
              boxShadow: '0 4px 20px rgba(255,161,22,0.3)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(255,161,22,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,161,22,0.3)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            Go to Problems
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          {statsCards.map((stat, i) => (
            <div
              key={stat.label}
              className="p-5 rounded-xl transition-all duration-300"
              style={{
                background: stat.bg, border: `1px solid ${stat.border}`,
                opacity: animateIn ? 1 : 0,
                transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease-out ${0.1 + i * 0.1}s`,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 25px ${stat.border}`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: stat.color, fontFamily: "'JetBrains Mono', monospace" }}>{stat.label}</p>
              <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Progress Card */}
          <div
            className="lg:col-span-2 p-6 rounded-xl"
            style={{
              background: '#261e15', border: '1px solid #a18d7a',
              opacity: animateIn ? 1 : 0, transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.3s',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold" style={{ color: '#f0e0d1' }}>Your Progress</h2>
              <span className="text-sm font-semibold" style={{ color: '#ffa116' }}>{progressPercent}%</span>
            </div>
            {/* Main progress bar */}
            <div className="h-3 rounded-full mb-6" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: animateIn ? `${progressPercent}%` : '0%',
                  background: 'linear-gradient(90deg, #ffa116, #ff6b35)',
                  boxShadow: '0 0 12px rgba(255,161,22,0.3)',
                }}
              />
            </div>
            <p className="text-sm mb-6" style={{ color: '#d9c3ad' }}>{solved} / {total} problems solved</p>

            {/* Per-difficulty bars */}
            <div className="space-y-4">
              {[
                { label: 'Easy', done: solvedEasy, total: easy, color: '#00b7a2' },
                { label: 'Medium', done: solvedMedium, total: medium, color: '#ffc01e' },
                { label: 'Hard', done: solvedHard, total: hard, color: '#ffb4ab' },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium" style={{ color: s.color }}>{s.label}</span>
                    <span style={{ color: '#d9c3ad', fontFamily: "'JetBrains Mono', monospace" }}>{s.done}/{s.total}</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: animateIn ? `${s.total > 0 ? (s.done / s.total) * 100 : 0}%` : '0%',
                        background: s.color,
                        boxShadow: `0 0 8px ${s.color}40`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Donut-style stats */}
          <div
            className="p-6 rounded-xl flex flex-col items-center justify-center"
            style={{
              background: '#261e15', border: '1px solid #a18d7a',
              opacity: animateIn ? 1 : 0, transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.4s',
            }}
          >
            <div className="relative" style={{ width: '160px', height: '160px' }}>
              <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#00b7a2" strokeWidth="3"
                  strokeDasharray={`${(solvedEasy / total) * 97.4} 97.4`} strokeLinecap="round" />
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#ffc01e" strokeWidth="3"
                  strokeDasharray={`${(solvedMedium / total) * 97.4} 97.4`}
                  strokeDashoffset={`-${(solvedEasy / total) * 97.4}`} strokeLinecap="round" />
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#ffb4ab" strokeWidth="3"
                  strokeDasharray={`${(solvedHard / total) * 97.4} 97.4`}
                  strokeDashoffset={`-${((solvedEasy + solvedMedium) / total) * 97.4}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold" style={{ color: '#f0e0d1' }}>{solved}</span>
                <span className="text-xs" style={{ color: '#d9c3ad' }}>Solved</span>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              {[
                { color: '#00b7a2', label: 'Easy' },
                { color: '#ffc01e', label: 'Med' },
                { color: '#ffb4ab', label: 'Hard' },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: l.color }} />
                  <span className="text-xs" style={{ color: '#d9c3ad' }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Heatmap + Recent Problems */}
        <div className="grid lg:grid-cols-5 gap-6 mb-8">
          {/* Heatmap */}
          <div
            className="lg:col-span-3 p-6 rounded-xl"
            style={{
              background: '#261e15', border: '1px solid #a18d7a',
              opacity: animateIn ? 1 : 0, transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.5s',
            }}
          >
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#f0e0d1' }}>Activity</h2>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${weeks}, 1fr)`, gap: '3px' }}>
              {heatmapData.map((v, i) => (
                <div
                  key={i}
                  title={`${v} submissions`}
                  style={{
                    width: '100%', aspectRatio: '1', borderRadius: '3px',
                    background: heatColor(v),
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs" style={{ color: '#d9c3ad' }}>Less</span>
              {[0, 1, 2, 3, 4].map(v => (
                <div key={v} style={{ width: '10px', height: '10px', borderRadius: '2px', background: heatColor(v) }} />
              ))}
              <span className="text-xs" style={{ color: '#d9c3ad' }}>More</span>
            </div>
          </div>

          {/* Recent Problems */}
          <div
            className="lg:col-span-2 p-6 rounded-xl"
            style={{
              background: '#261e15', border: '1px solid #a18d7a',
              opacity: animateIn ? 1 : 0, transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.6s',
            }}
          >
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#f0e0d1' }}>Recent Problems</h2>
            <div className="space-y-2">
              {recentProblems.map((p, i) => {
                const dc = p.difficulty === 'Easy' ? '#00b7a2' : p.difficulty === 'Medium' ? '#ffc01e' : '#ffb4ab';
                return (
                  <div
                    key={i}
                    onClick={() => navigate(`/problemlist/${p.name}`)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200"
                    style={{ background: 'transparent' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,161,22,0.04)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <span className="text-sm truncate mr-3" style={{ color: '#f0e0d1' }}>{p.name}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full shrink-0 font-medium"
                      style={{ color: dc, background: `${dc}15` }}
                    >
                      {p.difficulty}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {quickActions.map((action, i) => (
            <div
              key={action.title}
              onClick={() => action.path && navigate(action.path)}
              className="p-5 rounded-xl cursor-pointer transition-all duration-300"
              style={{
                background: '#261e15', border: '1px solid #a18d7a',
                opacity: animateIn ? 1 : 0, transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease-out ${0.7 + i * 0.08}s`,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,161,22,0.3)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#a18d7a'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <span style={{ fontSize: '28px' }}>{action.icon}</span>
              <h3 className="text-sm font-semibold mt-3 mb-1" style={{ color: '#f0e0d1' }}>{action.title}</h3>
              <p className="text-xs" style={{ color: '#d9c3ad' }}>{action.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard