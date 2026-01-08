import $ from 'jquery';


function account () {

    $('.js-modify').on('click', function (e) {
        e.preventDefault();
        $(this).prev().prop("disabled", false);
        $(this).prev().focus();

        let oldVal = $(this).prev().val();
        $(this).prev().val('');
        $(this).prev().val(oldVal).focus();

        $(this).hide();
    });
};

export  {account};

