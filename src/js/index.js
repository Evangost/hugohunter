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
const jQuery = $;

$.fn.visibilityListener = function(options) {
    // Defaults vars
    var defaults = {
        checkOnLoad: true,
        frequency: 200
    };
    // Extend our default options with those provided.
    var opts = jQuery.extend(defaults, options);

    var elts = jQuery(this);
    var visibleElements = [];
    var completeVisibleElements = [];
    var hiddenElements = [];

    var fireEvents = function()
    {
        var tmpVisibleElements = [];
        var tmpCompleteVisibleElements = [];
        var tmpHiddenElements = [];

        elts.each(function(it) {
            var offsetNO = jQuery(this).offset();
            var offsetNE = {
                top: offsetNO.top,
                left: offsetNO.left + jQuery(this).width()
            };
            var offsetSO = {
                top: offsetNO.top + jQuery(this).height(),
                left: offsetNO.left
            };
            var offsetSE = {
                top: offsetNO.top + jQuery(this).height(),
                left: offsetNO.left + jQuery(this).width()
            };
            if (pointVisible(offsetNO) || pointVisible(offsetNE) || pointVisible(offsetSO) || pointVisible(offsetSE)) {
                if (jQuery(this).is(':visible')) {
                    if (jQuery.inArray(it, visibleElements) === -1) {
                        jQuery(this).trigger('visible');
                        console.log('visible');
                    }
                    tmpVisibleElements.push(it);
                    if (pointVisible(offsetNO) && pointVisible(offsetNE) && pointVisible(offsetSO) && pointVisible(offsetSE)) {
                        if (jQuery.inArray(it, completeVisibleElements) === -1) {
                            jQuery(this).trigger('fullyvisible');
                        }
                        tmpCompleteVisibleElements.push(it);
                    } else {
                        if (jQuery.inArray(it, completeVisibleElements) === -1) {
                            jQuery(this).trigger('partiallyvisible');
                        }
                    }
                }
            } else {
                if (jQuery(this).is(':visible')) {
                    if (jQuery.inArray(it, hiddenElements) === -1) {
                        jQuery(this).trigger('hidden');
                    }
                    tmpHiddenElements.push(it);
                }
            }
        });
        visibleElements = tmpVisibleElements.slice();
        completeVisibleElements = tmpCompleteVisibleElements.slice();
        hiddenElements = tmpHiddenElements.slice();
    }

    var pointVisible = function(point) {
        if (point.left > jQuery(document).scrollLeft()
            && point.left < jQuery(document).scrollLeft() + jQuery(window).width()
            && point.top > jQuery(document).scrollTop()
            && point.top < jQuery(document).scrollTop() + jQuery(window).height()
        ) {
            return true;
        }
        return false;
    }

    if (!opts.checkOnLoad) {
        elts.each(function(it) {
            var offsetNO = jQuery(this).offset();
            var offsetNE = {
                top: offsetNO.top,
                left: offsetNO.left + jQuery(this).width()
            }
            var offsetSO = {
                top: offsetNO.top + jQuery(this).height(),
                left: offsetNO.left
            }
            var offsetSE = {
                top: offsetNO.top + jQuery(this).height(),
                left: offsetNO.left + jQuery(this).width()
            }
            if (pointVisible(offsetNO) || pointVisible(offsetNE) || pointVisible(offsetSO) || pointVisible(offsetSE)) {
                if (jQuery(this).is(':visible')) {
                    visibleElements.push(it);
                    if (pointVisible(offsetNO) && pointVisible(offsetNE) && pointVisible(offsetSO) && pointVisible(offsetSE)) {
                        completeVisibleElements.push(it);
                    }
                }
            } else {
                if (jQuery(this).is(':visible')) {
                    hiddenElements.push(it);
                }
            }
        });
    }

    window.setInterval(function() {
        fireEvents();
    }, opts.frequency);
}

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

    $(document).ready(function() {
        $('.statistic-wrapper').visibilityListener();
        $('#car-path').visibilityListener();
    });

    // Add event listener
    $('.statistic-wrapper').on('visible', function() {
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
    });

    $('#car-path').on('visible', function() {
        $('#car-path').addClass('car-active');
    })

    $('#car-path').on('hidden', function() {
        $('#car-path').removeClass('car-active');
    })


    // (function () {
    //     let numbersCounter = document.querySelectorAll('.statistic-info .numbers');
    //
    //     if (numbersCounter) {
    //         $('.numbers span').each(function () {
    //             $(this).prop('Counter',0).animate({
    //                 Counter: $(this).text()
    //             }, {
    //                 duration: 4000,
    //                 easing: 'swing',
    //                 step: function (now) {
    //                     $(this).text(Math.ceil(now));
    //                 }
    //             });
    //         });
    //     }
    // })();

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

////////////////////////////////////////////////////////



/*/ /Получаем нужный элемент*/
/*
var element = document.querySelector('#counter-wrap');

var Visible = function (target) {
    // Все позиции элемента
    var targetPosition = {
            top: window.pageYOffset + target.getBoundingClientRect().top,
            left: window.pageXOffset + target.getBoundingClientRect().left,
            right: window.pageXOffset + target.getBoundingClientRect().right,
            bottom: window.pageYOffset + target.getBoundingClientRect().bottom
        },
        // Получаем позиции окна
        windowPosition = {
            top: window.pageYOffset,
            left: window.pageXOffset,
            right: window.pageXOffset + document.documentElement.clientWidth,
            bottom: window.pageYOffset + document.documentElement.clientHeight
        };

    if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
        targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
        targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
        targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
        // Если элемент полностью видно, то запускаем следующий код
    } else {
        // Если элемент не видно, то запускаем этот код
        console.clear();
    }
};
*/

// Запускаем функцию при прокрутке страницы
/*window.addEventListener('scroll', function() {
    Visible (element);
});

// А также запустим функцию сразу. А то вдруг, элемент изначально видно
Visible (element);*/


/*
let wrapElement = document.getElementById('counter-wrap');
let domRect = wrapElement.getBoundingClientRect();
window.testElement = wrapElement;
console.log(domRect);*/
