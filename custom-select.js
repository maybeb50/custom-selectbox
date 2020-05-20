(function($) {
    'use strict';

    /* customSelect */
    $.customSelect = function(el, options){
        var base = this;
        base.$el = $(el);
        base.el = el;
    
        base.init = function() {
            base.create();
        };

        base.create = function() {
            var classes = $(el).attr('class');
            var id = $(el).attr('id');
            var name = $(el).attr('name');
            var placeholders = $(el).attr('placeholder');
            var template;

            template =  '<div class="'+ classes +'">';
            template +=     '<span class="custom-select-trigger">'+ placeholders +'</span>';
            template +=     '<div class="custom-options">';

            $(el).find('option').each(function() {
                template += '<span class="custom-option" data-value="'+ $(this).attr('value') +'"><i class="'+$(this).attr('value')+'"></i>'+ $(this).html() +'</span>';
            });

            template += '</div></div>';

            $(el).wrap('<div class="custom-select-wrapper"></div>');
            $(el).hide();
            $(el).after(template);

            base.setup();
        };

        base.setup = function() {

            var trigger = $(el).parent().find('.custom-select-trigger');
            var option = $(el).parent().find('.custom-option');

            trigger.on('click', function(event) {
                $('html').on('click', function() {
                    $('.custom-select').removeClass('opened');
                });
                $(this).parent().toggleClass('opened');
                event.stopPropagation();
            });
            
            option.on('click', function() {
                var text = $(this).text();
                var dataValue = $(this).attr('data-value');
                var selected = '<i class="'+dataValue+'"></i>' + text;

                $(this).parents('.custom-select-wrapper').find('select').val($(this).data('value'));
                $(this).parents('.custom-options').children('span').removeClass('selection');
                $(this).addClass('selection');
                $(this).parents('.sources').removeClass('opened');
                $(this).parents('.sources').find('.custom-select-trigger').html(selected);

                console.log(dataValue);
            });
            
        };

        base.init();
    }

    /* Jquery FN */
    $.fn.customSelect = function(options){
        if (this.length) {
            return this.each(function(){
                (new $.customSelect(this, options));
            });
        }
    };
})(jQuery)