document.addEventListener('DOMContentLoaded', function() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        fetch('navbar.html') // Assumes navbar.html is in the same directory
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                navbarPlaceholder.innerHTML = data;
                
                // Add event listener for navbar toggler after navbar is loaded
                const navbarToggler = document.getElementById('navbarToggler');
                const navbarCollapse = document.getElementById('navbarCollapse');
                const menuLinks = document.querySelectorAll(".ud-menu-scroll");
                const headerLogo = document.querySelector(".header-logo");
                
                if (navbarToggler && navbarCollapse) {
                    navbarToggler.addEventListener('click', function() {
                        navbarToggler.classList.toggle("navbarTogglerActive");
                        navbarCollapse.classList.toggle('hidden');
                    });
                }
                
                // Add scroll effect to navbar
                window.addEventListener("scroll", function () {
                    const header = document.querySelector(".ud-header");
                    const scrollPosition = window.scrollY;
                    
                    if (scrollPosition > 50) {
                        // When scrolled
                        header.classList.add("sticky");
                        header.style.background = "rgba(255, 255, 255, 0.95)";
                        header.style.backdropFilter = "blur(10px)";
                        header.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
                        header.style.transition = "all 0.3s ease-in-out";
                        
                        // Keep the text color as purple-dark when scrolled
                        const navLinks = document.querySelectorAll(".ud-menu-scroll");
                        navLinks.forEach(link => {
                            link.classList.add("text-purple-dark");
                        });
                        
                        // Ensure toggle hamburger is visible on white background
                        const hamburgerLines = document.querySelectorAll("#navbarToggler span");
                        hamburgerLines.forEach(line => {
                            line.classList.remove("bg-white");
                            line.classList.add("bg-purple-dark");
                        });
                    } else {
                        // When at top (transparent background)
                        header.classList.remove("sticky");
                        header.style.background = "transparent";
                        header.style.backdropFilter = "none";
                        header.style.boxShadow = "none";
                    }
                    
                    // Set active link based on scroll position (for pages with section IDs)
                    const sections = document.querySelectorAll("section[id]");
                    
                    if (sections.length > 0) {
                        sections.forEach(section => {
                            const sectionTop = section.offsetTop - 100;
                            const sectionHeight = section.offsetHeight;
                            const sectionId = section.getAttribute("id");
                            
                            if (
                                scrollPosition >= sectionTop &&
                                scrollPosition < sectionTop + sectionHeight
                            ) {
                                // Remove active class from all links
                                menuLinks.forEach(link => {
                                    link.classList.remove("active");
                                });
                                
                                // Add active class to current section link
                                const currentLink = document.querySelector(`a[href="#${sectionId}"]`);
                                if (currentLink) {
                                    currentLink.classList.add("active");
                                }
                            }
                        });
                    }
                });
                
                // Trigger scroll event once to set initial state
                window.dispatchEvent(new Event('scroll'));
                
                // Initially set active menu
                const homeLink = document.querySelector('a[href="#home"]');
                if (homeLink) {
                    homeLink.classList.add("active");
                }
            })
            .catch(error => {
                console.error('Could not load navbar:', error);
                navbarPlaceholder.innerHTML = '<p>Error loading navbar content.</p>'; // Optional: display error message
            });
    }
}); 