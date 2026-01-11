// Certification Viewer Handler
document.addEventListener('DOMContentLoaded', function() {
  // Load external viewer HTML
  fetch('./certification-viewer.html')
    .then(response => response.text())
    .then(html => {
      // Insert the viewer HTML at the end of body
      document.body.insertAdjacentHTML('beforeend', html);
      
      // Initialize viewer functionality after HTML is loaded
      initializeCertificationViewer();
    })
    .catch(error => {
      console.error('Error loading certification viewer:', error);
    });
});

function initializeCertificationViewer() {
  const certViewer = document.getElementById('certificationViewer');
  const closeBtn = document.getElementById('closeCertViewer');
  const viewerOverlay = document.querySelector('.certification-viewer-overlay');
  const certFrame = document.getElementById('certViewerFrame');

  // Function to open certificate viewer
  window.openCertificateViewer = function(pdfUrl, fileName) {
    certFrame.src = pdfUrl;
    
    certViewer.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Close viewer function
  function closeViewer() {
    certViewer.classList.remove('active');
    document.body.style.overflow = '';
    // Clear iframe after animation
    setTimeout(() => {
      certFrame.src = '';
    }, 300);
  }

  // Close on close button click
  if (closeBtn) {
    closeBtn.addEventListener('click', closeViewer);
  }

  // Close on overlay click
  if (viewerOverlay) {
    viewerOverlay.addEventListener('click', closeViewer);
  }

  // Close on ESC key press
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && certViewer.classList.contains('active')) {
      closeViewer();
    }
  });

  // Prevent card clicks from closing the viewer
  const viewerCard = document.querySelector('.certification-viewer-card');
  if (viewerCard) {
    viewerCard.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }

  // Add click handlers to all certification links
  document.querySelectorAll('.certification-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const pdfUrl = this.getAttribute('href');
      const fileName = pdfUrl.split('/').pop();
      openCertificateViewer(pdfUrl, fileName);
    });
  });
}
