document.addEventListener('click', function(event) {
    // Don't create ripple if clicking on a link or button
    if (event.target.tagName.toLowerCase() === 'a' || 
        event.target.tagName.toLowerCase() === 'button') {
        return;
    }

    // Create ripple element
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    
    // Set ripple position and style
    ripple.style.left = (event.clientX - 150) + 'px';
    ripple.style.top = (event.clientY - 150) + 'px';
    ripple.style.width = '300px';
    ripple.style.height = '300px';
    ripple.style.border = '25px solid rgba(0, 0, 0, 0.5)';
    
    // Add ripple to document
    document.body.appendChild(ripple);
    
    // Remove ripple after animation completes
    ripple.addEventListener('animationend', function() {
        document.body.removeChild(ripple);
    });
});