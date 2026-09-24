import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import SectionHead from '../ui/SectionHead';

/* ---------- رسومات خطية ---------- */
const svgProps = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };

const TableArt = (p) => (
  <svg viewBox="0 0 110 120" {...svgProps} {...p}>
    <rect x="10" y="8" width="90" height="76" />
    <path d="M10 33H100M10 58H100M40 8V84M70 8V84" />
    <path d="M10 100H100M10 94V106M100 94V106" />
  </svg>
);

const CheckArt = (p) => (
  <svg viewBox="0 0 110 90" {...svgProps} {...p}>
    <rect x="4" y="6" width="100" height="74" />
    <path d="M4 30H104M4 55H104M37 6V80M71 6V80" />
    <circle cx="64" cy="44" r="18" fill="white" />
    <path d="M55 44l6 6 11-12" />
    <path d="M77 58l15 15" strokeWidth="3" />
  </svg>
);

const CrackArt = (p) => (
  <svg viewBox="0 0 110 110" {...svgProps} {...p}>
    <rect x="8" y="6" width="94" height="70" />
    <path d="M55 6L47 26L63 40L50 55L58 76" />
    <path d="M8 92H48M62 92H102M22 88l6 8M82 88l6 8" />
  </svg>
);

const ILLUS = [
  { Art: TableArt, tone: 'text-emerald', left: '81%' },
  { Art: CheckArt, tone: 'text-orange', left: '19%' },
  { Art: CrackArt, tone: 'text-orange', left: '81%' },
];

/* ---------- كارت المرحلة ---------- */
function Card({ stage, i, className = '' }) {
  const hot = i === 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.25, delay: 0 } }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
      className={`rounded-lg border border-t-[3px] p-8 text-center shadow-[0_8px_20px_-16px_rgba(17,17,17,0.25)] transition-shadow duration-300 hover:shadow-[0_26px_40px_-22px_rgba(17,17,17,0.35)] ${hot
        ? 'border-orange border-t-orange bg-orange-tint'
        : 'border-black/10 border-t-emerald bg-white hover:border-emerald'
        } ${className}`}
    >
      <span
        className={`mx-auto mb-4 flex h-8 w-8 items-center justify-center rounded-full font-en text-[13px] font-extrabold ${hot ? 'bg-orange text-white' : 'bg-emerald-tint text-emerald-deep'
          }`}
        dir="ltr"
      >
        {stage.num}
      </span>
      <h4 className="mb-2 text-[18px] font-bold">{stage.title}</h4>
      <p className="mx-auto max-w-[300px] text-[13.5px] leading-[1.8] text-[#5A5A54]">{stage.desc}</p>
    </motion.div>
  );
}

/* ---------- خط التوصيل المكسور + السهم ----------
   الحاوية متمركزة (mx-auto) وعرضها 38% => تمتد من 31% إلى 69%
   أي من منتصف الكارت الأيسر إلى منتصف الكارت الأيمن.
   كل المواضع بالداخل فيزيائية (left/right) فلا تتأثر باتجاه الصفحة.
   flip=false: يبدأ يساراً وينتهي يميناً | flip=true: العكس */
function Elbow({ flip, hot }) {
  const line = hot ? 'bg-orange' : 'bg-emerald';
  const head = hot ? 'border-t-orange' : 'border-t-emerald';
  const start = flip ? 'right-0' : 'left-0';
  const end = flip ? 'left-0' : 'right-0';
  // نصف عرض الرأس (4px) - نصف سُمك الخط (0.75px) = 3.25px
  const headOffset = { [flip ? 'left' : 'right']: '-3.25px' };

  return (
    <div className="relative mx-auto h-16 w-[38%]">
      {/* نزول من منتصف الكارت العلوي */}
      <span className={`absolute top-0 h-[34%] w-[1.5px] ${start} ${line}`} />

      {/* الخط الأفقي */}
      <span className={`absolute inset-x-0 top-[34%] h-[1.5px] ${line}`} />

      {/* نزول للكارت السفلي (ينتهي داخل رأس السهم) */}
      <span className={`absolute bottom-[5px] top-[34%] w-[1.5px] ${end} ${line}`} />

      {/* رأس السهم */}
      <span
        className={`absolute bottom-0 border-x-[4px] border-t-[6px] border-x-transparent ${head}`}
        style={headOffset}
      />
    </div>
  );
}

export default function CostFlow() {
  const { t } = useTranslation();
  const stages = t('costFlow.stages', { returnObjects: true });

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-8">
        <SectionHead
          kicker={t('costFlow.kicker')}
          title={
            <>
              {t('costFlow.titlePlain')} <span className="text-orange">{t('costFlow.titleAccent')}</span>{' '}
              {t('costFlow.titleSuffix')}
            </>
          }
          desc={t('costFlow.desc')}
        />

        {/* Desktop: زجزاج + رسومات + خطوط */}
        <div className="mx-auto hidden max-w-[880px] md:block">
          {stages.map((stage, i) => {
            const { Art, tone, left } = ILLUS[i] || ILLUS[0];
            return (
              <div key={stage.num}>
                <div className="relative">
                  <Card stage={stage} i={i} className={`w-[62%] ${i === 1 ? 'ml-auto' : 'mr-auto'}`} />
                  <div className="absolute top-1/2 w-[110px] -translate-x-1/2 -translate-y-1/2" style={{ left }}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.8, delay: i * 0.12 + 0.3 }}
                    >
                      <Art className={`w-full ${tone}`} />
                    </motion.div>
                  </div>
                </div>
                {i < stages.length - 1 && <Elbow flip={i === 1} hot={i === 1} />}
              </div>
            );
          })}
        </div>

        {/* Mobile: كروت فوق بعض */}
        <div className="mx-auto flex max-w-[420px] flex-col md:hidden">
          {stages.map((stage, i) => (
            <div key={stage.num}>
              <Card stage={stage} i={i} />
              {i < stages.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="animate-arrow-bounce text-[#B9B9B2]" size={22} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}