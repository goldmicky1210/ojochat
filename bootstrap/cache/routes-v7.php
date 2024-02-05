<?php

/*
|--------------------------------------------------------------------------
| Load The Cached Routes
|--------------------------------------------------------------------------
|
| Here we will decode and unserialize the RouteCollection instance that
| holds all of the route information for an application. This allows
| us to instantaneously load the entire route map into the router.
|
*/

app('router')->setCompiledRoutes(
    array (
  'compiled' => 
  array (
    0 => false,
    1 => 
    array (
      '/login' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'login',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'generated::L5BFj1sLFNAN8MqF',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/logout' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::ZAhkzsWzy9FezQHY',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'logout',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/register' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'register',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'generated::HRpbMWIKBRnEDFKG',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/password/reset' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'password.request',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'password.update',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/password/email' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'password.email',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/password/confirm' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'password.confirm',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'generated::1yHethZw3s2y3ie2',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/forgot' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'forgot',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'generated::YL8gBp4AjIUNyBdv',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/updatePassword' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::MjIkrZYbAPpnfcc7',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/send-email' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::0l82tpncxT9NDVdb',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/admin/login' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'admin_login',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'generated::NViANUXOOqJ6Yp8A',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/admin/logout' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::4PFCgApKi823MWmj',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'admin_logout',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/admin/forgot' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'admin_forgot',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'generated::iYbFaGW1ViO2OZZN',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/moralisfilter' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::slpP07fHph8CCyVR',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::yQkKjh6qICRT6Fsj',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'home',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/getRecentChatUsers' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::RlTHxDHKlPwzMePR',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/getCurrentGroupChatContent' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::JF3WCaXk2FvKB29n',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/getUsersList' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::UIPgrCCVsUM5MDgb',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/getCertainUserInfoById' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::7oFdhoKEHM8Dtgf7',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/getUsersForList' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::nw95WXpr2V79yWV2',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/getAvailableUsers' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::ER1wOqV3f8peRBvB',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/getUsersListByGroupId' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::XVy9zhr1PZeUsM1v',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/addContactItem' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::AOLM9eClwLSYF97u',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/getContactList' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::66XX4Fk9XZESr9cJ',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/getPendingContactList' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::c2dezByZLT5ELXiL',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/sendContactRequest' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::udk1VqdM0xg7QT54',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/removeContactRequest' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::sue2K8V3fJSgoAvl',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/sendMessage' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::6xPMWDetEB1h3zSj',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/saveProfileInfo' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::bZMZzpy0kAVTg1uj',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/getUploadFileURL' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::UK54SswXwK9eXXC6',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/getPhotoRequest' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::tAlWOUDhbAy6sJ7q',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/sendRequest' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::y8U7yMKai3c2b8QF',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/getPhotoData' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::b2wKfiLsNp9HduiL',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/setContentRate' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::xk8cORB3yNM5uxdX',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/getRateData' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::56u5t7VcUX2fmPmv',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/loadMoreMessages' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::gvIK7apexkfB5EIT',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/getCastData' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::Y1BRQ67x4c2C0J90',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/showSharedMedia' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::E8rR8rbaznTrpwhB',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/showSavedBlinks' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::1asurTMC7QXNXbum',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/removeSavedBlink' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::RWFRI2YNRv4r1m8w',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/getBlinkData' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::uVsUODY8s0l9ppLn',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/isContact' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::GHwAXBoS9G9ftw9Z',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/getPaymentHistories' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::K9zleSDpxjXOmuyS',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/home/getBlockList' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::nnLYhf6IWtMcic0U',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/message/getLastMessage' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::QHE0Hv2ZaEdb0fyJ',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/message/deleteConversation' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::YZsFnXnTI7DomdvA',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/create-paypal-transaction' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::S0pG8D7ZWpV40P1r',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/confirm-paypal-transaction' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::KkoeJfkjZHICtXaP',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/payment/sendWithdrawRequest' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::1SXCUEm2jBo6bNOW',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/payment/getWithdrawList' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::299FgMll4pFmlVJR',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/payment/withdraw' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::MYQRvNDd3lMpCAbU',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/stripe' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::EKyDhZV4k4hHgjRZ',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'stripe.post',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/setting/setPhoneNumber' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::uapNuoG2DIxgwpy6',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/setting/getPhoneNumber' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::mqfvRgdhmR4qEGMf',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/setting/setNotification' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::jCoUrUEpJct5gqIT',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/setting/setReadReceipts' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::O13WTtn5f4cgDSXq',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/setting/uploadBackgroundImage' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::VRQWl8hXHJM7iVAB',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/setting/deleteAccount' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::vpO0L8vnFlrOhKiM',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/message/deleteChatThread' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::ODESI9WBvWVZNbAi',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/message/deleteCastThread' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::nGoMOvIgST8ne8R6',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/message/deleteThread' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::ffFR5uyFgqVbByKY',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/message/getMessgageContentById' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::T8zm5gcjnN1yIqhD',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/group/inviteGroup' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::aIs7WLsFPaZov1e1',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/group/getGroupInfo' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::IBcTrd7gB9TnuZPY',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/group/getCertainGroupInfo' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::nrlLHWsklgGE1NPl',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/group/getContactorInfoByGroupId' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::Wc3bxTq1Jywo0WqV',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/group/getDirectGroupId' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::nR50jkhZNRoPi6Mb',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/profile/followUser' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::veGy9mxybb3TWBVR',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/profile/getFollowData' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::Std9ZgfIMLkbDaOm',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/profile/isFollow' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::CRlqN7k3KEwh3ukp',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/profile/getFollowList' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::YyK7xUMBQRHnxWBI',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/profile/setProfileSetting' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::Zi0SICXeGKFn1UNF',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/admin' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::QbXh0tulEHGRpGNs',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/admin/home' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'dashboard',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/developer' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::vNhsOqT9G49Xdvq1',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/v1/api/uploadFile' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::isll2NQsQwOYr4px',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/v1/api/downloadFile' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::utbK1pJBAjCV6jMW',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/v1/api/attachFiles' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::zruHAMdED9sluAzj',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
    ),
    2 => 
    array (
      0 => '{^(?|/password/reset/([^/]++)(*:31))/?$}sDu',
    ),
    3 => 
    array (
      31 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'password.reset',
          ),
          1 => 
          array (
            0 => 'token',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => NULL,
          1 => NULL,
          2 => NULL,
          3 => NULL,
          4 => false,
          5 => false,
          6 => 0,
        ),
      ),
    ),
    4 => NULL,
  ),
  'attributes' => 
  array (
    'login' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'login',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\AuthController@__invoke',
        'controller' => 'App\\Http\\Controllers\\AuthController',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'login',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::L5BFj1sLFNAN8MqF' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'login',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\AuthController@login',
        'controller' => 'App\\Http\\Controllers\\AuthController@login',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::L5BFj1sLFNAN8MqF',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::ZAhkzsWzy9FezQHY' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'logout',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\AuthController@logout',
        'controller' => 'App\\Http\\Controllers\\AuthController@logout',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::ZAhkzsWzy9FezQHY',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'register' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'register',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\AuthController@register',
        'controller' => 'App\\Http\\Controllers\\AuthController@register',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'register',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::HRpbMWIKBRnEDFKG' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'register',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\AuthController@register',
        'controller' => 'App\\Http\\Controllers\\AuthController@register',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::HRpbMWIKBRnEDFKG',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'password.request' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'password/reset',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\Auth\\ForgotPasswordController@showLinkRequestForm',
        'controller' => 'App\\Http\\Controllers\\Auth\\ForgotPasswordController@showLinkRequestForm',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'password.request',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'password.email' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'password/email',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\Auth\\ForgotPasswordController@sendResetLinkEmail',
        'controller' => 'App\\Http\\Controllers\\Auth\\ForgotPasswordController@sendResetLinkEmail',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'password.email',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'password.reset' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'password/reset/{token}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\Auth\\ResetPasswordController@showResetForm',
        'controller' => 'App\\Http\\Controllers\\Auth\\ResetPasswordController@showResetForm',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'password.reset',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'password.update' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'password/reset',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\Auth\\ResetPasswordController@reset',
        'controller' => 'App\\Http\\Controllers\\Auth\\ResetPasswordController@reset',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'password.update',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'password.confirm' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'password/confirm',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\Auth\\ConfirmPasswordController@showConfirmForm',
        'controller' => 'App\\Http\\Controllers\\Auth\\ConfirmPasswordController@showConfirmForm',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'password.confirm',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::1yHethZw3s2y3ie2' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'password/confirm',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\Auth\\ConfirmPasswordController@confirm',
        'controller' => 'App\\Http\\Controllers\\Auth\\ConfirmPasswordController@confirm',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::1yHethZw3s2y3ie2',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'forgot' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'forgot',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\AuthController@forgot',
        'controller' => 'App\\Http\\Controllers\\AuthController@forgot',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'forgot',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::YL8gBp4AjIUNyBdv' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'forgot',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\AuthController@forgot',
        'controller' => 'App\\Http\\Controllers\\AuthController@forgot',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::YL8gBp4AjIUNyBdv',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'logout' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'logout',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\AuthController@logout',
        'controller' => 'App\\Http\\Controllers\\AuthController@logout',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'logout',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::MjIkrZYbAPpnfcc7' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'updatePassword',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\AuthController@updatePassword',
        'controller' => 'App\\Http\\Controllers\\AuthController@updatePassword',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::MjIkrZYbAPpnfcc7',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::0l82tpncxT9NDVdb' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'send-email',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\TestEmailController@sendEmail',
        'controller' => 'App\\Http\\Controllers\\TestEmailController@sendEmail',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::0l82tpncxT9NDVdb',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'admin_login' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'admin/login',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\Admin\\AuthController@login',
        'controller' => 'App\\Http\\Controllers\\Admin\\AuthController@login',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'admin_login',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::NViANUXOOqJ6Yp8A' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'admin/login',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\Admin\\AuthController@login',
        'controller' => 'App\\Http\\Controllers\\Admin\\AuthController@login',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::NViANUXOOqJ6Yp8A',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::4PFCgApKi823MWmj' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'admin/logout',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\Admin\\AuthController@logout',
        'controller' => 'App\\Http\\Controllers\\Admin\\AuthController@logout',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::4PFCgApKi823MWmj',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'admin_forgot' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'admin/forgot',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\Admin\\AuthController@forgot',
        'controller' => 'App\\Http\\Controllers\\Admin\\AuthController@forgot',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'admin_forgot',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::iYbFaGW1ViO2OZZN' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'admin/forgot',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\Admin\\AuthController@forgot',
        'controller' => 'App\\Http\\Controllers\\Admin\\AuthController@forgot',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::iYbFaGW1ViO2OZZN',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'admin_logout' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'admin/logout',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\Admin\\AuthController@logout',
        'controller' => 'App\\Http\\Controllers\\Admin\\AuthController@logout',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'admin_logout',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::slpP07fHph8CCyVR' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'moralisfilter',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\ProfileController@getMoralisFilter',
        'controller' => 'App\\Http\\Controllers\\ProfileController@getMoralisFilter',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::slpP07fHph8CCyVR',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::yQkKjh6qICRT6Fsj' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => '/',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@index',
        'controller' => 'App\\Http\\Controllers\\HomeController@index',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::yQkKjh6qICRT6Fsj',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'home' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'home',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@index',
        'controller' => 'App\\Http\\Controllers\\HomeController@index',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'home',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::RlTHxDHKlPwzMePR' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/getRecentChatUsers',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@getRecentChatUsers',
        'controller' => 'App\\Http\\Controllers\\HomeController@getRecentChatUsers',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::RlTHxDHKlPwzMePR',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::JF3WCaXk2FvKB29n' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/getCurrentGroupChatContent',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@getCurrentGroupChatContent',
        'controller' => 'App\\Http\\Controllers\\HomeController@getCurrentGroupChatContent',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::JF3WCaXk2FvKB29n',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::UIPgrCCVsUM5MDgb' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/getUsersList',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@getUsersList',
        'controller' => 'App\\Http\\Controllers\\HomeController@getUsersList',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::UIPgrCCVsUM5MDgb',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::7oFdhoKEHM8Dtgf7' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/getCertainUserInfoById',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@getCertainUserInfoById',
        'controller' => 'App\\Http\\Controllers\\HomeController@getCertainUserInfoById',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::7oFdhoKEHM8Dtgf7',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::nw95WXpr2V79yWV2' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/getUsersForList',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@getUsersForList',
        'controller' => 'App\\Http\\Controllers\\HomeController@getUsersForList',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::nw95WXpr2V79yWV2',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::ER1wOqV3f8peRBvB' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/getAvailableUsers',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@getAvailableUsers',
        'controller' => 'App\\Http\\Controllers\\HomeController@getAvailableUsers',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::ER1wOqV3f8peRBvB',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::XVy9zhr1PZeUsM1v' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/getUsersListByGroupId',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@getUsersListByGroupId',
        'controller' => 'App\\Http\\Controllers\\HomeController@getUsersListByGroupId',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::XVy9zhr1PZeUsM1v',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::AOLM9eClwLSYF97u' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/addContactItem',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@addContactItem',
        'controller' => 'App\\Http\\Controllers\\HomeController@addContactItem',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::AOLM9eClwLSYF97u',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::66XX4Fk9XZESr9cJ' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/getContactList',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@getContactList',
        'controller' => 'App\\Http\\Controllers\\HomeController@getContactList',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::66XX4Fk9XZESr9cJ',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::c2dezByZLT5ELXiL' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/getPendingContactList',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@getPendingContactList',
        'controller' => 'App\\Http\\Controllers\\HomeController@getPendingContactList',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::c2dezByZLT5ELXiL',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::udk1VqdM0xg7QT54' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/sendContactRequest',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@sendContactRequest',
        'controller' => 'App\\Http\\Controllers\\HomeController@sendContactRequest',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::udk1VqdM0xg7QT54',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::sue2K8V3fJSgoAvl' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/removeContactRequest',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@removeContactRequest',
        'controller' => 'App\\Http\\Controllers\\HomeController@removeContactRequest',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::sue2K8V3fJSgoAvl',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::6xPMWDetEB1h3zSj' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/sendMessage',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@sendMessage',
        'controller' => 'App\\Http\\Controllers\\HomeController@sendMessage',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::6xPMWDetEB1h3zSj',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::bZMZzpy0kAVTg1uj' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/saveProfileInfo',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@saveProfileInfo',
        'controller' => 'App\\Http\\Controllers\\HomeController@saveProfileInfo',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::bZMZzpy0kAVTg1uj',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::UK54SswXwK9eXXC6' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/getUploadFileURL',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@getUploadFileURL',
        'controller' => 'App\\Http\\Controllers\\HomeController@getUploadFileURL',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::UK54SswXwK9eXXC6',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::tAlWOUDhbAy6sJ7q' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/getPhotoRequest',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@getPhotoRequest',
        'controller' => 'App\\Http\\Controllers\\HomeController@getPhotoRequest',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::tAlWOUDhbAy6sJ7q',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::y8U7yMKai3c2b8QF' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/sendRequest',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@sendRequest',
        'controller' => 'App\\Http\\Controllers\\HomeController@sendRequest',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::y8U7yMKai3c2b8QF',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::b2wKfiLsNp9HduiL' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/getPhotoData',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@getPhotoData',
        'controller' => 'App\\Http\\Controllers\\HomeController@getPhotoData',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::b2wKfiLsNp9HduiL',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::xk8cORB3yNM5uxdX' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/setContentRate',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@setContentRate',
        'controller' => 'App\\Http\\Controllers\\HomeController@setContentRate',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::xk8cORB3yNM5uxdX',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::56u5t7VcUX2fmPmv' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/getRateData',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@getRateData',
        'controller' => 'App\\Http\\Controllers\\HomeController@getRateData',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::56u5t7VcUX2fmPmv',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::gvIK7apexkfB5EIT' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/loadMoreMessages',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@loadMoreMessages',
        'controller' => 'App\\Http\\Controllers\\HomeController@loadMoreMessages',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::gvIK7apexkfB5EIT',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::Y1BRQ67x4c2C0J90' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/getCastData',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\MessageController@getCastData',
        'controller' => 'App\\Http\\Controllers\\MessageController@getCastData',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::Y1BRQ67x4c2C0J90',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::E8rR8rbaznTrpwhB' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/showSharedMedia',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@getSharedMedia',
        'controller' => 'App\\Http\\Controllers\\HomeController@getSharedMedia',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::E8rR8rbaznTrpwhB',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::1asurTMC7QXNXbum' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/showSavedBlinks',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@showSavedBlinks',
        'controller' => 'App\\Http\\Controllers\\HomeController@showSavedBlinks',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::1asurTMC7QXNXbum',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::RWFRI2YNRv4r1m8w' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/removeSavedBlink',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@removeSavedBlink',
        'controller' => 'App\\Http\\Controllers\\HomeController@removeSavedBlink',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::RWFRI2YNRv4r1m8w',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::uVsUODY8s0l9ppLn' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/getBlinkData',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@getBlinkData',
        'controller' => 'App\\Http\\Controllers\\HomeController@getBlinkData',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::uVsUODY8s0l9ppLn',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::GHwAXBoS9G9ftw9Z' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/isContact',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@isContact',
        'controller' => 'App\\Http\\Controllers\\HomeController@isContact',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::GHwAXBoS9G9ftw9Z',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::K9zleSDpxjXOmuyS' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/getPaymentHistories',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@getPaymentHistories',
        'controller' => 'App\\Http\\Controllers\\HomeController@getPaymentHistories',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::K9zleSDpxjXOmuyS',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::nnLYhf6IWtMcic0U' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'home/getBlockList',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\HomeController@getBlockList',
        'controller' => 'App\\Http\\Controllers\\HomeController@getBlockList',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::nnLYhf6IWtMcic0U',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::QHE0Hv2ZaEdb0fyJ' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'message/getLastMessage',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\MessageController@getLastMessage',
        'controller' => 'App\\Http\\Controllers\\MessageController@getLastMessage',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::QHE0Hv2ZaEdb0fyJ',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::YZsFnXnTI7DomdvA' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'message/deleteConversation',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\MessageController@deleteConversation',
        'controller' => 'App\\Http\\Controllers\\MessageController@deleteConversation',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::YZsFnXnTI7DomdvA',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::S0pG8D7ZWpV40P1r' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/create-paypal-transaction',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\PaymentController@createPayment',
        'controller' => 'App\\Http\\Controllers\\PaymentController@createPayment',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::S0pG8D7ZWpV40P1r',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::KkoeJfkjZHICtXaP' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/confirm-paypal-transaction',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\PaymentController@confirmPayment',
        'controller' => 'App\\Http\\Controllers\\PaymentController@confirmPayment',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::KkoeJfkjZHICtXaP',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::1SXCUEm2jBo6bNOW' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'payment/sendWithdrawRequest',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\PaymentController@sendWithdrawRequest',
        'controller' => 'App\\Http\\Controllers\\PaymentController@sendWithdrawRequest',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::1SXCUEm2jBo6bNOW',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::299FgMll4pFmlVJR' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'payment/getWithdrawList',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\PaymentController@getWithdrawList',
        'controller' => 'App\\Http\\Controllers\\PaymentController@getWithdrawList',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::299FgMll4pFmlVJR',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::MYQRvNDd3lMpCAbU' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'payment/withdraw',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\PaymentController@withdraw',
        'controller' => 'App\\Http\\Controllers\\PaymentController@withdraw',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::MYQRvNDd3lMpCAbU',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::EKyDhZV4k4hHgjRZ' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'stripe',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\StripeController@stripe',
        'controller' => 'App\\Http\\Controllers\\StripeController@stripe',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::EKyDhZV4k4hHgjRZ',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'stripe.post' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'stripe',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\StripeController@stripePost',
        'controller' => 'App\\Http\\Controllers\\StripeController@stripePost',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'stripe.post',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::uapNuoG2DIxgwpy6' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'setting/setPhoneNumber',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\SettingController@setPhoneNumber',
        'controller' => 'App\\Http\\Controllers\\SettingController@setPhoneNumber',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::uapNuoG2DIxgwpy6',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::mqfvRgdhmR4qEGMf' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'setting/getPhoneNumber',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\SettingController@getPhoneNumber',
        'controller' => 'App\\Http\\Controllers\\SettingController@getPhoneNumber',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::mqfvRgdhmR4qEGMf',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::jCoUrUEpJct5gqIT' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'setting/setNotification',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\SettingController@setNotification',
        'controller' => 'App\\Http\\Controllers\\SettingController@setNotification',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::jCoUrUEpJct5gqIT',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::O13WTtn5f4cgDSXq' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'setting/setReadReceipts',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\SettingController@setReadReceipts',
        'controller' => 'App\\Http\\Controllers\\SettingController@setReadReceipts',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::O13WTtn5f4cgDSXq',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::VRQWl8hXHJM7iVAB' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'setting/uploadBackgroundImage',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\SettingController@uploadBackgroundImage',
        'controller' => 'App\\Http\\Controllers\\SettingController@uploadBackgroundImage',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::VRQWl8hXHJM7iVAB',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::vpO0L8vnFlrOhKiM' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'setting/deleteAccount',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\SettingController@deleteAccount',
        'controller' => 'App\\Http\\Controllers\\SettingController@deleteAccount',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::vpO0L8vnFlrOhKiM',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::ODESI9WBvWVZNbAi' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'message/deleteChatThread',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\MessageController@deleteChatThread',
        'controller' => 'App\\Http\\Controllers\\MessageController@deleteChatThread',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::ODESI9WBvWVZNbAi',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::nGoMOvIgST8ne8R6' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'message/deleteCastThread',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\MessageController@deleteCastThread',
        'controller' => 'App\\Http\\Controllers\\MessageController@deleteCastThread',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::nGoMOvIgST8ne8R6',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::ffFR5uyFgqVbByKY' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'message/deleteThread',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\MessageController@deleteThread',
        'controller' => 'App\\Http\\Controllers\\MessageController@deleteThread',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::ffFR5uyFgqVbByKY',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::T8zm5gcjnN1yIqhD' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'message/getMessgageContentById',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\MessageController@getMessgageContentById',
        'controller' => 'App\\Http\\Controllers\\MessageController@getMessgageContentById',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::T8zm5gcjnN1yIqhD',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::aIs7WLsFPaZov1e1' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'group/inviteGroup',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\GroupController@inviteGroup',
        'controller' => 'App\\Http\\Controllers\\GroupController@inviteGroup',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::aIs7WLsFPaZov1e1',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::IBcTrd7gB9TnuZPY' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'group/getGroupInfo',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\GroupController@getGroupInfo',
        'controller' => 'App\\Http\\Controllers\\GroupController@getGroupInfo',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::IBcTrd7gB9TnuZPY',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::nrlLHWsklgGE1NPl' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'group/getCertainGroupInfo',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\GroupController@getGroupInfo',
        'controller' => 'App\\Http\\Controllers\\GroupController@getGroupInfo',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::nrlLHWsklgGE1NPl',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::Wc3bxTq1Jywo0WqV' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'group/getContactorInfoByGroupId',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\GroupController@getContactorInfoByGroupId',
        'controller' => 'App\\Http\\Controllers\\GroupController@getContactorInfoByGroupId',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::Wc3bxTq1Jywo0WqV',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::nR50jkhZNRoPi6Mb' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'group/getDirectGroupId',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\GroupController@getDirectGroupId',
        'controller' => 'App\\Http\\Controllers\\GroupController@getDirectGroupId',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::nR50jkhZNRoPi6Mb',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::veGy9mxybb3TWBVR' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'profile/followUser',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\ProfileController@followUser',
        'controller' => 'App\\Http\\Controllers\\ProfileController@followUser',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::veGy9mxybb3TWBVR',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::Std9ZgfIMLkbDaOm' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'profile/getFollowData',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\ProfileController@getFollowData',
        'controller' => 'App\\Http\\Controllers\\ProfileController@getFollowData',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::Std9ZgfIMLkbDaOm',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::CRlqN7k3KEwh3ukp' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'profile/isFollow',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\ProfileController@isFollow',
        'controller' => 'App\\Http\\Controllers\\ProfileController@isFollow',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::CRlqN7k3KEwh3ukp',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::YyK7xUMBQRHnxWBI' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'profile/getFollowList',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\ProfileController@getFollowList',
        'controller' => 'App\\Http\\Controllers\\ProfileController@getFollowList',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::YyK7xUMBQRHnxWBI',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::Zi0SICXeGKFn1UNF' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'profile/setProfileSetting',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'login',
        ),
        'uses' => 'App\\Http\\Controllers\\ProfileController@setProfileSetting',
        'controller' => 'App\\Http\\Controllers\\ProfileController@setProfileSetting',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::Zi0SICXeGKFn1UNF',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::QbXh0tulEHGRpGNs' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'admin',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'admin',
        ),
        'uses' => 'App\\Http\\Controllers\\Admin\\HomeController@index',
        'controller' => 'App\\Http\\Controllers\\Admin\\HomeController@index',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::QbXh0tulEHGRpGNs',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'dashboard' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'admin/home',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'admin',
        ),
        'uses' => 'App\\Http\\Controllers\\Admin\\HomeController@index',
        'controller' => 'App\\Http\\Controllers\\Admin\\HomeController@index',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'dashboard',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::vNhsOqT9G49Xdvq1' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'developer',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\Util\\DbUtil@developer',
        'controller' => 'App\\Http\\Controllers\\Util\\DbUtil@developer',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::vNhsOqT9G49Xdvq1',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::isll2NQsQwOYr4px' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'v1/api/uploadFile',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\Util\\FileUtil@uploadFile',
        'controller' => 'App\\Http\\Controllers\\Util\\FileUtil@uploadFile',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::isll2NQsQwOYr4px',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::utbK1pJBAjCV6jMW' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'v1/api/downloadFile',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\Util\\FileUtil@downloadFile',
        'controller' => 'App\\Http\\Controllers\\Util\\FileUtil@downloadFile',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::utbK1pJBAjCV6jMW',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
    'generated::zruHAMdED9sluAzj' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'v1/api/attachFiles',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'App\\Http\\Controllers\\Util\\FileUtil@attachFiles',
        'controller' => 'App\\Http\\Controllers\\Util\\FileUtil@attachFiles',
        'namespace' => 'App\\Http\\Controllers',
        'prefix' => NULL,
        'where' => 
        array (
        ),
        'as' => 'generated::zruHAMdED9sluAzj',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
    ),
  ),
)
);
