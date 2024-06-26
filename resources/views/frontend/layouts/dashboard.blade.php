@include('frontend.tracking')
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0,minimal-ui">
    <meta name="description" content="OJOchat.com: chat, snap, set, send & reveal disposable emojis">
    <meta name="keywords" content="OJO,Chat">
    <meta name="author" content="DongLong Cui">

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Ojochat') }}</title>

    <link rel="icon" href="/chat/images/favicon/favicon.svg" type="image/x-icon">
    <link rel="shortcut icon" href="/chat/images/favicon/favicon.svg" type="image/x-icon">

    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800&amp;display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,500,600&amp;display=swap">
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Rubik:300,300i,400,400i,500,500i,700,700i,900,900i&amp;display=swap">

    <link rel="stylesheet" href="https://www.jquery-az.com/boots/css/bootstrap-colorpicker/bootstrap-colorpicker.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.16/css/intlTelInput.css">
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/3.8.4/css/dropzone.css"> -->

    <link rel="stylesheet" type="text/css" href="/chat/css/date-picker.css">
    <link rel="stylesheet" type="text/css" href="/chat/css/magnific-popup.css">
    <link rel="stylesheet" type="text/css" href="/chat/css/style.css" media="screen" id="color">
    <link rel="stylesheet" type="text/css" href="/chat/css/tour.css">
    <link rel="stylesheet" type="text/css" href="/chat/js/ckeditor/skins/moono-lisa/editor.css?t=HBDD">
    <link rel="stylesheet" type="text/css" href="/chat/js/ckeditor/plugins/scayt/skins/moono-lisa/scayt.css">
    <link rel="stylesheet" type="text/css" href="/chat/js/ckeditor/plugins/scayt/dialogs/dialog.css">
    <link rel="stylesheet" type="text/css" href="/chat/js/ckeditor/plugins/tableselection/styles/tableselection.css">
    <link rel="stylesheet" type="text/css" href="/chat/js/ckeditor/plugins/wsc/skins/moono-lisa/wsc.css">
    <link rel="stylesheet" type="text/css" href="/chat/js/ckeditor/plugins/copyformatting/styles/copyformatting.css">
    <link rel="stylesheet" type="text/css" href="/frontend/css/custom.css">
    <link rel="stylesheet" type="text/css" href="/frontend/css/checkoutmodal.css">
    <link rel="stylesheet" type="text/css" href="/frontend/css/star.css">
    <link rel="stylesheet" type="text/css" href="/frontend/css/pages/message.css">
    <link rel="stylesheet" type="text/css" href="/frontend/css/pages/group.css">
    <link rel="stylesheet" type="text/css" href="/frontend/css/pages/contextmenu.css">
    <link rel="stylesheet" type="text/css" href="/frontend/css/pages/profile.css">
    <link rel="stylesheet" type="text/css" href="/frontend/css/pages/setting.css">
    <link rel="stylesheet" type="text/css" href="/frontend/css/pages/menu.css">
    <link rel="stylesheet" type="text/css" href="/frontend/css/pages/payment.css">
    <link rel="stylesheet" type="text/css" href="/frontend/css/dropzone.basic.css">
    <link rel="stylesheet" type="text/css" href="/frontend/css/dropzone.css">
    @yield('tracking')
</head>

<body class="">
    <!-- <script src="https://code.jquery.com/jquery-latest.min.js"></script> -->
    <script src="/chat/js/jquery-3.3.1.min.js"></script>
    <!-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.js"></script>

    <script src="https://www.jquery-az.com/boots/js/bootstrap-colorpicker/bootstrap-colorpicker.js"></script>
    <!-- phone number select -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.16/js/intlTelInput.min.js"></script>
    <!-- {{-- emojis --}} -->
    <script src="https://cdn.jsdelivr.net/npm/emoji-button@0.6.0/dist/index.min.js"></script>

    <script src="/frontend/js/pages/fabric.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.2.0/socket.io.js"
        integrity="sha512-WL6WGKMPBiM9PnHRYIn5YEtq0Z8XP4fkVb4qy7PP4vhmYQErJ/dySyXuFIMDf1eEYCXCrQrMJfkNwKc9gsjTjA=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="/frontend/js/dropzone.js"></script>

    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/3.8.4/dropzone.min.js"></script> -->

    @yield('content')

    <script src="/chat/js/owl.carousel.js"></script>
    <script src="/chat/js/popper.min.js"></script>
    <script src="/chat/js/tippy-bundle.iife.min.js"></script>
    <script src="/chat/js/bootstrap.bundle.js"></script>
    <script src="/chat/js/switchery.js"></script>
    <script src="/chat/js/easytimer.min.js"></script>
    <script src="/chat/js/index.js"></script>
    <script src="/chat/js/feather-icon/feather.min.js"></script>
    <script src="/chat/js/feather-icon/feather-icon.js"></script>
    <script src="/chat/js/ckeditor/ckeditor.js"></script>
    <script src="/chat/js/ckeditor/styles.js"></script>
    <script src="/chat/js/ckeditor/adapters/jquery.js"></script>
    <script src="/chat/js/ckeditor/ckeditor.custom.js"></script>
    <script src="/chat/js/date-picker/datepicker.js"></script>
    <script src="/chat/js/date-picker/datepicker.en.js"></script>
    <script src="/chat/js/date-picker/datepicker.custom.js"></script>
    <script src="/chat/js/tour/intro.js"></script>
    <script src="/chat/js/tour/intro-init.js"></script>
    <script src="/chat/js/jquery.magnific-popup.js"></script>
    <script src="/chat/js/zoom-gallery.js"></script>


    <script src="/chat/js/script.js"></script>

    <!-- Start of Woopra Code -->
    <script>
        ! function() {
            var t, o, c, e = window,
                n = document,
                r = arguments,
                a = "script",
                i = ["call", "cancelAction", "config", "identify", "push", "track", "trackClick", "trackForm", "update",
                    "visit"
                ],
                s = function() {
                    var t, o = this,
                        c = function(t) {
                            o[t] = function() {
                                return o._e.push([t].concat(Array.prototype.slice.call(arguments, 0))), o
                            }
                        };
                    for (o._e = [], t = 0; t < i.length; t++) c(i[t])
                };
            for (e.__woo = e.__woo || {}, t = 0; t < r.length; t++) e.__woo[r[t]] = e[r[t]] = e[r[t]] || new s;
            (o = n.createElement(a)).async = 1, o.src = "https://static.woopra.com/js/w.js", (c = n.getElementsByTagName(a)[
                0]).parentNode.insertBefore(o, c)
        }("woopra");

        woopra.config({
            domain: "ojochat.com",
            outgoing_tracking: true,
            download_tracking: true,
            click_tracking: true
        });

        woopra.track();
    </script>
    <!-- End of Woopra Code -->
    <script async data-id="101452794" src="//static.getclicky.com/js"></script>
    <noscript><p><img alt="Clicky" width="1" height="1" src="//in.getclicky.com/101452794ns.gif" /></p></noscript>


</body>


</html>
