document.addEventListener("DOMContentLoaded", function () {
    const tocContainer = document.getElementById("toc-container");
    const toc = document.getElementById("floating-toc");
    const toggleBtn = document.getElementById("toc-toggle");
    const banner = document.querySelector(".section-slide"); // Make sure class name is correct

    if (!tocContainer || !banner || !toggleBtn || !toc) {
        console.error("One or more elements not found!");
        return;
    }

    function toggleTOCVisibility() {
        let bannerBottom = banner.getBoundingClientRect().bottom;

        if (bannerBottom < 100) {
            tocContainer.style.opacity = "1";
            tocContainer.style.visibility = "visible";
        } else {
            tocContainer.style.opacity = "0";
            tocContainer.style.visibility = "hidden";
        }
    }

    // Toggle TOC open/close when clicking the button
    toggleBtn.addEventListener("click", function () {
        toc.classList.toggle("hidden");
    });
	
    // Run on scroll
    window.addEventListener("scroll", toggleTOCVisibility);

    // Run once on page load
    toggleTOCVisibility();
	
	
});

document.addEventListener("DOMContentLoaded", function () {
    const toc = document.getElementById("floating-toc");
    const toggleBtn = document.getElementById("toc-toggle");
    const links = document.querySelectorAll("#floating-toc a");
    const sections = [...links].map(link => document.querySelector(link.getAttribute("href")));

    // 🔹 Auto-highlight the active section
    function highlightActiveSection() {
        let scrollPosition = window.scrollY + 100; // Offset for better accuracy
        let activeLink = null;

        sections.forEach((section, index) => {
            if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                activeLink = links[index];
            }
        });

        links.forEach(link => link.classList.remove("active"));
        if (activeLink) {
            activeLink.classList.add("active");
        }
    }

    // Add click event listener to the toggle button
    toggleBtn.addEventListener('click', function () {
        // Toggle visibility of TOC container
        toc.classList.toggle('show');

        // Toggle active class on the button
        toggleBtn.classList.toggle('active');

    });

    // 🔹 Smooth scrolling when clicking a TOC link
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            let targetId = this.getAttribute("href").substring(1);
            let targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar offset
                    behavior: "smooth"
                });
            }
        });
    });

    // 🔹 Listen for scroll events to update active section
    window.addEventListener("scroll", highlightActiveSection);
});

