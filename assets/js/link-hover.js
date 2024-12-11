document.addEventListener('DOMContentLoaded', function() {
    // Select all <li> elements within the navigation block
    const navItems = document.querySelectorAll('.wp-block-navigation li');

    navItems.forEach(function(item) {
        const link = item.querySelector('a'); // Find the <a> inside each <li>
        
        if (link) {
            const linkTitle = link.textContent.trim(); // Get the text of the link (the title)
            
            // Add a data-title attribute to the <li> element
            item.setAttribute('data-replace', linkTitle);
        }
    });
});
