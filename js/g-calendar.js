document.addEventListener("DOMContentLoaded", function () {
    console.log("calendar.js loaded");

    let calendarIframe = document.getElementById("calendarIframe");
    let consentBanner = document.getElementById("calendar-consent-banner");
    let calendarUrl = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ35Fj0vgpJ5HiFwsxTE2jnN9o4hoVkzW6d7RY3GfUWUku_1DDOJfchPHmXYv_AwKG4C-Fsjo1Yo?gv=true";

    // Show modal event
    $("#modal-calendar").on("shown.bs.modal", function () {
        if (getCookie("CalendarConsent") === "accepted") {
            console.log("Calendar consent accepted, loading Google Calendar.");
            loadGoogleCalendar();
        } else {
            console.log("Calendar consent not accepted, showing banner.");
            consentBanner.style.display = "block";
            calendarIframe.style.display = "none"; // Hide calendar until consent is given
        }
    });

    // Accept consent and load calendar
    document.getElementById("accept-calendar-consent").addEventListener("click", function () {
        console.log("User accepted calendar cookies.");
        setCookie("CalendarConsent", "accepted", 365);
        loadGoogleCalendar();
    });

    // Hide calendar on modal close
    $("#modal-calendar").on("hidden.bs.modal", function () {
        console.log("Modal closed, clearing calendar iframe.");
        calendarIframe.src = "";
    });

    function loadGoogleCalendar() {
        consentBanner.style.display = "none"; // Hide consent banner
        calendarIframe.style.display = "block"; // Show iframe
        calendarIframe.src = calendarUrl; // Load Google Calendar
    }

    function getCookie(name) {
        let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }

    function setCookie(name, value, days) {
        let expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + "=" + value + ";expires=" + expires.toUTCString() + ";path=/";
    }
});
