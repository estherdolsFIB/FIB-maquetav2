
import $ from 'jquery';

function tabs (){

    $('.js-tab-selector a').on('click',function(e){
        e.preventDefault();
        var targetnav=$(this).attr('data-target');
        if ($(this).attr('data-tab-toggle') && $(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
            $(this).parents('.js-tab-container').find('.c-tabs__item').hide().removeClass('is-active');
        } else {
            $(this).parents('.js-tab-container').find('.c-tabs__item').hide().removeClass('is-active');
            $(this).parents('.js-tab-container').find('.js-tab-selector a').removeClass('is-active');
            $(this).addClass('is-active');

            if ($(this).attr('data-transition') == "no-fade") {
                $(this).parents('.js-tab-container').find("[data-tab='" + targetnav + "']").show().addClass('is-active');
            } else {
                $(this).parents('.js-tab-container').find("[data-tab='" + targetnav + "']").fadeIn().addClass('is-active');
            }
        }
        if ($(this).attr('data-scrolltop')) {
            window.scrollTo(0, 0);
        }



    })
}

export  {tabs};

