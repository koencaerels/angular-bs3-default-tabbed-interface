'use strict';

var tabsInterface = angular.module('tabsInterface', [
      'ngRoute'
    , 'appControllers'
    , 'ngSanitize'
    , 'ngAJAXTabs'
    , 'toastr'
]);

// -----------------------
// general settings
// -----------------------

var baseUrl = 'http://localhost/www.pragmatoolkit.cc/httpd.www/_default_interface/';

// -----------------------
// routes
// -----------------------

tabsInterface.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when (
            '/start'
            , { templateUrl: '_templates/views/interface.html'
            , controller: 'interfaceController' }
        );
        $routeProvider.when (
            '/my-account'
            , { templateUrl: '_templates/views/my-account.html'
            , controller: 'myAccountController' }
        );        
        $routeProvider.otherwise(
            {redirectTo: '/start'}
        );
    }
]);