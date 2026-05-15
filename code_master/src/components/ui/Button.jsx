const variants = {
  primary:
    'border-transparent bg-[#FF8A00] text-[#0B0F17] shadow-[0_16px_40px_rgba(255,138,0,0.24)] hover:bg-[#FFA733] hover:shadow-[0_20px_56px_rgba(255,138,0,0.34)]',
  secondary:
    'border-white/10 bg-white/[0.06] text-[#F8FAFC] hover:border-white/18 hover:bg-white/[0.09]',
  ghost:
    'border-transparent bg-transparent text-[#94A3B8] hover:bg-white/[0.06] hover:text-[#F8FAFC]',
  outline:
    'border-white/12 bg-transparent text-[#F8FAFC] hover:border-[#FF8A00]/40 hover:bg-[#FF8A00]/10 hover:text-[#FFA733]',
};

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

export function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return (
    <Component
      className={[
        'inline-flex items-center justify-center gap-2 rounded-xl border font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Component>
  );
}
