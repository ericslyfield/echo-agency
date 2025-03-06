// This JavaScript will help with responsive layout adjustments
document.addEventListener('DOMContentLoaded', function() {
    const handleResize = () => {
        const isMobile = window.innerWidth < 768;
        const imageColumn = document.querySelector('.image-column');
        const contentColumn = document.querySelector('.content-column');
        
        if (isMobile) {
            // Ensure mobile layout
            if (imageColumn) imageColumn.style.order = '3';
            if (contentColumn) contentColumn.style.order = '4';
        } else {
            // Reset for desktop
            if (imageColumn) imageColumn.style.order = '';
            if (contentColumn) contentColumn.style.order = '';
        }
    };
    
    // Initial call
    handleResize();
    
    // Listen for window resizes
    window.addEventListener('resize', handleResize);
});