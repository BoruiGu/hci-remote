app.controller("LoginCtrl", function ($scope, $rootScope, $location, POPUP) {
    $scope.login = function (user) {
        $rootScope.username = user.username;
        $rootScope.$emit('UsernameUpdated');
        $location.path('/home');
    };

    $scope.popup = function (msg) {
        POPUP.popup(msg);
    };
});