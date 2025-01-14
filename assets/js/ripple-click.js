document.addEventListener('click', function(event) {
    // Don't create ripple if clicking on a link or button
    if (event.target.tagName.toLowerCase() === 'a' || 
        event.target.tagName.toLowerCase() === 'button') {
        return;
    }
    
    // Function to create a ripple circle with border effect
    function createRippleCircle(left, top, size, borderWidth, delay) {
        const rippleCircle = document.createElement('div');
        rippleCircle.className = 'ripple-circle';
        
        // Create a container for the ripple that's fixed relative to the document
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '0';
        container.style.top = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none'; // Prevent interference with other clicks
        container.style.zIndex = '9999'; // Ensure ripples appear above other content
        
        // Set ripple circle position and style
        rippleCircle.style.position = 'absolute';
        rippleCircle.style.left = `${left - size / 2}px`;
        rippleCircle.style.top = `${top - size / 2}px`;
        rippleCircle.style.width = `${size}px`;
        rippleCircle.style.height = `${size}px`;
        rippleCircle.style.borderRadius = '50%';
        rippleCircle.style.border = `${borderWidth}px solid rgba(0, 0, 0, 0.5)`;
        rippleCircle.style.opacity = '1';
        rippleCircle.style.animation = `ripple-animation 1.2s forwards ${delay}s`;
        
        // Add ripple circle to container, then add container to document
        container.appendChild(rippleCircle);
        document.body.appendChild(container);
        
        // Remove container after animation completes
        rippleCircle.addEventListener('animationend', function() {
            document.body.removeChild(container);
        });
    }

    // Get the position of the click relative to the document
    const left = event.pageX; // Uses pageX instead of clientX
    const top = event.pageY;  // Uses pageY instead of clientY

    // Set the border width for hard-edged circles
    const borderWidth = 4;
    
    // Create three circles with slight delay for staggered effect
    createRippleCircle(left, top, 50, borderWidth, 0.6);
    createRippleCircle(left, top, 60, borderWidth, 0.3);
    createRippleCircle(left, top, 70, borderWidth, 0);
});

// Required CSS animation
const style = document.createElement('style');
style.textContent = `
@keyframes ripple-animation {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    100% {
        transform: scale(2);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);