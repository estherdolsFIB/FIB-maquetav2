
import $ from 'jquery';

function tooltips (){

    $('.js-tooltip').on('click',function(e){
        e.preventDefault();
        var targetnav=$(this).attr('data-tooltip');
        $('[data-tooltip-item]').removeClass('is-active');
        $('[data-tooltip-item=' + targetnav + ']').addClass('is-active');
    })

    $('body, html').on('click', function (e) {
        $('body, html').find('[tooltip-click-outside].is-active').each(function() {
            if ($(this).has(e.target).length <= 0){
                console.log($(this).attr('data-tooltip-item'));
                console.log($(e.target).attr('data-toltip'));
                if($(this).attr('data-tooltip-item') != $(e.target).attr('data-tooltip')) {
                    /*if ($(this).is(e.target)) {*/
                    $(this).removeClass('is-active');
                }
            }
        });

    });
}
export  {tooltips};

