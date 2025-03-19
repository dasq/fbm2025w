(function ($) {
    "use strict";
	
    /*[ Back to top ]
    ===========================================================*/
    var windowH = $(window).height() / 2;

    $(window).on('scroll', function () {
        $("#myBtn").css('display', ($(this).scrollTop() > windowH) ? 'flex' : 'none');
    });

    $('#myBtn').on("click", function () {
        $('html, body').animate({ scrollTop: 0 }, 300);
    });

    /*[ Play Video - Optimized Lazy Loading ]
    ===========================================================
    $('#modal-video-01').on('shown.bs.modal', function () {
        var modalBody = document.getElementById('video-container');
        if (!modalBody.querySelector('iframe')) {
            var iframe = document.createElement('iframe');
            iframe.width = "100%";
            iframe.height = "315";
            iframe.src = "https://www.youtube.com/embed/videoseries?si=gjAYf9yE-2g0AMwP&amp;list=PL6i964kxZ6uNYnvabEwdPgFGxqFFq-j0c"; // Replace with your actual playlist ID
            iframe.frameBorder = "0";
            iframe.allowFullscreen = true;
            modalBody.appendChild(iframe);
        }
    });

    $('#modal-video-01').on('hidden.bs.modal', function () {
        document.getElementById('video-container').innerHTML = ''; // Clear iframe on close
    });*/

    /*[ Fixed Header ]
    ===========================================================*/
    var header = $('header');
    var logo = $(header).find('.logo img');
    var linkLogo1 = $(logo).attr('src');
    var linkLogo2 = $(logo).data('logofixed');

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 5) {
            $(logo).attr('src', linkLogo2);
            $(header).addClass('header-fixed');
        } else {
            $(header).removeClass('header-fixed');
            $(logo).attr('src', linkLogo1);
        }
    });

    /*[ Show/Hide Sidebar ]
    ===========================================================*/
    $('body').append('<div class="overlay-sidebar trans-0-4"></div>');
    var ovlSideBar = $('.overlay-sidebar');
    var sidebar = $('.sidebar');

    $('.btn-show-sidebar').on('click', function () {
        sidebar.addClass('show-sidebar');
        ovlSideBar.addClass('show-overlay-sidebar');
    });

    $('.btn-hide-sidebar, .overlay-sidebar').on('click', function () {
        sidebar.removeClass('show-sidebar');
        ovlSideBar.removeClass('show-overlay-sidebar');
    });

    /*[ Google Calendar Modal ]
    ===========================================================
    $('[data-target="#modal-calendar"]').on("click", function () {
        $("#calendarIframe").attr("src", "https://calendar.google.com/calendar/appointments/schedules/AcZssZ35Fj0vgpJ5HiFwsxTE2jnN9o4hoVkzW6d7RY3GfUWUku_1DDOJfchPHmXYv_AwKG4C-Fsjo1Yo?gv=true");
    });

    $("#modal-calendar").on("hidden.bs.modal", function () {
        $("#calendarIframe").attr("src", "");
    });*/

})(jQuery);
