appControllers.controller('homeController', ['$scope','$location',
    function ($scope,$location)
    {
        
        $scope.addTab = function() {  
            $scope.$parent.$parent.addDetailTab();
        };
        
    }
]);