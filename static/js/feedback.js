// Handles EmailJS powered feedback submissions
const initFeedbackForm = () => {
  const form = document.getElementById("feedback-form");
  const successMsg = document.getElementById("success-message");
  const errorMsg = document.getElementById("error-message");

  if (!form) {
    return;
  }

  const hideMessages = () => {
    if (successMsg) successMsg.style.display = "none";
    if (errorMsg) errorMsg.style.display = "none";
  };

  const revealMessage = (element) => {
    if (!element) return;
    element.style.display = "block";
    setTimeout(() => {
      element.style.display = "none";
    }, 5000);
  };

  hideMessages();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    hideMessages();

    const name = form.querySelector("#name")?.value || "";
    const email = form.querySelector("#email")?.value || "";
    const message = form.querySelector("#message")?.value || "";

    if (typeof emailjs === "undefined" || typeof emailjs.send !== "function") {
      if (errorMsg) {
        errorMsg.textContent = "Email service unavailable. Please try again later.";
        revealMessage(errorMsg);
      }
      return;
    }

    emailjs
      .send("service_iopqhqc", "template_zw0i4e7", { name, email, message })
      .then(() => {
        revealMessage(successMsg);
        form.reset();
      })
      .catch(() => {
        revealMessage(errorMsg);
      });
  });
};

window.addEventListener("DOMContentLoaded", initFeedbackForm);
