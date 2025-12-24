// Sets up simple intersection observers to reveal content on scroll
const observeCollection = (selector, options = { threshold: 0.2 }) => {
  if (!("IntersectionObserver" in window)) {
    return;
  }
  const elements = document.querySelectorAll(selector);
  if (!elements.length) {
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, options);

  elements.forEach((el) => observer.observe(el));
};

const initAnimations = () => {
  observeCollection(".skill");
  observeCollection(".certification-card");
  observeCollection(".education-card");
  observeCollection(".scroll-animation");
  observeCollection(".PersonalPhoto", { threshold: 0.5 });
};

window.addEventListener("DOMContentLoaded", initAnimations);
