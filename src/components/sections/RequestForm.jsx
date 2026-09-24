import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { UploadCloud, CheckCircle2, Paperclip } from 'lucide-react';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';

export default function RequestForm() {
  const { t } = useTranslation();
  const projectTypes = t('form.projectTypes', { returnObjects: true });
  const stages = t('form.stages', { returnObjects: true });
  const serviceOptions = t('form.servicesOptions', { returnObjects: true });

  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setFileName(file.name);
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="request" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-8">
        <SectionHead
          kicker={t('form.kicker')}
          title={
            <>
              {t('form.titlePlain')} <span className="text-orange">{t('form.titleAccent')}</span>{' '}
              {t('form.titleSuffix')}
            </>
          }
          desc={t('form.desc')}
        />

        <Reveal className="rounded-md border border-black/10 bg-white p-7 shadow-card sm:p-13">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2"
              >
                <Field label={t('form.projectType')}>
                  <select required className={selectClass}>
                    <option value="">{t('form.projectTypeChoose')}</option>
                    {projectTypes.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </Field>

                <Field label={t('form.location')}>
                  <input type="text" required placeholder={t('form.locationPlaceholder')} className={inputClass} />
                </Field>

                <Field label={t('form.area')}>
                  <input type="number" required placeholder={t('form.areaPlaceholder')} className={inputClass} />
                </Field>

                <Field label={t('form.floors')}>
                  <input type="number" required placeholder={t('form.floorsPlaceholder')} className={inputClass} />
                </Field>

                <Field label={t('form.stage')} full>
                  <select required className={selectClass}>
                    <option value="">{t('form.stageChoose')}</option>
                    {stages.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </Field>

                <Field label={t('form.requestedServices')} full>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {serviceOptions.map((o) => (
                      <label
                        key={o}
                        className="flex items-center gap-2.5 rounded-[3px] border border-black/10 bg-bg px-3.5 py-3 text-[14.5px] transition-colors has-[:checked]:border-emerald has-[:checked]:bg-emerald-tint"
                      >
                        <input type="checkbox" className="h-[17px] w-[17px] accent-emerald" /> {o}
                      </label>
                    ))}
                    <label className="col-span-full flex items-center gap-2.5 rounded-[3px] border border-black/10 bg-bg px-3.5 py-3 text-[14.5px] transition-colors has-[:checked]:border-emerald has-[:checked]:bg-emerald-tint">
                      <input type="checkbox" className="h-[17px] w-[17px] accent-emerald" /> {t('form.servicesFull')}
                    </label>
                  </div>
                </Field>

                <Field label={t('form.upload')} full>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                    className={`cursor-pointer rounded border-2 border-dashed p-10 text-center transition-colors ${
                      dragActive ? 'border-emerald bg-emerald-tint' : 'border-black/10 bg-bg'
                    }`}
                  >
                    <UploadCloud className="mx-auto mb-3 h-[34px] w-[34px] text-emerald" />
                    <p className="text-sm text-[#5A5A54]">{t('form.uploadHint')}</p>
                    {fileName && (
                      <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[13.5px] font-semibold text-emerald-deep">
                        <Paperclip size={14} /> {fileName}
                      </div>
                    )}
                  </div>
                  <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
                </Field>

                <Field label={t('form.name')}>
                  <input type="text" required className={inputClass} />
                </Field>
                <Field label={t('form.phone')}>
                  <input type="tel" required className={inputClass} />
                </Field>
                <Field label={t('form.email')} full>
                  <input type="email" required className={inputClass} />
                </Field>

                <div className="col-span-full mt-2 flex justify-start">
                  <Button as="button" type="submit" variant="primary">
                    {t('form.submit')}
                  </Button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="py-10 text-center"
              >
                <CheckCircle2 className="mx-auto mb-5 h-14 w-14 text-emerald" />
                <h3 className="mb-2.5 text-[22px] font-bold">{t('form.successTitle')}</h3>
                <p className="text-[#5A5A54]">{t('form.successDesc')}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}

const inputClass =
  'w-full rounded-[3px] border border-black/10 bg-bg px-3.5 py-3.5 text-[15px] transition-colors focus:border-emerald focus:bg-white focus:outline-emerald';
const selectClass = inputClass;

function Field({ label, full, children }) {
  return (
    <div className={`flex flex-col gap-2 ${full ? 'sm:col-span-2' : ''}`}>
      <label className="text-sm font-semibold">{label}</label>
      {children}
    </div>
  );
}
