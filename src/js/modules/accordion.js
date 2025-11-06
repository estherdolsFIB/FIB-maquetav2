import $ from 'jquery';


function accordion () {


    $('.js-accordion').click(function(e) {
        var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        e.preventDefault();
        var $this = $(this);
        let itemActiveHeight = 0;
        let itemsAccordion = $('.js-accordion');
        let itemClicked = 0;
        let currentTop = document.documentElement.scrollTop;
        for (let i = 0; i < itemsAccordion.length; i++) {
            if(this === itemsAccordion[i]) {
                itemClicked = i;
            }
        }
        if (!$this.hasClass('active')) {
            let items = $('.js-accordion').parent().parent().find('.active');
            let itemActived = 0;
            for (let i = 0; i < items.length; i++) {
                if (!items[i].parentElement.classList.contains('c-accordion__pagination')) {
                    $('.js-accordion').parent().parent().find('.c-accordion__content.active').slideUp(350);
                    let itemsAccordion = $('.js-accordion');
                    for (let j = 0; j < itemsAccordion.length; j++) {
                        if(items[i] === itemsAccordion[j]) {
                            itemActived = j;
                        }
                    }
                   /*if(items[i].classList.contains('active') && itemClicked > itemActived) {
                        itemActiveHeight = $('.js-accordion').parent().parent().find('.c-accordion__content.active').height();
                        //$("html, body").animate({ scrollTop: $('.js-accordion').parent().parent().find('.c-accordion__content.active').offset().top - 70 }, 350);
                      if(isFirefox) {
                          window.scroll({ top: document.documentElement.scrollTop - itemActiveHeight - 24, behavior: 'smooth' });
                      } else {
                          $("html:not(:animated), body:not(:animated)").animate({scrollTop: currentTop - itemActiveHeight - 24}, 350);
                      }
                       // $("body, html").animate({ scrollTop: document.documentElement.scrollTop - itemActiveHeight - 24 }, 350);
                        //window.scroll({ top: document.documentElement.scrollTop - itemActiveHeight - 24, behavior: 'smooth' });

                    }*/
                    items[i].classList.remove('active');
                }
            }
            $('.js-accordion').find('span').html('+');
            $this.toggleClass('active');
            $this.find('span').html('-');
            $this.next().toggleClass('active');
            $this.next().slideToggle(350);
            setTimeout(function() {
                let offset = $this.offset();
                $("html:not(:animated), body:not(:animated)").animate({
                    scrollTop: offset.top - 70 - itemActiveHeight,
                }, 'fast', "linear");
            }, 351);
        } else {
            $this.removeClass('active');
            $this.find('span').html('+');
            $this.next().removeClass('active');
            $this.next().slideToggle(350);
        }
         setTimeout(function() {
            let offset = $this.offset();
            $("html:not(:animated), body:not(:animated)").animate({
                scrollTop: offset.top - 70,
            }, 'fast', "linear");
        }, 351);
    });

    $('.js-expand').click(function(e) {
        e.preventDefault();

        var $this = $(this).parent().next().find('.js-accordion');

        $this.parent().parent().find('.c-accordion__item .js-accordion').removeClass('active');
        $this.addClass('active');
        $this.find('span').html('-');

        $this.parent().parent().find('.c-accordion__item .c-accordion__content').removeClass('active');
        $this.parent().parent().find('.c-accordion__item .c-accordion__content').slideUp(350);
        $this.next().addClass('active');
        $this.next().slideDown(350);

    });

    $('.js-contract').click(function(e) {
        e.preventDefault();

        var $this = $(this).parent().next().find('.js-accordion');

        $this.removeClass('active');
        $this.find('span').html('+');

        $this.next().removeClass('active');
        $this.next().slideUp(350);

    });

};

export  {accordion};

