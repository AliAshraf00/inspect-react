import { useTranslation } from 'react-i18next';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';

export default function AudiencePanels() {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 gap-px bg-black/10 md:grid-cols-2">
      <Reveal className="bg-white p-11 sm:p-16">
        <div className="mb-4 text-[13px] font-bold text-orange">{t('audience.homeowners.tag')}</div>
        <h3 className="mb-4 text-[28px] font-bold leading-snug">{t('audience.homeowners.title')}</h3>
        <p className="mb-7 max-w-[440px] text-[15.5px] text-[#4B4B45]">{t('audience.homeowners.desc')}</p>
        <Button as="a" href="#request" variant="primary">
          {t('audience.homeowners.cta')}
        </Button>
      </Reveal>

      <Reveal
        delay={0.1}
        className="relative overflow-hidden bg-gradient-to-br from-orange to-[#F46627] p-11 text-white sm:p-16"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 85% 15%, rgba(255,255,255,.12), transparent 45%), radial-gradient(circle at 10% 90%, rgba(0,0,0,.15), transparent 50%)',
          }}
        />
        <div className="relative z-[1]">
          <div className="mb-4 text-[13px] font-bold text-[#B9EFE8]">{t('audience.firms.tag')}</div>
          <h3 className="mb-4 text-[28px] font-bold leading-snug">{t('audience.firms.title')}</h3>
          <p className="mb-7 max-w-[440px] text-[15.5px] text-white/85">{t('audience.firms.desc')}</p>
          <Button as="a" href="#request" variant="outlineWhite">
            {t('audience.firms.cta')}
          </Button>
        </div>
      </Reveal>
    </div>
  );
}
