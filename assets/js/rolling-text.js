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
      // Skip links that have images
      if (link.querySelector('img')) {
        return;
      }
      
      // Get the text content - handling different types of links
      let originalText;
      const navItemLabel = link.querySelector('.wp-block-navigation-item__label');
      
      // For card buttons, extract just the base text without any appended content
      if (link.classList.contains('card__button--on-black') || 
          link.classList.contains('wp-block-read-more')) {
        // Get the current text
        const fullText = link.textContent.trim();
        // Check if it contains a colon (which separates "View" from the title)
        if (fullText.includes(':')) {
          // Just take the part before the colon and trim it
          originalText = fullText.split(':')[0].trim();
        } else {
          // If there's no colon, use the full text
          originalText = fullText;
        }
      } else if (navItemLabel) {
        // For navigation links with label spans
        originalText = navItemLabel.textContent.trim();
      } else {
        // For links with direct text content
        originalText = link.textContent.trim();
      }
      
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