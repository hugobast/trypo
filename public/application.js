var app = angular.module("app", ["fontService"]);

app.directive("trypo", function() {
  return { restrict: "E", scope: {}, transclude: true, templateUrl: "trypo.html" }
});

app.directive("controls", function() {
  return { restrict: "E", scope: {}, templateUrl: "controls.html" }
});

app.controller("FontsController", function($scope, Font) {
  $scope.fonts = Font.all();
  $scope.$on('receivedImages', function(event, fonts) {
    console.log(fonts);
    $scope.fonts = fonts;
  });
});

app.controller("TrypoController", function($scope, $http, $filter, Feature) {
  var features = Feature.all();
  $scope.params = {
    text: "Brown fox jumping something something",
    size: "20",
    color: "#000000",
    features: features 
  }

  $scope.$watch("params", function(newValue) {
    var data = angular.copy($scope.params);
    data.features = $filter('filter')(data.features, { checked: true });
    $http.post("/images", data).success(function(fonts) {
      $scope.$emit('receivedImages', fonts);
      // $scope.images = images 
    });
  }, true); 
});
