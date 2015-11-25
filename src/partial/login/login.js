app.controller("LoginCtrl", function ($scope, $rootScope, $location) {
    $scope.login = function (user) {
        $rootScope.username = user.username;
        $rootScope.$emit('UsernameUpdated');
        $location.path('/home');
    };
});