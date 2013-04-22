angular.module("fontService", ["ngResource"]).
factory("Font", function($resource) {
  return $resource("/fonts", {}, {
    all: { method: 'GET', isArray: true},
  });
}).
factory("Feature", function($resource) {
  return $resource("/features", {}, {
    all: { method: 'GET', isArray: true }
  })
});

