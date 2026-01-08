
import $ from 'jquery';
function nav () {
    $('.js-toggle-button').on('click', function (e) {
        e.preventDefault();
        $('.js-toggle-nav').toggleClass('open');
        $('.c-header').toggleClass('open');
        $(this).toggleClass('open');
    });
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if(scroll>100){
            if(!$('.c-header').hasClass('stuck')){
                $('.c-header').addClass('stuck');
            }
            if(!$('.header-orange').hasClass('.stuck-orange')){
                $('.header-orange').addClass('stuck-orange');
            }
        }else if(scroll<30){
            if (!$('.c-header').hasClass('js-stuck-fixed')) {
                $('.c-header').removeClass('stuck');
            }
        }
    });
};



export  {nav};

