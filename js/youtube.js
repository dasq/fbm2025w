document.addEventListener("DOMContentLoaded", function () {
    console.log("youtube.js loaded");

    document.querySelectorAll(".modal").forEach(modal => {
        let modalId = modal.id;
        let videoUrl = modal.getAttribute("data-video-url");

        if (!videoUrl) {
            console.error(`Missing video URL for ${modalId}`);
            return;
        }

        console.log(`Attaching event listeners to modal: ${modalId}`);

        // Use jQuery for the opening part
        $(`#${modalId}`).on('shown.bs.modal', function () {
            console.log(`Modal ${modalId} opened.`);

            if (getCookie("mediaConsent") === "accepted") {
                console.log("I'm in the if");
                loadYouTubeVideo(modalId, videoUrl);
            } else {
                console.log(`Media consent not accepted, showing banner.`);
                console.log("I'm in the else");

                let banner = modal.querySelector(".video-consent-banner");
                if (banner) banner.style.display = "flex"; // Show the banner inside the modal
            }
        });

        // Use jQuery for the closing part (old version)
        $(`#${modalId}`).on('hidden.bs.modal', function () {
            console.log(`Modal ${modalId} closed, removing video.`);
            console.log("Modal HTML:", modal.innerHTML); // Log the modal's HTML structure
            let modalBody = modal.querySelector(".video-container");
            if (modalBody) {
                modalBody.innerHTML = ""; // Completely remove the iframe
                console.log("Iframe removed.");
            } else {
                console.error("Could not find .video-container element."); // Debug if the element is missing
            }
        });
    });
});

// Function to load YouTube video
window.loadYouTubeVideo = function (modalId, videoUrl) {
    console.log(`Loading YouTube video for modal: ${modalId}`); // Check if this logs when the modal is reopened

    let modalBody = document.querySelector(`#${modalId} .video-container`);
    let consentBanner = document.querySelector(`#${modalId} .video-consent-banner`);

    if (!modalBody || !consentBanner) {
        console.error("Missing modal elements.");
        return;
    }

    // If consent is accepted, load the video
    if (getCookie("mediaConsent") === "accepted") {
        consentBanner.style.display = "none";

        // If there's no iframe yet, create one
        if (!modalBody.querySelector("iframe")) {
            let iframe = document.createElement("iframe");
            iframe.width = "100%";
            iframe.height = "315";

            // Fixing YouTube URL parameter handling
            let separator = videoUrl.includes("?") ? "&" : "?";
            iframe.src = videoUrl + separator + "autoplay=0"; // Disable autoplay

            iframe.frameBorder = "0";
            iframe.allowFullscreen = true;
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
			// Add cookie attributes to iframe
            iframe.setAttribute("cookie", "SameSite=None; Secure; Partitioned");
            modalBody.appendChild(iframe);

            console.log("YouTube iframe created.");
        }
    } else {
        console.log("YouTube consent not given.");
    }
};