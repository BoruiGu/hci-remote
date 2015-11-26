app.controller("LoginCtrl", function ($scope, $rootScope, $location, PopUp) {
    $scope.login = function (user) {
        $rootScope.username = user.username;
        $rootScope.$emit('UsernameUpdated');
        $location.path('/home');
    };

    $scope.popup = function (msg) {
        PopUp.popup(msg);
    };
});