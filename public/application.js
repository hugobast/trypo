var app = angular.module("app", ["fontService"]);

app.directive("trypo", function() {
  return { restrict: "E", scope: {}, templateUrl: "trypo.html" }
});

app.controller("FontsController", function($scope, Font) {
  $scope.fonts = Font.all();
});

app.controller("TrypoController", function($scope, $http, $filter, Feature) {
  $scope.features = Feature.all();

  $scope.params = {
    text: "Brown fox jumping something something",
    size: "20",
    color: "#000000",
    features: [] 
  } 

  $scope.changed = function() {
    $http.post("/images", {
      text: $scope.params.text,
      size: $scope.params.size,
      features: $filter('filter')($scope.features, { checked: true })
    }).success(function(data, status, headers, config) {
      console.log(data);
    });
  }
});
