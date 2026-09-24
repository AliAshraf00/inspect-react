import { useTranslation } from 'react-i18next';
import logo from '../../assets/images/Screenshot_2026-09-13_091306-removebg-preview.png';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-bg pt-20 text-[#5A5A54] before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-gradient-to-r before:from-emerald before:to-orange">
      <div className="mx-auto max-w-[1240px] px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-black/10 pb-14 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <img src={logo} alt="Inspection" className="mb-[18px] w-[120px]" />
            <p className="max-w-[260px] text-sm text-[#7A7A74]">{t('footer.desc')}</p>
          </div>
          <div>
            <h5 className="mb-[19px] text-[15.5px] font-bold text-ink">{t('footer.company')}</h5>
            <ul className="space-y-3 text-[14.5px]">
              <li><a href="#hero" className="hover:text-emerald-deep">{t('footer.aboutUs')}</a></li>
              <li><a href="#" className="hover:text-emerald-deep">{t('footer.jobs')}</a></li>
              <li><a href="#projects" className="hover:text-emerald-deep">{t('footer.ourProjects')}</a></li>
            </ul>
          </div>
          <div>
            <h5 className="mb-[19px] text-[15.5px] font-bold text-ink">{t('footer.servicesTitle')}</h5>
            <ul className="space-y-3 text-[14.5px]">
              <li><a href="#services" className="hover:text-emerald-deep">{t('footer.technicalReview')}</a></li>
              <li><a href="#faq" className="hover:text-emerald-deep">{t('footer.faqLink')}</a></li>
              <li><a href="#request" className="hover:text-emerald-deep">{t('footer.requestLink')}</a></li>
            </ul>
          </div>
          <div>
            <h5 className="mb-[19px] text-[15.5px] font-bold text-ink">{t('footer.reference')}</h5>
            <ul className="space-y-3 text-[14.5px]">
              <li><a href="#" className="hover:text-emerald-deep">{t('footer.sbcGuide')}</a></li>
              <li><a href="#" className="hover:text-emerald-deep">{t('footer.terms')}</a></li>
              <li><a href="#" className="hover:text-emerald-deep">{t('footer.privacy')}</a></li>
            </ul>
          </div>
          <div>
            <h5 className="mb-[19px] text-[15.5px] font-bold text-ink">{t('footer.contact')}</h5>
            <ul className="space-y-3 text-[14.5px]">
              <li>{t('ticker.phone')}</li>
              <li>{t('ticker.email')}</li>
              <li>{t('footer.address')}</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2.5 py-6 text-[13px] text-[#8A8A83]">
          <span>{t('footer.copyright')}</span>
          <span className="font-body" dir="ltr">{t('footer.brandEn')}</span>
        </div>
      </div>
    </footer>
  );
}
