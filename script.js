const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const backToTop = document.querySelector(".back-to-top");

const closeMenu = () => {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menú");
  navigation.classList.remove("is-open");
};

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
}

const updateBackToTop = () => {
  if (backToTop) backToTop.hidden = window.scrollY < 360;
};

window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealElements = document.querySelectorAll(
    ".about-grid, .about-rule, .meats-heading, .meat-card, .schedule-heading, .schedule-card, .contact-copy, .contact-actions, .location-heading, .map-card, .location-footer"
  );

  revealElements.forEach((element) => element.classList.add("reveal"));
  document.documentElement.classList.add("js");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });

  revealElements.forEach((element) => revealObserver.observe(element));
}

const yearElement = document.querySelector("#year");
if (yearElement) yearElement.textContent = new Date().getFullYear();
