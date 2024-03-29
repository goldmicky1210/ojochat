/*-----------------------------------------------------------------------------------

 Template Name:Chitchat
 Template URI: themes.pixelstrap.com/chitchat
 Description: This is Chat website
 Author: Pixelstrap
 Author URI: https://themeforest.net/user/pixelstrap

 ----------------------------------------------------------------------------------- */
// 01. Tooltip js
// 02. Background Image js
// 03. OwlCarousel js
// 04. Chitchat Loader js
// 05. Search js
// 06. Mute js
// 07. Button Effect js
// 08. Collapse Title js
// 09. Refresh Request information next & previous button
// 10 .Full Screen
// 11. Header fix
// 12. Tap on Top
// 13. Customizer
// 14  Footer responsive js
// 15  Pin box
// 16  Reminder
// 17  Set wallpaper onclick
// 18  Custom tab
// 19  Theme mode
// 20. Add claas to nav
// 21. Live chat
// 22. Toggle classes
// 23. ADD tO-DO LIST
// 24. Right sidebar
// 25. Sticker
// 26. Emoji
// 27. Profile open
// 28. Dropdown
// var socket
(function ($) {
    "use strict";
    /*=====================
      01. Tooltip js
      ==========================*/
    tippy('.sidebar-main .icon-btn', {
        theme: 'tooltiprad',
        placement: 'right-end',
        arrow: false
    });
    // tippy('.user-popup', {
    //     content: "Status",
    //     theme: 'gradienttooltip',
    //     placement: 'right-end',
    //     arrow: false
    // });
    tippy('.calls  > li > .icon-btn', {
        placement: 'bottom-end',
        arrow: true
    });
    tippy('.clfooter a', {
        placement: 'top-end',
        arrow: true
    });
    tippy('.audiocall2 a', {
        placement: 'top-end',
        arrow: true
    });
    //   tippy('.videocall a', {
    //     placement: 'top-end',
    //     arrow: true
    // });
    //Profile Rate info tooltip
    tippy('.contact-profile .photoRating', { content: "0.00" });
    tippy('.content-rating-list .text-rating', { content: "0.00" });
    tippy('.content-rating-list .photo-rating', { content: "0.00" });
    tippy('.content-rating-list .video-rating', { content: "0.00" });
    tippy('.content-rating-list .audio-rating', { content: "0.00" });
    tippy('.content-rating-list .video-call-rating', { content: "0.00" });
    tippy('.content-rating-list .voice-call-rating', { content: "0.00" });
    //PhotoCreation tooltip
    tippy('.emojis-tool .background_btn', { content: "Add Background", onShow(instance) { setTimeout(() => { instance.hide(), 1000 }) } });
    tippy('.emojis-tool .emoji_btn', { content: "Add Emojis", onShow(instance) { setTimeout(() => { instance.hide(), 1000 }) } });
    tippy('.emojis-tool .add_photo_btn', { content: "Add Photos", onShow(instance) { setTimeout(() => { instance.hide(), 1000 }) } });
    tippy('.emojis-tool .lock_btn', { content: "Lock Resize", onShow(instance) { setTimeout(() => { instance.hide(), 1000 }) } });
    tippy('.emojis-tool .Text_btn', { content: "Add Text", onShow(instance) { setTimeout(() => { instance.hide(), 1000 }) } });
    tippy('.emojis-tool .blur_btn', { content: "Add Blur", onShow(instance) { setTimeout(() => { instance.hide(), 1000 }) } });
    tippy('.emojis-tool .reset_btn', { content: "Reset", onShow(instance) { setTimeout(() => { instance.hide(), 1000 }) } });

    /*=====================
      02. Background Image js
      ==========================*/
    $(".bg-top").parent().addClass('b-top');
    $(".bg-bottom").parent().addClass('b-bottom');
    $(".bg-center").parent().addClass('b-center');
    $(".bg_size_content").parent().addClass('b_size_content');
    $(".bg-img").parent().addClass('bg-size');
    $('.bg-img').each(function () {
        var el = $(this),
            src = el.attr('src'),
            parent = el.parent();
        parent.css({
            'background-image': 'url(' + src + ')',
            'background-size': 'cover',
            'background-position': 'center',
            'display': 'block'
        });
        el.hide();
    });


    /*=====================
      03. OwlCarousel js
      ==========================*/
    // var owl_carousel_custom_recent = {
    //     init: function () {
    //         var recent = $('.recent-slider');
    //         recent.owlCarousel({
    //             items: 3,
    //             dots: false,
    //             loop: true,
    //             margin: 15,
    //             nav: false,
    //             autoplay: true,
    //             autoplayTimeout: 2000,
    //             autoplayHoverPause: true,
    //             responsive: {
    //                 768: {
    //                     items: 7
    //                 },
    //                 800: {
    //                     items: 7
    //                 },
    //                 801: {
    //                     items: 2
    //                 },
    //                 1366: {
    //                     items: 2
    //                 },
    //                 1600: {
    //                     items: 3
    //                 }
    //             }
    //         })
    //     }
    // };
    // owl_carousel_custom_recent.init();

    var owl_carousel_custom_testimonial = {
        init: function () {
            var recent = $('.testimonial-slider');
            recent.owlCarousel({
                items: 4,
                dots: false,
                loop: true,
                margin: 60,
                nav: false,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: false,
                responsive: {
                    320: {
                        items: 1,
                        margin: 25,
                    },
                    575: {
                        items: 2,
                        margin: 25,
                    },
                    1070: {
                        items: 3,
                        margin: 25,
                    },
                    1600: {
                        items: 4
                    },
                }
            })
        }
    };
    owl_carousel_custom_testimonial.init();

    var owl_carousel_custom_price = {
        init: function () {
            var recent = $('.price-slider');
            recent.owlCarousel({
                items: 2,
                dots: false,
                loop: true,
                margin: 60,
                nav: false,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: false,
                responsive: {
                    320: {
                        items: 1,
                        margin: 25,
                    },

                    601: {
                        items: 2,
                        margin: 25,
                    },
                    1070: {
                        items: 2,
                        margin: 25,
                    },
                    1600: {
                        items: 2
                    },
                }
            })
        }
    };
    owl_carousel_custom_price.init();

    var owl_carousel_custom_team = {
        init: function () {
            var recent = $('.team-slider');
            recent.owlCarousel({
                items: 2,
                dots: false,
                loop: true,
                margin: 20,
                nav: false,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: false,
                responsive: {
                    320: {
                        items: 1
                    },
                    1199: {
                        items: 2
                    },
                }
            })
        }
    };
    owl_carousel_custom_team.init();

    var owl_carousel_custom_testimonial = {
        init: function () {
            var recent = $('.counter-slider');
            recent.owlCarousel({
                items: 4,
                dots: false,
                loop: true,
                margin: 60,
                nav: false,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: false,
                responsive: {
                    320: {
                        items: 1,
                        margin: 25,
                    },
                    480: {
                        items: 2,
                        margin: 25,
                    },
                    575: {
                        items: 3,
                        margin: 25,
                    },
                    768: {
                        items: 4,
                        margin: 25,
                    },
                    1600: {
                        items: 4
                    },
                }
            })
        }
    };
    owl_carousel_custom_testimonial.init();

    /*=====================
         04. Chitchat Loder js
         ==========================*/
    $('.chitchat-loader').slideUp('slow', function () {
        $(this).remove();
    });

    /*=====================
         05. Search js
         ==========================*/
    $('.search').on('click', function (e) {
        $(this).siblings().toggleClass("open");
    });
    $('.close-search').on('click', function (e) {
        $(this).parent().parent().removeClass("open");
    });
    $('.search-right').on('click', function (e) {
        $(this).parent().parent().parent().parent().parent().parent().find(".form-inline").toggleClass("open");
    });
    $('.close-search').on('click', function (e) {
        $(this).parent().parent().removeClass("open");
    });

    /*=====================
         06. Mute js
         ==========================*/
    $('.mute').on('click', function (e) {
        $(this).children().toggleClass("off");
    });

    /*=====================
         07. Button Effect js
         ==========================*/
    $('.button-effect').on('click', function (e) {
        e.preventDefault();
        var self = $(this),
            wave = '.effect-wave',
            btnWidth = self.outerWidth(),
            x = e.offsetX,
            y = e.offsetY;
        self.prepend('<span class="effect-wave"></span>')
        $(wave)
            .css({
                'top': y,
                'left': x
            })
            .animate({
                opacity: '0',
                width: btnWidth * 2,
                height: btnWidth * 2
            }, 500, function () {
                self.find(wave).remove()
            })
    })

    /*=====================
         08. Collapse Title js
         ==========================*/
    $('.block-title').on('click', function (e) {
        e.preventDefault;
        var speed = 300;
        var thisItem = $(this).parent(),
            nextLevel = $(this).next('.block-content');
        if (thisItem.hasClass('open')) {
            thisItem.removeClass('open');
            nextLevel.slideUp(speed);
        } else {
            thisItem.addClass('open');
            nextLevel.slideDown(speed);
        }
    });

    /*=====================
         09. Refresh Request information next & previous button
         ==========================*/
    $('.refresh').on('click', function (e) {
        $(this).toggleClass('refreshed');
    });
    $('.req-info').on('click', function (e) {
        $(this).addClass('disabled');
    });
    $('.next').on('click', function (e) {
        $(this).parent().parent().siblings().addClass('open');
    });
    $('.previous').on('click', function (e) {
        $(this).parent().parent().parent().removeClass('open');
    });

    $('.chat-cont-toggle').on('click', function (e) {
        // let className = $('#myTab .nav-item .nav-link.active').attr('id').split('-')[0];
        let className = 'chat';
        $(`.chat-cont-setting:not(.${className})`).removeClass('open');
        $(`.chat-cont-setting.${className}`).toggleClass('open');
    });




    /*=====================
          10 .Full Screen
          ==========================*/

    $('.toggle-full-screen').on('click', function (e) {
        $('#videocall').toggleClass("active");
    })

    /*=====================
          11.Header fix
          ==========================*/
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 60) {
            $(".landing-header").addClass("fixed");
        } else {
            $(".landing-header").removeClass("fixed");
        }
    });
    /*=====================
      12.Tap on Top
      ==========================*/
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 600) {
            $('.tap-top').fadeIn();
        } else {
            $('.tap-top').fadeOut();
        }
    });
    $('.tap-top').on('click', function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    /*=====================
           13. Customizer
           ==========================*/
    // $('<div class="sidebar-pannle-main"><ul><li class="rtl-setting icon-btn btn-primary">RTL</li><li class="cog-click icon-btn btn-success" ><i class="fa fa-cog"></i></li></ul></div> <section class="setting-sidebar"><div class="theme-title"><div class="media"><div><h2>Customizer</h2><h4>Real Time Customize</h4></div><div class="media-body"><a class="icon-btn btn-outline-light button-effect pull-right cog-close" href="#"><i class="fa fa-close"></i></a></div></div></div><div class="color-picker"><h5>Choose color</h5><ul class="colors"><li class="color active" data-attr="style"></li><li class="color1" data-attr="style1"></li><li class="color2" data-attr="style2"></li><li class="color3" data-attr="style3"></li><li class="color4" data-attr="style4"></li><li class="color5" data-attr="style5"></li><li class="color6" data-attr="style6"></li></ul></div><div class="theme-layout"><h5>Layout</h5><ul><li class="active" data-attr=""><div class="sidebar"></div><div class="sidebar-content"></div></li><li data-attr="dark-sidebar"><div class="sidebar"></div><div class="sidebar-content"></div></li><li data-attr="dark"><div class="sidebar"></div><div class="sidebar-content"></div></li><li data-attr="colorfull"><div class="sidebar"></div><div class="sidebar-content"></div></li></ul></div><div class="chat-wallpaper"><h5>Chat wallpaper</h5><ul class="wallpaper"><li class="bg-color bg-default active"></li><li class="bg-size" style="background-image: url("/chat/images/wallpaper/2.jpg"); background-size: cover; background-position: center center; display: block;"><img class="bg-img" src="/chat/images/wallpaper/2.jpg" alt="Avatar" style="display: none;"></li><li class="bg-size" style="background-image: url("/chat/images/wallpaper/3.jpg"); background-size: cover; background-position: center center; display: block;"><img class="bg-img" src="/chat/images/wallpaper/3.jpg" alt="Avatar" style="display: none;"></li><li class="bg-size" style="background-image: url("/chat/images/wallpaper/4.jpg"); background-size: cover; background-position: center center; display: block;"><img class="bg-img" src="/chat/images/wallpaper/4.jpg" alt="Avatar" style="display: none;"></li><li class="bg-size" style="background-image: url("/chat/images/wallpaper/5.jpg"); background-size: cover; background-position: center center; display: block;"><img class="bg-img" src="/chat/images/wallpaper/5.jpg" alt="Avatar" style="display: none;"></li><li class="bg-size" style="background-image: url("/chat/images/wallpaper/1.jpg"); background-size: cover; background-position: center center; display: block;"><img class="bg-img" src="/chat/images/wallpaper/1.jpg" alt="Avatar" style="display: none;"></li> <br><li class="bg-color grediant-1"></li><li class="bg-color grediant-2"></li><li class="bg-color grediant-3"></li><li class="bg-color grediant-4"></li><li class="bg-color grediant-5"></li><li class="bg-color grediant-6"></li></ul></div><div class="sidebar-setting"><h5>Sidebar</h5><ul><li class="active three-column"><div class="sm-sidebar"></div><div class="sidebar"></div><div class="sidebar-content"></div></li><li class="two-column"><div class="sidebar"></div><div class="sidebar-content"></div></li></ul></div> </section>').appendTo($('body'));
    $('.cog-click').on('click', function () {
        $('.setting-sidebar').css("right", "0px");
    });
    $(".cog-close").on('click', function () {
        $('.setting-sidebar').css("right", "-400px");
    });
    $(".theme-layout li").on('click', function () {
        $(".theme-layout li").removeClass('active');
        $(this).addClass("active");
        var themeLayout = $(this).attr("data-attr");
        $("body").attr("class", themeLayout);
    });
    var body_event = $("body");
    body_event.on("click", ".rtl-setting", function () {
        $(this).toggleClass('rtl');
        $('body').removeClass('rtl');
        if ($('.rtl-setting').hasClass('rtl')) {
            $('.rtl-setting').text('LTR');
            $('body').addClass('rtl');
        } else {
            $('.rtl-setting').text('RTL');
        }
        return false;
    });
    body_event.on("click", ".themes-content li", function () {
        $(this).addClass('active').siblings().removeClass('active');
        $color = $(this).attr("data-attr");
        $("#color").attr("href", "/chat/css/" + $color + ".css");
        return false;
    });

    /*=====================
    14 footer responsive js
    ==========================*/
    var contentwidth = jQuery(window).width();
    if ((contentwidth) < '768') {
        jQuery('.footer-title h3').append('<span class="according-menu"></span>');
        jQuery('.footer-title').on('click', function () {
            jQuery('.footer-title').removeClass('active');
            jQuery('.footer-contant').slideUp('normal');
            if (jQuery(this).next().is(':hidden') == true) {
                jQuery(this).addClass('active');
                jQuery(this).next().slideDown('normal');
            }
        });
        jQuery('.footer-contant').hide();
    } else {
        jQuery('.footer-contant').show();
    }
    /*=====================
        15. Pin box
        ==========================*/
    $('.ti-pin2').on('click', function () {
        $(this).parent().parent().parent().toggleClass('pined');
    });

    /*=====================
        16 Reminder
        ==========================*/
    $(".reminder-count li").on('click', function () {
        $('.reminder-count li').removeClass('active');
        $(this).addClass('active');
    });

    $('.Show-reminder').on('click', function (e) {
        $('.target-reminder-list').show(500);
        $('.Show-reminder').hide(0);
        $('.Hide-reminder').show(0);
    });
    $('.Hide-reminder').on('click', function (e) {
        $('.target-reminder-list').hide(500);
        $('.Show-reminder').show(0);
        $('.Hide-reminder').hide(0);
    });
    $('.toggle').on('click', function (e) {
        $('.target-reminder-list').toggle('slow');
    });

    /*=====================
        17 set wallpaper onclick
        ==========================*/
    $('.wallpaper li.bg-color').on('click', function () {
        var color = $(this).css('background-image');
        $(".wallpaper li").removeClass('active');
        $(this).addClass("active");
        $(".chitchat-main .messages").css({
            'background-image': color,
            'background-blend-mode': 'unset',
        });
    });
    $('.wallpaper li.bg-size').on('click', function () {
        var color = $(this).children(".bg-img").attr('src');
        $(".wallpaper li").removeClass('active');
        $(this).addClass("active");
        $(".chitchat-main .messages").css({
            'background-image': 'url(' + color + ')',
            'background-color': 'transparent'
        });
    });

    /*=====================
        18 custom tab
        ==========================*/
    $(".contact-log-main li , .call-log-main li").on('click', function () {
        $(this).parent().find("li").removeClass("active");
        $(this).addClass("active");
    });
    $("#myTab1 li a").on('click', function () {
        var active_class = $(this).attr("data-to");
        $('.messages.custom-scroll').removeClass("active");
        $('#' + active_class).addClass("active");
    });
    $(".chat-tabs .nav-tabs li[data-to]").on('click', function () {
        $('.chitchat-main .tabto').removeClass("active");
        var active_class = $(this).attr("data-to");
        $('.' + active_class).addClass("active");
    });
    $(".sidebar-top a, .balance").on('click', function () {
        //phone number setting
        // iti.setCountry(userData.national);
        // $("#phone").intlTelInput("selectCountry", userData.national);
        // $("#phone").intlTelInput("setNumber", userData.phone_number.replace(/[^0-9]/g, ''));
        // $("#phone").val(userData.phone_number);
        iti.setNumber(currentUserInfo.phone_number);
        // $("#phone").val(userData.phone_number);

        // close left nav
        $(".main-nav").removeClass("on");


        $('.smsTestBtns .btn').removeClass('active');
        $(`.smsTestBtns .btn:nth-child(${currentUserInfo.sms_type})`).addClass('active');

        $(".sidebar-top  a").removeClass("active");
        $(this).addClass("active");
        $('.dynemic-sidebar').removeClass("active");
        var active_class = $(this).attr("href");
        $('#' + active_class).addClass("active");

    });


    /*=====================
      22. toggle classes
      ==========================*/
    $('.mobile-sidebar').on('click', function () {
        $('.chitchat-container').toggleClass("mobile-menu");
    });
    $('.chat-main .chat-box').on('click', function () {
        $('.chitchat-container').toggleClass("mobile-menu");
    });
    $('.group-main .group-box').on('click', function () {
        $('.chitchat-container').toggleClass("mobile-menu");
    });
    $('.call-log-main .call-box').on('click', function () {
        $('.chitchat-container').toggleClass("mobile-menu");
    });
    $('.contact-log-main .contact-box').on('click', function () {
        $('.chitchat-container').toggleClass("mobile-menu");
    });

    $('.mobile-back').on('click', function () {
        $('.chitchat-container').toggleClass("mobile-menu");
        $('.main-nav').removeClass("on");
    });


    $('.chat-friend-toggle').on('click', function () {
        $('.chat-frind-content').toggle();
        let owner = $('#myTabContent1 .tab-pane.active .chat-main>li.active').attr('owner');
        let admins = $('#myTabContent1 .tab-pane.active .chat-main>li.active').attr('admins');
        if (currentUserId == owner) {
            $('.chat-frind-content').find('.edit_group_profile_btn').removeClass('hidden');
        } else {
            $('.chat-frind-content').find('.edit_group_profile_btn').addClass('hidden');
        }
        if (admins.split(',').includes(currentUserId.toString())) {
            $('.chat-frind-content').find('.add_users_btn').removeClass('hidden');
            $('.chat-frind-content').find('.remove_group_btn').removeClass('hidden');
        } else {
            $('.chat-frind-content').find('.add_users_btn').addClass('hidden');
            $('.chat-frind-content').find('.remove_group_btn').addClass('hidden');
        }
    });

    $('#direct ul.chat-main, #group ul.chat-main, #cast ul.chat-main').on('click', '.thread_info', function (e) {
        e.stopPropagation();
        $(this).find('.thread_info_content').toggle();
        setTimeout(() => {
            $(this).find('.thread_info_content').hide();
        }, 2000)
    });

    $('.gr-chat-friend-toggle').on('click', function () {
        $('.gr-chat-frind-content').toggle();
    });
    // $('.chatappend').on('click', '.msg-setting-main', function(event) {
    //     event.stopPropagation();
    //     $(this).find('.msg-dropdown-main').toggle();
    // });
    $('.chatappend').on('click', '.msg-setting', function (event) {
        event.stopPropagation();
        $(this).siblings('.msg-dropdown').toggle();
    });

    $('.chatappend').on('click', '.msg-dropdown li', function (event) {
        $(this).closest('.msg-dropdown').hide();
    });

    $(".favourite").on('click', function () {
        $(this).toggleClass("btn-outline-primary").toggleClass("btn-primary");
    });
    $(".edit-btn").on('click', function () {
        if ($('.profile-edit-save-form').hasClass('open')) {
            // changeProfileInfo();
            var form_data = new FormData();
            let username = $(this).parents('.media').find('input.username').val();
            let location = $(this).parents('.media').find('input.location').val();
            let description = $(this).parents('.media').find('textarea.description').val();
            form_data.append('username', username);
            form_data.append('location', location);
            form_data.append('description', description);
            form_data.append('avatar', $('#profileImageUploadBtn')[0].files[0] || null);
            $.ajax({
                url: '/home/saveProfileInfo',
                headers: {
                    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                },
                data: form_data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                dataType: "json",
                success: function (res) {
                    $('#settings .details.edit .text-danger').text('');
                    if (res.update == true) {
                        $('.profile-edit-save-form').removeClass("open");

                        $('#settings .profile-box .details .setting__profile--name').html(username);
                        $('#settings .profile-box .details .setting__profile--location').html(location);
                        $('#settings .profile-box .details .setting__profile--description').html(description);
                    }
                    $('#profileImageUploadBtn').css('pointer-events', 'none');
                },
                error: function (response) {
                    console.log(response)
                    $('#settings .details.edit .text-danger').text(response.responseJSON.errors.username[0]);
                }
            });
        } else {
            $(this).parent().parent().addClass("open");
            $('#profileImageUploadBtn').css('pointer-events', '');

        }
    });

    /*=====================
        23. ADD tO-DO LIST
        ==========================*/

    $('.add').on('click', function (e) {
        var total_element = $(".element").length;
        var lastid = $(".element:last").attr("id");
        var split_id = lastid.split("_");
        var nextindex = Number(split_id[1]) + 1;
        var max = 100;
        if (total_element < max) {
            $(".element:last").after("<div class='element' id='div_" + nextindex + "'></div>");
            $("#div_" + nextindex).append("<form class='p-15'><div class='form-group' style='display :flex'><input type='checkbox' id='txt_" + nextindex + "'/><input type='text' class='m-l-15'/></div><div class='todo-buttons'><a class='badge badge-success font_label' href='#'' style='padding: 7px 12px'>Save</a><a class='badge badge-outline-primary font_label' href='#'' style='margin-left : 15px;padding: 7px 12px'>Cancel</a><span id='remove_" + nextindex + "' class='remove' style='margin-left : 40px'><i class='fa fa-trash' style='font-size : 20px'></i></span></div></form>");
        }
    });
    $('.todo-list').on('click', '.remove', function () {
        var id = this.id;
        var split_id = id.split("_");
        var deleteindex = split_id[1];
        $("#div_" + deleteindex).remove();
    });

    $('.trashbtn').on('click', function (e) {
        $(".todo-main-content .default-form").remove();
    });

    /*=====================
           24. right sidebar
           ==========================*/
    $(".app-list-ul  a").on('click', function () {
        $(".app-list-ul  a").removeClass("active");
        if ($(window).width() >= 1500) {
            $(".chitchat-main").removeClass("small-sidebar");
        }
        $(this).addClass("active");
        $('.apps-ul li').removeClass("active");
        var active_class = $(this).attr("href");
        $('#' + active_class).addClass("active");
    });

    $('.apps-toggle').on('click', function () {
        // if (!$('body').hasClass('sidebar-active main-page menu-active'))
        //     $('body').toggleClass('sidebar-active main-page');
        // $('body').removeClass('menu-active');
        // $('.app-sidebar').toggleClass('active');
        // $('.chitchat-main').toggleClass("small-sidebar");
    });



    /*=====================
           27. profile open close
           ==========================*/
    $('.close-profile').on('click', function (e) {
        if ($('#profile_modal').hasClass('show')) {
            $('#profile_modal').modal('hide');
        } else {
            $('body').removeClass('menu-active'); //add class
            // $('.app-sidebar').addClass('active'); //remove
            $('.chitchat-main').addClass("small-sidebar"); //remove
        }
    });

    $('.menu-trigger').on('click', function (e) {
        let userId;
        if ($('.messages.active').attr('id') == 'direct_chat') {
            userId = $(this).attr('key')
            setProfileData(userId);
            $('#profile_modal').modal('show');
        } else {
            openAndCloseProfile();
        }
    });

    $('.self_profile_btn').on('click', function () {
        let userId = currentUserId;
        setProfileData(userId);
        $('#profile_modal').modal('show');
    });

    $('#custom_modal').on('click', '.chat-main li.user_item', function (event) {
        event.stopPropagation()
        let userId = $(this).closest('li').attr('key');
        setProfileData(userId);
        $('#profile_modal').modal('show');
    });

    $('.recent-chat').on('click', '.item', function () {
        let userId = $(this).attr('key');
        setProfileData(userId);
        $('#profile_modal').modal('show');
    });


    /*=====================
           28. dropdown
           ==========================*/

    $('.dropdown').click(function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).find('.dropdown-menu').slideToggle(300);
    });
    $('.dropdown').focusout(function () {
        $(this).removeClass('active');
        $(this).find('.dropdown-menu').slideUp(300);
    });
    $('.dropdown .dropdown-menu li').click(function () {
        $(this).parents('.dropdown').find('span').text($(this).text());
        $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
    });

    /*=====================
        29. Sidebar setting
        ==========================*/

    $(".sidebar-setting .two-column").on('click', function () {
        $(".sidebar-setting li").removeClass('active');
        $(this).addClass("active");
        $('.theme-title .icon-btn').removeClass("btn-outline-light").removeClass("btn-outline-primary");
        $('.main-nav').removeClass("on");
    });
    $(".sidebar-setting .three-column").on('click', function () {
        $(".sidebar-setting li").removeClass('active');
        $(this).addClass("active");
        $('.theme-title .icon-btn').addClass("btn-outline-light").addClass("btn-outline-primary");
        $('.main-nav').addClass("on");
    });

    /*=====================
        Chat 
        ==========================*/

    $('.submit').on('click', function () {
        newMessage();
    });
    $('.message-input input').on('keydown', function (e) {
        if (e.which == 13) {
            if (!e.target.value) {
                return false
            }
            newMessage();
            return false;
        }
    });



    $('#send-msg').addClass('disabled').attr("disabled", "disabled")
    $("#setemoj").keyup(function (e) {

        if (!e.target.value) {
            $('#send-msg').addClass('disabled').attr("disabled", "disabled")
        } else {
            $('#send-msg').removeClass('disabled').removeAttr("disabled")
        }
    });


    /*=====================
       25. Sticker
       ==========================*/
    $('.sticker-contain ul li').on('click', function (e) {
        var sticker = $(this).children().html();
        $('<li class="replies"> <div class="media"> <div class="profile mr-4 bg-size" style="background-image: url("/chat/images/contact/1.jpg"); background-size: cover; background-position: center center;"></div><div class="media-body"> <div class="contact-name"> <h5>Alan josheph</h5> <h6>01:42 AM</h6> <ul class="msg-box"> <li> <h5>' + sticker + '</h5> </li></ul> </div></div></div></li>').appendTo($('.messages .chatappend'));
        $('.chat-main .active .details h6').html('<span>You : </span>' + sticker);
        var test = $(this).height();
        $(".messages").animate({

            scrollTop: $(document).height()
        }, "fast");
        $(".sticker-contain").removeClass("open");
        $(".toggle-sticker").removeClass("active");
    });

    // Toggle sticker
    $('.toggle-sticker').on('click', function () {
        $(this).toggleClass("active");
        $('.sticker-contain').toggleClass("open");
        $('.emojis-contain').removeClass("open");
        $(".toggle-emoji").removeClass("active");
        $('.contact-poll-content').css('display', 'none');
    });

    // Toggle emoji
    $('.toggle-emoji').on('click', function (e) {
        e.stopPropagation();
        $(this).toggleClass("active");
        $('.emojis-contain').toggleClass("open");
        $(".sticker-contain").removeClass("open");
        $(".toggle-sticker").removeClass("active");
        $('.contact-poll-content').css('display', 'none');
        // create blink modal open
        if ($('.emojis-contain').hasClass('open')) {
            showSavedBlinks(currentUserId);
        }
    });

    $(".emojis-sub-contain ul").on('click', '.saved_blink_img', (e) => {
        e.stopPropagation();
        let blinkId = $(e.target).closest('li').attr('key');
        $(".emojis-contain").removeClass("open");
        $('#createPhoto').modal('show');
        showBlinkData(blinkId);
    });

    $(".emojis-sub-contain ul").on('click', '.close_icon', (e) => {
        e.stopPropagation();
        let blinkId = $(e.target).closest('li').attr('key');
        removeSavedBlink(blinkId);
    });

    function showSavedBlinks(userId) {
        var form_data = new FormData();
        form_data.append('userId', userId);
        $('.emojis-contain .spining').css('display', 'flex');

        $.ajax({
            url: '/home/showSavedBlinks',
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            data: form_data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            dataType: "json",
            success: function (res) {
                if (res.state == 'true') {
                    let target = '.emojis-sub-contain ul';
                    $(target).empty();
                    res.data.forEach(item => {
                        $(target).append(`
                            <li class="saved_blink_item" key=${item.id}>
                                <img class="saved_blink_img" src=${item.photo} />
                                <span class="close_icon">×</span>
                            </li>
                        `);
                    });
                    $('.emojis-contain .spining').css('display', 'none');

                }

            },
            error: function (response) {

            }
        });
    }

    function removeSavedBlink(blinkId) {
        var form_data = new FormData();
        form_data.append('blinkId', blinkId);
        $.ajax({
            url: '/home/removeSavedBlink',
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            data: form_data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            dataType: "json",
            success: function (res) {
                if (res.state == 'true') {
                    let target = `.emojis-sub-contain ul li.saved_blink_item[key=${blinkId}]`;
                    $(target).remove();
                }

            },
            error: function (response) {

            }
        });
    }

    // Toggle poll
    $('.contact-poll').on('click', function (e) {
        $('.contact-poll-content').toggle();
        $('.emojis-contain').removeClass("open");
        $(".toggle-emoji, .toggle-sticker").removeClass("active");
    });

    // Outside click
    $(document).on('click', function (e) {
        let target = $('.emojis-contain');
        if (!target.is(e.target) && target.has(e.target).length == 0) {
            $(".emojis-contain").removeClass("open");
        }
        var outside_space = $(".outside");
        if (!outside_space.is(e.target) &&
            outside_space.has(e.target).length === 0) {
            $(".sticker-contain").removeClass("open");
            // $(".emojis-contain").removeClass("open");
            $(".toggle-emoji, .toggle-sticker").removeClass("active");
            $('.contact-poll-content').css('display', 'none');
            $('.chat-frind-content').css('display', 'none');
        }
    });

    $(".mode").on("click", function () {
        $('.mode i').toggleClass("fa-moon-o").toggleClass("fa-lightbulb-o");
        $('body').toggleClass("dark");
    });
    $(".mainnav").on("click", function () {
        $('.theme-title .icon-btn').toggleClass("btn-outline-light").toggleClass("btn-outline-primary");
        $('.main-nav').toggleClass("on");
    });

    $(".close-apps").on("click", function () {
        $('.apps-ul li').removeClass("active");
        $('.chitchat-main').addClass("small-sidebar");
    });

    $(".close-app").on("click", function () {
        $('body').removeClass("sidebar-active");
        $('.app-sidebar').removeClass("active");
    });

    $(".close-panel").on("click", function () {
        $('.dynemic-sidebar, .button-effect.active:not(#myTab .button-effect):not(#myTab1 .button-effect), sidebar-top .sidebar-top > li > a').removeClass("active");
        $('.recent-default').addClass("active");
    });

    $("body").on("click", ".colors li", function () {
        $(this).addClass('active').siblings().removeClass('active');
        var $color = $(this).attr("data-attr");
        $("#color").attr("href", "/chat/css/" + $color + ".css");
        return false;
    });

})(jQuery);

// show new Profile 
function setProfileData(userId) {
    $('.chitchat-right-sidebar .contact-profile .group_operation').hide();
    new Promise((resolve) => getAvailableUsers(resolve)).then((contactList) => {
        contactList.find(item => item.id == userId) ? $('#profile_modal .open_chat_btn').show() : $('#profile_modal .open_chat_btn').hide();
    });
    let userInfo = getCertainUserInfoById(userId)

    if (userInfo.avatar) {
        $('#profile_modal .contact-top').html(`<img class="bg-img" src="v1/api/downloadFile?path=${userInfo.avatar}" alt="Avatar" />`)
    } else {
        $('#profile_modal .contact-top').html(getNameStr(userInfo.username))
        $('#profile_modal .contact-top').css('background-image', 'none')
    }

    convertListItems();
    $('#profile_modal .contact-profile').attr('userId', userId);
    $('#profile_modal .profile-username').html(userInfo.login_name);
    $('#profile_modal .contact-profile .name').html(userInfo.username);
    $('#profile_modal .contact-profile .location').html(userInfo.location);
    $('#profile_modal .contact-profile .description').html(userInfo.description);

    if (isFollowing(userId)) {
        $('#profile_modal .contact-profile .follow_btn .btn').text('UnFollow');
        $('#profile_modal .contact-profile .follow_btn .btn').removeClass('btn-success');
        $('#profile_modal .contact-profile .follow_btn .btn').addClass('btn-danger');
    } else {
        $('#profile_modal .contact-profile .follow_btn .btn').text('Follow');
        $('#profile_modal .contact-profile .follow_btn .btn').removeClass('btn-danger');
        $('#profile_modal .contact-profile .follow_btn .btn').addClass('btn-success');
    }

    let directGroupId = getDirectGroupId(userId);
    // Notification and Block Switch Status
    let form_data1 = new FormData();
    // form_data1.append('userId', userId);
    form_data1.append('groupId', directGroupId);
    $.ajax({
        url: '/group/getGroupInfo',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        data: form_data1,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        dataType: "json",
        success: function (res) {
            let { data } = res;
            if (data) {
                let notificationState = data.notification ? true : false;
                notificationSwitch.checked = notificationState;
                toggleSwitchery(notificationSwitch, notificationSwitchery)
            }
            let blockState = blockGroupList.includes(directGroupId) ? true : false;
            blockSwitch.checked = blockState;
            toggleSwitchery(blockSwitch, blockSwitchery)
        },
        error: function (response) { }
    });

    // Show Rate Data 
    var form_data = new FormData();
    form_data.append('userId', userId);
    $.ajax({
        url: '/home/getRateData',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        dataType: "json",
        success: function (res) {
            if (res.state == 'true') {
                setProfileRateData(res.rateData);
            }
        },
        error: function (response) { }
    });

    showSharedMedia(directGroupId)
}

function setProfileRateData(data) {
    if (data.length) {
        var textRate = data.filter(item => item.kind == 0).map(item => item.rate).reduce((cur, item, index, arr) => cur + (item / arr.length), 0) || 0;
        var photoRate = data.filter(item => item.kind == 2).map(item => item.rate).reduce((cur, item, index, arr) => cur + (item / arr.length), 0) || 0;
        var videoRate = 0;
        var audioRate = 0;
        var videoCallRate = 0;
        var voiceCallRate = 0;
        var averageRate = data.map(item => item.rate).reduce((cur, item, index, arr) => cur + (item / arr.length), 0) || 0;
    } else {
        var textRate = 0;
        var photoRate = 0;
        var videoRate = 0;
        var audioRate = 0;
        var videoCallRate = 0;
        var voiceCallRate = 0;
        var averageRate = 0;
    }
    let count = data.length || '';
    $('#profile_modal .profile_rating_list .badge').text(count);
    getContentRate('#profile_modal .contact-profile', Math.round(averageRate));
    document.querySelector('#profile_modal .contact-profile .photoRating')._tippy.setContent(averageRate.toFixed(2))

    getContentRate('#profile_modal .content-rating-list .text-rating', Math.round(textRate));
    getContentRate('#profile_modal .content-rating-list .photo-rating', Math.round(photoRate));
    getContentRate('#profile_modal .content-rating-list .video-rating', Math.round(videoRate));
    getContentRate('#profile_modal .content-rating-list .audio-rating', Math.round(audioRate));
    getContentRate('#profile_modal .content-rating-list .video-call-rating', Math.round(videoCallRate));
    getContentRate('#profile_modal .content-rating-list .voice-call-rating', Math.round(voiceCallRate));
    document.querySelector('#profile_modal .content-rating-list .text-rating')._tippy.setContent(textRate.toFixed(2))
    document.querySelector('#profile_modal .content-rating-list .photo-rating')._tippy.setContent(photoRate.toFixed(2))
    document.querySelector('#profile_modal .content-rating-list .video-rating')._tippy.setContent(videoRate.toFixed(2))
    document.querySelector('#profile_modal .content-rating-list .audio-rating')._tippy.setContent(audioRate.toFixed(2))
    document.querySelector('#profile_modal .content-rating-list .video-call-rating')._tippy.setContent(videoCallRate.toFixed(2))
    document.querySelector('#profile_modal .content-rating-list .voice-call-rating')._tippy.setContent(voiceCallRate.toFixed(2))
}

function toggleSwitchery(switchElement, swicheryElement) {
    // Destroy any existing Switchery instance on the switch element
    if (switchElement.nextElementSibling !== null && switchElement.nextElementSibling.classList.contains('switchery')) {
        switchElement.parentNode.removeChild(switchElement.nextElementSibling);
    }

    // Create a new Switchery instance on the switch element
    swicheryElement = new Switchery(switchElement, { color: '#1c9dea', size: 'small' });
}