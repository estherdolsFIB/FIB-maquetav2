/* jshint node: true */
/* jshint esversion: 6 */

import $ from 'jquery';

function toggleClass (){

    $(document).on('click', '[data-toggle-class]', function (e) {
        e.stopPropagation();
        e.preventDefault();
        let _closeAll = $(this).data('toggle-close-all');
        let _this = '[data-toggle-class]';
        let _class = $(this).data('toggle-class');
        let _item = $(this).data('toggle-class-item');
        let _notThis = $(this).data('toggle-class-not-this');
        let _items = $('[data-toggle-class-item]');
        let _textmore = $(this).data('toggle-text-more');
        let _textless = $(this).data('toggle-text-less');
        let _container = $(this).data('toggle-class-container');
        let _event = $(this).data('toggle-event');

        if (_container != undefined) {
            _items =  $(this).parents('[data-toggle-class-container="'+ _container +'"]').find('[data-toggle-class-item]');
        }
        if (_notThis != undefined) {
          _items = $('[data-toggle-class-item]:not([data-toggle-class-not-this])');
            if (_container != undefined) {
                _items =  $(this).parents('[data-toggle-class-container="'+ _container +'"]').find('[data-toggle-class-item]:not([data-toggle-class-not-this])');
            }
        }

        if (_textmore != undefined && _textless != undefined) {
            if ($(_this).text() == _textmore) {
                $(_this).text(_textless);
            } else {
                $(_this).text(_textmore);
            }
        }

        $(_items).each(function () {
            let _itemName = $(this).data('toggle-class-item');
            if (_item == _itemName) {

                if (_event == 'open' ) {
                    $(this).addClass(_class);
                }
                else if(_event == 'close') {
                    $(this).removeClass(_class);
                }
                else {
                    $(this).toggleClass(_class);
                    let __clickoutside=$(this).attr('data-clickoutside-container');
                    if(__clickoutside!= undefined){
                       // $('html').toggleClass('overflow-hidden');
                    }
                }
            } else {
                if(_closeAll) {
                    console.log(_closeAll);
                    $(this).removeClass(_class);
                }
            }
        });
    });

    $('body, html').on('click', function (e) {
        $('body, html').find('[data-click-outside].is-active').each(function() {
            if ($(this).has(e.target).length <= 0){
                if($(this).data('toggle-class-item') != $(e.target).data('toggle-class-item')) {
                    /*if ($(this).is(e.target)) {*/
                    $(this).removeClass('is-active');
                }
            }
        });

    });
}

export  {toggleClass};

