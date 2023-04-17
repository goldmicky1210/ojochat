<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0,minimal-ui">
    <meta name="description" content="Chit,Chat">
    <meta name="keywords" content="Chit,Chat">
    <meta name="author" content="DongLong Cui">

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }}</title>


    <link rel="icon" href="/chat/images/favicon/favicon.png" type="image/x-icon">
    <link rel="shortcut icon" href="/chat/images/favicon/favicon.png" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800&amp;display=swap"
        rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,600&amp;display=swap" rel="stylesheet">
    <link
        href="https://fonts.googleapis.com/css?family=Rubik:300,300i,400,400i,500,500i,700,700i,900,900i&amp;display=swap"
        rel="stylesheet">
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
    <style>
        input.form-control::placeholder {
            opacity: 0.5;
        }

        .passwordInput {
            display: flex;
            align-items: center;
        }

        .passwordInput .fa {
            margin-left: -28px;
            font-size: 18px;
            cursor: pointer;
        }
    </style>
    <script src="/chat/js/jquery-3.3.1.min.js"></script>
    <script src="/frontend/js/constant.js"></script>
    <script>
        $(document).ready(() => {
            $('.passwordInput i').on('click touchstart touchend', function(e) {
                let target = $(this).siblings('input');
                $(this).toggleClass('fa-eye');
                $(this).toggleClass('fa-eye-slash');
                if (target.attr('type') == 'password') {
                    target.attr('type', 'text');
                } else {
                    target.attr('type', 'password');
                }
            });
        });
    </script>
</head>

<body>
    @yield('content')
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
</body>

</html>
