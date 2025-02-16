(function ($) {
    "use strict";

    /*[ Load page ]
    ===========================================================
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        loading: true,
        loadingParentElement: 'html',
        loadingClass: 'animsition-loading-1',
        loadingInner: '<div class="cp-spinner cp-meter"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: ['animation-duration', '-webkit-animation-duration'],
        overlay: false,
        overlayClass: 'animsition-overlay-slide',
        overlayParentElement: 'html',
        transition: function (url) {
            window.location.href = url;
        }
    });*/

    /*[ Back to top ]
    ===========================================================*/
    var windowH = $(window).height() / 2;

    $(window).on('scroll', function () {
        $("#myBtn").css('display', ($(this).scrollTop() > windowH) ? 'flex' : 'none');
    });

    $('#myBtn').on("click", function () {
        $('html, body').animate({ scrollTop: 0 }, 300);
    });

    /*[ Select ]
    ===========================================================*/
    $(".selection-1").select2({
        minimumResultsForSearch: 20,
        dropdownParent: $('#dropDownSelect1')
    });

    /*[ Daterangepicker ]
    ===========================================================*/
    $('.my-calendar').daterangepicker({
        "singleDatePicker": true,
        "showDropdowns": true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });

    var isClick = 0;
    $(window).on('click', function () { isClick = 0; });

    $('.btn-calendar').on('click', function (e) {
        e.stopPropagation();
        isClick = isClick === 1 ? 0 : 1;
        if (isClick) $('.my-calendar').focus();
    });

    $('.my-calendar, .daterangepicker').on('click', function (e) {
        e.stopPropagation();
        isClick = 1;
    });

    /*[ Play Video - Optimized Lazy Loading ]
    ===========================================================*/
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
    });

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

    /*[ Isotope Filtering ]
    ===========================================================*/
    var $topeContainer = $('.isotope-grid');

    $('.filter-tope-group').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $topeContainer.isotope({ filter: filterValue });
        $('.label-gallery').removeClass('is-actived');
        $(this).addClass('is-actived');
    });

    $(window).on('load', function () {
        $topeContainer.each(function () {
            $(this).isotope({
                itemSelector: '.isotope-item',
                percentPosition: true,
                animationEngine: 'best-available',
                masonry: {
                    columnWidth: '.isotope-item'
                }
            });
        });
    });

    /*[ Google Calendar Modal ]
    ===========================================================*/
    $('[data-target="#modal-calendar"]').on("click", function () {
        $("#calendarIframe").attr("src", "https://calendar.google.com/calendar/appointments/schedules/AcZssZ35Fj0vgpJ5HiFwsxTE2jnN9o4hoVkzW6d7RY3GfUWUku_1DDOJfchPHmXYv_AwKG4C-Fsjo1Yo?gv=true");
    });

    $("#modal-calendar").on("hidden.bs.modal", function () {
        $("#calendarIframe").attr("src", "");
    });

})(jQuery);
