// Contact Model Handler
document.addEventListener('DOMContentLoaded', function() {
  // Load external model HTML
  fetch('./contact-model.html')
    .then(response => response.text())
    .then(html => {
      // Insert the model HTML at the end of body
      document.body.insertAdjacentHTML('beforeend', html);
      
      // Initialize model functionality after HTML is loaded
      initializeModel();
    })
    .catch(error => {
      console.error('Error loading contact model:', error);
    });
});

function initializeModel() {
  const openModelBtn = document.getElementById('openContactModel');
  const closeModelBtn = document.getElementById('closeModel');
  const contactModel = document.getElementById('contactModel');
  const modelOverlay = document.querySelector('.contact-model-overlay');

  // Open model
  if (openModelBtn) {
    openModelBtn.addEventListener('click', function(e) {
      e.preventDefault();
      contactModel.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent body scroll
    });
  }

  // Close model function
  function closeModel() {
    contactModel.classList.remove('active');
    document.body.style.overflow = ''; // Restore body scroll
  }

  // Close model on close button click
  if (closeModelBtn) {
    closeModelBtn.addEventListener('click', closeModel);
  }

  // Close model on overlay click
  if (modelOverlay) {
    modelOverlay.addEventListener('click', closeModel);
  }

  // Close model on ESC key press
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && contactModel.classList.contains('active')) {
      closeModel();
    }
  });

  // Prevent model card clicks from closing the model
  const modelCard = document.querySelector('.contact-model-card');
  if (modelCard) {
    modelCard.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
}
