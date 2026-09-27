import clsx from 'clsx';

const VARIANTS = {
  primary:
    'bg-emerald overflow-hidden relative isolate',
  ghost: 'bg-transparent text-ink border-[1.5px] border-black/10 hover:border-ink',
  outlineWhite: 'bg-transparent text-white border-[1.5px] border-white/55 hover:border-white hover:bg-white/10',
};

export default function Button({ as = 'a', variant = 'primary', className, children, ...rest }) {
  const Component = as;
  return (
    <Component
      className={clsx(
        'group inline-flex items-center justify-center gap-2 rounded-[3px] px-6 py-3 text-[15px] font-bold transition-all duration-200 active:scale-95',
        VARIANTS[variant],
        className
      )}
      {...rest}
    >
      {children}
      {variant === 'primary' && (
        <span
          className="pointer-events-none absolute inset-y-0 -start-[40%] z-[1] w-[40%] -skew-x-[18deg] -translate-x-[40%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[420%]"
          aria-hidden="true"
        />
      )}
    </Component>
  );
}
