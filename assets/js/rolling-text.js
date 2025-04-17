/**
 * Split Text Hover Effect JavaScript - WordPress Optimized
 * This script applies the split text effect to links while avoiding conflicts.
 */
(function() {
  // Function to check if a link has the complete structure needed for animation
  function hasCompleteStructure(link) {
    return link.querySelector('.split-text-wrapper .original') && 
           link.querySelector('.split-text-wrapper .hover');
  }

  // Function to fix incompletely processed menu links
  function fixIncompleteMenuLinks() {
    // Find all processed navigation links that are missing the correct structure
    const menuSelector = '.wp-block-navigation-item .split-text-link[data-split-processed="true"]';
    const incompleteLinks = document.querySelectorAll(menuSelector);
    
    incompleteLinks.forEach(link => {
      if (!hasCompleteStructure(link)) {
        // Reset the link to be processed again
        link.removeAttribute('data-split-processed');
        link.classList.remove('split-text-link');
        
        // Keep the original text content
        const originalText = link.textContent.trim();
        
        // Remove any partial structure that might exist
        if (link.querySelector('.split-text-wrapper')) {
          link.innerHTML = originalText;
        }
      }
    });
    
    // Now process menu links again
    processMenuLinks();
  }

  // Function to specifically process menu links
  function processMenuLinks() {
    // Target only navigation menu links that haven't been processed
    const menuSelector = '.wp-block-navigation-item a:not(.split-text-link):not([data-split-processed])';
    
    try {
      const menuLinks = document.querySelectorAll(menuSelector);
      console.log(`Found ${menuLinks.length} menu links to process`);
      
      menuLinks.forEach(function(link) {
        // Store original HTML to restore if needed
        const originalHTML = link.innerHTML;
        
        try {
          // Get the text content
          const originalText = link.textContent.trim();
          
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
          
          console.log('Successfully processed menu link:', originalText);
          
        } catch (innerError) {
          // Restore original content if anything goes wrong
          console.error('Split text effect error:', innerError);
          link.innerHTML = originalHTML;
        }
      });
    } catch (error) {
      console.warn('Split text selector error:', error);
    }
  }

  // Function to process regular links - separated for reusability
  function processSplitTextLinks() {
    console.log('Running split text process');

    // More comprehensive admin area check
    if (document.body.classList.contains('wp-admin') || 
        window.location.href.indexOf('wp-admin') > -1 || 
        window.location.href.indexOf('/wp-login.php') > -1) {
      return;
    }
    
    // Use custom selector if available, otherwise use improved default
    // Specifically exclude navigation items to handle them separately
    const selector = window.splitTextCustomSelector || 
      'a:not(.split-text-link):not([href^="#"]):not(.no-split):not([href*="wp-admin"]):not(.no-shift):not([role="button"]):not(.wp-block-navigation-item__content)';
    
    try {
      const links = document.querySelectorAll(selector);
      console.log(`Found ${links.length} regular links to process`);
      
      links.forEach(function(link) {
        // Each link is properly scoped within this function
        console.log('Processing link:', link.outerHTML);
        
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
          
          console.log('Successfully processed link:', originalText);
          
        } catch (innerError) {
          // Restore original content if anything goes wrong
          console.error('Split text effect error:', innerError);
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

  // Process both regular links and menu links, then fix any incomplete menu links
  function processAllLinks() {
    processSplitTextLinks();
    processMenuLinks();
    // Give a small delay before checking for incomplete structures
    setTimeout(fixIncompleteMenuLinks, 10);
  }

  // Try to detect hamburger menu and add click handler
  function setupMenuHandlers() {
    // Common selectors for hamburger menus in WordPress
    const hamburgerSelectors = [
      '.menu-toggle', 
      '.hamburger', 
      '.menu-button',
      '.site-header-toggle',
      '.nav-toggle',
      '.navbar-toggle',
      'button[aria-label*="menu" i]',
      'button[aria-label*="navigation" i]'
    ];

    const possibleMenuButtons = document.querySelectorAll(hamburgerSelectors.join(','));
    possibleMenuButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Wait for menu animation to complete before processing
        setTimeout(fixIncompleteMenuLinks, 300);
      });
    });
  }

  // Process on initial load using WordPress's domReady if available
  if (typeof wp !== 'undefined' && wp.domReady) {
    wp.domReady(() => {
      processAllLinks();
      setupMenuHandlers();
    });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      processAllLinks();
      setupMenuHandlers();
    });
  }

  // Process after navigation events
  window.addEventListener('load', fixIncompleteMenuLinks);
  window.addEventListener('pageshow', fixIncompleteMenuLinks);

  // Process after AJAX content loads (works with various WordPress plugins)
  const events = ['ajaxComplete', 'post-load', 'after_update_content'];
  events.forEach(event => {
    document.addEventListener(event, debounce(processAllLinks, 100));
  });
  
  // Create a custom event other scripts can trigger
  document.addEventListener('split_text_refresh', processAllLinks);
  
  // Watch for dynamically added content
  const debouncedProcess = debounce(processAllLinks, 100);
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
    console.error('MutationObserver not supported:', e);
  }
})();