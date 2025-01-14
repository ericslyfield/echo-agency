document.querySelectorAll('.custom-logo').forEach(element => {
    element.addEventListener('mouseenter', function(event) {
        // Don't create ripple if clicking on a link or button
        if (event.target.tagName.toLowerCase() === 'a' || 
            event.target.tagName.toLowerCase() === 'button') {
            return;
        }

        // Function to create a ripple circle with border effect
        function createRippleCircle(left, top, size, borderWidth, delay) {
            const rippleCircle = document.createElement('div');
            rippleCircle.className = 'ripple-circle';

            // Set ripple circle position and style
            rippleCircle.style.position = 'absolute';  // Ensure absolute positioning
            rippleCircle.style.left = `${left - size / 2}px`; // Center the circle on the element's center
            rippleCircle.style.top = `${top - size / 2}px`;  // Center the circle on the element's center
            rippleCircle.style.width = `${size}px`;
            rippleCircle.style.height = `${size}px`;
            rippleCircle.style.borderRadius = '50%';  // Make it a circle
            rippleCircle.style.border = `${borderWidth}px solid rgba(0, 0, 0, 0.5)`;  // Visible border
            rippleCircle.style.opacity = '1';
            rippleCircle.style.animation = `ripple-animation 1.2s forwards ${delay}s`;

            // Add ripple circle to document
            document.body.appendChild(rippleCircle);

            // Remove ripple after animation completes
            rippleCircle.addEventListener('animationend', function() {
                document.body.removeChild(rippleCircle);
            });
        }

        // Get the bounding rectangle of the .custom-logo element
        const rect = event.target.getBoundingClientRect();

        // Calculate the center of the .custom-logo element
        const left = rect.left + rect.width / 2;
        const top = rect.top + rect.height / 2;

        // Set the border width for hard-edged circles
        const borderWidth = 4;  // Set the initial border width

        // Create three circles with slight delay for staggered effect
        createRippleCircle(left, top, 50, borderWidth, 0.6);  // First circle (last to appear)
        createRippleCircle(left, top, 60, borderWidth, 0.3);  // Second circle (appears after 0.3s)
        createRippleCircle(left, top, 70, borderWidth, 0);    // Third circle (appears immediately)
    });
});