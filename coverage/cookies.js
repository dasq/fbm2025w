document.addEventListener("DOMContentLoaded", function () {
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptAllButton = document.getElementById("accept-cookies");
    const rejectAllButton = document.getElementById("reject-cookies");
    const savePreferencesButton = document.getElementById("prefer-cookies");
    const manageCookiesButton = document.getElementById("manage-cookies");
    const cookieForm = document.getElementById("cookie-consent-form");

    // Check if user has already made a choice for general, media, and calendar consent
    checkConsent();
    checkMediaConsent();
    checkCalendarConsent();

    // Accept all cookies
    acceptAllButton.addEventListener("click", function () {
        setCookie("cookieConsent", "accepted", 365); // General consent
        setCookie("analyticsConsent", "accepted", 365); // Analytics consent
        setCookie("mediaConsent", "accepted", 365); // Media consent
        setCookie("calendarConsent", "accepted", 365); // Calendar consent
        hideCookieBanner(); // Hide the banner
        loadGoogleAnalytics(); // Load GA after accepting
        loadYouTubeVideos(); // Load all YouTube videos if any
        loadGoogleCalendar(); // Load Google Calendar if any
    });

    // Reject all cookies (except necessary ones)
    rejectAllButton.addEventListener("click", function () {
        setCookie("cookieConsent", "rejected", 365); // General consent
        setCookie("analyticsConsent", "rejected", 365); // Analytics consent
        setCookie("mediaConsent", "rejected", 365); // Media consent
        setCookie("calendarConsent", "rejected", 365); // Calendar consent
        hideCookieBanner(); // Hide the banner
    });

    // Save custom preferences
    savePreferencesButton.addEventListener("click", function () {
        const analyticsChecked = cookieForm.querySelector('input[name="analytics"]').checked;
        const calendarChecked = cookieForm.querySelector('input[name="calendar"]').checked;
        const youtubeChecked = cookieForm.querySelector('input[name="youtube"]').checked;

        setCookie("cookieConsent", "custom", 365); // General consent
        setCookie("analyticsConsent", analyticsChecked ? "accepted" : "rejected", 365); // Analytics consent
        setCookie("mediaConsent", youtubeChecked ? "accepted" : "rejected", 365); // Media consent
        setCookie("calendarConsent", calendarChecked ? "accepted" : "rejected", 365); // Calendar consent

        hideCookieBanner(); // Hide the banner

        if (analyticsChecked) {
            loadGoogleAnalytics(); // Load Google Analytics if accepted
        }
        if (youtubeChecked) {
            loadYouTubeVideos(); // Load YouTube videos if accepted
        }
        if (calendarChecked) {
            loadGoogleCalendar(); // Load Google Calendar if accepted
        }
    });

    // Reopen the cookie banner and restore preferences
    manageCookiesButton.addEventListener("click", function () {
        showCookieBanner(); // Show the banner
        restorePreferences(); // Restore the checkboxes based on existing cookies
    });
});

// Restore preferences based on existing cookies
function restorePreferences() {
    const analyticsConsent = getCookie("analyticsConsent");
    const mediaConsent = getCookie("mediaConsent");
    const calendarConsent = getCookie("calendarConsent");

    // Update the checkboxes based on cookie values
    const analyticsCheckbox = document.querySelector('input[name="analytics"]');
    const youtubeCheckbox = document.querySelector('input[name="youtube"]');
    const calendarCheckbox = document.querySelector('input[name="calendar"]');

    if (analyticsCheckbox) {
        analyticsCheckbox.checked = analyticsConsent === "accepted";
    }
    if (youtubeCheckbox) {
        youtubeCheckbox.checked = mediaConsent === "accepted";
    }
    if (calendarCheckbox) {
        calendarCheckbox.checked = calendarConsent === "accepted";
    }
}

// Helper function to set cookies
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    // New cookie settings with all required attributes
    document.cookie = `${name}=${value}${expires}; path=/; Secure; SameSite=Lax${
        name.startsWith('_ga') ? '; Partitioned' : ''  // Special handling for GA cookies
    }`;
    
    console.log(`Cookie set: ${name}=${value}${expires}; path=/; Secure; SameSite=Lax`);
}

// Helper function to get cookies
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

// Check general consent
function checkConsent() {
    let consent = getCookie("cookieConsent");
    const cookieBanner = document.getElementById("cookie-banner");

    if (consent === "accepted" || consent === "custom") {
        hideCookieBanner(); // Hide the banner if consent is "accepted" or "custom"
        if (getCookie("analyticsConsent") === "accepted") {
            loadGoogleAnalytics(); // Load GA if analytics consent is accepted
        }
    } else if (consent === "rejected") {
        hideCookieBanner(); // Hide the banner if consent is "rejected"
    } else {
        showCookieBanner(); // Show the banner if no consent is set
    }
}

// Check media consent (YouTube)
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

// Check calendar consent (Google Calendar)
function checkCalendarConsent() {
    let consent = getCookie("calendarConsent");
    console.log(`Calendar consent value: ${consent}`); // Debug log

    const calendarConsentBanners = document.querySelectorAll(".calendar-consent-banner");
    console.log(`Number of banners found: ${calendarConsentBanners.length}`); // Debug log

    calendarConsentBanners.forEach(banner => {
        let modal = banner.closest(".modal");
        let modalId = modal.id;
        let calendarUrl = modal.getAttribute("data-calendar-url");

        if (consent === "accepted") {
            console.log("Hiding calendar consent banner and loading calendar"); // Debug log
            banner.style.display = "none"; // Hide banner
            loadGoogleCalendar(modalId, calendarUrl); // Load the calendar automatically
        } else {
            console.log("Showing calendar consent banner"); // Debug log
            banner.style.display = "flex"; // Show the banner
        }
    });
}

// Function to accept YouTube consent
window.acceptMediaCookies = function (modalId, videoUrl) {
    setCookie("mediaConsent", "accepted", 365); // Set YouTube consent
    loadYouTubeVideo(modalId, videoUrl); // Load the video
};

// Function to accept Google Calendar consent
window.acceptCalendarCookies = function (modalId, calendarUrl) {
    setCookie("calendarConsent", "accepted", 365); // Set calendar consent
    loadGoogleCalendar(modalId, calendarUrl); // Load the calendar
};

// Load Google Analytics
function loadGoogleAnalytics() {
    if (window.dataLayer && window.dataLayer.length > 0) {
        return; // GA already loaded
    }

    // Initialize with default denied consent
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied'
    });

    // Update if user consented
    if(getCookie("analyticsConsent") === "accepted") {
        gtag('consent', 'update', {
            'analytics_storage': 'granted',
            'ad_storage': 'granted'
        });
    }

    // Load GA script
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-JTL7T2P53Q";
    script.async = true;
    document.head.appendChild(script);

    script.onload = function() {
        gtag('js', new Date());
        gtag('config', 'G-JTL7T2P53Q', { 
            anonymize_ip: true,
            cookie_flags: 'SameSite=None; Secure; Partitioned',
			cookie_domain: 'auto'
        });
    };
}

// Load YouTube videos
function loadYouTubeVideos() {
    const youtubeEmbeds = document.querySelectorAll("iframe[data-src*='youtube.com']");
    youtubeEmbeds.forEach(iframe => {
        iframe.src = iframe.getAttribute("data-src");
    });
}

// Load Google Calendar
function loadGoogleCalendar() {
    const calendarEmbeds = document.querySelectorAll("iframe[data-src*='google.com/calendar']");
    calendarEmbeds.forEach(iframe => {
        iframe.src = iframe.getAttribute("data-src");
    });
}

// Helper function to hide the cookie banner
function hideCookieBanner() {
    const cookieBanner = document.getElementById("cookie-banner");
    if (cookieBanner) {
        cookieBanner.style.display = "none"; // Use your original CSS value here
    }
}

// Helper function to show the cookie banner
function showCookieBanner() {
    const cookieBanner = document.getElementById("cookie-banner");
    if (cookieBanner) {
        cookieBanner.style.display = "block"; // Use your original CSS value here
    }
}