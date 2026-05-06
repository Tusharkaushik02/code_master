import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // Scroll detection for navbar blur effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get initials from user name
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/problemlist', label: 'Problems', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    )},
    { path: '/contest', label: 'Contest', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    )},
    { path: '/discuss', label: 'Discuss', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    )},
    { path: '/interview', label: 'Interview', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    )},
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2 shadow-lg'
          : 'py-3'
      }`}
      style={{
        background: scrolled
          ? 'rgba(26, 26, 46, 0.95)'
          : 'rgba(26, 26, 46, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          id="navbar-logo"
          className="flex items-center gap-2.5 group"
          style={{ textDecoration: 'none' }}
        >
          <div
            className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #ffa116 0%, #ff6b35 100%)',
              boxShadow: '0 2px 10px rgba(255, 161, 22, 0.3)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M8 6L12 12L8 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 6L12 12L16 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span
            className="text-xl font-bold transition-colors duration-300"
            style={{ color: '#e2e8f0', letterSpacing: '-0.02em' }}
          >
            Leet<span style={{ color: '#ffa116' }}>Code</span>
          </span>
        </Link>

        {/* Center Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              id={`nav-link-${link.label.toLowerCase()}`}
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                color: isActive(link.path) ? '#ffa116' : '#94a3b8',
                background: isActive(link.path) ? 'rgba(255, 161, 22, 0.1)' : 'transparent',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.path)) {
                  e.currentTarget.style.color = '#e2e8f0';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.path)) {
                  e.currentTarget.style.color = '#94a3b8';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {link.icon}
              {link.label}
              {isActive(link.path) && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
                  style={{
                    width: '60%',
                    background: 'linear-gradient(90deg, transparent, #ffa116, transparent)',
                  }}
                />
              )}
            </Link>
          ))}

          {/* Store Dropdown */}
          <div className="relative group">
            <button
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
              style={{ color: '#94a3b8', background: 'transparent', border: 'none' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#e2e8f0';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Store
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <div className="relative hidden md:block" ref={searchRef}>
            <button
              id="search-toggle-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 cursor-pointer"
              style={{
                color: '#94a3b8',
                background: searchOpen ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span className="hidden lg:inline">Search</span>
              <kbd
                className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded text-xs font-mono"
                style={{ background: 'rgba(255,255,255,0.08)', color: '#64748b' }}
              >
                ⌘K
              </kbd>
            </button>

            {/* Search Dropdown */}
            {searchOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-80 rounded-xl overflow-hidden animate-fadeIn"
                style={{
                  background: 'rgba(30, 41, 59, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                }}
              >
                <div className="p-3">
                  <input
                    type="text"
                    placeholder="Search problems, topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full px-3 py-2 rounded-lg text-sm input-glow"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#e2e8f0',
                      outline: 'none',
                    }}
                  />
                </div>
                <div className="px-3 pb-3">
                  <p style={{ color: '#64748b', fontSize: '12px' }}>
                    Try: "Two Sum", "Array", "Dynamic Programming"
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Notification Bell (when logged in) */}
          {user && (
            <button
              id="notification-btn"
              className="relative p-2 rounded-lg transition-all duration-200 cursor-pointer"
              style={{ color: '#94a3b8', background: 'transparent', border: 'none' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#e2e8f0';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: '#ff375f' }}
              />
            </button>
          )}

          {/* Streak (when logged in) */}
          {user && (
            <div
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
              style={{
                background: 'rgba(255, 161, 22, 0.1)',
                border: '1px solid rgba(255, 161, 22, 0.2)',
              }}
            >
              <span style={{ fontSize: '16px' }}>🔥</span>
              <span
                className="text-sm font-semibold"
                style={{ color: '#ffa116' }}
              >
                5
              </span>
            </div>
          )}

          {/* Premium Button */}
          <button
            id="premium-btn"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200"
            style={{
              color: '#ffa116',
              background: 'rgba(255, 161, 22, 0.08)',
              border: '1px solid rgba(255, 161, 22, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 161, 22, 0.15)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 161, 22, 0.08)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
            Premium
          </button>

          {/* Auth Section */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              {/* User Avatar Button */}
              <button
                id="user-avatar-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-center cursor-pointer transition-all duration-200"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ffa116, #ff6b35)',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: '700',
                  border: '2px solid transparent',
                  boxShadow: '0 2px 8px rgba(255, 161, 22, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 161, 22, 0.5)';
                  e.currentTarget.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                title={user.name || 'User'}
              >
                {getInitials(user.name)}
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-3 w-72 rounded-xl overflow-hidden animate-fadeIn"
                  style={{
                    background: 'rgba(30, 41, 59, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* User Info Header */}
                  <div
                    className="px-5 py-4"
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      background: 'linear-gradient(135deg, rgba(255,161,22,0.05), transparent)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="shrink-0 flex items-center justify-center text-sm font-bold"
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #ffa116, #ff6b35)',
                          color: '#fff',
                        }}
                      >
                        {getInitials(user.name)}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-base font-semibold truncate" style={{ color: '#e2e8f0' }}>
                          {user.name || 'User'}
                        </p>
                        <p className="text-xs truncate" style={{ color: '#64748b' }}>
                          {user.email || ''}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    {[
                      { id: 'dropdown-dashboard-btn', label: 'Dashboard', path: '/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
                      { id: 'dropdown-problems-btn', label: 'My Problems', path: '/problemlist', icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
                      { id: 'dropdown-settings-btn', label: 'Settings', path: '/dashboard', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        id={item.id}
                        onClick={() => {
                          setDropdownOpen(false);
                          navigate(item.path);
                        }}
                        className="w-full text-left px-5 py-3 text-sm flex items-center gap-3 transition-colors cursor-pointer"
                        style={{ color: '#94a3b8', background: 'transparent', border: 'none' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                          e.currentTarget.style.color = '#e2e8f0';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#94a3b8';
                        }}
                      >
                        <svg className="w-5 h-5" style={{ color: '#64748b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                          {item.label === 'Settings' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          )}
                        </svg>
                        <span className="font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Logout */}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <button
                      id="dropdown-logout-btn"
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                        navigate('/');
                      }}
                      className="w-full text-left px-5 py-3 text-sm flex items-center gap-3 transition-colors cursor-pointer"
                      style={{ color: '#ff375f', background: 'transparent', border: 'none' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 55, 95, 0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                id="nav-signin-btn"
                onClick={() => navigate('/login')}
                className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200"
                style={{
                  color: '#94a3b8',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#e2e8f0';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#94a3b8';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Sign in
              </button>
              <button
                id="nav-signup-btn"
                onClick={() => navigate('/register')}
                className="btn-accent text-sm"
                style={{ padding: '8px 18px' }}
              >
                Sign up
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-btn"
            className="md:hidden p-2 rounded-lg cursor-pointer"
            style={{ color: '#94a3b8', background: 'transparent', border: 'none' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden animate-fadeInDown"
          style={{
            background: 'rgba(26, 26, 46, 0.98)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '12px 16px',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium"
              style={{
                color: isActive(link.path) ? '#ffa116' : '#94a3b8',
                textDecoration: 'none',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;