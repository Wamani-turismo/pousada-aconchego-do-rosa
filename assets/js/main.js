/**
 * Config editable ---------------------------------------------------------
 * Para cambiar el número de WhatsApp, editá SOLO la constante de abajo.
 * Formato wa.me: código de país + DDD + número, sin signos ni espacios.
 * Nota: los celulares de Brasil suelen llevar un "9" extra antes del número.
 * Si "554892213877" no funciona, probá con "5548992213877".
 */
const WHATSAPP_NUMBER = "554892213877";

const BOOKING_URL = "https://www.booking.com/hotel/br/pousada-aconchego-do-rosa-imbituba.html";
const INSTAGRAM_URL = "https://www.instagram.com/aconchegodorosa/";

(function () {
  "use strict";

  const LANG_KEY = "aconchego-lang";
  const supportedLangs = ["pt", "es"];
  let currentLang = localStorage.getItem(LANG_KEY);
  if (!supportedLangs.includes(currentLang)) currentLang = "pt";

  function buildWhatsappUrl(lang) {
    const text = encodeURIComponent(I18N[lang].whatsapp_message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  }

  function applyTranslations(lang) {
    const dict = I18N[lang];

    document.documentElement.lang = lang === "pt" ? "pt-BR" : "es";
    document.title = dict.meta_title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", dict.meta_description);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", dict.meta_description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", dict.meta_title);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (dict[key] !== undefined) el.setAttribute("aria-label", dict[key]);
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      if (dict[key] !== undefined) el.setAttribute("alt", dict[key]);
    });

    const whatsappUrl = buildWhatsappUrl(lang);
    document.querySelectorAll(".js-whatsapp").forEach((el) => {
      el.setAttribute("href", whatsappUrl);
    });

    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
    });
  }

  function setLang(lang) {
    if (!supportedLangs.includes(lang)) return;
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    applyTranslations(lang);
  }

  function initLangToggle() {
    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
    });
  }

  function initHeaderScroll() {
    const header = document.querySelector(".header");
    if (!header) return;
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initMobileNav() {
    const nav = document.querySelector(".nav");
    const toggle = document.querySelector(".nav-toggle");
    if (!nav || !toggle) return;
    toggle.addEventListener("click", () => nav.classList.toggle("is-open"));
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => nav.classList.remove("is-open"));
    });
  }

  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => observer.observe(el));
  }

  function initLightbox() {
    const lightbox = document.querySelector(".lightbox");
    if (!lightbox) return;
    const lightboxImg = lightbox.querySelector("img");
    const closeBtn = lightbox.querySelector(".lightbox__close");

    document.querySelectorAll("[data-lightbox]").forEach((thumb) => {
      thumb.addEventListener("click", () => {
        const full = thumb.getAttribute("data-lightbox");
        if (!full) return;
        lightboxImg.src = full;
        lightboxImg.alt = thumb.querySelector("img")?.alt || "";
        lightbox.classList.add("is-open");
      });
    });

    function close() {
      lightbox.classList.remove("is-open");
      lightboxImg.src = "";
    }
    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  function initStaticLinks() {
    document.querySelectorAll(".js-booking").forEach((el) => el.setAttribute("href", BOOKING_URL));
    document.querySelectorAll(".js-instagram").forEach((el) => el.setAttribute("href", INSTAGRAM_URL));
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".footer__year") &&
      (document.querySelector(".footer__year").textContent = new Date().getFullYear());
    initStaticLinks();
    applyTranslations(currentLang);
    initLangToggle();
    initHeaderScroll();
    initMobileNav();
    initReveal();
    initLightbox();
  });
})();

/* Analítica opcional (Google Analytics / Plausible) -----------------------
 * Descomentar y completar con el ID correspondiente cuando el dueño lo pida.
 *
 * <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
 * <script>
 *   window.dataLayer = window.dataLayer || [];
 *   function gtag(){dataLayer.push(arguments);}
 *   gtag('js', new Date());
 *   gtag('config', 'G-XXXXXXX');
 * </script>
 */
