tabsInterface.controller('navigationController',['$scope','$location','$rootScope',
    function ($scope, $location, $rootScope)
    {
        $scope.startId = 1;
        
        $scope.addDetailTab = function () {
            // $location.path( path );
            $scope.startId++;
            var id = $scope.startId;
            console.log('add detail tab');
            // console.log($rootScope.panes);
            var detailTab = {
                "name": "#D "+ id,
                "showIcon":"glyphicon-leaf",
                "partial": "_templates/views/detail.html",
                "controller": "detailController",
                "canBeClosed":true,
                "hasChanged": false,
                "subjectId": id,
                "subjectType":"detail"
            };
            $rootScope.panes.push(detailTab);
            // select the new created tab...
        };
        
    }
]);
