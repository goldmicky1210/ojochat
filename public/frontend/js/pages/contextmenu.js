var copiedContent = '';
var pasteTarget;
$(document).ready(() => {
    // display context menu
    // Trigger action when the contexmenu is about to be shown
    // $(document).on('contextmenu','input', function (event) {
    //     event.preventDefault();
    //     pasteTarget = $(event.currentTarget);
    //     console.log(event.pageX, event.pageY);
    //     console.log($(window).width(), $(window).height());
    //     let left = (event.pageX > ($(window).width() - 100)) ? (event.pageX - 100) : event.pageX;
    //     let top = (event.pageY > ($(window).height() - 100)) ? (event.pageY - 100) : event.pageY;
    //     // if (event.pageX > ($(window).width - 100)) {
    //     //     var left: event.pageX
    //     // }
    //     $('.custom-menu').finish().toggle(100).css({
    //         top: top + 'px',
    //         left: left + 'px'
    //     });
    // });
    // // If the document is clicked somewhere
    // $(document).on('mousedown', function (e) {
    //     if (!$(e.target).parents(".custom-menu").length > 0) {
    //         $('.custom-menu').hide(100);
    //         pasteTarget = null;
    //     }
    // });

    // // If the menu element is clicked
    // $(".custom-menu li").click(function (e) {
    //     // This is the triggered action name
    //     switch ($(this).attr("data-action")) {
    //         // A case for each action. Your actions here
    //         case "paste": 
    //             $(pasteTarget).val($(pasteTarget).val() + copiedContent);
    //             break;
    //         case "second": alert("second"); break;
    //         case "third": alert("third"); break;
    //     }

    //     // Hide it AFTER the action was triggered
    //     $(".custom-menu").hide(100);
    // });

});