/**
 * Created by erikfarmer on 11/18/15.
 */
var app = angular.module('widgetApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
      .when('/foo/:foo_id/bar/:bar_id', {
        controller: 'formCtrl',
        templateUrl: 'static/js/partials/form.html'
      });
});

app.controller('formCtrl', function($scope, $http, $routeParams) {

  $scope.user = {};
  $scope.tags = [];
  $scope.tags_2 = [];
  $scope.user.tags = $scope.tags;
  $scope.colors;
  $scope.pets = [];
  $scope.userCategory;
  $scope.userFood;
  $scope.primaryFoods = [];
  $scope.secondaryFoods = [];

  $scope.processFoods = function(foods) {
    for (var i = 0; i < foods.length; i++) {
      var f = foods[i];
      if (f.parent_id) {
        $scope.secondaryFoods.push({parent_id: f.parent_id, name: f.name});
      }
      else {
        $scope.primaryFoods.push({id: f.id, name: f.name});
      }
    }
  };

  $http({
    method: 'GET',
    url: '/pets/' + $routeParams.foo_id
  }).then(function successCallback(response) {
    $scope.pets = response.data.pets;
  }, function errorCallback(response) {
    console.log('Error')
  });
  $http({
    method: 'GET',
    url: '/colors/' + $routeParams.foo_id
  }).then(function successCallback(response) {
    $scope.colors = response.data.colors;
  }, function errorCallback(response) {
    console.log('Error')
  });
  $http({
    method: 'GET',
    url: '/foods/' + $routeParams.foo_id
  }).then(function successCallback(response) {
    $scope.processFoods(response.data.foods);
  }, function errorCallback(response) {
    console.log('Error')
  });

});

app.directive('tagManager', function() {
  return {
    restrict: 'E',
    scope: {tags: '=', options: '=', selectedPrimary: '='},
    templateUrl: 'static/js/partials/tag-manager.html',
    link: function ( $scope, $element ) {
      var input = angular.element($element.find('select')[0])
      // This adds the new tag to the tags array
      $scope.add = function() {
        var new_value = input[0].value;
        if ($scope.tags.indexOf(new_value) < 0) {
          $scope.tags.push(input[0].value);
        }
      };
      // This is the ng-click handler to remove an item
      $scope.remove = function ( idx ) {
          $scope.tags.splice(idx, 1);
      };
      input.bind( 'change', function ( event ) {
        $scope.$apply($scope.add);
      });
    }
  };
});

app.directive('doubleTagManager', function() {
  return {
    restrict: 'E',
    scope: {tags: '=', primary: '=', secondary: '=', userPrimary: '=', userSecondary: '='},
    templateUrl: 'static/js/partials/double-tag-manager.html',
    link: function ($scope, $element) {
      var input = angular.element($element.find('select')[1]);
      // This adds the new tag to the tags array
      $scope.add = function() {
        var new_value = $scope.userPrimary.name + ': ' + $scope.userSecondary.name
        if ($scope.tags.indexOf(new_value) < 0) {
          $scope.tags.push(new_value);
        }
        $scope.userSecondary = '';
      };
      // This is the ng-click handler to remove an item
      $scope.remove = function ( idx ) {
          $scope.tags.splice(idx, 1);
      };
      input.bind('change', function ( event ) {
        $scope.$apply($scope.add);
      });
    }
  };
});

app.filter('addAll', function () {
  return function(input) {
    // clone the array, or you'll end up with a new "None" option added to your "values"
    // array on every digest cycle.
    var newArray = input.slice(0);
    newArray.unshift({name: "All Foods"});
    return newArray;
  };
});