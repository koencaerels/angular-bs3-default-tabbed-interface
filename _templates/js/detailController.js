appControllers.controller('detailController', ['$scope','$location','$routeParams','$timeout','toastr',
    function ($scope,$location,$routeParams,$timeout,toastr)
    {
        // $scope.id = 0;
        $scope.hasChanged = false;
        $scope.loading = false;
        $scope.editName = false;
        $scope.name = "new detail";
        $scope.detailField = "detail field content";
        
        $scope.init = function()
        {
            console.log('init detail component with id '+$scope.id);
            $scope.doLoading(true);    
            $timeout(function() {
                toastr.info('Information loaded', 'Loaded');
                $scope.doLoading(false);    
            }, 1000);
        };
        
        $scope.save = function()
        {
            $scope.doLoading(true);   
            $timeout(function() {
                toastr.success('Information saved', 'Saved');
                $scope.doLoading(false);    
            }, 1000);
        };
        
        $scope.doLoading = function (loading){
            if(loading === true) {
                $scope.loading = true;
                $scope.doEditName(false);
            } else {
                $scope.loading = false;
                $scope.hasChanged = false;
                $scope.$parent.hasChanged = false;
            }  
        };
        
        $scope.doEditName = function(edit)
        {
            if(edit === true) {
                $scope.editName = true; 
                $timeout(function() {
                    var element = document.getElementById('detailName-'+$scope.id);
                    element.focus();
                }, 100);
            } else {
                $scope.editName = false;
            }
        };
        
        $scope.registerChange = function()
        {
            $scope.hasChanged = true;
            $scope.$parent.hasChanged = true;
        };
        
    }
]);