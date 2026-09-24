import { useTranslation } from 'react-i18next';
import * as CountUpModule from 'react-countup';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';

// react-countup has no "exports" field in its package.json, so depending on the
// bundler's CJS/ESM interop, the real component can land at .default or
// .default.default. Resolve it defensively (same issue as react-fast-marquee).
function resolveComponent(mod) {
  let c = mod?.default ?? mod;
  if (c && typeof c !== 'function' && !c.$$typeof && c.default) c = c.default;
  return c;
}
const CountUp = resolveComponent(CountUpModule);

export default function Stats() {
  const { t } = useTranslation();
  const items = t('stats.items', { returnObjects: true });

  return (
    <section id="projects" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-8">
        <SectionHead
          kicker={t('stats.kicker')}
          title={
            <>
              {t('stats.titlePlain')} <span className="text-orange">{t('stats.titleAccent')}</span>
            </>
          }
          className="mb-0"
        />
        <Reveal className="mt-14 grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-6">
          {items.map((item) => (
            <div key={item.label} className="text-center">
              <b className="block font-en text-4xl font-extrabold text-emerald-deep md:text-[38px]" dir="ltr">
                <CountUp end={item.target} duration={1.4} enableScrollSpy scrollSpyOnce suffix={item.suffix} />
              </b>
              <span className="text-sm text-[#5A5A54]">{item.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
