const navLinks = document.querySelectorAll(".sidebar ul li a");
const sections = document.querySelectorAll("section");

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

document.getElementById("feedback-form").addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent default form submission

  const form = event.target;
  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
    });

    if (response.ok) {
      const successMessage = document.getElementById("success-message");
      const errorMessage = document.getElementById("error-message");

      successMessage.style.display = "block";
      errorMessage.style.display = "none";

      form.reset(); // Clear the form

      // Hide the success message after 5 seconds
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 5000);
    } else {
      throw new Error("Failed to send feedback");
    }
  } catch (error) {
    const successMessage = document.getElementById("success-message");
    const errorMessage = document.getElementById("error-message");

    successMessage.style.display = "none";
    errorMessage.style.display = "block";

    // Hide the error message after 5 seconds
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 5000);

    console.error("Error:", error);
  }
});

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

document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll(".skill"); // Select all skill items

  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // Add 'visible' class when in view
        } else {
          entry.target.classList.remove("visible"); // Remove 'visible' class when out of view
        }
      });
    },
    {
      threshold: 0.2, 
    }
  );


  skills.forEach((skill) => observer.observe(skill));
});

document.addEventListener("DOMContentLoaded", () => {
  const scrollElements = document.querySelectorAll(".scroll-animation");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // Add 'visible' class when in view
        } else {
          entry.target.classList.remove("visible"); // Remove 'visible' class when out of view
        }
      });
    },
    {
      threshold: 0.2, 
    }
  );


  scrollElements.forEach((el) => observer.observe(el));
});

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
