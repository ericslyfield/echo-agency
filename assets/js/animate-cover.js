/**
 * CoverAnimator - Animates cover images from circle to default state
 * 
 * This script transforms cover images with the .animate-cover class
 * from a perfect circle in the center of the screen to their default position.
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
      startScale: 0.5,       // Starting at 50% of final size
      endScale: 1,           // Ending at 100%
      duration: '1.8s',      // Animation duration
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)', // Smooth easing
      delay: '0.2s'          // Slight delay to let page settle
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
      
      // Get the viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Store original styles to revert to
      const originalStyles = {
        position: cover.style.position,
        width: cover.style.width,
        height: cover.style.height,
        borderRadius: cover.style.borderRadius,
        transform: cover.style.transform,
        top: cover.style.top,
        left: cover.style.left,
        zIndex: cover.style.zIndex
      };
      
      // Find the image inside the cover
      const image = cover.querySelector('img');
      if (!image) {
        console.warn('Cover element does not contain an image:', cover);
        return;
      }
      
      // Store original image styles
      const originalImageStyles = {
        objectFit: image.style.objectFit,
        objectPosition: image.style.objectPosition
      };
      
      // Get cover's natural dimensions and position
      const coverRect = cover.getBoundingClientRect();
      
      // Calculate the size of the circle (using the smaller dimension)
      const circleSize = Math.min(coverRect.width, coverRect.height) * config.startScale;
      
      // Center position calculations
      const centerX = (viewportWidth / 2) - (circleSize / 2);
      const centerY = (viewportHeight / 2) - (circleSize / 2);
      
      // Calculate offset from original position
      const offsetX = centerX - coverRect.left;
      const offsetY = centerY - coverRect.top;
      
      // Prepare wrapper for proper positioning
      const parent = cover.parentNode;
      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      wrapper.style.overflow = 'visible';
      wrapper.style.width = coverRect.width + 'px';
      wrapper.style.height = coverRect.height + 'px';
      
      // Insert wrapper before the cover
      parent.insertBefore(wrapper, cover);
      
      // Initially hide the cover
      cover.style.opacity = '0';
      cover.style.visibility = 'hidden';
      
      // Move cover inside wrapper
      wrapper.appendChild(cover);
      
      // Set initial circle state
      cover.style.position = 'absolute';
      cover.style.width = circleSize + 'px';
      cover.style.height = circleSize + 'px';
      cover.style.borderRadius = '50%';
      cover.style.overflow = 'hidden';
      cover.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${config.startScale})`;
      cover.style.transformOrigin = 'center center';
      cover.style.zIndex = '100';
      
      // Adjust image for circle state
      image.style.objectFit = 'cover';
      image.style.objectPosition = 'center center';
      
      // Set up transitions
      cover.style.transition = `
        transform ${config.duration} ${config.easing},
        width ${config.duration} ${config.easing},
        height ${config.duration} ${config.easing},
        border-radius ${config.duration} ${config.easing},
        opacity 0.3s ease-in ${config.delay}
      `;
      
      // Make parent elements overflow visible to allow animation
      let parentEl = wrapper.parentElement;
      while (parentEl && parentEl !== document.body) {
        if (getComputedStyle(parentEl).overflow !== 'visible') {
          parentEl.style.overflow = 'visible';
        }
        parentEl = parentEl.parentElement;
      }
      
      // Give a moment for the browser to process
      setTimeout(() => {
        // Show the cover (still in circle state)
        cover.style.opacity = '1';
        cover.style.visibility = 'visible';
        
        // Small delay before animation
        setTimeout(() => {
          // Animate to final state
          cover.style.transform = 'translate(0, 0) scale(1)';
          cover.style.width = coverRect.width + 'px';
          cover.style.height = coverRect.height + 'px';
          cover.style.borderRadius = originalStyles.borderRadius || '0';
          
          // Listen for transition end to clean up
          cover.addEventListener('transitionend', function cleanup(e) {
            if (e.propertyName === 'transform') {
              // Remove event listener
              cover.removeEventListener('transitionend', cleanup);
              
              // Reset to original styles after animation completes
              for (const [prop, value] of Object.entries(originalStyles)) {
                if (value) cover.style[prop] = value;
              }
              
              // Reset image styles
              for (const [prop, value] of Object.entries(originalImageStyles)) {
                if (value) image.style[prop] = value;
              }
              
              // Add class to indicate animation is complete
              cover.classList.add('cover-animation-complete');
              
              // Keep any necessary styles for final state
              cover.style.opacity = '1';
              cover.style.visibility = 'visible';
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