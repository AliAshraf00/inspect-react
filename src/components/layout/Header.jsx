import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Button from '../ui/Button';
import MobileDrawer from './MobileDrawer';
import useScrollSpy from '../../hooks/useScrollSpy';
import Logo from '../../assets/images/Screenshot_2026-09-13_091306-removebg-preview.png';

const NAV_IDS = ['hero', 'services', 'sectors', 'projects', 'blog', 'portal'];

export default function Header() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeId = useScrollSpy(NAV_IDS);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: t('nav.home') },
    { id: 'services', label: t('nav.services') },
    { id: 'sectors', label: t('nav.sectors') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'blog', label: t('nav.blog') },
    { id: 'portal', label: t('nav.portal') },
  ];

  const toggleLanguage = () => i18n.changeLanguage(i18n.resolvedLanguage === 'ar' ? 'en' : 'ar');

  return (
    <>
      <header
        className={clsx(
          'sticky top-0 z-[100] border-b border-black/10 bg-bg/92 backdrop-blur-md transition-shadow duration-300',
          scrolled && 'shadow-[0_14px_32px_-24px_rgba(17,17,17,0.4)]'
        )}
      >
        <div
          className={clsx(
            'mx-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-8 transition-[padding] duration-300',
            scrolled ? 'py-2.5' : 'py-[18px]'
          )}
        >
          <div className="flex min-w-0 items-center gap-2">
            <img src={Logo} alt="Inspection" className="h-[70px] w-auto flex-shrink-0" />
            <div className="hidden min-w-0 flex-col gap-[3px] sm:flex">
              <span className="text-[14.5px] font-semibold text-ink">{t('brand.sloganAr')}</span>
              <span className="hidden text-[11.5px] tracking-wide text-[#6B6B66] md:block" dir="ltr">
                {t('brand.sloganEn')}
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-9 lg:flex">
            {navItems.map((item) => {
              const isServices = item.id === 'services';
              const to = isServices ? '/services' : `/#${item.id}`;
              const isActive = isServices ? location.pathname === '/services' : (location.pathname === '/' && activeId === item.id);

              return (
                <Link
                  key={item.id}
                  to={to}
                  className={clsx(
                    'relative py-2 text-[15px] font-medium text-ink transition-colors after:absolute after:bottom-0 after:start-0 after:h-[2px] after:w-0 after:bg-orange after:transition-[width] after:duration-300 hover:border-ink hover:text-ink hover:after:w-full',
                    isActive && 'text-emerald after:w-full after:bg-emerald'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3.5">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 rounded-[3px] border-[1.5px] border-black/10 px-3 py-2 text-sm font-semibold hover:border-ink"
              aria-label="Toggle language"
            >
              <Globe size={16} /> {i18n.resolvedLanguage === 'ar' ? 'EN' : 'AR'}
            </button>
            <Button as={Link} to="/#portal" variant="ghost" className="hidden lg:inline-flex">
              {t('nav.verify')}
            </Button>
            <Button as={Link} to="/contact" variant="primary" className="text-white">
              {t('nav.contact')}
            </Button>
            <button
              className="flex h-5 w-[26px] items-center lg:hidden"
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} navItems={navItems} />
    </>
  );
}
