/**
 * CoverAnimator - Animates cover images sliding in from left edge
 * 
 * This script slides cover images with the .animate-cover class
 * from outside the left edge of the viewport to their default position,
 * maintaining their original size and aspect ratio.
 */
(function() {
  // Add style tag to hide cover elements immediately (before DOM is fully loaded)
  const style = document.createElement('style');
  style.textContent = `
    .animate-cover {
      opacity: 0 !important;
      visibility: hidden !important;
    }
  `;
  document.head.appendChild(style);
  
  // Main animation function
  function initCoverAnimation() {
    // Configuration
    const config = {
      coverSelector: '.animate-cover',
      duration: '1.5s',        // Animation duration
      easing: 'cubic-bezier(.25,.59,.84,1)', // Smooth easing
      delay: '0.2s'            // Slight delay to let page settle
    };

    // Find all matching elements
    const covers = document.querySelectorAll(config.coverSelector);
    
    // Exit if no covers found
    if (covers.length === 0) {
      console.log('No cover elements found with class: ' + config.coverSelector);
      return;
    }
    
    // Remove the style tag that was hiding the covers
    document.head.removeChild(style);
    
    // Process each cover
    covers.forEach((cover, index) => {
      // Skip if element doesn't match our mobile/desktop state
      if (cover.classList.contains('hide-on-mobile') && window.innerWidth < 768) {
        return;
      }
      
      // Get the viewport width
      const viewportWidth = window.innerWidth;
      
      // Store original styles
      const originalPosition = window.getComputedStyle(cover).position;
      const originalTransform = cover.style.transform || '';
      
      // Get cover's dimensions
      const coverRect = cover.getBoundingClientRect();
      
      // Make cover position relative if it's static
      if (originalPosition === 'static') {
        cover.style.position = 'relative';
      }
      
      // Set initial hidden position (off-screen to the left)
      cover.style.transform = `translateX(-${viewportWidth + coverRect.width}px) ${originalTransform}`;
      cover.style.transition = `transform ${config.duration} ${config.easing}, opacity 0.3s ease-in`;
      cover.style.opacity = '0';
      cover.style.visibility = 'hidden';
      
      // Create a moment for browser layout calculation
      setTimeout(() => {
        // Show the element (still off-screen)
        cover.style.opacity = '1';
        cover.style.visibility = 'visible';
        
        // Small delay before animation
        setTimeout(() => {
          // Animate to original position
          cover.style.transform = originalTransform || 'translateX(0)';
          
          // Clean up after animation
          cover.addEventListener('transitionend', function cleanup(e) {
            if (e.propertyName === 'transform') {
              cover.removeEventListener('transitionend', cleanup);
              cover.classList.add('cover-animation-complete');
              
              // If position was changed from static, restore it after animation
              if (originalPosition === 'static') {
                cover.style.position = 'static';
              }
            }
          });
        }, 50);
      }, 100);
    });
  }

  // Run on DOMContentLoaded, but also prepare styles immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCoverAnimation);
  } else {
    // DOMContentLoaded has already fired
    initCoverAnimation();
  }
})();