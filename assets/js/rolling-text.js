document.addEventListener('DOMContentLoaded', function() {
    // Function to initialize roll effect for a link
    function initializeRollEffect(link) {
        // Get the text content
        const text = link.textContent;
        // Set the data-text attribute
        link.setAttribute('data-text', text);
    }

    // Initialize for existing links
    document.querySelectorAll('.wp-block-navigation-item__content').forEach(initializeRollEffect);

    // Create a MutationObserver to watch for new links
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Check if it's an element node
                    // Check for new navigation links within the added node
                    const newLinks = node.querySelectorAll('.wp-block-navigation-item__content');
                    newLinks.forEach(initializeRollEffect);
                }
            });
        });
    });

    // Start observing the navigation container for changes
    const navContainer = document.querySelector('.wp-block-navigation__container');
    if (navContainer) {
        observer.observe(navContainer, {
            childList: true,
            subtree: true
        });
    }
});