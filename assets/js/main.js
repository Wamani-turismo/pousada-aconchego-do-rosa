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

  function initHeroSlides() {
    const slides = document.querySelectorAll(".hero__slide");
    if (slides.length < 2) return;
    let index = 0;
    setInterval(() => {
      slides[index].classList.remove("is-active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("is-active");
    }, 5500);
  }

  const CAROUSEL_DATA = {
    apartamentos: {
      textKey: "gallery_modal_apartamentos_text",
      images: [
        "assets/img/gallery/habitaciones/habitacion-balcon-arriba.jpg",
        "assets/img/gallery/habitaciones/habitacion-balcon-abajo.jpg",
        "assets/img/gallery/habitaciones/habitacion-cama.jpg",
        "assets/img/gallery/habitaciones/habitacion-entrada.jpg",
        "assets/img/gallery/habitaciones/habitacion-cocina.jpg",
        "assets/img/gallery/habitaciones/habitacion-bar.jpg",
        "assets/img/gallery/habitaciones/habitacion-living.jpg",
        "assets/img/gallery/habitaciones/habitacion-bano.jpg"
      ]
    },
    posada: {
      textKey: "gallery_modal_posada_text",
      images: [
        "assets/img/gallery/posada/posada-entrada.jpg",
        "assets/img/gallery/posada/posada-letrero.jpg",
        "assets/img/gallery/posada/posada-cabanas-1.jpg",
        "assets/img/gallery/posada/posada-cabanas-2.jpg"
      ]
    },
    compartir: {
      textKey: "gallery_modal_compartir_text",
      images: [
        "assets/img/gallery/compartir/compartir-01-quincho.jpg",
        "assets/img/gallery/compartir/compartir-02-quincho.jpg",
        "assets/img/gallery/compartir/compartir-03-pingpong.jpg",
        "assets/img/gallery/compartir/compartir-04-quincho.jpg",
        "assets/img/gallery/compartir/compartir-05-recreacion.jpg",
        "assets/img/gallery/compartir/compartir-06-quincho.jpg",
        "assets/img/gallery/compartir/compartir-07-quincho.jpg",
        "assets/img/gallery/compartir/compartir-08-quincho.jpg",
        "assets/img/gallery/compartir/compartir-09-quincho.jpg"
      ]
    }
  };
  const CAROUSEL_TITLE_KEY = {
    apartamentos: "gallery_group_habitaciones",
    posada: "gallery_group_posada",
    compartir: "gallery_group_compartir"
  };

  function initGalleryCarousel() {
    const modal = document.querySelector(".carousel-modal");
    if (!modal) return;
    const img = modal.querySelector(".carousel-modal__img");
    const title = modal.querySelector(".carousel-modal__title");
    const text = modal.querySelector(".carousel-modal__text");
    const dotsWrap = modal.querySelector(".carousel-modal__dots");
    const prevBtn = modal.querySelector(".carousel-modal__arrow--prev");
    const nextBtn = modal.querySelector(".carousel-modal__arrow--next");
    const closeBtn = modal.querySelector(".carousel-modal__close");

    let currentKey = null;
    let currentIndex = 0;

    function render() {
      const entry = CAROUSEL_DATA[currentKey];
      if (!entry) return;
      img.src = entry.images[currentIndex];
      dotsWrap.querySelectorAll(".carousel-modal__dot").forEach((dot, i) => {
        dot.classList.toggle("is-active", i === currentIndex);
      });
    }

    function open(key) {
      const entry = CAROUSEL_DATA[key];
      if (!entry) return;
      currentKey = key;
      currentIndex = 0;
      const dict = I18N[currentLang];
      title.textContent = dict[CAROUSEL_TITLE_KEY[key]] || "";
      text.textContent = dict[entry.textKey] || "";
      dotsWrap.innerHTML = "";
      entry.images.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className = "carousel-modal__dot";
        dot.setAttribute("aria-label", "Foto " + (i + 1));
        dot.addEventListener("click", () => {
          currentIndex = i;
          render();
        });
        dotsWrap.appendChild(dot);
      });
      render();
      modal.classList.add("is-open");
    }

    function close() {
      modal.classList.remove("is-open");
    }

    function step(delta) {
      const entry = CAROUSEL_DATA[currentKey];
      if (!entry) return;
      currentIndex = (currentIndex + delta + entry.images.length) % entry.images.length;
      render();
    }

    document.querySelectorAll("[data-carousel]").forEach((card) => {
      const trigger = () => open(card.getAttribute("data-carousel"));
      card.addEventListener("click", trigger);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          trigger();
        }
      });
    });

    prevBtn.addEventListener("click", () => step(-1));
    nextBtn.addEventListener("click", () => step(1));
    closeBtn.addEventListener("click", close);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) close();
    });
    document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  const EXPLORE_DATA = {
    playa: { img: "assets/img/explorar/playa-surf.jpg", key: "playa" },
    centrinho: { img: "assets/img/explorar/centrinho.jpg", key: "centrinho" },
    morros: { img: "assets/img/explorar/morros.jpg", key: "morros" },
    ballena: { img: "assets/img/explorar/ballena.jpg", key: "ballena" }
  };

  function initExploreModal() {
    const modal = document.querySelector(".info-modal");
    if (!modal) return;
    const modalImg = modal.querySelector(".info-modal__img");
    const modalTitle = modal.querySelector(".info-modal__title");
    const modalText = modal.querySelector(".info-modal__text");
    const modalCredit = modal.querySelector(".info-modal__credit");
    const closeBtn = modal.querySelector(".info-modal__close");

    document.querySelectorAll("[data-explore]").forEach((card) => {
      const open = () => {
        const entry = EXPLORE_DATA[card.getAttribute("data-explore")];
        if (!entry) return;
        const dict = I18N[currentLang];
        modalImg.src = entry.img;
        modalTitle.textContent = dict["explore_modal_" + entry.key + "_title"] || "";
        modalText.textContent = dict["explore_modal_" + entry.key + "_text"] || "";
        modalCredit.textContent = dict["explore_modal_" + entry.key + "_credit"] || "";
        modal.classList.add("is-open");
      };
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });

    function close() {
      modal.classList.remove("is-open");
    }
    closeBtn.addEventListener("click", close);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) close();
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
    initExploreModal();
    initGalleryCarousel();
    initHeroSlides();
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
