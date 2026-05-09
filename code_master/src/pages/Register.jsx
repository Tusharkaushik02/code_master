import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  function validateForm() {
    const newErrors = {};
    if (!userName.trim()) newErrors.userName = 'Username is required';
    else if (userName.length < 3) newErrors.userName = 'Username must be at least 3 characters';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Please enter a valid email';
    if (!pass.trim()) newErrors.password = 'Password is required';
    else if (pass.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Password strength
  const getPasswordStrength = () => {
    if (!pass) return { level: 0, label: '', color: '' };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { level: 1, label: 'Weak', color: '#ffb4ab' };
    if (score <= 2) return { level: 2, label: 'Fair', color: '#ffc01e' };
    if (score <= 3) return { level: 3, label: 'Good', color: '#ffa116' };
    return { level: 4, label: 'Strong', color: '#00b7a2' };
  };

  const strength = getPasswordStrength();

  async function submitData(e) {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));

    login({ name: userName, email: email });
    setIsLoading(false);
    navigate('/problemlist');
    setUserName('');
    setEmail('');
    setPass('');
  }

  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${2 + Math.random() * 4}px`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 6}s`,
    opacity: 0.05 + Math.random() * 0.1,
  }));

  const inputStyle = (field, hasError) => ({
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${hasError ? '#ffb4ab' : focusedField === field ? '#ffa116' : 'rgba(255,255,255,0.1)'}`,
    color: '#f0e0d1',
    outline: 'none',
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #19120a 0%, #261e15 40%, #31281f 100%)',
        paddingTop: '80px',
        paddingBottom: '60px',
      }}
    >
      {/* Background Particles */}
      <div className="particles-bg">
        {particles.map(p => (
          <div key={p.id} className="particle" style={{ left: p.left, top: p.top, width: p.size, height: p.size, opacity: p.opacity, animationDelay: p.delay, animationDuration: p.duration }} />
        ))}
      </div>

      {/* Decorative Orbs */}
      <div style={{ position: 'absolute', top: '5%', right: '15%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,184,163,0.05) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,161,22,0.06) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      {/* Register Card */}
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
              width: '56px', height: '56px', borderRadius: '16px',
              background: 'linear-gradient(135deg, #00b7a2 0%, #00897b 100%)',
              boxShadow: '0 4px 20px rgba(0, 184, 163, 0.3)',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="8.5" cy="7" r="4"/>
              <line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold animate-fadeInUp delay-100" style={{ color: '#f0e0d1' }}>
            Create Account
          </h1>
          <p className="text-sm mt-2 animate-fadeInUp delay-200" style={{ color: '#a18d7a' }}>
            Join millions of coders today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitData} className="space-y-5">
          {/* Username */}
          <div className="animate-fadeInUp delay-200">
            <label className="block text-sm font-medium mb-2" style={{ color: focusedField === 'userName' ? '#ffa116' : '#d9c3ad' }}>
              Username
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200" style={{ color: focusedField === 'userName' ? '#ffa116' : '#a18d7a' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <input
                ref={nameRef}
                id="register-username-input"
                type="text"
                placeholder="Choose a username"
                value={userName}
                onChange={(e) => { setUserName(e.target.value); if (errors.userName) setErrors(prev => ({ ...prev, userName: '' })); }}
                onFocus={() => setFocusedField('userName')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-11 pr-4 py-3 rounded-xl text-sm input-glow transition-all duration-300"
                style={inputStyle('userName', errors.userName)}
              />
            </div>
            {errors.userName && <p className="mt-1.5 text-xs" style={{ color: '#ffb4ab' }}>{errors.userName}</p>}
          </div>

          {/* Email */}
          <div className="animate-fadeInUp delay-300">
            <label className="block text-sm font-medium mb-2" style={{ color: focusedField === 'email' ? '#ffa116' : '#d9c3ad' }}>
              Email
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200" style={{ color: focusedField === 'email' ? '#ffa116' : '#a18d7a' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <input
                id="register-email-input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: '' })); }}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-11 pr-4 py-3 rounded-xl text-sm input-glow transition-all duration-300"
                style={inputStyle('email', errors.email)}
              />
            </div>
            {errors.email && <p className="mt-1.5 text-xs" style={{ color: '#ffb4ab' }}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="animate-fadeInUp delay-400">
            <label className="block text-sm font-medium mb-2" style={{ color: focusedField === 'password' ? '#ffa116' : '#d9c3ad' }}>
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200" style={{ color: focusedField === 'password' ? '#ffa116' : '#a18d7a' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <input
                id="register-password-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={pass}
                onChange={(e) => { setPass(e.target.value); if (errors.password) setErrors(prev => ({ ...prev, password: '' })); }}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-11 pr-12 py-3 rounded-xl text-sm input-glow transition-all duration-300"
                style={inputStyle('password', errors.password)}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
            {errors.password && <p className="mt-1.5 text-xs" style={{ color: '#ffb4ab' }}>{errors.password}</p>}

            {/* Password Strength Indicator */}
            {pass && (
              <div className="mt-3">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map(level => (
                    <div
                      key={level}
                      className="flex-1 h-1 rounded-full transition-all duration-300"
                      style={{
                        background: strength.level >= level ? strength.color : 'rgba(255,255,255,0.08)',
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs" style={{ color: strength.color }}>{strength.label}</p>
              </div>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 animate-fadeInUp delay-500">
            <div
              className="relative w-4 h-4 rounded mt-0.5 cursor-pointer shrink-0 transition-all duration-200"
              style={{
                border: `1.5px solid ${agreeTerms ? '#ffa116' : 'rgba(255,255,255,0.2)'}`,
                background: agreeTerms ? '#ffa116' : 'transparent',
              }}
              onClick={() => setAgreeTerms(!agreeTerms)}
            >
              {agreeTerms && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#19120a" strokeWidth="3.5" className="absolute top-0.5 left-0.5"><polyline points="20 6 9 17 4 12"/></svg>
              )}
            </div>
            <span className="text-xs leading-relaxed" style={{ color: '#d9c3ad' }}>
              I agree to the <a href="#" style={{ color: '#ffa116', textDecoration: 'none' }}>Terms of Service</a> and <a href="#" style={{ color: '#ffa116', textDecoration: 'none' }}>Privacy Policy</a>
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="register-submit-btn"
            disabled={isLoading}
            className="w-full py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300 animate-fadeInUp delay-500 relative overflow-hidden"
            style={{
              background: isLoading ? 'linear-gradient(135deg, #b8751a, #cc5a20)' : 'linear-gradient(135deg, #ffa116, #ff6b35)',
              color: '#fff',
              border: 'none',
              boxShadow: isLoading ? 'none' : '0 4px 20px rgba(255, 161, 22, 0.3)',
              opacity: isLoading ? 0.8 : 1,
            }}
            onMouseEnter={(e) => { if (!isLoading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 161, 22, 0.4)'; }}}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 161, 22, 0.3)'; }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" style={{ animation: 'spin-slow 1s linear infinite' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/></svg>
                Creating account...
              </div>
            ) : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6 animate-fadeInUp delay-600">
          <div className="flex-1" style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          <span className="text-xs" style={{ color: '#a18d7a' }}>or sign up with</span>
          <div className="flex-1" style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />
        </div>

        {/* Social */}
        <div className="flex justify-center gap-4 animate-fadeInUp delay-700">
          <button className="social-btn" title="Google"><svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg></button>
          <button className="social-btn" title="GitHub"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></button>
          <button className="social-btn" title="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></button>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm mt-6 animate-fadeInUp delay-800" style={{ color: '#d9c3ad' }}>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold transition-colors duration-200" style={{ color: '#ffa116', textDecoration: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ffb84d'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#ffa116'; }}
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;