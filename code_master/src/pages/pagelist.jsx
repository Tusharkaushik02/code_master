import React, { useState, useMemo } from 'react';
import problems from '../dummydata/problemlist';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function Problemlist() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All Topics');
  const [sortBy, setSortBy] = useState('default');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const tags = ['All Topics', ...new Set(problems.map(p => p.tag))];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filtered = useMemo(() => {
    let result = [...problems];
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.tag.toLowerCase().includes(search.toLowerCase()));
    if (selectedDifficulty !== 'All') result = result.filter(p => p.difficulty === selectedDifficulty);
    if (selectedTag !== 'All Topics') result = result.filter(p => p.tag === selectedTag);
    if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === 'difficulty') { const order = { Easy: 1, Medium: 2, Hard: 3 }; result.sort((a, b) => order[a.difficulty] - order[b.difficulty]); }
    return result;
  }, [search, selectedDifficulty, selectedTag, sortBy]);

  const solved = 5;
  const total = problems.length;
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const monthName = today.toLocaleString('default', { month: 'long', year: 'numeric' });
  const solvedDays = [3, 4, 6, 10, 15];

  const diffColor = (d) => d === 'Easy' ? '#00b7a2' : d === 'Medium' ? '#ffc01e' : '#ffb4ab';
  const diffBg = (d) => d === 'Easy' ? 'rgba(0,184,163,0.12)' : d === 'Medium' ? 'rgba(255,192,30,0.12)' : 'rgba(255,55,95,0.12)';

  const sidebarItems = [
    { icon: '📚', label: 'Library' },
    { icon: '⚔️', label: 'Quest', badge: 'New' },
    { icon: '🧭', label: 'Explore' },
    { icon: '📋', label: 'Study Plan' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#19120a', paddingTop: '70px' }}>
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">

        {/* Sidebar */}
        <aside className="hidden lg:block w-52 shrink-0">
          <div className="sticky top-24 space-y-1">
            {sidebarItems.map((item, i) => (
              <button key={i} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200"
                style={{ color: '#d9c3ad', background: 'transparent', border: 'none', textAlign: 'left' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#f0e0d1'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#d9c3ad'; }}>
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                {item.label}
                {item.badge && <span className="ml-auto text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,184,163,0.15)', color: '#00b7a2' }}>{item.badge}</span>}
              </button>
            ))}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '12px 0' }} />
            <div className="px-4 flex items-center justify-between">
              <span className="text-sm font-medium" style={{ color: '#d9c3ad' }}>My Lists</span>
              <button className="text-lg cursor-pointer" style={{ color: '#a18d7a', background: 'none', border: 'none' }}>+</button>
            </div>
            <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm cursor-pointer"
              style={{ color: '#ffa116', background: 'transparent', border: 'none', textAlign: 'left' }}>
              <span>⭐</span> Favorite
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Topic Tags */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              {tags.slice(0, 6).map(tag => {
                const count = tag === 'All Topics' ? problems.length : problems.filter(p => p.tag === tag).length;
                return (
                  <button key={tag} onClick={() => setSelectedTag(tag)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-200"
                    style={{
                      background: selectedTag === tag ? '#ffa116' : 'rgba(30,41,59,0.6)',
                      color: selectedTag === tag ? '#19120a' : '#d9c3ad',
                      border: `1px solid ${selectedTag === tag ? '#ffa116' : 'rgba(255,255,255,0.08)'}`,
                    }}>
                    {tag} <span style={{ opacity: 0.7 }}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty Filter + Search */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {difficulties.map(d => (
              <button key={d} onClick={() => setSelectedDifficulty(d)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all duration-200"
                style={{
                  background: selectedDifficulty === d ? (d === 'All' ? 'rgba(255,161,22,0.15)' : diffBg(d)) : 'rgba(255,255,255,0.04)',
                  color: selectedDifficulty === d ? (d === 'All' ? '#ffa116' : diffColor(d)) : '#a18d7a',
                  border: `1px solid ${selectedDifficulty === d ? (d === 'All' ? 'rgba(255,161,22,0.3)' : 'transparent') : 'rgba(255,255,255,0.06)'}`,
                }}>
                {d}
              </button>
            ))}
            <div className="flex-1" />
            <div className="relative">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a18d7a" strokeWidth="2.5" className="absolute left-3 top-1/2 -translate-y-1/2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input type="text" placeholder="Search questions" value={search} onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg text-sm input-glow"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#f0e0d1', outline: 'none', width: '220px' }} />
            </div>
            <span className="text-xs" style={{ color: '#a18d7a' }}>{solved}/{total} Solved</span>
          </div>

          {/* Problem Table */}
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-5 py-3 text-xs font-semibold" style={{ background: 'rgba(30,41,59,0.6)', color: '#a18d7a', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="col-span-1">#</div>
              <div className="col-span-6">Title</div>
              <div className="col-span-2">Acceptance</div>
              <div className="col-span-2">Difficulty</div>
              <div className="col-span-1">Tag</div>
            </div>
            {/* Rows */}
            {filtered.map((data, index) => (
              <Link to={data.name} key={index} style={{ textDecoration: 'none' }}>
                <div className="grid grid-cols-12 gap-4 px-5 py-3.5 items-center transition-all duration-200 cursor-pointer"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: index % 2 === 0 ? 'rgba(30,41,59,0.3)' : 'transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,161,22,0.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = index % 2 === 0 ? 'rgba(30,41,59,0.3)' : 'transparent'; }}>
                  <div className="col-span-1 text-sm" style={{ color: '#a18d7a' }}>
                    {index < solved ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#00b7a2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    ) : <span>{index + 1}</span>}
                  </div>
                  <div className="col-span-6 text-sm font-medium truncate" style={{ color: '#f0e0d1' }}>
                    {index + 1}. {data.name}
                  </div>
                  <div className="col-span-2 text-xs" style={{ color: '#d9c3ad' }}>
                    {(40 + Math.random() * 30).toFixed(1)}%
                  </div>
                  <div className="col-span-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ color: diffColor(data.difficulty), background: diffBg(data.difficulty) }}>
                      {data.difficulty}
                    </span>
                  </div>
                  <div className="col-span-1 text-xs truncate" style={{ color: '#a18d7a' }}>{data.tag}</div>
                </div>
              </Link>
            ))}
            {filtered.length === 0 && (
              <div className="py-16 text-center" style={{ color: '#a18d7a' }}>
                <p className="text-lg mb-2">No problems found</p>
                <p className="text-sm">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar (Calendar + Stats) */}
        {user && (
          <aside className="hidden xl:block w-64 shrink-0">
            <div className="sticky top-24 space-y-5">
              {/* Streak */}
              <div className="p-4 rounded-xl" style={{ background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold" style={{ color: '#f0e0d1' }}>Day 5</span>
                  <span className="text-xs" style={{ color: '#a18d7a' }}>{total - solved} left</span>
                </div>
                {/* Calendar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium" style={{ color: '#d9c3ad' }}>{monthName}</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {['S','M','T','W','T','F','S'].map((d,i) => (
                      <div key={i} className="text-xs py-1" style={{ color: '#a18d7a' }}>{d}</div>
                    ))}
                    {Array.from({ length: firstDay }, (_, i) => <div key={`e${i}`} />)}
                    {Array.from({ length: daysInMonth }, (_, i) => {
                      const day = i + 1;
                      const isSolved = solvedDays.includes(day);
                      const isToday = day === today.getDate();
                      return (
                        <div key={day} className={`cal-cell ${isSolved ? 'solved' : ''} ${isToday ? 'today' : ''}`}>
                          {day}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Weekly Premium */}
              <div className="p-4 rounded-xl" style={{ background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold" style={{ color: '#f0e0d1' }}>Weekly Premium</span>
                  <span className="text-xs" style={{ color: '#a18d7a' }}>2 days left</span>
                </div>
                <div className="flex gap-2">
                  {['W1','W2','W3','W4','W5'].map((w,i) => (
                    <div key={i} className="flex-1 py-1.5 rounded-lg text-center text-xs font-medium cursor-pointer transition-all duration-200"
                      style={{
                        background: i === 0 ? 'linear-gradient(135deg, #ffa116, #ff6b35)' : 'rgba(255,255,255,0.04)',
                        color: i === 0 ? '#fff' : '#a18d7a',
                        border: `1px solid ${i === 0 ? 'transparent' : 'rgba(255,255,255,0.06)'}`,
                      }}>
                      {w}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1.5">
                    <span style={{ color: '#00b7a2', fontSize: '14px' }}>💎</span>
                    <span className="text-xs font-medium" style={{ color: '#00b7a2' }}>0 Redeem</span>
                  </div>
                  <span className="text-xs" style={{ color: '#ffa116' }}>Rules</span>
                </div>
              </div>

              {/* Progress */}
              <div className="p-4 rounded-xl" style={{ background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-sm font-semibold mb-3" style={{ color: '#f0e0d1' }}>Progress</p>
                <div className="space-y-2">
                  {[
                    { label: 'Easy', done: 3, total: problems.filter(p=>p.difficulty==='Easy').length, color: '#00b7a2' },
                    { label: 'Medium', done: 2, total: problems.filter(p=>p.difficulty==='Medium').length, color: '#ffc01e' },
                    { label: 'Hard', done: 0, total: problems.filter(p=>p.difficulty==='Hard').length, color: '#ffb4ab' },
                  ].map((s,i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: s.color }}>{s.label}</span>
                        <span style={{ color: '#a18d7a' }}>{s.done}/{s.total}</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(s.done/s.total)*100}%`, background: s.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

export default Problemlist;