import { useTranslation } from 'react-i18next';
import { ChevronLeft } from 'lucide-react';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';

export default function Blog() {
  const { t } = useTranslation();
  const featured = t('blog.featured', { returnObjects: true });
  const list = t('blog.list', { returnObjects: true });

  return (
    <section id="blog" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-8">
        <SectionHead
          kicker={t('blog.kicker')}
          title={
            <>
              <span className="text-orange">{t('blog.titlePlain')}</span> {t('blog.titleAccent')}
            </>
          }
        />

        <Reveal className="grid grid-cols-1 border border-black/10 md:grid-cols-[1.1fr_0.9fr]">
          {/* Featured article */}
          <a href="#" className="group flex flex-col overflow-hidden border-black/10 bg-bg md:border-e">
            <div
              className="relative h-[280px] bg-cover bg-center"
              style={{ backgroundImage: "url('/images/blog-featured.jpeg')" }}
            >
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.08]"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,20,15,.08) 0%, rgba(8,16,12,.05) 40%, rgba(6,12,9,.55) 100%)',
                }}
              />
              <span className="absolute top-[18px] end-[18px] rounded-full bg-white/92 px-3.5 py-1.5 text-[11.5px] font-bold text-emerald-deep backdrop-blur-sm">
                {featured.badge}
              </span>
              <span className="absolute bottom-4 start-[18px] font-en text-[13px] font-bold text-white/75" dir="ltr">
                01
              </span>
            </div>
            <div className="p-7 pb-[30px] sm:px-[34px]">
              <h3 className="mb-3 text-[23px] font-extrabold leading-snug transition-colors group-hover:text-emerald-deep">
                {featured.title}
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-[#6b6b64]">{featured.desc}</p>
              <div className="flex items-center gap-2 font-en text-[12.5px] text-[#8A8A83]" dir="ltr">
                <span>{featured.date}</span>
                <span className="opacity-50">·</span>
                <span>{featured.read}</span>
                <span className="ms-auto flex items-center gap-1.5 font-ar text-[13px] font-bold text-ink" dir="rtl">
                  {t('blog.readArticle')}
                  <ChevronLeft size={14} className="rtl:rotate-180 transition-transform group-hover:-translate-x-1" />
                </span>
              </div>
            </div>
          </a>

          {/* Reading list */}
          <div className="flex flex-col bg-white">
            {list.map((item, i) => (
              <a
                key={item.title}
                href="#"
                className="group relative flex items-center gap-5 overflow-hidden border-b border-black/10 px-7 py-6"
              >
                <span className="absolute inset-0 origin-end scale-x-0 bg-emerald-tint transition-transform duration-300 group-hover:scale-x-100" />
                <span className="relative z-[1] flex-shrink-0 font-en text-[13px] font-bold text-[#B4B4AC] transition-colors group-hover:text-emerald-deep" dir="ltr">
                  {String(i + 2).padStart(2, '0')}
                </span>
                <div className="relative z-[1] min-w-0 flex-1">
                  <div className="mb-1.5 text-[11px] font-bold text-emerald">{item.cat}</div>
                  <h4 className="mb-1.5 text-[15.5px] font-bold leading-snug">{item.title}</h4>
                  <div className="text-end font-en text-xs text-[#8A8A83]" dir="ltr">
                    {item.date} · {item.read}
                  </div>
                </div>
                <ChevronLeft size={16} className="relative z-[1] flex-shrink-0 rtl:rotate-180 transition-transform group-hover:-translate-x-1 group-hover:text-emerald-deep" />
              </a>
            ))}
            <a href="#" className="group relative flex items-center gap-5 overflow-hidden bg-bg px-7 py-6">
              <span className="relative z-[1] flex-shrink-0 font-en text-lg text-orange">＋</span>
              <div className="relative z-[1] min-w-0 flex-1">
                <h4 className="mb-1.5 text-[15.5px] font-bold">{t('blog.viewAll')}</h4>
                <div className="text-xs text-[#8A8A83]">{t('blog.viewAllSub')}</div>
              </div>
              <ChevronLeft size={16} className="relative z-[1] flex-shrink-0 rtl:rotate-180" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
