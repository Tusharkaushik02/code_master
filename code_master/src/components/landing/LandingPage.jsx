import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/authContext';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const Icon = ({ children }) => (
  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#FF8A00]">
    {children}
  </span>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SectionHeader = ({ eyebrow, title, description }) => (
  <motion.div variants={fadeUp} className="mx-auto mb-12 max-w-3xl text-center">
    <p className="font-mono mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#00C2FF]">{eyebrow}</p>
    <h2 className="text-3xl font-semibold tracking-tight text-[#F8FAFC] md:text-4xl">{title}</h2>
    <p className="mt-4 text-base leading-7 text-[#94A3B8] md:text-lg">{description}</p>
  </motion.div>
);

const ShellSection = ({ children, className = '', ...props }) => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
    variants={stagger}
    className={`relative px-5 py-20 sm:px-6 lg:px-8 ${className}`}
    {...props}
  >
    <div className="mx-auto max-w-7xl">{children}</div>
  </motion.section>
);

const stats = [
  ['4.8M+', 'submissions judged'],
  ['3200+', 'curated problems'],
  ['180+', 'company tracks'],
  ['94%', 'interview-ready learners'],
];

const features = [
  {
    title: 'Adaptive problem paths',
    description: 'CODEFLOW learns from solved, skipped, and failed attempts to keep practice targeted.',
    icon: <path d="M4 16V8l8-4 8 4v8l-8 4-8-4Zm8-4 8-4M12 12v8M12 12 4 8" />,
  },
  {
    title: 'Production-grade editor',
    description: 'Fast runtimes, structured test cases, keyboard-first flows, and clear verdict details.',
    icon: <path d="m9 18-6-6 6-6m6 0 6 6-6 6" />,
  },
  {
    title: 'Interview signal',
    description: 'Company patterns, readiness scores, and mock loops that surface what actually matters.',
    icon: <path d="M8 7h8M8 12h5M6 21v-4H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7l-6 4Z" />,
  },
  {
    title: 'Contest engine',
    description: 'Live rankings, private rooms, editorial unlocks, and streak-friendly weekly events.',
    icon: <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Zm10 2h3a3 3 0 0 1-3 3M7 6H4a3 3 0 0 0 3 3" />,
  },
];

const topics = ['Arrays', 'Graphs', 'Dynamic Programming', 'System Design', 'Trees', 'SQL', 'Greedy', 'Concurrency', 'Bit Manipulation', 'Backtracking'];

const testimonials = [
  ['CODEFLOW turned my interview prep from random grinding into a focused operating system.', 'Maya R.', 'Software Engineer, fintech'],
  ['The editor feedback and company tracks feel like what a serious team would build for internal hiring.', 'Dev K.', 'Backend Engineer'],
  ['It has the calm polish of Linear with the depth I expected from an interview platform.', 'Alina S.', 'CS student'],
];

function CodePreview() {
  const lines = [
    ['const solve = (nums, target) => {', 'text-[#F8FAFC]'],
    ['  const seen = new Map();', 'text-[#94A3B8]'],
    ['  for (let i = 0; i < nums.length; i++) {', 'text-[#94A3B8]'],
    ['    const need = target - nums[i];', 'text-[#94A3B8]'],
    ['    if (seen.has(need)) return [seen.get(need), i];', 'text-[#FFBD70]'],
    ['    seen.set(nums[i], i);', 'text-[#94A3B8]'],
    ['  }', 'text-[#94A3B8]'],
    ['};', 'text-[#F8FAFC]'],
  ];

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      className="premium-surface relative overflow-hidden rounded-2xl"
    >
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#FF8A00]/12 to-transparent" />
      <div className="relative border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#FF6B6B]" />
            <span className="h-3 w-3 rounded-full bg-[#FFBD70]" />
            <span className="h-3 w-3 rounded-full bg-[#3DDC97]" />
          </div>
          <span className="font-mono text-xs text-[#64748B]">two-sum.flow</span>
        </div>
      </div>
      <div className="grid lg:grid-cols-[1fr_230px]">
        <div className="p-5">
          <div className="mb-4 flex items-center gap-2">
            {['Solution', 'Tests', 'Editorial'].map((tab, index) => (
              <span key={tab} className={`rounded-lg px-3 py-1.5 text-xs font-medium ${index === 0 ? 'bg-[#FF8A00]/12 text-[#FFA733]' : 'text-[#64748B]'}`}>
                {tab}
              </span>
            ))}
          </div>
          <div className="font-mono rounded-xl border border-white/10 bg-[#0B0F17]/72 p-4 text-sm leading-7">
            {lines.map(([line, color], index) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex gap-4"
              >
                <span className="w-5 text-right text-[#64748B]">{index + 1}</span>
                <code className={color}>{line}</code>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 p-5 lg:border-l lg:border-t-0">
          <p className="text-sm font-semibold text-[#F8FAFC]">Live verdict</p>
          <div className="mt-4 space-y-3">
            {[
              ['Accepted', '42 ms', '#3DDC97'],
              ['Memory', '41.8 MB', '#00C2FF'],
              ['Beats', '96%', '#FF8A00'],
            ].map(([label, value, color]) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#94A3B8]">{label}</span>
                  <span className="font-semibold" style={{ color }}>{value}</span>
                </div>
              </div>
            ))}
          </div>
          <Button as={Link} to="/problemlist" variant="outline" size="sm" className="mt-5 w-full">
            Open Problem
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function HeroSection() {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-24">
      <div className="bg-grid absolute inset-0 opacity-50" />
      <motion.div
        animate={{ opacity: [0.45, 0.85, 0.45], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[8%] top-24 h-72 w-72 rounded-full bg-[#FF8A00]/18 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF8A00]/20 bg-[#FF8A00]/10 px-3 py-1.5 text-sm font-medium text-[#FFA733]">
            <span className="h-2 w-2 rounded-full bg-[#00C2FF]" />
            Built for serious interview prep
          </motion.div>
          <motion.h1 variants={fadeUp} className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-[#F8FAFC] sm:text-5xl lg:text-6xl">
            Practice like a top engineer with <span className="text-gradient">CODEFLOW</span>.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-[#94A3B8]">
            A premium coding platform for structured problem solving, interview readiness, and high-signal contests without the clutter.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button as={Link} to={user ? '/problemlist' : '/register'} size="lg">
              {user ? 'Continue Practicing' : 'Start Free'} <ArrowIcon />
            </Button>
            <Button as={Link} to="/problemlist" variant="secondary" size="lg">
              Explore Problems
            </Button>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4 text-sm text-[#64748B]">
            {['No noise', 'Company patterns', 'Fast editor', 'Live contests'].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A00]" />
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.18 }}>
          <CodePreview />
        </motion.div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <ShellSection className="py-10">
      <motion.div variants={stagger} className="grid overflow-hidden rounded-2xl border border-white/10 bg-[#111827]/70 md:grid-cols-4">
        {stats.map(([value, label]) => (
          <motion.div key={label} variants={fadeUp} className="border-b border-white/10 p-6 text-center md:border-b-0 md:border-r last:border-r-0">
            <p className="text-3xl font-semibold text-[#F8FAFC]">{value}</p>
            <p className="mt-2 text-sm text-[#94A3B8]">{label}</p>
          </motion.div>
        ))}
      </motion.div>
    </ShellSection>
  );
}

function FeaturesSection() {
  return (
    <ShellSection id="features">
      <SectionHeader
        eyebrow="Platform"
        title="Everything feels connected, from first attempt to final offer."
        description="A calmer system for coding practice: better context, smarter organization, and enough polish to stay out of your way."
      />
      <motion.div variants={stagger} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <motion.article
            key={feature.title}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="group rounded-2xl border border-white/10 bg-[#161B26]/82 p-6 transition-colors hover:border-[#FF8A00]/35 hover:bg-[#1C2330]"
          >
            <Icon>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{feature.icon}</g>
              </svg>
            </Icon>
            <h3 className="mt-5 text-lg font-semibold text-[#F8FAFC]">{feature.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[#94A3B8]">{feature.description}</p>
            <div className="mt-5 h-px w-12 bg-[#FF8A00]/0 transition-all group-hover:w-24 group-hover:bg-[#FF8A00]/70" />
          </motion.article>
        ))}
      </motion.div>
    </ShellSection>
  );
}

function PlaygroundSection() {
  return (
    <ShellSection>
      <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div variants={fadeUp}>
          <p className="font-mono mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#00C2FF]">Playground</p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#F8FAFC] md:text-4xl">A coding workspace that respects focus.</h2>
          <p className="mt-5 text-lg leading-8 text-[#94A3B8]">
            The preview balances problem context, editor state, tests, and feedback so users can scan, act, and learn quickly.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {topics.map((topic) => (
              <Link
                key={topic}
                to="/problemlist"
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-[#94A3B8] no-underline transition hover:border-[#FF8A00]/40 hover:bg-[#FF8A00]/10 hover:text-[#FFA733]"
              >
                {topic}
              </Link>
            ))}
          </div>
        </motion.div>
        <motion.div variants={fadeUp}>
          <CodePreview />
        </motion.div>
      </div>
    </ShellSection>
  );
}

function InterviewSection() {
  return (
    <ShellSection>
      <div className="rounded-3xl border border-white/10 bg-[#111827]/82 p-6 md:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div variants={fadeUp}>
            <p className="font-mono mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#00C2FF]">Interview prep</p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#F8FAFC] md:text-4xl">Turn practice into a repeatable hiring system.</h2>
            <p className="mt-5 text-lg leading-8 text-[#94A3B8]">
              Company playlists, timed mock rounds, rubric-driven review, and weakness maps make interview prep feel intentional.
            </p>
            <Button as={Link} to="/problemlist" variant="outline" className="mt-7">
              View Tracks <ArrowIcon />
            </Button>
          </motion.div>
          <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2">
            {['FAANG loops', 'Behavioral notes', 'Pattern drills', 'Mock debriefs'].map((item, index) => (
              <motion.div key={item} variants={fadeUp} className="rounded-2xl border border-white/10 bg-[#161B26] p-5">
                <p className="font-mono text-sm text-[#FF8A00]">0{index + 1}</p>
                <h3 className="mt-4 text-lg font-semibold text-[#F8FAFC]">{item}</h3>
                <p className="mt-2 text-sm leading-6 text-[#94A3B8]">Focused prep modules with measurable progress and clean next steps.</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </ShellSection>
  );
}

function ContestSection() {
  return (
    <ShellSection>
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <motion.div variants={fadeUp} className="premium-surface rounded-3xl p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-[#F8FAFC]">Weekend Sprint</h2>
            <span className="rounded-full bg-[#00C2FF]/10 px-3 py-1 text-sm font-semibold text-[#00C2FF]">Live in 04:18</span>
          </div>
          {['Graph compression', 'Cache invalidation', 'Dynamic grid walk'].map((name, index) => (
            <div key={name} className="flex items-center justify-between border-t border-white/10 py-4">
              <div>
                <p className="font-medium text-[#F8FAFC]">{name}</p>
                <p className="text-sm text-[#64748B]">{['Medium', 'Hard', 'Medium'][index]} - 30 min target</p>
              </div>
              <span className="font-mono text-sm text-[#FF8A00]">+{[250, 420, 310][index]}</span>
            </div>
          ))}
        </motion.div>
        <motion.div variants={fadeUp}>
          <p className="font-mono mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#00C2FF]">Contests</p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#F8FAFC] md:text-4xl">Competition without chaos.</h2>
          <p className="mt-5 text-lg leading-8 text-[#94A3B8]">
            Weekly events are designed for skill growth: elegant leaderboards, post-contest editorials, and private team rooms.
          </p>
        </motion.div>
      </div>
    </ShellSection>
  );
}

function TestimonialsSection() {
  return (
    <ShellSection>
      <SectionHeader eyebrow="Proof" title="Loved by builders who care about signal." description="The tone is premium, but the product promise stays practical: better practice, less noise." />
      <motion.div variants={stagger} className="grid gap-4 md:grid-cols-3">
        {testimonials.map(([quote, name, role]) => (
          <motion.figure key={name} variants={fadeUp} className="rounded-2xl border border-white/10 bg-[#161B26]/82 p-6">
            <blockquote className="text-base leading-7 text-[#F8FAFC]">"{quote}"</blockquote>
            <figcaption className="mt-6 border-t border-white/10 pt-4">
              <p className="font-semibold text-[#F8FAFC]">{name}</p>
              <p className="text-sm text-[#64748B]">{role}</p>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </ShellSection>
  );
}

function PricingSection() {
  return (
    <ShellSection>
      <div className="mx-auto max-w-5xl rounded-3xl border border-[#FF8A00]/24 bg-gradient-to-br from-[#FF8A00]/12 via-[#161B26] to-[#00C2FF]/10 p-6 md:p-8">
        <motion.div variants={fadeUp} className="grid items-center gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="font-mono mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#FFA733]">Pricing preview</p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#F8FAFC]">Start free. Upgrade when prep becomes serious.</h2>
            <p className="mt-4 text-lg leading-8 text-[#94A3B8]">Free practice, editor access, and contests. Pro adds company tracks, mock interviews, analytics, and private rooms.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0B0F17]/72 p-6">
            <p className="text-sm text-[#94A3B8]">CODEFLOW Pro</p>
            <p className="mt-2 text-4xl font-semibold text-[#F8FAFC]">$12<span className="text-base text-[#64748B]">/mo</span></p>
            <Button as={Link} to="/register" className="mt-5 w-full">
              Join Waitlist
            </Button>
          </div>
        </motion.div>
      </div>
    </ShellSection>
  );
}

function Footer() {
  const columns = [
    ['Platform', 'Problems', 'Playground', 'Contests', 'Interview'],
    ['Resources', 'Editorials', 'Roadmaps', 'Docs', 'Community'],
    ['Company', 'About', 'Careers', 'Privacy', 'Terms'],
  ];

  return (
    <footer className="border-t border-white/10 px-5 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_2fr]">
        <div>
          <Link to="/" className="inline-flex items-center gap-3 no-underline">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF8A00] text-[#0B0F17]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m8 6 4 6-4 6m8-12-4 6 4 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-lg font-semibold tracking-tight">CODEFLOW</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-[#94A3B8]">A modern coding and interview-prep platform for developers who want clean structure and serious momentum.</p>
          <div className="mt-6 flex gap-3">
            {['GH', 'X', 'IN'].map((social) => (
              <a key={social} href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-xs font-semibold text-[#94A3B8] no-underline transition hover:border-[#FF8A00]/40 hover:text-[#FFA733]">
                {social}
              </a>
            ))}
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map(([heading, ...items]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold text-[#F8FAFC]">{heading}</h3>
              <div className="mt-4 space-y-3">
                {items.map((item) => (
                  <a key={item} href="#" className="block text-sm text-[#94A3B8] no-underline transition hover:text-[#F8FAFC]">{item}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-[#64748B] sm:flex-row sm:items-center sm:justify-between">
        <p>Copyright 2026 CODEFLOW. All rights reserved.</p>
        <p>Designed for high-signal practice.</p>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0B0F17] text-[#F8FAFC]">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <PlaygroundSection />
      <InterviewSection />
      <ContestSection />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
    </main>
  );
}
