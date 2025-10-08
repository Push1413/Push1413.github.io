document.addEventListener('DOMContentLoaded', function() {

    function loadComponent(url, elementId) {
        return fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
            })
            .catch(error => console.error(`Error loading ${url}:`, error));
    }

    const components = [
        { url: 'components/navbar.html', id: 'navbar-container' },
        { url: 'components/home.html', id: 'home-container' },
        { url: 'components/education.html', id: 'education-container' },
        { url: 'components/skills.html', id: 'skills-container' },
        { url: 'components/contract-work.html', id: 'contract-work-container' },
        { url: 'components/personal-projects.html', id: 'personal-projects-container' },
        { url: 'components/experience.html', id: 'experience-container' },
        { url: 'components/footer.html', id: 'footer-container' }
    ];
    
        Promise.all(components.map(component => loadComponent(component.url, component.id)))
            .then(() => {
                const hamburger = document.querySelector('.hamburger');
                const navLinks = document.querySelector('.nav-links');
                const navLinksItems = document.querySelectorAll('.nav-links a');
                const navOverlay = document.querySelector('.nav-overlay');
    
                // Helper function to close menu
                function closeMenu() {
                    if (hamburger && navLinks && navOverlay) {
                        hamburger.classList.remove('active');
                        navLinks.classList.remove('active');
                        navOverlay.classList.remove('active');
                        hamburger.setAttribute('aria-expanded', 'false');
                        document.body.classList.remove('menu-open');
                    }
                }
    
                // Toggle mobile menu
                if (hamburger && navLinks && navOverlay) {
                    hamburger.addEventListener('click', function(e) {
                        e.stopPropagation();
                        const isActive = navLinks.classList.toggle('active');
                        navOverlay.classList.toggle('active');
                        hamburger.classList.toggle('active');
                        hamburger.setAttribute('aria-expanded', isActive);
                        document.body.classList.toggle('menu-open', isActive);
                    });
                }
    
                // Close menu when clicking a link
                if (navLinksItems) {
                    navLinksItems.forEach(item => {
                        item.addEventListener('click', function() {
                            closeMenu();
                        });
                    });
                }
    
                // Close menu when clicking overlay
                if (navOverlay) {
                    navOverlay.addEventListener('click', closeMenu);
                }
    
                // Close menu when clicking outside
                document.addEventListener('click', function(e) {
                    if (hamburger && navLinks && !e.target.closest('.navbar')) {
                        closeMenu();
                    }
                });
    
                // Close menu on ESC key
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        closeMenu();
                    }
                });
    
                // Handle window resize
                window.addEventListener('resize', function() {
                    if (window.innerWidth >= 768) {
                        closeMenu();
                    }
                });

    
                window.addEventListener('scroll', highlightNav);
                highlightNav();
    
                // Update copyright year
                const currentYearEl = document.getElementById('current-year');
                if (currentYearEl) {
                    currentYearEl.textContent = new Date().getFullYear();
                }
            });
});