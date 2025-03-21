/**
 * TitleAnimator - Final version with no visible jumping
 * 
 * This script prevents the title from being visible until it's
 * positioned offscreen, eliminating the "jump left, then right" effect.
 */
(function() {
  // Add style tag to hide titles immediately (before DOM is fully loaded)
  const style = document.createElement('style');
  style.textContent = `
    .animate-title {
      opacity: 0 !important;
      visibility: hidden !important;
    }
  `;
  document.head.appendChild(style);
  
  // Main animation function
  function initTitleAnimation() {
    // Configuration
    const config = {
      titleSelector: '.animate-title',
      startWeight: 200,
      endWeight: 200,
      startScale: 1,
      endScale: 1,
      duration: '1.5s',
      easing: 'cubic-bezier(0, 0, .83, .67)'
    };

    // Find all matching elements
    const titles = document.querySelectorAll(config.titleSelector);
    
    // Exit if no titles found
    if (titles.length === 0) {
      console.log('No title elements found');
      return;
    }
    
    // Remove the style tag that was hiding the titles
    document.head.removeChild(style);
    
    // Process each title
    titles.forEach((title, index) => {
      // Skip if element doesn't match our mobile/desktop state
      if (title.classList.contains('hide-on-mobile') && window.innerWidth < 768) {
        return;
      }
      
      if (title.classList.contains('center-on-mobile') && window.innerWidth >= 768) {
        return;
      }
      
      // Get the viewport width
      const viewportWidth = window.innerWidth;
      
      // Create a wrapper to properly handle the animation
      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      wrapper.style.overflow = 'visible';
      wrapper.style.width = '100%';
      
      // Insert wrapper before the title
      title.parentNode.insertBefore(wrapper, title);
      
      // Initially hide the title with CSS (not just opacity)
      title.style.opacity = '0';
      title.style.visibility = 'hidden';
      
      // Move title inside wrapper
      wrapper.appendChild(title);
      
      // Prepare for animation
      title.style.position = 'relative';
      title.style.display = 'block';
      
      // Set the initial position and scale
      const offscreenPosition = -viewportWidth;
      title.style.transform = `translateX(${offscreenPosition}px) scale(${config.startScale})`;
      title.style.fontWeight = config.startWeight;
      title.style.transformOrigin = 'left center';
      
      // Apply transition properties
      title.style.transition = `
        transform ${config.duration} ${config.easing},
        font-weight ${config.duration} ${config.easing},
        opacity 0.3s ease-in
      `;
      
      // Modify all parent elements to ensure visibility
      let parent = wrapper.parentElement;
      while (parent && parent !== document.body) {
        parent.style.overflow = 'visible';
        parent = parent.parentElement;
      }
      
      // Give a moment for the browser to process the initial state
      setTimeout(() => {
        // Show the title (still in off-screen position)
        title.style.opacity = '1';
        title.style.visibility = 'visible';
        
        // Wait a tiny bit more before starting the animation
        setTimeout(() => {
          // Animate to final position
          title.style.transform = `translateX(0) scale(${config.endScale})`;
          title.style.fontWeight = config.endWeight;
          title.classList.add('title-animation-complete');
        }, 50);
      }, 100);
    });
  }

  // Run on DOMContentLoaded, but also prepare styles immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTitleAnimation);
  } else {
    // DOMContentLoaded has already fired
    initTitleAnimation();
  }
})();