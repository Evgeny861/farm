new WOW().init();

var mySwiper = new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination',
        bulletClass: 'projects-bullet',
        bulletActiveClass: 'projects-bullet-active',
        clickable: true
    },
    navigation: {
        nextEl: '.button-next',
        prevEl: '.button-prev',
    },
    speed: 700,
    spaceBetween: 100
});