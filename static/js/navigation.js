// Handles sidebar link highlighting and smooth scrolling
const initNavigation = () => {
  const navLinks = Array.from(document.querySelectorAll(".sidebar ul li a"));
  const sections = Array.from(document.querySelectorAll("section"));

  if (!navLinks.length || !sections.length) {
    return;
  }

  const clearActive = () => navLinks.forEach((link) => link.classList.remove("active"));

  const setActiveLink = (hash) => {
    if (!hash) return;
    clearActive();
    const activeLink = navLinks.find((link) => link.getAttribute("href") === hash);
    if (activeLink) {
      activeLink.classList.add("active");
    }
  };

  const updateActiveOnScroll = () => {
    let currentSection = sections[0]?.id || "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        currentSection = section.id;
      }
    });
    setActiveLink(`#${currentSection}`);
  };

  window.addEventListener("scroll", updateActiveOnScroll);

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetSelector = link.getAttribute("href");
      const targetSection = targetSelector ? document.querySelector(targetSelector) : null;
      if (targetSection) {
        event.preventDefault();
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setActiveLink(targetSelector);
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    if (anchor.closest(".sidebar")) {
      return;
    }
    anchor.addEventListener("click", (event) => {
      const targetSelector = anchor.getAttribute("href");
      const targetSection = targetSelector ? document.querySelector(targetSelector) : null;
      if (!targetSection) return;
      event.preventDefault();
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveLink(targetSelector);
    });
  });

  const initialHash = window.location.hash || "#home";
  setActiveLink(initialHash);
  updateActiveOnScroll();
};

window.addEventListener("DOMContentLoaded", () => {
  if (typeof window.whenTemplatesReady === "function") {
    window.whenTemplatesReady(initNavigation);
  } else {
    initNavigation();
  }
});
