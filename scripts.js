// Select all navigation links and page sections for scroll-based highlighting
const navLinks = document.querySelectorAll(".sidebar ul li a");
const sections = document.querySelectorAll("section");

// Highlight the sidebar link for the section currently in view
window.addEventListener("scroll", () => {
  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(currentSection)) {
      link.classList.add("active");
    }
  });
});

// Smooth scroll to section and highlight link on click
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const sectionId = link.getAttribute("href").slice(1); // Get the section id from href
    const section = document.getElementById(sectionId);
    window.scrollTo({
      top: section.offsetTop,
      behavior: "smooth",
    });
    navLinks.forEach((link) => link.classList.remove("active"));
    link.classList.add("active");
  });
});

// On page load, highlight the link for the current hash and set up click handlers
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".sidebar ul li a");
  const currentHash = window.location.hash || "#home"; // Default to #home
  links.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === currentHash) {
      link.classList.add("active");
    }
  });
  links.forEach((link) => {
    link.addEventListener("click", () => {
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
});

// Enable smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// Handle feedback form submission and show success/error messages using EmailJS
document.addEventListener("DOMContentLoaded", function () {
  // Hide messages on load
  const successMsg = document.getElementById("success-message");
  const errorMsg = document.getElementById("error-message");
  if (successMsg) successMsg.style.display = "none";
  if (errorMsg) errorMsg.style.display = "none";

  const form = document.getElementById("feedback-form");
  if (!form) {
    console.error("✗ Form not found!");
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Always hide both messages before showing one
    if (successMsg) successMsg.style.display = "none";
    if (errorMsg) errorMsg.style.display = "none";
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    // Fallback if EmailJS is not loaded
    if (typeof emailjs === "undefined" || !emailjs.send) {
      if (errorMsg) {
        errorMsg.textContent =
          "Email service unavailable. Please try again later.";
        errorMsg.style.display = "block";
        setTimeout(() => {
          errorMsg.style.display = "none";
        }, 5000);
      }
      return;
    }
    emailjs
      .send("service_iopqhqc", "template_zw0i4e7", {
        name: name,
        email: email,
        message: message,
      })
      .then(
        function (response) {
          if (successMsg) {
            successMsg.style.display = "block";
            setTimeout(() => {
              successMsg.style.display = "none";
            }, 5000);
          }
          if (errorMsg) errorMsg.style.display = "none";
          form.reset();
        },
        function (error) {
          if (errorMsg) {
            errorMsg.style.display = "block";
            setTimeout(() => {
              errorMsg.style.display = "none";
            }, 5000);
          }
          if (successMsg) successMsg.style.display = "none";
        }
      );
  });
});

// Animate personal photo when it enters the viewport
document.addEventListener("DOMContentLoaded", () => {
  const photo = document.querySelector(".PersonalPhoto");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          photo.classList.add("visible");
        } else {
          photo.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.5,
    }
  );
  observer.observe(photo);
});

// Animate skill items when they enter the viewport
document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll(".skill");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );
  skills.forEach((skill) => observer.observe(skill));
});

// Animate certification cards when they enter the viewport
document.addEventListener("DOMContentLoaded", () => {
  const certificationCards = document.querySelectorAll(".certification-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );
  certificationCards.forEach((card) => observer.observe(card));
});

// Animate education cards when they enter the viewport
document.addEventListener("DOMContentLoaded", () => {
  const educationCards = document.querySelectorAll(".education-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );
  educationCards.forEach((card) => observer.observe(card));
});

// Animate elements with .scroll-animation when they enter the viewport
document.addEventListener("DOMContentLoaded", () => {
  const scrollElements = document.querySelectorAll(".scroll-animation");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );
  scrollElements.forEach((el) => observer.observe(el));
});

// Handle sidebar open/close for mobile and desktop
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebar-backdrop");
  if (!hamburger || !sidebar || !backdrop) return;
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
});
