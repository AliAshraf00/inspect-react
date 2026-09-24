import * as MarqueeModule from 'react-fast-marquee';
import { Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// react-fast-marquee has no "exports" field in its package.json, so depending on
// the bundler's CJS/ESM interop, the real component can land at .default,
// .default.default, or the module namespace itself. Resolve it defensively.
function resolveComponent(mod) {
  let c = mod?.default ?? mod;
  if (c && typeof c !== 'function' && !c.$$typeof && c.default) c = c.default;
  return c;
}
const Marquee = resolveComponent(MarqueeModule);

export default function Ticker() {
  const { t } = useTranslation();
  return (
    <div className="h-[38px] bg-emerald text-white">
      <Marquee speed={38} gradient={false} pauseOnHover className="h-[38px]">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="mx-8 flex items-center gap-2 whitespace-nowrap font-en text-[13px] font-semibold" dir="ltr">
            <Phone size={14} /> {t('ticker.phone')}
            <span className="mx-6" />
            <Mail size={14} /> {t('ticker.email')}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
