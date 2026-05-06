import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function Hero() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [visibleStats, setVisibleStats] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const statsRef = useRef(null);

  // Animate stats on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisibleStats(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: '3,200+', label: 'Coding Problems', color: '#ffa116' },
    { value: '50M+', label: 'Global Users', color: '#00b8a3' },
    { value: '100+', label: 'Weekly Contests', color: '#ffc01e' },
    { value: '15+', label: 'Programming Languages', color: '#ff375f' },
  ];

  const features = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      ),
      title: 'Curated Problems',
      desc: 'Over 3,200 problems organized by topic, company, and difficulty.',
      color: '#ffa116',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ),
      title: 'Weekly Contests',
      desc: 'Compete with millions of developers in timed challenges.',
      color: '#00b8a3',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
      ),
      title: 'Interview Prep',
      desc: 'Real interview questions from top tech companies like FAANG.',
      color: '#ffc01e',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'Community',
      desc: 'Learn from detailed solutions and discussions by top coders.',
      color: '#ff375f',
    },
  ];

  const topics = [
    { label: 'Array', count: 2145 },
    { label: 'String', count: 867 },
    { label: 'Hash Table', count: 808 },
    { label: 'Math', count: 666 },
    { label: 'Dynamic Programming', count: 653 },
    { label: 'Sorting', count: 442 },
    { label: 'Tree', count: 351 },
    { label: 'Graph', count: 294 },
  ];

  // Floating code snippet animation
  const codeLines = [
    { text: 'function twoSum(nums, target) {', indent: 0 },
    { text: '  const map = new Map();', indent: 1 },
    { text: '  for (let i = 0; i < nums.length; i++) {', indent: 1 },
    { text: '    const comp = target - nums[i];', indent: 2 },
    { text: '    if (map.has(comp)) return [map.get(comp), i];', indent: 2 },
    { text: '    map.set(nums[i], i);', indent: 2 },
    { text: '  }', indent: 1 },
    { text: '}', indent: 0 },
  ];

  return (
    <div style={{ background: '#1a1a2e', paddingTop: '70px' }}>

      {/* ===== HERO SECTION ===== */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 35%, #0f3460 70%, #1a1a2e 100%)',
        }}
      >
        {/* Decorative Background Elements */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {/* Large gradient orbs */}
          <div style={{
            position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px',
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,161,22,0.08) 0%, transparent 60%)', filter: 'blur(80px)',
          }} />
          <div style={{
            position: 'absolute', bottom: '-20%', left: '-10%', width: '500px', height: '500px',
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,184,163,0.06) 0%, transparent 60%)', filter: 'blur(80px)',
          }} />

          {/* Grid pattern */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.03,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }} />

          {/* Floating particles */}
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                opacity: 0.04 + Math.random() * 0.08,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 8}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center w-full">

          {/* Left: Text Content */}
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 animate-fadeInLeft"
              style={{
                background: 'rgba(255, 161, 22, 0.1)',
                border: '1px solid rgba(255, 161, 22, 0.2)',
              }}
            >
              <span style={{ fontSize: '14px' }}>🚀</span>
              <span className="text-xs font-medium" style={{ color: '#ffa116' }}>
                A New Way to Learn
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fadeInLeft delay-100"
              style={{ color: '#e2e8f0', letterSpacing: '-0.03em' }}
            >
              Master{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #ffa116 0%, #ff6b35 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Coding Skills
              </span>
              <br />
              Build Your Future
            </h1>

            <p
              className="text-lg md:text-xl leading-relaxed mb-8 max-w-lg animate-fadeInLeft delay-200"
              style={{ color: '#94a3b8' }}
            >
              LeetCode is the best platform to help you enhance your skills, expand your knowledge, and prepare for technical interviews.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12 animate-fadeInLeft delay-300">
              {user ? (
                <button
                  id="hero-explore-btn"
                  onClick={() => navigate('/problemlist')}
                  className="btn-accent flex items-center gap-2 text-base"
                  style={{ padding: '14px 32px' }}
                >
                  Explore Problems
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              ) : (
                <>
                  <button
                    id="hero-create-account-btn"
                    onClick={() => navigate('/register')}
                    className="btn-accent flex items-center gap-2 text-base"
                    style={{ padding: '14px 32px' }}
                  >
                    Create Account
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                  <button
                    id="hero-explore-btn"
                    onClick={() => navigate('/problemlist')}
                    className="flex items-center gap-2 text-base font-semibold px-8 py-3.5 rounded-xl cursor-pointer transition-all duration-300"
                    style={{
                      color: '#e2e8f0',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Explore Problems
                  </button>
                </>
              )}
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 animate-fadeInLeft delay-400">
              <div className="flex -space-x-2">
                {['#ffa116', '#00b8a3', '#ff375f', '#ffc01e', '#6366f1'].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: c,
                      border: '2px solid #1a1a2e',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#fff',
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>50M+ developers</p>
                <p className="text-xs" style={{ color: '#64748b' }}>trust LeetCode worldwide</p>
              </div>
            </div>
          </div>

          {/* Right: Code Editor Card */}
          <div className="hidden lg:block animate-fadeInRight delay-200">
            <div
              className="relative animate-float"
              style={{
                background: 'rgba(30, 41, 59, 0.7)',
                backdropFilter: 'blur(20px)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.4)',
                overflow: 'hidden',
              }}
            >
              {/* Window bar */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff375f' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffc01e' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#00b8a3' }} />
                <span className="ml-3 text-xs font-medium" style={{ color: '#64748b' }}>twoSum.js — LeetCode</span>
              </div>

              {/* Tabs */}
              <div className="flex gap-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div
                  className="px-4 py-2 text-xs font-medium"
                  style={{ color: '#ffa116', borderBottom: '2px solid #ffa116', background: 'rgba(255,161,22,0.05)' }}
                >
                  Solution
                </div>
                <div className="px-4 py-2 text-xs font-medium" style={{ color: '#64748b' }}>
                  Description
                </div>
                <div className="px-4 py-2 text-xs font-medium" style={{ color: '#64748b' }}>
                  Submissions
                </div>
              </div>

              {/* Code Content */}
              <div className="p-4" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
                {codeLines.map((line, i) => (
                  <div
                    key={i}
                    className="flex gap-4 py-0.5"
                    style={{
                      opacity: 0,
                      animation: `fadeInLeft 0.4s ease-out ${0.5 + i * 0.15}s both`,
                    }}
                  >
                    <span className="text-xs w-5 text-right shrink-0" style={{ color: '#475569' }}>{i + 1}</span>
                    <span className="text-xs" style={{ color: '#e2e8f0' }}>
                      {line.text.split(/(\bfunction\b|\bconst\b|\bfor\b|\blet\b|\bif\b|\breturn\b|\bnew\b)/).map((part, j) => (
                        <span
                          key={j}
                          style={{
                            color: ['function', 'const', 'for', 'let', 'if', 'return', 'new'].includes(part)
                              ? '#c084fc'
                              : part.includes('Map') || part.includes('twoSum')
                                ? '#ffc01e'
                                : '#e2e8f0',
                          }}
                        >
                          {part}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>

              {/* Status bar */}
              <div
                className="flex items-center justify-between px-4 py-2"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,184,163,0.05)' }}
              >
                <div className="flex items-center gap-2">
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00b8a3' }} />
                  <span className="text-xs font-medium" style={{ color: '#00b8a3' }}>Accepted</span>
                </div>
                <span className="text-xs" style={{ color: '#64748b' }}>Runtime: 52ms · Memory: 42.1 MB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fadeInUp delay-700">
          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-xs" style={{ color: '#64748b' }}>Scroll to explore</span>
            <div
              className="w-6 h-10 rounded-full flex justify-center pt-2"
              style={{ border: '1.5px solid rgba(255,255,255,0.15)' }}
            >
              <div
                className="w-1.5 h-3 rounded-full"
                style={{
                  background: '#ffa116',
                  animation: 'float 2s ease-in-out infinite',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section
        ref={statsRef}
        className="relative py-20"
        style={{
          background: 'linear-gradient(180deg, #16213e 0%, #1a1a2e 100%)',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center"
              style={{
                opacity: visibleStats ? 1 : 0,
                transform: visibleStats ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease-out ${i * 0.15}s`,
              }}
            >
              <p
                className="text-3xl md:text-4xl font-extrabold mb-2"
                style={{ color: stat.color }}
              >
                {stat.value}
              </p>
              <p className="text-sm" style={{ color: '#94a3b8' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features-section" className="py-24" style={{ background: '#1a1a2e' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: '#e2e8f0', letterSpacing: '-0.02em' }}
            >
              Everything you need to{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #ffa116, #ff6b35)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ace the interview
              </span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#94a3b8' }}>
              From curated problem sets to live contests, we've got your coding journey covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-xl cursor-pointer card-hover"
                style={{
                  background: activeFeature === i
                    ? 'linear-gradient(145deg, rgba(255,161,22,0.08), rgba(30,41,59,0.6))'
                    : 'rgba(30, 41, 59, 0.4)',
                  border: `1px solid ${activeFeature === i ? 'rgba(255,161,22,0.2)' : 'rgba(255,255,255,0.06)'}`,
                  transition: 'all 0.4s ease',
                }}
                onClick={() => setActiveFeature(i)}
                onMouseEnter={() => setActiveFeature(i)}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `${feature.color}15`,
                    color: feature.color,
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ color: '#e2e8f0' }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOPICS SECTION ===== */}
      <section
        className="py-24"
        style={{
          background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#e2e8f0' }}>
              Popular Topics
            </h2>
            <p className="text-lg" style={{ color: '#94a3b8' }}>
              Explore problems across the most in-demand categories
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {topics.map((topic, i) => (
              <button
                key={i}
                onClick={() => navigate('/problemlist')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full cursor-pointer transition-all duration-300"
                style={{
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#e2e8f0',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,161,22,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255,161,22,0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {topic.label}
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    background: 'rgba(255, 161, 22, 0.15)',
                    color: '#ffa116',
                  }}
                >
                  {topic.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      {!user && (
        <section className="py-24" style={{ background: '#1a1a2e' }}>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div
              className="p-12 md:p-16 rounded-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,161,22,0.08), rgba(15,52,96,0.4))',
                border: '1px solid rgba(255,161,22,0.15)',
              }}
            >
              {/* Glow effect */}
              <div style={{
                position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)',
                width: '400px', height: '400px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,161,22,0.1) 0%, transparent 60%)',
                filter: 'blur(60px)', pointerEvents: 'none',
              }} />

              <h2
                className="text-3xl md:text-4xl font-bold mb-4 relative z-10"
                style={{ color: '#e2e8f0' }}
              >
                Start Your Coding Journey Today
              </h2>
              <p
                className="text-lg mb-8 relative z-10"
                style={{ color: '#94a3b8' }}
              >
                Join millions of developers who are already improving their skills.
              </p>
              <button
                id="cta-create-account-btn"
                onClick={() => navigate('/register')}
                className="btn-accent relative z-10 text-base"
                style={{ padding: '14px 36px' }}
              >
                Create Free Account →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ===== FOOTER ===== */}
      <footer
        className="py-8"
        style={{
          background: '#16213e',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: '#64748b' }}>
            Copyright © 2026 LeetCode
          </p>
          <div className="flex items-center gap-6">
            {['Help Center', 'Jobs', 'Bug Bounty', 'Terms', 'Privacy Policy'].map((link, i) => (
              <a
                key={i}
                href="#"
                className="text-xs transition-colors duration-200"
                style={{ color: '#64748b', textDecoration: 'none' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Hero;