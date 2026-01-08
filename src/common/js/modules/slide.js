import $ from 'jquery';

function ensureSlick() {
  return new Promise((resolve) => {
    if ($.fn && typeof $.fn.slick === 'function') {
      resolve();
      return;
    }
    import('slick-carousel').then(() => {
      resolve();
    }).catch(() => resolve());
  });
}

function slide () {
    ensureSlick().then(() => {
        if ($('.js-slider').length && $.fn && typeof $.fn.slick === 'function') {
            $('.js-slider').slick({
                autoplay: true,
                arrows: false,
                dots: true
            });
        }

        if ($('.js-slider-arrows').length && $.fn && typeof $.fn.slick === 'function') {
            $('.js-slider-arrows').slick({
                autoplay: true,
                arrows: true,
                prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
                nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></i></button>',
                dots: true
            });
        }
    });


}

function slideVideo () {
    ensureSlick().then(() => {
      if ($('.js-slider-video').length && $.fn && typeof $.fn.slick === 'function') {
        $('.js-slider-video').slick({
            autoplay: true,
            slidesToShow: 3,
            infinite: false,
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></i></button>',
            dots: false,
            responsive: [{

                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                }

              }, {

                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                }

              }]
        });
      }
    });

}

export {slide};
export {slideVideo};
