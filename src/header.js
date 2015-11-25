app.controller("HeaderCtrl", function ($scope, $rootScope, $location) {
    $rootScope.$on("$locationChangeSuccess", function () {
        $scope.isLoginPage = $location.path() == '/login';
    });
    $rootScope.$on("UsernameUpdated", function () {
        $scope.username = $rootScope.username;
    });
});