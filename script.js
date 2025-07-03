document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length === 0) {
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Start animation a little sooner
  });

  revealElements.forEach((el, index) => {
    // Stagger the animation timing
    el.style.transitionDelay = `${index * 50}ms`;
    revealObserver.observe(el);
  });
}); 