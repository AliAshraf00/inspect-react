import Reveal from './Reveal';

export default function SectionHead({ kicker, title, desc, className = '' }) {
  return (
    <Reveal className={`mb-16 max-w-2xl ${className}`}>
      <div className="mb-3.5 text-base font-semibold text-emerald-deep">{kicker}</div>
      <h2 className="text-3xl font-bold leading-snug md:text-[40px]">{title}</h2>
      {desc && <p className="mt-4 max-w-xl text-lg text-[#4B4B45]">{desc}</p>}
    </Reveal>
  );
}
