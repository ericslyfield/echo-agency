// Add this JavaScript to your theme's JS file
document.addEventListener('DOMContentLoaded', function() {
    // Select only links with the rolling-text class
    const links = document.querySelectorAll('a.rolling-text');
    
    links.forEach(link => {
      // Skip if link already has rolling text effect
      if (link.classList.contains('rolling-text')) return;
      
      // Get the original text
      const originalText = link.textContent;
      
      // Create wrapper spans
      const originalSpan = document.createElement('span');
      originalSpan.classList.add('original');
      originalSpan.textContent = originalText;
      
      const alternateSpan = document.createElement('span');
      alternateSpan.classList.add('alternate');
      alternateSpan.textContent = originalText;
      
      // Clear the link's content and add the spans
      link.textContent = '';
      link.classList.add('rolling-text');
      link.appendChild(originalSpan);
      link.appendChild(alternateSpan);
    });
  });