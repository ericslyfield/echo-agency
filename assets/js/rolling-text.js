/**
 * Split Text Hover Effect JavaScript - WordPress Optimized
 * This script applies the split text effect to links while avoiding conflicts.
 */
(function() {
  // Function to process links - separated for reusability
  function processSplitTextLinks() {
    // More comprehensive admin area check
    if (document.body.classList.contains('wp-admin') || 
        window.location.href.indexOf('wp-admin') > -1 || 
        window.location.href.indexOf('/wp-login.php') > -1) {
      return;
    }
    
    // Use custom selector if available, otherwise use improved default
    const selector = window.splitTextCustomSelector || 
      'a:not(.split-text-link):not([href^="#"]):not(.no-split):not([href*="wp-admin"]):not(.no-shift):not([role="button"])';
    
    try {
      const links = document.querySelectorAll(selector);
      
      links.forEach(function(link) {
        // Skip already processed links
        if (link.hasAttribute('data-split-processed')) {
          return;
        }
        
        // Skip links with images, SVGs, or other complex content
        if (link.querySelector('img, svg, iframe, button, input')) {
          return;
        }
        
        // Skip links that are part of WordPress core components
        if (link.closest('#wpadminbar, .wp-block-navigation__submenu-container, .wp-block-social-links, .comment-form, .search-form')) {
          return;
        }
        
        // Get the text content - handling different types of links
        let originalText;
        
        // Store original HTML to restore if needed
        const originalHTML = link.innerHTML;
        
        try {
          // For block navigation items
          const navItemLabel = link.querySelector('.wp-block-navigation-item__label');
          
          if (link.classList.contains('card__button--on-black') || 
              link.classList.contains('wp-block-read-more')) {
            // Get the current text
            const fullText = link.textContent.trim();
            // Check if it contains a colon
            originalText = fullText.includes(':') ? fullText.split(':')[0].trim() : fullText;
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
          
          // Mark the link as processed
          link.setAttribute('data-split-processed', 'true');
          link.classList.add('split-text-link');
          
          // Create a wrapper to maintain any event handlers
          const wrapper = document.createElement('span');
          wrapper.classList.add('split-text-wrapper');
          
          // Create span for original text
          const originalSpan = document.createElement('span');
          originalSpan.classList.add('original');
          originalSpan.textContent = originalText;
          
          // Create span for hover text
          const hoverSpan = document.createElement('span');
          hoverSpan.classList.add('hover');
          hoverSpan.textContent = originalText;
          
          // Clear and rebuild the content
          wrapper.appendChild(originalSpan);
          wrapper.appendChild(hoverSpan);
          
          // Safely replace content
          link.innerHTML = '';
          link.appendChild(wrapper);
          
        } catch (innerError) {
          // Restore original content if anything goes wrong
          console.warn('Split text effect error:', innerError);
          link.innerHTML = originalHTML;
        }
      });
    } catch (error) {
      console.warn('Split text selector error:', error);
    }
  }

  // Debounce function to limit processing frequency
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  }

//Console log...
console.log('Running split text process');

  // Process on initial load using WordPress's domReady if available
  if (typeof wp !== 'undefined' && wp.domReady) {
    wp.domReady(processSplitTextLinks);
  } else {
    document.addEventListener('DOMContentLoaded', processSplitTextLinks);
  }

  // Process after AJAX content loads (works with various WordPress plugins)
  const events = ['ajaxComplete', 'post-load', 'after_update_content'];
  events.forEach(event => {
    document.addEventListener(event, debounce(processSplitTextLinks, 100));
  // Console log...
  console.log('Processing link:', link.outerHTML);
  });
  
  // Create a custom event other scripts can trigger
  document.addEventListener('split_text_refresh', processSplitTextLinks);
  
  // Watch for dynamically added content
  const debouncedProcess = debounce(processSplitTextLinks, 100);
  try {
    const observer = new MutationObserver(function(mutations) {
      let shouldProcess = false;
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length > 0) {
          shouldProcess = true;
        }
      });
      if (shouldProcess) {
        debouncedProcess();
      }
    });
    
    // Start observing once DOM is ready
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        observer.observe(document.body, { childList: true, subtree: true });
      });
    }
  } catch (e) {
    // Fallback for browsers without MutationObserver
    console.warn('MutationObserver not supported, dynamic content may not receive split text effect');
  }
})();