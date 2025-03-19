document.addEventListener("DOMContentLoaded", function () {
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptButton = document.getElementById("accept-cookies");
    const rejectButton = document.getElementById("reject-cookies");
    const manageCookiesButton = document.getElementById("manage-cookies");

    // Check if user has already made a choice for general and YouTube consent
    checkConsent();
    checkMediaConsent();

    // Accept general cookies
    acceptButton.addEventListener("click", function () {
        setCookie("cookieConsent", "accepted", 365);
        cookieBanner.style.display = "none";
        loadGoogleAnalytics(); // Load GA after accepting
    });

    // Reject general cookies
    rejectButton.addEventListener("click", function () {
        setCookie("cookieConsent", "rejected", 365);
        cookieBanner.style.display = "none";
    });

    // Re-show the general cookie consent banner
    manageCookiesButton.addEventListener("click", function() {
        cookieBanner.style.display = "block";
    });
});

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }

    // Ensure cookies work across all pages & browsers
    document.cookie = name + "=" + value + expires + "; path=/; SameSite=Lax; Secure";
    console.log(`Cookie set: ${name}=${value}; expires=${expires}`);
}

function getCookie(name) {
    let nameEQ = name + "=";
    let cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf(nameEQ) === 0) {
            console.log(`Cookie found: ${name}=${c.substring(nameEQ.length)}`);
            return c.substring(nameEQ.length);
        }
    }

    console.log(`Cookie not found: ${name}`);
    return null;
}

function checkConsent() {
    let consent = getCookie("cookieConsent");
    const cookieBanner = document.getElementById("cookie-banner");

    if (consent === "accepted") {
        cookieBanner.style.display = "none";
        loadGoogleAnalytics();
    } else if (consent === "rejected") {
        cookieBanner.style.display = "none";
    } else {
        cookieBanner.style.display = "block";
    }
}


function checkMediaConsent() {
    let consent = getCookie("mediaConsent");
    console.log(`Media consent value: ${consent}`); // Debug log

    const youtubeConsentBanners = document.querySelectorAll(".video-consent-banner");
    console.log(`Number of banners found: ${youtubeConsentBanners.length}`); // Debug log

    youtubeConsentBanners.forEach(banner => {
        let modal = banner.closest(".modal");
        let modalId = modal.id;
        let videoUrl = modal.getAttribute("data-video-url");

        if (consent === "accepted") {
            console.log("Hiding YouTube consent banner and loading video"); // Debug log
            banner.style.display = "none"; // Hide banner
            loadYouTubeVideo(modalId, videoUrl); // Load the video automatically
        } else {
            console.log("Showing YouTube consent banner"); // Debug log
            banner.style.display = "flex"; // Show the banner
        }
    });
}


// Function to accept YouTube consent
window.acceptMediaCookies = function (modalId, videoUrl) {
    setCookie("mediaConsent", "accepted", 365); // Set YouTube consent
    loadYouTubeVideo(modalId, videoUrl); // Load the video
};

function loadGoogleAnalytics() {
    if (window.dataLayer && window.dataLayer.length > 0) {
        return; // GA already loaded
    }

    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-JTL7T2P53Q";
    script.async = true;
    document.head.appendChild(script);

    script.onload = function () {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "G-JTL7T2P53Q", { anonymize_ip: true });
    };
}