import $ from 'jquery';

function ensureSlick() {
  return new Promise((resolve) => {
    if ($.fn && typeof $.fn.slick === 'function') {
      resolve();
      return;
    }
    import('slick-carousel')
      .then(() => resolve())
      .catch(() => resolve());
  });
}

function carousel () {

    if ($('.js-carousel').length && $.fn && typeof $.fn.slick === 'function') {
        $('.js-carousel').slick({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></i></button>',
            arrows: true,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        dots: true,
                        slidesToShow: 1
                    }
                }
            ]
        });
    }
    if ($('.js-logos-carousel').length && $.fn && typeof $.fn.slick === 'function') {
        $('.js-logos-carousel').slick({
            infinite: true,
            slidesToShow: 5,
            autoplay: true,
            autoplaySpeed: 0,
            speed: 5000,
            cssEase: 'linear',
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></i></button>',
            arrows: true,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3
                    }
                }
            ]
        });
    }
    if ($('.js-cards-carousel').length && $.fn && typeof $.fn.slick === 'function') {
        $('.js-cards-carousel').slick({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></i></button>',
            arrows: true,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        dots: true,
                        slidesToShow: 1
                    }
                }
            ]
        });
    }
}

function initCarousel() {
  // Garantiza slick antes de ejecutar carouseles
  return ensureSlick().then(() => carousel());
}

export {carousel, initCarousel};
