// Callback function for elements translating into view
const translateElementsOnScroll = (entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add a data attribute for the delay
        entry.target.style.transitionDelay = `${index * 0.2}s`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };
  
  // Options for the IntersectionObserver
  const observerOptions = {
    threshold: 0.3
  };
  
  // Create an IntersectionObserver instance
  const observer = new IntersectionObserver(translateElementsOnScroll, observerOptions);
  
  // Target all elements with the 'translate-up' class
  const elementsToObserve = document.querySelectorAll('.translate-up');
  
  // Start observing the elements
  elementsToObserve.forEach((element, index) => {
    // Reset transition delay when scrolled out of view
    element.addEventListener('transitionend', () => {
      element.style.transitionDelay = '0s';
    });
    observer.observe(element);
  });x