app.controller("MyLevelCtrl", function ($scope, $rootScope, $http) {
    $http.get("/api/level/" + $rootScope.username)
    .success(function (response) {
        $scope.level_info = response;
    });
});