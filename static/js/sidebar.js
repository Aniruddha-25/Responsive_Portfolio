// Controls hamburger interactions for mobile sidebar
const initSidebar = () => {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebar-backdrop");
  const navLinks = document.querySelectorAll(".sidebar ul li a");

  if (!hamburger || !sidebar || !backdrop) {
    return;
  }

  const openSidebar = () => {
    sidebar.classList.add("active");
    backdrop.classList.add("visible");
    document.body.classList.add("sidebar-open");
  };

  const closeSidebar = () => {
    sidebar.classList.remove("active");
    backdrop.classList.remove("visible");
    document.body.classList.remove("sidebar-open");
  };

  hamburger.addEventListener("click", () => {
    if (sidebar.classList.contains("active")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  backdrop.addEventListener("click", closeSidebar);

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 1024) {
        closeSidebar();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      closeSidebar();
    }
  });
};

window.addEventListener("DOMContentLoaded", initSidebar);
