(function (window) {
    'use strict';
    /* source : https://codepen.io/yy/pen/vOYqYV */

    /* template create */
    $('.custom-select').each(function(event) {

        var classes = $(this).attr('class');        // custom-select, sources 
        var id = $(this).attr('id');                // sources
        var name = $(this).attr('name');            // sources 
        var placeholders = $(this).attr('placeholder');     

        var template = '<div class="'+ classes +'">'; 
            template += '<span class="custom-select-trigger">'+ placeholders +'</span>';
            template += '<div class="custom-options">';

            $(this).find('option').each(function(index, item) {
                // 왜 undefined 가 나오지
                console.log(index, item);
                template += '<span class="custom-option" data-value="'+ $(this).attr('value') +'"><i class="'+$(this).attr('value')+'"></i>'+ $(this).html() +'</span>';
            });
            template += '</div></div>';

        $(this).wrap('<div class="custom-select-wrapper"></div>');
        $(this).hide();
        $(this).after(template);
    });

    /* custom select-box click event */
    $('.custom-select-trigger').on('click', function() {
        console.log('click');
        $('html').one('click', function() {
            $('.custom-select').removeClass('opened');
        });
        $(this).parents('.custom-select').toggleClass('opened');
        event.stopPropagation();
    });

    $('.custom-option').on('click', function() {
        var dataText = $(this).text();
        var dataValue = $(this).attr('data-value');
        var selectData = '<i class="'+dataValue+'"></i>' + dataText;

        // alert(dataValue);

        console.log($(this).parents('.custom-select-wrapper').find('select').val($(this).data('value')));

        $(this).parents('.custom-select-wrapper').find('select').val($(this).data('value'));
        $(this).parents('.custom-options').find('.custom-option').removeClass('selection');
        $(this).addClass('selection');
        $(this).parents('.custom-select').removeClass('opened');
        $(this).parents('.custom-select').find('.custom-select-trigger').html(selectData);
    });


})(window);