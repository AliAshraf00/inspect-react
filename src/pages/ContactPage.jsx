import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import CountUp from "react-countup";
import { Phone, Mail, MapPin, UploadCloud, CheckCircle2 } from "lucide-react";
import "./ContactPage.css";

const SafeCountUp = typeof CountUp === 'function' ? CountUp : (CountUp && CountUp.default ? CountUp.default : () => <span>0</span>);

export default function ContactPage() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.resolvedLanguage === 'ar';
    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [stampPop, setStampPop] = useState(0);
    const fileInputRef = useRef(null);
    const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const projectTypeOptions = t("contactPage.form.projectType.options", { returnObjects: true });
    const stageOptions = t("contactPage.form.stage.options", { returnObjects: true });
    const serviceCheckboxes = t("contactPage.form.servicesOptions", { returnObjects: true });
    const afterSubmitSteps = t("contactPage.afterSubmit.steps", { returnObjects: true });

    function handleDrop(e) {
        e.preventDefault();
        setDragActive(false);
        const f = e.dataTransfer.files?.[0];
        if (f) setFileName(f.name);
    }

    function handleFileChange(e) {
        const f = e.target.files?.[0];
        if (f) setFileName(f.name);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        setStampPop((n) => n + 1);
    }

    return (
        <div className="contact-page bg-[var(--bg)] text-[var(--ink)]">
            {/* ================= HERO: طلب المراجعة + خط سير الطلب ================= */}
            <section className="contact-hero relative overflow-hidden text-white pt-16 md:pt-24">
                <div className="ch-bg absolute inset-0 z-0 overflow-hidden bg-[#0C1210]">
                    <img
                        className="ch-bg-img absolute inset-0 h-full w-full object-cover scale-[1.04]"
                        style={{ filter: "saturate(.85) brightness(.55)" }}
                        src="/images/contact-bg.jpeg"
                        alt=""
                    />
                </div>
                <div className="ch-grid" />
                <div className="wrap relative z-[2] mx-auto max-w-[1240px] px-5 md:px-8">
                    <div className="max-w-[640px]">
                        <div className="text-sm font-semibold mb-3.5 text-[#8FD9D0]">{t("contactPage.eyebrow")}</div>
                        <h1 className="text-[28px] md:text-[40px] font-bold leading-[1.32] text-white">{t("contactPage.heroTitle")}</h1>
                        <p className="mt-4 text-base text-[#C9C9C4] max-w-[520px]">{t("contactPage.heroDesc")}</p>
                        <div className="ch-badge inline-flex items-center gap-2.5 bg-white/[0.08] border border-white/[0.18] text-[#EAF3EF] text-[13px] font-semibold px-4 py-2 rounded-full mt-6">
                            <span className="dot w-[7px] h-[7px] rounded-full bg-[var(--orange)] shrink-0" />
                            {t("contactPage.badge")}
                        </div>
                    </div>

                    <div className="mt-14 overflow-x-auto pb-9">
                        <svg viewBox="0 0 720 150" aria-hidden="true" className="w-full min-w-[660px] h-auto block">
                            <line className="route-line" x1={isRtl ? "680" : "40"} y1="80" x2={isRtl ? "40" : "680"} y2="80" />

                            <g transform={`translate(${isRtl ? 680 : 40},80)`}>
                                <circle className="station-dot" r="7" />
                                <text className="station-sub" x="0" y="-22" textAnchor="middle">{t("contactPage.route.today")}</text>
                                <text className="station-label" x="0" y="36" textAnchor="middle">{t("contactPage.route.receiveTitle")}</text>
                            </g>
                            <g transform={`translate(${isRtl ? 467 : 253},80)`}>
                                <circle className="station-dot" r="7" />
                                <text className="station-sub" x="0" y="-22" textAnchor="middle">{t("contactPage.route.reviewTime")}</text>
                                <text className="station-label" x="0" y="36" textAnchor="middle">{t("contactPage.route.reviewTitle")}</text>
                            </g>
                            <g transform={`translate(${isRtl ? 254 : 466},80)`}>
                                <circle className="station-dot" r="7" />
                                <text className="station-sub" x="0" y="-22" textAnchor="middle">{t("contactPage.route.officialCopy")}</text>
                                <text className="station-label" x="0" y="36" textAnchor="middle">{t("contactPage.route.reportTitle")}</text>
                            </g>
                            <g transform={`translate(${isRtl ? 40 : 680},80)`}>
                                <circle className="station-dot" r="7" />
                                <text className="station-sub" x="0" y="-22" textAnchor="middle">{t("contactPage.route.whenNeeded")}</text>
                                <text className="station-label" x="0" y="36" textAnchor="middle">{t("contactPage.route.reevalTitle")}</text>
                            </g>

                            <circle className="route-pulse" r="5">
                                <animateMotion dur={prefersReduced ? "0.01s" : "6s"} repeatCount="indefinite" path={`M${isRtl ? '680,80 L40,80' : '40,80 L680,80'}`} />
                            </circle>
                        </svg>
                    </div>
                </div>
            </section>

            {/* ---------- Trust strip ---------- */}
            <div className="bg-white border-t border-b border-[var(--line)]">
                <div className="wrap mx-auto max-w-[1240px] px-5 md:px-8 flex items-center justify-center gap-4 py-4 flex-wrap text-center">
                    <span className="text-sm font-semibold text-[#40403C]">
                        <b className="font-extrabold text-[var(--emerald-deep)]" dir="ltr">
                            <SafeCountUp end={460} duration={1.2} enableScrollSpy scrollSpyOnce suffix="+" />
                        </b>{" "}
                        {t("contactPage.stats.projects")}
                    </span>
                    <span className="sep-dot w-1 h-1 rounded-full bg-[var(--orange)]" />
                    <span className="text-sm font-semibold text-[#40403C]">
                        <b className="font-extrabold text-[var(--emerald-deep)]" dir="ltr">
                            <SafeCountUp end={98} duration={1.2} enableScrollSpy scrollSpyOnce suffix="%" />
                        </b>{" "}
                        {t("contactPage.stats.satisfaction")}
                    </span>
                    <span className="sep-dot w-1 h-1 rounded-full bg-[var(--orange)]" />
                    <span className="text-sm font-semibold text-[#40403C]">
                        <b className="font-extrabold text-[var(--emerald-deep)]" dir="ltr">
                            <SafeCountUp end={1} duration={1.2} enableScrollSpy scrollSpyOnce />
                        </b>{" "}
                        {t("contactPage.stats.firstResponseDays")}
                    </span>
                </div>
            </div>

            {/* ================= الشريط الجانبي + نموذج الطلب ================= */}
            <section id="request" className="py-16 md:py-24">
                <div className="wrap mx-auto max-w-[1240px] px-5 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.3fr] gap-8 items-start">
                        {/* الشريط الجانبي */}
                        <aside className="flex flex-col gap-8 order-2 lg:order-1">
                            <div>
                                <h3 className="text-[15px] font-bold mb-4">{t("contactPage.sideContact.title")}</h3>
                                <ul className="flex flex-col gap-2.5">
                                    <li className="info-card flex items-center gap-3.5 px-4.5 py-4 border border-[var(--line)] rounded bg-white transition-all">
                                        <Phone className="w-[22px] h-[22px] text-[var(--emerald-deep)] shrink-0" strokeWidth={1.6} />
                                        <div>
                                            <b className="text-[14.5px] font-bold block" dir="ltr">920001234</b>
                                            <span className="text-[12.5px] text-[#6B6B66]">{t("contactPage.sideContact.phoneLabel")}</span>
                                        </div>
                                    </li>
                                    <li className="info-card flex items-center gap-3.5 px-4.5 py-4 border border-[var(--line)] rounded bg-white transition-all">
                                        <Mail className="w-[22px] h-[22px] text-[var(--emerald-deep)] shrink-0" strokeWidth={1.6} />
                                        <div>
                                            <b className="text-[14.5px] font-bold block" dir="ltr">info@inspection.sa</b>
                                            <span className="text-[12.5px] text-[#6B6B66]">{t("contactPage.sideContact.emailLabel")}</span>
                                        </div>
                                    </li>
                                    <li className="info-card flex items-center gap-3.5 px-4.5 py-4 border border-[var(--line)] rounded bg-white transition-all">
                                        <MapPin className="w-[22px] h-[22px] text-[var(--emerald-deep)] shrink-0" strokeWidth={1.6} />
                                        <div>
                                            <b className="text-[14.5px] font-bold block" dir="ltr">Riyadh</b>
                                            <span className="text-[12.5px] text-[#6B6B66]">{t("contactPage.sideContact.cityLabel")}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-[15px] font-bold mb-4">{t("contactPage.afterSubmit.title")}</h3>
                                <ol className="flex flex-col relative">
                                    {(Array.isArray(afterSubmitSteps) ? afterSubmitSteps : []).map((step, i) => (
                                        <li key={step.title} className="flex gap-3.5 pb-5.5 last:pb-0 relative">
                                            {i < afterSubmitSteps.length - 1 && (
                                                <span className="absolute top-7 bottom-0 right-[12.5px] w-[1.5px] bg-[var(--line)]" />
                                            )}
                                            <span className="w-[26px] h-[26px] rounded-full border-[1.5px] border-[var(--emerald)] text-[var(--emerald-deep)] text-xs font-bold flex items-center justify-center shrink-0 bg-white relative z-[1]">
                                                {i + 1}
                                            </span>
                                            <div>
                                                <b className="text-sm font-bold block mb-0.5">{step.title}</b>
                                                <p className="text-[13px] text-[#6B6B66]">{step.text}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            <div>
                                <div className="relative rounded-md overflow-hidden bg-[var(--ink)] min-h-[176px] flex items-center justify-center">
                                    <div
                                        className="absolute inset-0 opacity-35"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(rgba(220,243,240,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(220,243,240,.18) 1px, transparent 1px)",
                                            backgroundSize: "26px 26px",
                                        }}
                                    />
                                    <div className="map-pin relative z-[2]">
                                        <span className="pin-ring" />
                                        <span className="pin-ring delay" />
                                        <MapPin className="w-[30px] h-[30px] text-[var(--orange)] relative z-[2] block" strokeWidth={1.6} />
                                    </div>
                                    <div className="absolute bottom-3 right-0 left-0 text-center text-xs text-[#B9D3CE] z-[2]" dir="ltr">
                                        {t("contactPage.map.caption")}
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* نموذج الطلب */}
                        <div className="form-shell order-1 lg:order-2">
                            {!submitted ? (
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div className="field flex flex-col gap-2" style={{ animationDelay: "0.04s" }}>
                                            <label className="text-sm font-semibold">{t("contactPage.form.projectType.label")}</label>
                                            <select required className="border border-[var(--line)] rounded-[3px] px-3.5 py-3 text-[15px] bg-[var(--bg)] focus:outline-2 focus:outline-[var(--emerald)] focus:bg-white">
                                                <option value="">{t("contactPage.form.projectType.placeholder")}</option>
                                                {(Array.isArray(projectTypeOptions) ? projectTypeOptions : []).map((opt) => (
                                                    <option key={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="field flex flex-col gap-2" style={{ animationDelay: "0.09s" }}>
                                            <label className="text-sm font-semibold">{t("contactPage.form.location.label")}</label>
                                            <input type="text" placeholder={t("contactPage.form.location.placeholder")} required className="border border-[var(--line)] rounded-[3px] px-3.5 py-3 text-[15px] bg-[var(--bg)] focus:outline-2 focus:outline-[var(--emerald)] focus:bg-white" />
                                        </div>
                                        <div className="field flex flex-col gap-2" style={{ animationDelay: "0.14s" }}>
                                            <label className="text-sm font-semibold">{t("contactPage.form.area.label")}</label>
                                            <input type="number" placeholder={t("contactPage.form.area.placeholder")} required className="border border-[var(--line)] rounded-[3px] px-3.5 py-3 text-[15px] bg-[var(--bg)] focus:outline-2 focus:outline-[var(--emerald)] focus:bg-white" />
                                        </div>
                                        <div className="field flex flex-col gap-2" style={{ animationDelay: "0.19s" }}>
                                            <label className="text-sm font-semibold">{t("contactPage.form.floors.label")}</label>
                                            <input type="number" placeholder={t("contactPage.form.floors.placeholder")} required className="border border-[var(--line)] rounded-[3px] px-3.5 py-3 text-[15px] bg-[var(--bg)] focus:outline-2 focus:outline-[var(--emerald)] focus:bg-white" />
                                        </div>
                                        <div className="field md:col-span-2 flex flex-col gap-2" style={{ animationDelay: "0.24s" }}>
                                            <label className="text-sm font-semibold">{t("contactPage.form.stage.label")}</label>
                                            <select required className="border border-[var(--line)] rounded-[3px] px-3.5 py-3 text-[15px] bg-[var(--bg)] focus:outline-2 focus:outline-[var(--emerald)] focus:bg-white">
                                                <option value="">{t("contactPage.form.stage.placeholder")}</option>
                                                {(Array.isArray(stageOptions) ? stageOptions : []).map((opt) => (
                                                    <option key={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="field md:col-span-2 flex flex-col gap-2" style={{ animationDelay: "0.29s" }}>
                                            <label className="text-sm font-semibold">{t("contactPage.form.servicesLabel")}</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {(Array.isArray(serviceCheckboxes) ? serviceCheckboxes : []).map((label) => (
                                                    <label key={label} className="checkbox-item flex items-center gap-2.5 text-[14.5px] px-3.5 py-3 border border-[var(--line)] rounded-[3px] bg-[var(--bg)] transition-colors">
                                                        <input type="checkbox" className="w-[17px] h-[17px] accent-[var(--emerald)]" />
                                                        {label}
                                                    </label>
                                                ))}
                                                <label className="checkbox-item sm:col-span-2 flex items-center gap-2.5 text-[14.5px] px-3.5 py-3 border border-[var(--line)] rounded-[3px] bg-[var(--bg)] transition-colors">
                                                    <input type="checkbox" className="w-[17px] h-[17px] accent-[var(--emerald)]" />
                                                    {t("contactPage.form.servicesFull")}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="field md:col-span-2 flex flex-col gap-2" style={{ animationDelay: "0.34s" }}>
                                            <label className="text-sm font-semibold">{t("contactPage.form.uploadLabel")}</label>
                                            <div
                                                className={clsx(
                                                    "dropzone border-2 border-dashed rounded px-5 py-10 text-center bg-[var(--bg)] cursor-pointer transition-colors",
                                                    dragActive ? "drag" : "border-[var(--line)]"
                                                )}
                                                onClick={() => fileInputRef.current?.click()}
                                                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                                                onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
                                                onDrop={handleDrop}
                                            >
                                                <UploadCloud className="w-[34px] h-[34px] text-[var(--emerald)] mx-auto mb-3" strokeWidth={1.6} />
                                                <p className="text-sm text-[#5A5A54]">{t("contactPage.form.uploadHint")}</p>
                                                {fileName && <div className="mt-2.5 text-[13.5px] font-semibold text-[var(--emerald-deep)]">📎 {fileName}</div>}
                                            </div>
                                            <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
                                        </div>
                                        <div className="field flex flex-col gap-2" style={{ animationDelay: "0.39s" }}>
                                            <label className="text-sm font-semibold">{t("contactPage.form.nameLabel")}</label>
                                            <input type="text" required className="border border-[var(--line)] rounded-[3px] px-3.5 py-3 text-[15px] bg-[var(--bg)] focus:outline-2 focus:outline-[var(--emerald)] focus:bg-white" />
                                        </div>
                                        <div className="field flex flex-col gap-2">
                                            <label className="text-sm font-semibold">{t("contactPage.form.phoneLabel")}</label>
                                            <input type="tel" required className="border border-[var(--line)] rounded-[3px] px-3.5 py-3 text-[15px] bg-[var(--bg)] focus:outline-2 focus:outline-[var(--emerald)] focus:bg-white" />
                                        </div>
                                        <div className="field md:col-span-2 flex flex-col gap-2">
                                            <label className="text-sm font-semibold">{t("contactPage.form.emailLabel")}</label>
                                            <input type="email" required className="border border-[var(--line)] rounded-[3px] px-3.5 py-3 text-[15px] bg-[var(--bg)] focus:outline-2 focus:outline-[var(--emerald)] focus:bg-white" />
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <button type="submit" className="px-6 py-3 rounded-[3px] font-bold text-[15px] bg-[var(--emerald)] text-white hover:bg-[var(--emerald-deep)] transition-colors">
                                            {t("contactPage.form.submit")}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="form-success-show text-center py-10 px-2.5">
                                    <div className="flex justify-center mb-1.5">
                                        <span key={stampPop} className="success-stamp pop w-[74px] h-[74px] rounded-full border-[2.5px] border-[var(--emerald-deep)] text-[var(--emerald-deep)] flex items-center justify-center flex-col text-center relative" style={{ transform: "rotate(-8deg)", opacity: 0.95 }}>
                                            <b className="text-[10.5px]" dir="ltr">RECEIVED</b>
                                            <span className="text-[9px] mt-0.5" dir="ltr">SBC</span>
                                        </span>
                                    </div>
                                    <CheckCircle2 className="w-[52px] h-[52px] text-[var(--emerald)] mx-auto mb-2.5" strokeWidth={1.6} />
                                    <h3 className="text-[22px] font-bold mb-2.5">{t("contactPage.success.title")}</h3>
                                    <p className="text-[#5A5A54]">{t("contactPage.success.text")}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}