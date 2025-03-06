/**
 * Split Text Hover Effect JavaScript
 * This script finds all links on the page and applies the split text effect.
 */
(function() {
  // Run when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in WordPress admin area (contains wp-admin or /wp-login.php in URL)
    if (window.location.href.indexOf('wp-admin') > -1 || 
        window.location.href.indexOf('/wp-login.php') > -1) {
      return; // Exit if in admin area
    }
    // Select all links that don't already have the split-text-link class
    // Use custom selector if available, otherwise use default
    const selector = window.splitTextCustomSelector || 
                     'a:not(.split-text-link):not([href^="#"]):not(.no-split):not(#wpadminbar a):not(.wp-admin a)';
    const links = document.querySelectorAll(selector);
    
    // Process each link
    links.forEach(function(link) {
      // Skip links that have images or other complex content
      if (link.querySelector('img') || link.children.length > 0) {
        return;
      }
      
      // Get the original text
      const originalText = link.textContent.trim();
      
      // Skip empty links
      if (!originalText) {
        return;
      }
      
      // Add the split-text-link class to the link
      link.classList.add('split-text-link');
      
      // Clear the original content
      link.innerHTML = '';
      
      // Create span for original text
      const originalSpan = document.createElement('span');
      originalSpan.classList.add('original');
      originalSpan.textContent = originalText;
      
      // Create span for hover text (same as original in this case)
      const hoverSpan = document.createElement('span');
      hoverSpan.classList.add('hover');
      hoverSpan.textContent = originalText;
      
      // Append both spans to the link
      link.appendChild(originalSpan);
      link.appendChild(hoverSpan);
    });
  });
})();