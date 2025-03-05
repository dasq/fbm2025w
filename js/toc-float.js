document.addEventListener("DOMContentLoaded", function () {
    const tocContainer = document.getElementById("toc-container");
    const toc = document.getElementById("floating-toc");
    const toggleBtn = document.getElementById("toc-toggle");
    const banner = document.querySelector(".section-slide, .section-banner"); // Ensure the selector matches

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
        toggleBtn.classList.toggle("active");

        // Remove focus after interaction to fix mobile button state
        setTimeout(() => {
            toggleBtn.blur();
        }, 10);
    });

    // Fix for touch devices where button remains "active"
    document.addEventListener("click", function (event) {
        if (!toggleBtn.contains(event.target)) {
            toggleBtn.classList.remove("active");
        }
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


// Sidebar Submenu appears smoothly

document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu-sidebar > li");

    menuItems.forEach(item => {
        const link = item.querySelector("a"); // Main menu link
        const subMenu = item.querySelector(".sidebar_sub_menu"); // Submenu
        const arrowIcon = item.querySelector(".submenu-icon"); // The arrow icon

        if (subMenu) {
            link.addEventListener("click", function (event) {
                event.preventDefault(); // Prevent navigation

                // Check if submenu is already open
                const isOpen = subMenu.classList.contains("open");

                // Close all other submenus
                document.querySelectorAll(".sidebar_sub_menu").forEach(otherMenu => {
                    if (otherMenu !== subMenu) {
                        otherMenu.classList.remove("open");
                        otherMenu.style.maxHeight = null;
                        otherMenu.previousElementSibling.querySelector(".submenu-icon")?.classList.remove("rotate");
                    }
                });

                // Toggle current submenu
                if (!isOpen) {
                    subMenu.classList.add("open");
                    subMenu.style.maxHeight = subMenu.scrollHeight + "px"; // Set height dynamically
                    arrowIcon.classList.add("rotate");
                } else {
                    subMenu.classList.remove("open");
                    subMenu.style.maxHeight = null;
                    arrowIcon.classList.remove("rotate");
                }
            });
        }
    });
});


