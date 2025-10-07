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
            // Find elements only AFTER they are loaded into the DOM
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            const navLinksItems = document.querySelectorAll('.nav-links a');
            const navbar = document.querySelector('.navbar'); // Added for outside click detection

            if (hamburger && navLinks) {
                // 1. Toggle menu
                hamburger.addEventListener('click', function(event) {
                    // Prevent click from propagating to the document listener below
                    event.stopPropagation(); 
                    hamburger.classList.toggle('active');
                    navLinks.classList.toggle('active');
                });
            }

            if (navLinksItems) {
                // 2. Close menu when clicking a link
                navLinksItems.forEach(item => {
                    item.addEventListener('click', function() {
                        if (hamburger && navLinks) {
                            hamburger.classList.remove('active');
                            navLinks.classList.remove('active');
                        }
                    });
                });
            }

            // 3. Close menu when clicking outside (using the new 'navbar' class)
            document.addEventListener('click', function(event) {
                // Only close if the click is outside the navigation bar container
                if (hamburger && navLinks && !event.target.closest('nav')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });

            // 4. Update copyright year
            const currentYearEl = document.getElementById('current-year');
            if (currentYearEl) {
                currentYearEl.textContent = new Date().getFullYear();
            }
        });
});