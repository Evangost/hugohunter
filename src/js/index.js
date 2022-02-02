import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'jquery-ui'
import 'jquery-ui/ui/effect'
import 'bootstrap';
import 'popper.js';
import Swiper from 'swiper/dist/js/swiper.min';
import 'select2';
import intlTelInput from 'intl-tel-input';

$(window).on('load', function () {
    let b = $('body');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        b.addClass('ios');
    } else {
        b.addClass('web');
    }

    b.removeClass('loaded');
});

$(function () {
    // Toggle header menu
    (function () {
        let btn = document.querySelector('.header-container__menu-toggle');

        if (btn) {
            btn.addEventListener('click', function () {
                document.body.classList.toggle('modal-open');
                this.classList.toggle('active');
                this.nextElementSibling.classList.toggle('active');
            });
        }
    })();

    (function () {
        let numbersCounter = document.querySelectorAll('.statistic-info .numbers');

        if (numbersCounter) {
            $('.numbers span').each(function () {
                $(this).prop('Counter',0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 4000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
        }
    })();

    // Swiper slider
    if ($('.swiper-container').length) {
        let slider;
        let slide = document.querySelectorAll('.swiper-container .swiper-slide').length;

        if (slide > 1) {
            slider = new Swiper('.swiper-container', {
                direction: "vertical",
                loop: true,
                observer: true,
                observeParents: true,
                height: 550,
                spaceBetween: 0,
                slidesPerView: 1,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                breakpoints: {
                    1200: {
                        direction: 'horizontal',
                        height: null,
                    }
                }
            });
        }
    }

    // Range slide
    if ($('input[type="range"]')) {
        let sliderRange = document.querySelectorAll('.slider-range');
        let sliderHandles = document.querySelectorAll('.slider-handles');

        if (sliderRange.length) {
            sliderRange.forEach(function (elem) {
                let input = elem.childNodes[0];
                let startValue = input.hasAttribute('value') ? Number(input.getAttribute('value')) : 1;
                let minValue = input.hasAttribute('min') ? Number(input.getAttribute('min')) : 1;
                let maxValue = input.hasAttribute('max') ? Number(input.getAttribute('max')) : 100;

                input.remove();

                noUiSlider.create(elem, {
                    start: [startValue],
                    step: 1,
                    behavior: 'tap',
                    connect: [true, false],
                    range: {
                        'min': [minValue],
                        'max': [maxValue]
                    }
                });
            });
        }

        if (sliderHandles.length) {
            sliderHandles.forEach(function (elem) {
                let input = elem.childNodes[0];
                let minValue = input.hasAttribute('min') ? Number(input.getAttribute('min')) : 1;
                let maxValue = input.hasAttribute('max') ? Number(input.getAttribute('max')) : 100;

                input.remove();

                noUiSlider.create(elem, {
                    start: [minValue, maxValue / 2],
                    step: 1,
                    behavior: 'tap-drag',
                    connect: true,
                    range: {
                        'min': minValue,
                        'max': maxValue
                    }
                });
            });
        }
    }

    // Telephone input
    if ($('.input-phone').length) {
        const inputPhone = document.querySelectorAll('.input-phone');

        inputPhone.forEach(function (e, i) {
            intlTelInput(e, {
                initialCountry: "auto",
                geoIpLookup: function (callback) {
                    $.get('https://ipinfo.io', function () {
                    }, "jsonp").always(function (resp) {
                        var countryCode = (resp && resp.country) ? resp.country : "us";
                        callback(countryCode);
                    });
                },
                utilsScript: "../../node_modules/intl-tel-input/build/js/utils.js",
            });
        });


    }

    // Select2
    if ($('.select-js').length) {
        const select = document.querySelectorAll('.select-js');

        select.forEach(function (e, i) {
            $(e).select2({
                minimumResultsForSearch: Infinity,
            });
        });
    }

    // Lazy load observer
    const imagesAll = document.querySelectorAll('img[data-src]');
    let imgObserve = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio >= 0 && entry.target.hasAttribute('data-src')) {
                let current = entry.target;
                let source = current.getAttribute('data-src');

                current.setAttribute('src', source);
                current.removeAttribute('data-src');
            }
        });
    });
    if (imagesAll.length > 0) {
        imagesAll.forEach(function (image) {
            imgObserve.observe(image);
        });
    }
});

/*Counter*/



$(document).ready(function() {

});
