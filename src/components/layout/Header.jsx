import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Menu, Globe, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import Button from "../ui/Button";
import MobileDrawer from "./MobileDrawer";
import useScrollSpy from "../../hooks/useScrollSpy";
import Logo from "../../assets/images/Screenshot_2026-09-13_091306-removebg-preview.png";

const NAV_IDS = [
  "aboutUs",
  "ourServices",
  "sectors",
  "partners",
  "projects",
  "mediaCenter",
  "portal",
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeId = useScrollSpy(NAV_IDS);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const setHeaderHeight = () => {
      if (headerRef.current) {
        document.documentElement.style.setProperty(
          "--header-h",
          `${headerRef.current.offsetHeight}px`,
        );
      }
    };
    setHeaderHeight();
    window.addEventListener("resize", setHeaderHeight);
    return () => window.removeEventListener("resize", setHeaderHeight);
  }, [scrolled]);

  const navItems = [
    {
      id: "aboutUs",
      label: t("nav.aboutUs"),
      dropdown: [
        { label: t("nav.mission"), to: "/about/mission" },
        { label: t("nav.structure"), to: "/about/structure" },
      ],
    },
    {
      id: "ourServices",
      label: t("nav.ourServices"),
      to: "/services",
      dropdown: [
        { label: t("nav.inspectionServices"), to: "/services/inspection" },
        {
          label: t("nav.environmentalConsulting"),
          to: "/services/environmental-consulting",
        },
        { label: t("nav.waterEfficiency"), to: "/services/water-efficiency" },
      ],
    },
    { id: "sectors", label: t("nav.sectors") },
    { id: "partners", label: t("nav.partners") },
    { id: "projects", label: t("nav.projects") },
    {
      id: "mediaCenter",
      label: t("nav.mediaCenter"),
      dropdown: [
        { label: t("nav.latestNews"), to: "/media/news" },
        {
          label: t("nav.technicalLibrary"),
          submenu: [
            {
              label: t("nav.officialDocuments"),
              to: "/media/library/documents",
            },
            {
              label: t("nav.accreditations"),
              to: "/media/library/accreditations",
            },
            {
              label: t("nav.technicalReferences"),
              to: "/media/library/references",
            },
          ],
        },
      ],
    },
    { id: "portal", label: t("nav.portal") },
  ];
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const headerRef = useRef(null);
  const toggleLanguage = () =>
    i18n.changeLanguage(i18n.resolvedLanguage === "ar" ? "en" : "ar");

  return (
    <>
      <header
        ref={headerRef}
        className={clsx(
          "sticky top-0 z-[100] border-b border-black/10 bg-bg/92 backdrop-blur-md transition-shadow duration-300",
          scrolled && "shadow-[0_14px_32px_-24px_rgba(17,17,17,0.4)]",
        )}
      >
        <div
          className={clsx(
            "mx-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-8 transition-[padding] duration-300 lg:flex-nowrap",
            scrolled ? "py-2.5" : "py-[18px]",
          )}
        >
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <img
              src={Logo}
              alt="Inspection"
              className="h-[56px] w-auto flex-shrink-0"
            />
            <div className="hidden min-w-0 flex-col gap-[3px] sm:flex">
              <span className="text-[13px] font-semibold text-ink">
                {t("brand.sloganAr")}
              </span>
              <span
                className="hidden text-[11.5px] tracking-wide text-[#6B6B66] md:block"
                dir="ltr"
              >
                {t("brand.sloganEn")}
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex ltr:gap-6">
            {navItems.map((item) => {
              const isServices = item.id === "services";
              const to = isServices ? "/services" : `/#${item.id}`;
              const isActive = isServices
                ? location.pathname === "/services"
                : location.pathname === "/" && activeId === item.id;

              if (item.dropdown) {
                const isOpen = openDropdownId === item.id;
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setOpenDropdownId(item.id)}
                    onMouseLeave={() => setOpenDropdownId(null)}
                  >
                    <Link
  to={item.to || "#"}
  className={clsx(
    "flex items-center gap-1 py-2 text-[13.5px] font-medium text-ink transition-colors",
    isActive && "text-emerald",
  )}
>
  {item.label}
  <ChevronDown
    size={16}
    className={clsx(
      "transition-transform",
      isOpen && "rotate-180",
    )}
  />
</Link>

                    {isOpen && (
                      <div
                        className="absolute top-full start-0 z-50 pt-2 -mt-px min-w-[220px]"
                        onMouseEnter={() => setOpenDropdownId(item.id)}
                        onMouseLeave={() => setOpenDropdownId(null)}
                      >
                        <div className="rounded-[6px] border border-black/10 bg-bg py-2 shadow-lg">
                          {item.dropdown.map((sub) =>
                            sub.submenu ? (
                              <div
                                key={sub.label}
                                className="group/sub relative"
                              >
                                <button className="flex w-full items-center justify-between gap-4 px-4 py-2.5 text-[14px] font-medium text-ink duration-150 hover:bg-[#4CBCB4] hover:text-white">
                                  {sub.label}
                                  <ChevronDown
                                    size={14}
                                    className="-rotate-90 rtl:rotate-90"
                                  />
                                </button>
                                <div className="invisible absolute start-full top-0 z-50 -ms-1 min-w-[240px] rounded-[6px] border border-black/10 bg-bg py-2 opacity-0 shadow-lg transition-opacity duration-150 group-hover/sub:visible group-hover/sub:opacity-100">
                                  {sub.submenu.map((deep) => (
                                    <Link
                                      key={deep.to}
                                      to={deep.to}
  className="block px-4 py-2.5 text-[14px] font-medium text-ink duration-150 hover:bg-[#4CBCB4] hover:text-white"
                                    >
                                      {deep.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <Link
                                key={sub.to}
                                to={sub.to}
  className="block px-4 py-2.5 text-[14px] font-medium text-ink duration-150 hover:bg-[#4CBCB4] hover:text-white"
                              >
                                {sub.label}
                              </Link>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.id}
                  to={to}
                  className={clsx(
                    "relative py-2 text-[13.5px] font-medium text-ink transition-colors after:absolute after:bottom-0 after:start-0 after:h-[2px] after:w-0 after:bg-orange after:transition-[width] after:duration-300 hover:border-ink hover:text-ink hover:after:w-full",
                    isActive && "text-emerald after:w-full after:bg-emerald",
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
              className="flex items-center gap-1 rounded-[3px] border-[1.5px] border-black/10 px-3 py-2 text-sm font-semibold hover:border-ink"
              aria-label="Toggle language"
            >
              <Globe size={14} /> {i18n.resolvedLanguage === "ar" ? "EN" : "AR"}
            </button>
           <Button
  as={Link}
  to="/#portal"
  variant="ghost"
  className="hidden lg:inline-flex !bg-orange !border-orange !text-white hover:!bg-white hover:!text-orange !px-4 !py-2 !text-[13.5px] !w-[8vw] !justify-center"
>
  {t("nav.verify")}
</Button>
<Button
  as={Link}
  to="/contact"
  variant="primary"
  className="text-white !px-4 !py-2 !text-[13.5px] !w-[8vw] !justify-center"
>
  {t("nav.contact")}
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

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
