import { useTranslation } from 'react-i18next';

export default function SubHeroBar() {
  const { t } = useTranslation();
  const items = [t('subHero.item1'), t('subHero.item2'), t('subHero.item3')];

  return (
    <div className="border-y border-black/10 bg-white">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-3.5 px-8 py-4 text-center">
        {items.map((item, i) => (
          <span key={item} className="flex items-center gap-3.5">
            <span className="text-sm font-semibold text-[#40403C]">{item}</span>
            {i < items.length - 1 && <span className="animate-dot-pulse h-1 w-1 rounded-full bg-orange" />}
          </span>
        ))}
      </div>
    </div>
  );
}
