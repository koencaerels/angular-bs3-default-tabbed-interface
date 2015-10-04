(function(window, angular, undefined) {'use strict';

var ngAJAXTabs = angular.module("ngAJAXTabs", []);

ngAJAXTabs.directive("tabs", function() {
    return {
		restrict: "E",
		transclude: true,
		scope: {},
		controller: function($scope, $element, $rootScope) {
			var panes = $scope.panes = [];
			$scope.select = function(pane) {
                            angular.forEach(panes, function (pane) {
                                pane.selected = false;
                            });
                            if (pane.load !== undefined) {
                                if(pane.hasloaded == undefined) pane.load();
                                pane.hasloaded = true;
                            }
                            pane.selected = true;
			};
                        
                        $scope.close = function(pane,index) {
                            if(pane.hasChanged === true){
                                var confirmation = confirm("Close this tab?");
                                if (confirmation == true) $scope.doClose(pane,index);
                            } else {
                                $scope.doClose(pane,index);
                            }
                        };
                        
                        $scope.doClose = function(pane,index) {
                            var i = panes.indexOf(pane);
                            if (i != -1) {
                                panes.splice(index, 1);
                                $rootScope.panes.splice(index, 1);
                                if (pane.remove !== undefined) pane.remove();
                                angular.forEach(panes, function (pane) {
                                    pane.selected = false;
                                });
                                // todo add fix for closing last
                                if (i == panes.length) {
                                    $scope.select(panes[i - 1]);
                                } else {
                                    $scope.select(panes[i]);
                                }
                            }
                        };
			this.addPane = function(pane) {
				if (panes.length === 0) $scope.select(pane);
				panes.push(pane);
			};
		},
		template:
		  '<div class="tabbable">' +
		    '<ul class="nav nav-tabs">' +
		      '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
                      '<a href="" ng-click="select(pane)"><span class="glyphicon {{pane.showIcon}}"></span>&nbsp;&nbsp;{{pane.tabTitle}}' +
                      '</a>' +
                      '<button class="close closeTab" type="button" ng-click="close(pane,$index)" ng-show="{{pane.canBeClosed}}">×</button>' +
		      '</li>' +
		    '</ul>' +
		    '<div class="tab-content" ng-transclude></div>' +
		  '</div>',
		replace: true
    };
});
 
ngAJAXTabs.directive("pane", ["$http", "$templateCache", "$controller", "$compile", "$routeParams"
        , function($http, $templateCache, $controller, $compile, $routeParams) {
	return {
		require: "^tabs",
		restrict: "E",
		transclude: true,
		scope: { tabTitle: "@", subjectId: "@", hasChanged: "@", showIcon: "@", canBeClosed: "@" },
		link: function(scope, element, attrs, tabsCtrl) {
			var templateCtrl;
                        var templateScope;
                        var newElement;
			if (attrs.template && attrs.controller) {
				scope.load = function() {
					$http.get(attrs.template, {cache: $templateCache})
					.then(function(response) {
                                                console.log(scope.subjectId);
                                                templateScope = scope.$new();
						templateScope.isTabbedPane = true;
                                                if(scope.subjectId) templateScope.id = scope.subjectId;
                                                templateCtrl = $controller(attrs.controller, {$scope: templateScope});
						element.html(response.data);
						element.children().data('$ngControllerController', templateCtrl);
                                                newElement= $compile(element.contents())(templateScope);
                                                element.append(newElement);	
					});	
				};
                                scope.remove = function() {
                                    if(newElement) {
                                        newElement.remove();
                                    }
                                };
                                scope.setLabel = function() {
                                    console.log('set label : '+scope.subjectId);
                                    // todo re render tab labels...
                                    // tabsCtrl.
                                }
			}			
			tabsCtrl.addPane(scope);
		},
		template:
	        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
	        '</div>',
		replace: true
	};
}]);

})(window, window.angular);