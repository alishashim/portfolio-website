const siteNav = document.querySelector(".site-nav");
const menuToggle = document.querySelector(".menu-toggle");
const menuLinks = document.querySelectorAll(".nav-links a");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const currentYear = document.querySelector("#current-year");

const setMenuState = (isOpen) => {
  if (!siteNav || !menuToggle) return;

  siteNav.classList.toggle("is-open", isOpen);
  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
};

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = !siteNav.classList.contains("is-open");
    setMenuState(isOpen);
  });
}

menuLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -5% 0px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const activeId = entry.target.getAttribute("id");

      menuLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${activeId}`;
        link.classList.toggle("is-active", isActive);
      });
    });
  },
  {
    threshold: 0.45,
    rootMargin: "-20% 0px -45% 0px",
  }
);

sections.forEach((section) => navObserver.observe(section));

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
