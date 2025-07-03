// Self-invoking function to prevent polluting the global scope
(function() {
    // 1. Get references to the toggle and the HTML element
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // This check is in case the script runs on a page without the toggle
    if (!themeToggle) {
        return;
    }

    // 2. Function to switch the theme
    function switchTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        // Update the toggle's checked state
        themeToggle.checked = theme === 'dark';
    }

    // 3. Event listener for the toggle switch
    themeToggle.addEventListener('change', function() {
        const newTheme = this.checked ? 'dark' : 'light';
        switchTheme(newTheme);
    });

    // 4. Logic to set the initial theme on page load
    // Check for a saved theme in localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        switchTheme(savedTheme);
        return; // Exit if a saved theme is found
    }

    // If no saved theme, check for the user's OS preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches) {
        switchTheme('dark');
    } else {
        switchTheme('light');
    }

    // (Optional) Listen for changes in OS preference
    prefersDark.addEventListener('change', (e) => {
        // Only switch if the user hasn't manually set a theme
        if (!localStorage.getItem('theme')) {
            switchTheme(e.matches ? 'dark' : 'light');
        }
    });
})();

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