import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { useAuth } from '../context/authContext';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const MenuIcon = ({ open }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {open ? (
      <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    ) : (
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    )}
  </svg>
);

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/problemlist', label: 'Problems' },
  { path: '/#features', label: 'Features' },
  { path: '/dashboard', label: 'Dashboard' },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3 no-underline" aria-label="CODEFLOW home">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF8A00] text-[#0B0F17] shadow-[0_12px_32px_rgba(255,138,0,0.25)]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m8 6 4 6-4 6m8-12-4 6 4 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-lg font-semibold tracking-tight text-[#F8FAFC]">CODE<span className="text-[#FF8A00]">FLOW</span></span>
    </Link>
  );
}

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const close = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const initials = useMemo(() => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }, [user]);

  const isActive = (path) => {
    if (path.includes('#')) return false;
    return location.pathname === path;
  };

  const submitSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate('/problemlist');
      setSearchQuery('');
      setMobileOpen(false);
    }
  };

  return (
    <nav
      className={[
        'fixed inset-x-0 top-0 z-50 border-b transition-all duration-300',
        scrolled ? 'border-white/10 bg-[#0B0F17]/82 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.32)] backdrop-blur-2xl' : 'border-white/5 bg-[#0B0F17]/58 py-4 backdrop-blur-xl',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Logo />

        <div className="hidden items-center gap-1 rounded-full border border-white/8 bg-white/[0.035] p-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={[
                'rounded-full px-4 py-2 text-sm font-medium no-underline transition',
                isActive(link.path) ? 'bg-white/10 text-[#F8FAFC]' : 'text-[#94A3B8] hover:bg-white/[0.06] hover:text-[#F8FAFC]',
              ].join(' ')}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <form onSubmit={submitSearch} className="hidden h-10 w-56 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-3 text-[#94A3B8] transition focus-within:border-[#00C2FF]/45 focus-within:bg-white/[0.07] lg:flex">
            <SearchIcon />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="min-w-0 flex-1 border-0 bg-transparent text-sm text-[#F8FAFC] outline-none placeholder:text-[#64748B]"
              placeholder="Search topics"
              aria-label="Search topics"
            />
            <kbd className="rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-[#64748B]">/</kbd>
          </form>

          {user ? (
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen((open) => !open)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FF8A00]/25 bg-[#FF8A00]/12 text-sm font-bold text-[#FFA733] transition hover:-translate-y-0.5 hover:bg-[#FF8A00]/18"
                aria-label="Open profile menu"
              >
                {initials}
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#161B26]/95 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
                  >
                    <div className="border-b border-white/10 p-4">
                      <p className="font-semibold text-[#F8FAFC]">{user.name || 'CODEFLOW user'}</p>
                      <p className="mt-1 truncate text-sm text-[#64748B]">{user.email || 'Ready to practice'}</p>
                    </div>
                    <div className="p-2">
                      {[
                        ['Dashboard', '/dashboard'],
                        ['Problems', '/problemlist'],
                      ].map(([label, path]) => (
                        <button
                          key={label}
                          onClick={() => {
                            setProfileOpen(false);
                            navigate(path);
                          }}
                          className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#94A3B8] transition hover:bg-white/[0.06] hover:text-[#F8FAFC]"
                        >
                          {label}
                        </button>
                      ))}
                      <button
                        onClick={() => {
                          logout();
                          setProfileOpen(false);
                          navigate('/');
                        }}
                        className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#FF9A9A] transition hover:bg-red-500/10"
                      >
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button as={Link} to="/login" variant="ghost" size="sm">Sign in</Button>
              <Button as={Link} to="/register" size="sm">Start free</Button>
            </div>
          )}

          <button
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] text-[#F8FAFC] md:hidden"
            aria-label="Toggle mobile menu"
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-5 mt-3 rounded-2xl border border-white/10 bg-[#111827]/96 p-3 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <form onSubmit={submitSearch} className="mb-2 flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-3 text-[#94A3B8]">
              <SearchIcon />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="min-w-0 flex-1 border-0 bg-transparent text-sm text-[#F8FAFC] outline-none placeholder:text-[#64748B]"
                placeholder="Search topics"
                aria-label="Search topics"
              />
            </form>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-3 py-3 text-sm font-medium text-[#94A3B8] no-underline transition hover:bg-white/[0.06] hover:text-[#F8FAFC]"
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
                <Button as={Link} to="/login" variant="secondary" size="sm" onClick={() => setMobileOpen(false)}>Sign in</Button>
                <Button as={Link} to="/register" size="sm" onClick={() => setMobileOpen(false)}>Start free</Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
