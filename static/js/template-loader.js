const templateManifest = [
  "about",
  "experience",
  "skills",
  "certifications",
  "education",
  "projects",
  "contact",
  "feedback",
];

const fetchTemplate = async (name) => {
  const response = await fetch(`./templates/${name}.html`);
  if (!response.ok) {
    throw new Error(`Unable to fetch template: ${name}`);
  }
  return response.text();
};

const injectTemplates = async () => {
  const root = document.getElementById("dynamic-sections");
  if (!root) {
    return;
  }

  const fragment = document.createDocumentFragment();

  for (const name of templateManifest) {
    try {
      const html = await fetchTemplate(name);
      const wrapper = document.createElement("div");
      wrapper.innerHTML = html;
      while (wrapper.firstChild) {
        fragment.appendChild(wrapper.firstChild);
      }
    } catch (error) {
      console.error(`[Template Loader] ${error.message}`);
    }
  }

  root.appendChild(fragment);
  document.dispatchEvent(new Event("templates:loaded"));
};

const registerTemplateHelper = () => {
  if (typeof window.whenTemplatesReady === "function") {
    return;
  }
  window.whenTemplatesReady = (callback) => {
    if (typeof callback !== "function") {
      return;
    }
    if (window.templatesReady && typeof window.templatesReady.then === "function") {
      window.templatesReady
        .then(() => callback())
        .catch(() => callback());
    } else {
      callback();
    }
  };
};

registerTemplateHelper();
window.templatesReady = injectTemplates();
