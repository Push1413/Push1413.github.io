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
            // All components are loaded, now we can safely add event listeners
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            const navLinksItems = document.querySelectorAll('.nav-links a');

            if (hamburger) {
                // Toggle menu
                hamburger.addEventListener('click', function() {
                    hamburger.classList.toggle('active');
                    navLinks.classList.toggle('active');
                });
            }

            if (navLinksItems) {
                // Close menu when clicking a link
                navLinksItems.forEach(item => {
                    item.addEventListener('click', function() {
                        if (hamburger && navLinks) {
                            hamburger.classList.remove('active');
                            navLinks.classList.remove('active');
                        }
                    });
                });
            }

            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (hamburger && navLinks && !event.target.closest('.navbar')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });

            // Update copyright year
            const currentYearEl = document.getElementById('current-year');
            if (currentYearEl) {
                currentYearEl.textContent = new Date().getFullYear();
            }
        });
});