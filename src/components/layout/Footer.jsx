import { useTranslation } from 'react-i18next';
// We should use the public logo.png since we replaced the logo there.
const LOGO_SRC = '/logo.png';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-[#F7F8F6] pt-16 text-[#4B4B45]">
<div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#19A99F] to-orange" />
      <div className="mx-auto max-w-[1240px] px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-black/10 pb-14 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
          
          <div className="flex flex-col items-center text-center">
            <img src={LOGO_SRC} alt="Inspection" className="mb-[18px] w-[140px] object-contain" />
            <p className="max-w-[260px] text-[13.5px] leading-[1.8] text-[#5A5A54]">{t('footer.desc')}</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <h5 className="mb-[19px] text-[15.5px] font-bold text-ink">{t('footer.company')}</h5>
            <ul className="space-y-3 text-[14px]">
              <li><a href="#hero" className="hover:text-emerald-DEFAULT transition-colors">{t('footer.aboutUs')}</a></li>
              <li><a href="#" className="hover:text-emerald-DEFAULT transition-colors">{t('footer.jobs')}</a></li>
              <li><a href="#projects" className="hover:text-emerald-DEFAULT transition-colors">{t('footer.ourProjects')}</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-center text-center">
            <h5 className="mb-[19px] text-[15.5px] font-bold text-ink">{t('footer.servicesTitle')}</h5>
            <ul className="space-y-3 text-[14px]">
              <li><a href="#services" className="hover:text-emerald-DEFAULT transition-colors">{t('footer.technicalReview')}</a></li>
              <li><a href="#faq" className="hover:text-emerald-DEFAULT transition-colors">{t('footer.faqLink')}</a></li>
              <li><a href="#request" className="hover:text-emerald-DEFAULT transition-colors">{t('footer.requestLink')}</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-center text-center">
            <h5 className="mb-[19px] text-[15.5px] font-bold text-ink">{t('footer.reference')}</h5>
            <ul className="space-y-3 text-[14px]">
              <li><a href="#" className="hover:text-emerald-DEFAULT transition-colors">{t('footer.sbcGuide')}</a></li>
              <li><a href="#" className="hover:text-emerald-DEFAULT transition-colors">{t('footer.terms')}</a></li>
              <li><a href="#" className="hover:text-emerald-DEFAULT transition-colors">{t('footer.privacy')}</a></li>
            </ul>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <h5 className="mb-[19px] text-[15.5px] font-bold text-ink">{t('footer.contact')}</h5>
            <ul className="space-y-3 text-[14px]">
              <li dir="ltr" className="hover:text-emerald-DEFAULT transition-colors cursor-pointer">{t('ticker.phone')}</li>
              <li className="hover:text-emerald-DEFAULT transition-colors cursor-pointer">{t('ticker.email')}</li>
              <li className="hover:text-emerald-DEFAULT transition-colors cursor-pointer">{t('footer.address')}</li>
            </ul>
          </div>
          
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2.5 py-6 text-[12.5px] text-[#888]">
          <span>{t('footer.copyright')}</span>
          <span className="font-en tracking-wider font-semibold" dir="ltr">{t('footer.brandEn')}</span>
        </div>
      </div>
    </footer>
  );
}
