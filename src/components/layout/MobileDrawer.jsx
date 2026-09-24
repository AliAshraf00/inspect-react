import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

export default function MobileDrawer({ open, onClose, navItems }) {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[150] bg-black/35"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-y-0 end-0 z-[200] flex w-[78%] max-w-[320px] flex-col gap-5 bg-white p-7 shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
          >
            {navItems.map((item) => {
              const isServices = item.id === 'services';
              const to = isServices ? '/services' : `/#${item.id}`;
              return (
                <Link
                  key={item.id}
                  to={to}
                  onClick={onClose}
                  className="border-b border-black/[0.06] py-2 text-[17px] font-semibold"
                >
                  {item.label}
                </Link>
              );
            })}
            <Button as={Link} to="/contact" variant="primary" className="text-center" onClick={onClose}>
              {t('nav.contact')}
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
