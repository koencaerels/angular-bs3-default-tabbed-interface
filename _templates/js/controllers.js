var appControllers = angular.module('appControllers', []);

// clear browser cache (in development mode)
// http://stackoverflow.com/questions/14718826/angularjs-disable-partial-caching-on-dev-machine

appControllers.run(function ($rootScope, $templateCache)
{
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
    
    $rootScope.panes = [
        {
            "name": "Home",
            "showIcon": "glyphicon-home",
            "partial": "_templates/views/home.html",
            "controller": "homeController",
            "hasChanged": false,
            "canBeClosed": false
        }
    ];
    
});

// -- extra field for loading detail content
// subject id
// subject type