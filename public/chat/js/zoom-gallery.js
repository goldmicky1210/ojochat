/*=====================
 Zoom gallery Js
 ==========================*/
(function ($) {
    "use strict";
        $('.zoom-gallery').each(function () {
            $(this).magnificPopup({
                delegate: 'a',
                type: 'image',
                closeOnContentClick: false,
                closeBtnInside: false,
                mainClass: 'mfp-with-zoom mfp-img-mobile',
                image: {
                    verticalFit: true,
                    titleSrc: function (item) {
                        return item.el.attr('title') + '<br/> Date: ' + item.el.attr('date');
                    }
                },
                gallery: {
                    enabled: true
                },
                zoom: {
                    enabled: true,
                    duration: 300,
                    opener: function (element) {
                        return element.find('img');
                    }
                }
            });
        })
    setTimeout(
        function () {
            $(".zoom-gallery").trigger("click");
        },
        125
    );
})(jQuery);
