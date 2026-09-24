import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import {
  ShieldCheck,
  LayoutGrid,
  Building2,
  Zap,
  Wind,
  Droplet,
  Flame,
  ThermometerSun,
  ArrowUpRight,
  Check,
  FileText,
  BadgeCheck,
  Table2,
  RefreshCcw,
  LayoutTemplate,
  ArrowDown,
} from "lucide-react";
import "./ServicesPage.css";

/* ============================================================
   بيانات الخدمات — النصوص جايه من الترجمة، والبيانات الهندسية (إحداثيات/كود) ثابتة
   ============================================================ */
const SERVICES_META = [
  { id: "g", order: 1, sheet: "G-001", group: "عام", codes: ["SBC 201"],
    marker: { x: 718, y: 326 }, leader: { x: 695, y: 375 }, zone: "zone-titleblock", Icon: ShieldCheck },
  { id: "a", order: 2, sheet: "A-101", group: "معماري", codes: ["SBC 1101"],
    marker: { x: 350, y: 42 }, leader: { x: 350, y: 60 }, zone: "zone-outline", Icon: LayoutGrid },
  { id: "s", order: 3, sheet: "S-201", group: "إنشائي", codes: ["SBC 201", "SBC 301"],
    marker: { x: 250, y: 78 }, leader: { x: 250, y: 100 }, zone: "zone-columns", Icon: Building2 },
  { id: "e", order: 4, sheet: "E-301", group: "كهروميكانيكي", codes: ["SBC 401"],
    marker: { x: 38, y: 382 }, leader: { x: 105, y: 381 }, zone: "zone-panel", Icon: Zap },
  { id: "m", order: 5, sheet: "M-401", group: "كهروميكانيكي", codes: ["SBC 501"],
    marker: { x: 150, y: 50 }, leader: { x: 250, y: 85 }, zone: "zone-duct", Icon: Wind },
  { id: "p", order: 6, sheet: "P-501", group: "كهروميكانيكي", codes: ["SBC 701"],
    marker: { x: 695, y: 90 }, leader: { x: 590, y: 100 }, zone: "zone-bath", Icon: Droplet },
  { id: "fp", order: 7, sheet: "FP-601", group: "سلامة", codes: ["SBC 801"],
    marker: { x: 695, y: 345 }, leader: { x: 585, y: 340 }, zone: "zone-stair", Icon: Flame },
  { id: "ee", order: 8, sheet: "EE-701", group: "طاقة", codes: ["SBC 601"],
    marker: { x: 38, y: 130 }, leader: { x: 67, y: 130 }, zone: "zone-hatch", Icon: ThermometerSun },
];

const GROUP_KEYS = ["الكل", "عام", "معماري", "إنشائي", "كهروميكانيكي", "سلامة", "طاقة"];

const INCLUDE_ICONS = [FileText, BadgeCheck, Table2, RefreshCcw];

export default function ServicesPage() {
  const { t } = useTranslation();
  const svgRootRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [peekId, setPeekId] = useState(null);
  const [stampPop, setStampPop] = useState(0);

  // دمج بيانات الترجمة مع البيانات الهندسية الثابتة
  const services = SERVICES_META.map((meta) => ({
    ...meta,
    title: t(`servicesPage.items.${meta.id}.title`),
    short: t(`servicesPage.items.${meta.id}.short`),
    scope: t(`servicesPage.items.${meta.id}.scope`),
    duration: t(`servicesPage.items.${meta.id}.duration`),
    deliverables: t(`servicesPage.items.${meta.id}.deliverables`, { returnObjects: true }),
  }));

  const activeService = services.find((s) => s.id === activeId) || null;

  // أنيميشن رسم اللوحة عند التحميل (مرة واحدة)
  useEffect(() => {
    const root = svgRootRef.current;
    if (!root) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sketchEls = Array.from(root.querySelectorAll(".sketch"));
    const dots = Array.from(root.querySelectorAll(".col-dot"));
    const clouds = Array.from(root.querySelectorAll(".cloud"));

    if (prefersReduced) {
      clouds.forEach((c) => c.classList.add("in"));
      dots.forEach((d) => d.classList.add("in"));
      return;
    }

    sketchEls.forEach((el) => {
      try {
        const len = el.getTotalLength();
        el.style.strokeDasharray = String(len);
        el.style.strokeDashoffset = String(len);
      } catch (e) {}
    });

    const raf = requestAnimationFrame(() => {
      sketchEls.forEach((el, i) => {
        el.style.transition = `stroke-dashoffset 1.05s cubic-bezier(.3,.7,.3,1) ${i * 22}ms`;
        el.style.strokeDashoffset = "0";
      });
    });

    const sketchTotal = sketchEls.length * 22 + 1050;
    const t1 = setTimeout(() => {
      dots.forEach((d, i) => setTimeout(() => d.classList.add("in"), i * 55));
    }, sketchTotal * 0.55);
    const t2 = setTimeout(() => {
      clouds.forEach((c, i) => setTimeout(() => c.classList.add("in"), i * 85));
    }, sketchTotal + 120);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  function selectService(id) {
    setActiveId(id);
    setStampPop((n) => n + 1);
    if (window.innerWidth < 860) {
      requestAnimationFrame(() => {
        document.getElementById("services-detail-panel")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }
  }

  const isZoneActive = (zoneId) => activeService?.zone === zoneId;
  const isZoneDim = (zoneId) =>
    activeFilter !== "الكل" && !services.some((s) => s.zone === zoneId && s.group === activeFilter);
  const isServiceDim = (s) => activeFilter !== "الكل" && s.group !== activeFilter;

  return (
    <div className="services-page bg-[var(--bg)] text-[var(--ink)] font-ar">
      {/* ================= HERO: اللوحة الهندسية التفاعلية ================= */}
      <section className="hero-blueprint-section relative min-h-[81vh] flex items-center overflow-hidden py-14 text-[var(--blue-line)]">
        <div className="hero-bg absolute inset-0 z-0 overflow-hidden bg-[var(--blue-navy-deep)]">
          <img
            className="absolute inset-0 h-full w-full object-cover scale-105"
            style={{ filter: "saturate(.85) brightness(.65)" }}
            src="/images/hero-1.jpeg"
            alt=""
          />
        </div>
        <div className="wrap relative z-[2] mx-auto max-w-[1240px] w-full px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_0.95fr] gap-10 items-center">
            <div className="relative z-[2] max-w-[460px]">
              <div className="text-sm font-semibold mb-3.5 text-[#8FD9D0]">{t("servicesPage.eyebrow")}</div>
              <h1 className="text-[28px] md:text-[32px] lg:text-[38px] font-bold leading-[1.32] text-white">
                {t("servicesPage.heroTitle")}
              </h1>
              <p className="mt-4 text-[15.5px] text-[#B9D3CE] max-w-[440px]">{t("servicesPage.heroDesc")}</p>
              <div className="hero-bp-hint inline-flex items-center gap-2.5 mt-6 text-[13.5px] font-semibold text-[#8FD9D0]">
                <ArrowDown className="w-4 h-4 shrink-0" strokeWidth={2} />
                {t("servicesPage.heroHint")}
              </div>
            </div>

            {/* لوحة الرسم الهندسي */}
            <div className="relative z-[2] w-full max-w-[320px] md:me-0 mx-auto md:mx-0 md:ms-auto">
              <div className="relative w-full rounded-md border border-[rgba(220,243,240,.28)] bg-[rgba(9,26,40,.92)] backdrop-blur-md p-3 pb-1.5 shadow-[0_18px_34px_-16px_rgba(0,0,0,.55)]">
                <div className="flex justify-between items-center text-[9px] text-[#7FA9A0] pb-1.5 mb-1.5 border-b border-dashed border-[rgba(220,243,240,.2)]" dir="ltr">
                  <span>{t("servicesPage.dwgLabel")}</span>
                  <span>{activeService ? activeService.sheet : "—"}</span>
                </div>

                <svg ref={svgRootRef} viewBox="0 0 800 460" aria-hidden="true" className="w-full h-auto block">
                  <g>
                    <line className="grid-dash" x1="110" y1="60" x2="110" y2="400" />
                    <line className="grid-dash" x1="250" y1="60" x2="250" y2="400" />
                    <line className="grid-dash" x1="390" y1="60" x2="390" y2="400" />
                    <line className="grid-dash" x1="70" y1="100" x2="630" y2="100" />
                    <line className="grid-dash" x1="70" y1="360" x2="630" y2="360" />
                  </g>

                  <g className={clsx("zone", { "zone-active": isZoneActive("zone-outline"), "zone-dim": isZoneDim("zone-outline") })}>
                    <rect className="sketch thick" x="70" y="60" width="560" height="340" />
                    <line className="sketch" x1="410" y1="60" x2="410" y2="400" />
                    <line className="sketch" x1="410" y1="230" x2="630" y2="230" />
                    <line className="sketch" x1="545" y1="60" x2="545" y2="230" />
                    <line className="sketch" x1="520" y1="230" x2="520" y2="400" />
                    <line className="sketch" x1="410" y1="330" x2="470" y2="330" />
                    <line className="sketch" x1="470" y1="330" x2="470" y2="290" />
                  </g>

                  <g className={clsx("zone", { "zone-active": isZoneActive("zone-columns"), "zone-dim": isZoneDim("zone-columns") })}>
                    <circle className="col-dot sketch-fill" cx="110" cy="100" r="5" />
                    <circle className="col-dot sketch-fill" cx="250" cy="100" r="5" />
                    <circle className="col-dot sketch-fill" cx="390" cy="100" r="5" />
                    <circle className="col-dot sketch-fill" cx="110" cy="360" r="5" />
                    <circle className="col-dot sketch-fill" cx="250" cy="360" r="5" />
                    <circle className="col-dot sketch-fill" cx="390" cy="360" r="5" />
                  </g>

                  <g className={clsx("zone", { "zone-active": isZoneActive("zone-panel"), "zone-dim": isZoneDim("zone-panel") })}>
                    <rect className="sketch" x="90" y="368" width="20" height="26" />
                    <line className="sketch" x1="95" y1="373" x2="95" y2="389" />
                    <line className="sketch" x1="100" y1="373" x2="100" y2="389" />
                    <line className="sketch" x1="105" y1="373" x2="105" y2="389" />
                  </g>

                  <g className={clsx("zone", { "zone-active": isZoneActive("zone-duct"), "zone-dim": isZoneDim("zone-duct") })}>
                    <rect className="sketch" x="140" y="78" width="220" height="14" />
                    <line className="sketch" x1="160" y1="78" x2="152" y2="92" />
                    <line className="sketch" x1="190" y1="78" x2="182" y2="92" />
                    <line className="sketch" x1="220" y1="78" x2="212" y2="92" />
                    <line className="sketch" x1="250" y1="78" x2="242" y2="92" />
                    <line className="sketch" x1="280" y1="78" x2="272" y2="92" />
                    <line className="sketch" x1="310" y1="78" x2="302" y2="92" />
                    <line className="sketch" x1="340" y1="78" x2="332" y2="92" />
                  </g>

                  <g className={clsx("zone", { "zone-active": isZoneActive("zone-bath"), "zone-dim": isZoneDim("zone-bath") })}>
                    <circle className="sketch" cx="585" cy="100" r="10" />
                    <rect className="sketch" x="560" y="185" width="55" height="26" rx="10" />
                  </g>

                  <g className={clsx("zone", { "zone-active": isZoneActive("zone-stair"), "zone-dim": isZoneDim("zone-stair") })}>
                    <path className="sketch" d="M535 244 h18 v18 h18 v18 h18 v18 h18 v18 h18 v18 h18" />
                    <path className="sketch thick" d="M575 400 v18 M575 418 l-8 -8 M575 418 l8 -8" />
                    <rect className="sketch" x="560" y="396" width="30" height="4" />
                  </g>

                  <g className={clsx("zone", { "zone-active": isZoneActive("zone-hatch"), "zone-dim": isZoneDim("zone-hatch") })}>
                    <rect className="sketch" x="62" y="60" width="10" height="340" />
                    <line className="sketch" x1="62" y1="80" x2="72" y2="70" />
                    <line className="sketch" x1="62" y1="110" x2="72" y2="100" />
                    <line className="sketch" x1="62" y1="140" x2="72" y2="130" />
                    <line className="sketch" x1="62" y1="170" x2="72" y2="160" />
                    <line className="sketch" x1="62" y1="200" x2="72" y2="190" />
                    <line className="sketch" x1="62" y1="230" x2="72" y2="220" />
                    <line className="sketch" x1="62" y1="260" x2="72" y2="250" />
                    <line className="sketch" x1="62" y1="290" x2="72" y2="280" />
                    <line className="sketch" x1="62" y1="320" x2="72" y2="310" />
                    <line className="sketch" x1="62" y1="350" x2="72" y2="340" />
                    <line className="sketch" x1="62" y1="380" x2="72" y2="370" />
                  </g>

                  <g className={clsx("zone", { "zone-active": isZoneActive("zone-titleblock"), "zone-dim": isZoneDim("zone-titleblock") })}>
                    <rect className="sketch" x="655" y="330" width="110" height="90" />
                    <line className="sketch" x1="655" y1="360" x2="765" y2="360" />
                    <circle className="sketch" cx="710" cy="392" r="16" />
                    <path className="sketch" d="M702 392l6 6 12-13" />
                  </g>

                  {/* خطوط الإشارة (leaders) */}
                  <g>
                    {services.map((s) => (
                      <line key={`leader-${s.id}`} className={clsx("leader", { "leader-active": activeId === s.id })}
                        x1={s.marker.x} y1={s.marker.y} x2={s.leader.x} y2={s.leader.y} />
                    ))}
                    {services.map((s) => (
                      <circle key={`leader-dot-${s.id}`} className={clsx("leader-dot", { "leader-active": activeId === s.id })}
                        cx={s.leader.x} cy={s.leader.y} r="2.4" />
                    ))}
                  </g>

                  {/* دوائر المراجعة (clouds) */}
                  <g>
                    {services.map((s) => (
                      <g
                        key={s.id}
                        className={clsx("cloud", { active: activeId === s.id, peek: peekId === s.id, "cloud-dim": isServiceDim(s) })}
                        transform={`translate(${s.marker.x},${s.marker.y})`}
                        tabIndex={0}
                        role="button"
                        aria-label={s.title}
                        onClick={() => selectService(s.id)}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectService(s.id); } }}
                      >
                        <circle className="cloud-ring" r="17" />
                        <circle className="cloud-core" r="13" />
                        <text className="cloud-label" textAnchor="middle" dy="0.34em">{s.order}</text>
                      </g>
                    ))}
                  </g>
                </svg>

                {/* دلالة المراجعة (Legend) */}
                <div className="flex flex-wrap gap-2.5 items-center justify-start pt-2 mt-0.5 text-[9.5px] text-[#8FB3AC]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full border-[1.2px] border-dashed border-[var(--orange)] shrink-0" />
                    {t("servicesPage.legendCloud")}
                  </div>
                </div>

                {/* Giant Compass from original design */}
                <div className="flex justify-center mt-8 mb-6 relative">
                  <svg viewBox="0 0 40 40" fill="none" stroke="#8FB3AC" strokeWidth="1.6" className="w-40 h-40 opacity-90">
                    <circle cx="20" cy="20" r="16" />
                    <path d="M20 7l4.5 13-4.5 5-4.5-5z" />
                    <text x="20" y="6" fontSize="5" fill="#8FB3AC" stroke="none" textAnchor="middle" fontWeight="bold">N</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= سجل الرسومات + لوحة التفاصيل ================= */}
      <section id="registry" className="py-16 md:py-24">
        <div className="wrap mx-auto max-w-[1240px] px-5 md:px-8">
          <div className="max-w-[680px] mx-auto text-center mb-12">
            <div className="text-sm font-semibold mb-3.5 text-[var(--emerald-deep)]">{t("servicesPage.registryEyebrow")}</div>
            <h2 className="text-[28px] md:text-[38px] font-bold leading-[1.32]">
              {t("servicesPage.registryTitleA")} <span className="text-[var(--orange)]">{t("servicesPage.registryTitleAccent")}</span> {t("servicesPage.registryTitleB")}
            </h2>
            <p className="mt-4 text-[17px] text-[#4B4B45] max-w-[560px] mx-auto">{t("servicesPage.registryDesc")}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {GROUP_KEYS.map((g) => (
              <button
                key={g}
                className={clsx(
                  "chip px-[18px] py-2.5 rounded-full text-[13.5px] font-semibold border-[1.5px] transition-transform",
                  activeFilter === g
                    ? "active bg-[var(--ink)] text-white border-[var(--ink)]"
                    : "bg-white text-[#4B4B45] border-[var(--line)] hover:border-[var(--ink)]"
                )}
                onClick={() => setActiveFilter(g)}
              >
                {t(`servicesPage.groups.${g === "الكل" ? "all" : g}`)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-8 items-start">
            {/* السجل */}
            <div className="border border-[var(--line)] rounded-md overflow-hidden bg-white">
              <div className="grid grid-cols-[36px_1fr_auto] sm:grid-cols-[44px_2.4fr_1fr_auto] gap-3.5 items-center px-5 py-3.5 bg-[var(--bg-warm)] text-[12.5px] font-bold text-[#6B6B66]">
                <span>{t("servicesPage.colIndex")}</span>
                <span>{t("servicesPage.colSheet")}</span>
                <span className="hidden sm:block">{t("servicesPage.colScope")}</span>
                <span />
              </div>
              <ul>
                {services.filter((s) => activeFilter === "الكل" || s.group === activeFilter).map((s) => {
                  const ServiceIcon = s.Icon;
                  return (
                    <li key={s.id}>
                      <button
                        className={clsx(
                          "row-btn w-full text-start grid grid-cols-[36px_1fr_auto] sm:grid-cols-[44px_2.4fr_1fr_auto] gap-3.5 items-center px-5 py-[18px] border-b border-[var(--line-soft)] transition-colors",
                          activeId === s.id
                            ? "bg-[var(--emerald-tint)] shadow-[inset_3px_0_0_var(--emerald)] rtl:shadow-[inset_-3px_0_0_var(--emerald)]"
                            : peekId === s.id
                            ? "bg-[var(--emerald-tint)]"
                            : "hover:bg-[var(--emerald-tint)]"
                        )}
                        onClick={() => selectService(s.id)}
                        onMouseEnter={() => setPeekId(s.id)}
                        onMouseLeave={() => setPeekId(null)}
                      >
                        <span
                          className={clsx(
                            "w-8 h-8 rounded-full border-[1.5px] flex items-center justify-center text-[13px] font-bold transition-colors",
                            activeId === s.id ? "bg-[var(--emerald)] text-white border-[var(--emerald)]" : "border-[var(--line)] text-[#6B6B66]"
                          )}
                        >
                          {s.order}
                        </span>
                        <div className="min-w-0 flex items-center justify-between gap-4">
                          <h4 className="text-[15.5px] font-semibold flex items-center gap-2">
                            <ServiceIcon className="w-[19px] h-[19px] text-[var(--emerald-deep)] shrink-0" strokeWidth={1.6} />
                            <span>{s.title}</span>
                          </h4>
                          <span className="inline-block text-[12.5px] font-bold text-[var(--orange)] shrink-0" dir="ltr">{s.sheet}</span>
                        </div>
                        <span className="hidden sm:block text-[12.5px] text-[#6B6B66] truncate">{s.short}</span>
                        <span
                          className={clsx(
                            "w-[30px] h-[30px] rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-colors",
                            activeId === s.id ? "bg-[var(--ink)] border-[var(--ink)]" : "border-[var(--line)]"
                          )}
                        >
                          <ArrowUpRight className={clsx("w-3.5 h-3.5 transition-transform rtl:-scale-x-100", activeId === s.id ? "text-white" : "")} strokeWidth={2} />
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* لوحة التفاصيل */}
            <div id="services-detail-panel" className="sticky top-24 border border-[var(--line)] rounded-md bg-white p-8 min-h-[420px] shadow-[0_20px_40px_-24px_rgba(17,17,17,0.22)]">
              {!activeService ? (
                <div className="flex flex-col items-center justify-center text-center gap-4 min-h-[360px] text-[#8A8A83]">
                  <LayoutTemplate className="detail-empty-icon w-11 h-11 text-[var(--line)]" strokeWidth={1.6} />
                  <p className="text-[14.5px] max-w-[260px]">{t("servicesPage.detailEmpty")}</p>
                </div>
              ) : (
                <div key={stampPop} className="detail-content-show">
                  <span className="text-xs font-bold text-[var(--orange)]" dir="ltr">{activeService.sheet}</span>
                  <h3 className="text-[22px] font-bold my-2 mb-3.5 leading-[1.4] flex items-center gap-3">
                    <activeService.Icon className="w-[26px] h-[26px] text-[var(--orange)] shrink-0" strokeWidth={1.6} />
                    {activeService.title}
                  </h3>
                  <div className="flex gap-2 flex-wrap mb-4.5">
                    {activeService.codes.map((c) => (
                      <span key={c} className="text-[11.5px] font-bold bg-[var(--emerald-tint)] text-[var(--emerald-deep)] px-2.5 py-1.5 rounded" dir="ltr">
                        {c}
                      </span>
                    ))}
                  </div>
                  <p className="text-[14.5px] text-[#4B4B45] mb-6">{activeService.scope}</p>
                  <div className="flex flex-col gap-5 mb-6">
                    <div>
                      <h4 className="text-[13px] font-bold mb-3 text-[#6B6B66]">{t("servicesPage.deliverablesTitle")}</h4>
                      <ul>
                        {activeService.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2.5 text-sm mb-2.5">
                            <Check className="w-4 h-4 text-[var(--emerald)] shrink-0 mt-0.5" strokeWidth={2} />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold mb-3 text-[#6B6B66]">{t("servicesPage.durationTitle")}</h4>
                      <div className="flex justify-between items-center px-3.5 py-3 bg-[var(--bg)] rounded text-[13.5px]">
                        <span>{activeService.duration}</span>
                        <span
                          key={stampPop}
                          className="stamp pop w-[78px] h-[78px] rounded-full border-[2.5px] border-[var(--stamp-red)] text-[var(--stamp-red)] flex items-center justify-center flex-col text-center relative"
                          style={{ transform: "rotate(-9deg)", opacity: 0.9 }}
                        >
                          <b className="text-[10.5px]" dir="ltr">SBC</b>
                          <span className="text-[9px] mt-0.5" dir="ltr">{t("servicesPage.stampApproved")}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link to="/contact" className="btn-primary w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[3px] text-[15px] font-bold bg-[var(--emerald)] text-white hover:bg-[var(--emerald-deep)] transition-colors">
                    {t("servicesPage.requestReview")}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= يشمل كل تقرير ================= */}
      <section className="bg-white py-16 md:py-24">
        <div className="wrap mx-auto max-w-[1240px] px-5 md:px-8">
          <div className="max-w-[680px] mx-auto text-center mb-12">
            <div className="text-sm font-semibold mb-3.5 text-[var(--emerald-deep)]">{t("servicesPage.includesEyebrow")}</div>
            <h2 className="text-[28px] md:text-[38px] font-bold leading-[1.32]">
              {t("servicesPage.includesTitleA")} <span className="text-[var(--orange)]">{t("servicesPage.includesTitleAccent")}</span> {t("servicesPage.includesTitleB")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--line)] border border-[var(--line)]">
            {t("servicesPage.includes", { returnObjects: true }).map((c, i) => {
              const IncludeIcon = INCLUDE_ICONS[i];
              return (
                <div key={c.title} className="bg-white p-8 flex flex-col items-center text-center">
                  <IncludeIcon className="w-[30px] h-[30px] text-[var(--orange)] mb-4" strokeWidth={1.6} />
                  <h4 className="text-[15.5px] font-bold mb-2">{c.title}</h4>
                  <p className="text-[13.5px] text-[#5A5A54]">{c.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16 md:py-24">
        <div className="wrap mx-auto max-w-[1240px] px-5 md:px-8">
          <div className="bg-[var(--ink)] text-white rounded-lg px-7 md:px-12 py-10 md:py-14 flex items-center justify-between gap-6 flex-wrap">
            <h3 className="text-[22px] md:text-[27px] font-bold max-w-[440px] leading-[1.4]">{t("servicesPage.ctaTitle")}</h3>
            <div className="flex gap-3.5 flex-wrap">
              <Link to="/contact" className="px-6 py-3 rounded-[3px] font-bold text-[15px] bg-[var(--emerald)] text-white hover:bg-[var(--emerald-deep)] transition-colors">
                {t("servicesPage.ctaRequest")}
              </Link>
              <a href="/#portal" className="px-6 py-3 rounded-[3px] font-bold text-[15px] border-[1.5px] border-[rgba(255,255,255,.55)] hover:border-white hover:bg-white/10 transition-colors">
                {t("servicesPage.ctaVerify")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}