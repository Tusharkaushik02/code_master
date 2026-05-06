import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  function validateForm() {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email or username is required';
    if (!pass.trim()) newErrors.password = 'Password is required';
    else if (pass.length < 3) newErrors.password = 'Password is too short';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function submitData(e) {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));

    login({
      name: email.split('@')[0],
      email: email,
    });
    setIsLoading(false);
    navigate('/problemlist');
    setEmail('');
    setPass('');
  }

  // Floating particles for background
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${2 + Math.random() * 4}px`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 6}s`,
    opacity: 0.05 + Math.random() * 0.1,
  }));

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
        paddingTop: '80px',
      }}
    >
      {/* Background Particles */}
      <div className="particles-bg">
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Background Decorative Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,161,22,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(15,52,96,0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Login Card */}
      <div
        className="relative z-10 w-full max-w-md mx-4 animate-slideUp"
        style={{
          background: 'rgba(30, 41, 59, 0.7)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
          padding: '40px',
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="flex items-center justify-center mb-4 animate-scaleIn"
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #ffa116 0%, #ff6b35 100%)',
              boxShadow: '0 4px 20px rgba(255, 161, 22, 0.3)',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M8 6L12 12L8 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 6L12 12L16 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1
            className="text-2xl font-bold animate-fadeInUp delay-100"
            style={{ color: '#e2e8f0', letterSpacing: '-0.02em' }}
          >
            Leet<span style={{ color: '#ffa116' }}>Code</span>
          </h1>
          <p
            className="text-sm mt-2 animate-fadeInUp delay-200"
            style={{ color: '#64748b' }}
          >
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitData} className="space-y-5">
          {/* Email Field */}
          <div className="animate-fadeInUp delay-300">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: focusedField === 'email' ? '#ffa116' : '#94a3b8' }}
            >
              Username or E-mail
            </label>
            <div className="relative">
              <div
                className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                style={{ color: focusedField === 'email' ? '#ffa116' : '#64748b' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <input
                ref={emailRef}
                id="login-email-input"
                type="text"
                placeholder="Enter your email or username"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                }}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-11 pr-4 py-3 rounded-xl text-sm input-glow transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${errors.email ? '#ff375f' : focusedField === 'email' ? '#ffa116' : 'rgba(255,255,255,0.1)'}`,
                  color: '#e2e8f0',
                  outline: 'none',
                }}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs flex items-center gap-1" style={{ color: '#ff375f' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="animate-fadeInUp delay-400">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: focusedField === 'password' ? '#ffa116' : '#94a3b8' }}
            >
              Password
            </label>
            <div className="relative">
              <div
                className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                style={{ color: focusedField === 'password' ? '#ffa116' : '#64748b' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <input
                id="login-password-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                  if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                }}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-11 pr-12 py-3 rounded-xl text-sm input-glow transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${errors.password ? '#ff375f' : focusedField === 'password' ? '#ffa116' : 'rgba(255,255,255,0.1)'}`,
                  color: '#e2e8f0',
                  outline: 'none',
                }}
              />
              <button
                type="button"
                id="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs flex items-center gap-1" style={{ color: '#ff375f' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between animate-fadeInUp delay-500">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div
                className="relative w-4 h-4 rounded transition-all duration-200"
                style={{
                  border: `1.5px solid ${rememberMe ? '#ffa116' : 'rgba(255,255,255,0.2)'}`,
                  background: rememberMe ? '#ffa116' : 'transparent',
                }}
                onClick={() => setRememberMe(!rememberMe)}
              >
                {rememberMe && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="3.5" className="absolute top-0.5 left-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </div>
              <span className="text-xs" style={{ color: '#94a3b8' }}>Remember me</span>
            </label>
            <Link
              to="#"
              id="forgot-password-link"
              className="text-xs font-medium transition-colors duration-200"
              style={{ color: '#ffa116', textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#ffb84d'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#ffa116'; }}
            >
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            id="login-submit-btn"
            disabled={isLoading}
            className="w-full py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300 animate-fadeInUp delay-500 relative overflow-hidden"
            style={{
              background: isLoading
                ? 'linear-gradient(135deg, #b8751a, #cc5a20)'
                : 'linear-gradient(135deg, #ffa116 0%, #ff6b35 100%)',
              color: '#fff',
              border: 'none',
              boxShadow: isLoading ? 'none' : '0 4px 20px rgba(255, 161, 22, 0.3)',
              opacity: isLoading ? 0.8 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 161, 22, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 161, 22, 0.3)';
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" style={{ animation: 'spin-slow 1s linear infinite' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/>
                </svg>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Terms */}
        <p
          className="text-center text-xs mt-5 animate-fadeInUp delay-600"
          style={{ color: '#64748b' }}
        >
          By continuing, you agree to{' '}
          <a href="#" style={{ color: '#ffa116', textDecoration: 'none' }}>Terms</a>
          {' '}&{' '}
          <a href="#" style={{ color: '#ffa116', textDecoration: 'none' }}>Privacy Policy</a>.
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6 animate-fadeInUp delay-600">
          <div className="flex-1" style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          <span className="text-xs" style={{ color: '#64748b' }}>or you can sign in with</span>
          <div className="flex-1" style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />
        </div>

        {/* Social Login */}
        <div className="flex justify-center gap-4 animate-fadeInUp delay-700">
          {/* Google */}
          <button className="social-btn" id="social-google-btn" title="Sign in with Google">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </button>

          {/* GitHub */}
          <button className="social-btn" id="social-github-btn" title="Sign in with GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </button>

          {/* LinkedIn */}
          <button className="social-btn" id="social-linkedin-btn" title="Sign in with LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </button>

          {/* More */}
          <button className="social-btn" id="social-more-btn" title="More options">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
            </svg>
          </button>
        </div>

        {/* Sign Up Link */}
        <p
          className="text-center text-sm mt-6 animate-fadeInUp delay-800"
          style={{ color: '#94a3b8' }}
        >
          Don't have an account?{' '}
          <Link
            to="/register"
            id="goto-register-link"
            className="font-semibold transition-colors duration-200"
            style={{ color: '#ffa116', textDecoration: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ffb84d'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#ffa116'; }}
          >
            Sign Up
          </Link>
        </p>
      </div>

      {/* Copyright Footer */}
      <div
        className="absolute bottom-6 left-0 right-0 text-center text-xs"
        style={{ color: '#475569' }}
      >
        Copyright © 2026 LeetCode
      </div>
    </div>
  );
}

export default Login;