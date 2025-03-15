document.addEventListener('DOMContentLoaded', function () {
    // Ensure Swiper library is loaded before initializing
    if (typeof Swiper !== "function") {
        console.error("Swiper library not loaded. Ensure you have included Swiper's JS and CSS files.");
        return;
    }

    const swiper = new Swiper('.swiper', {
        loop: true, // Infinite loop
        autoplay: {
            delay: 1000, // Auto-slide every 3 seconds
            disableOnInteraction: false, // Keeps autoplay running even after user interaction
        },
        speed: 800, // Smooth transition speed
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });

    // Pause autoplay on hover
    const swiperContainer = document.querySelector('.swiper');
    if (swiperContainer) {
        swiperContainer.addEventListener('mouseenter', () => swiper.autoplay.stop());
        swiperContainer.addEventListener('mouseleave', () => swiper.autoplay.start());
    }
});
