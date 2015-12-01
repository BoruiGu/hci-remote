app.controller("HeaderCtrl", function ($scope, $rootScope, $location) {
    $rootScope.$on("$locationChangeSuccess", function () {
        $scope.isLoginPage = $location.path() == '/login';
    });
    $rootScope.$on("UsernameUpdated", function () {
        $scope.username = $rootScope.username;
    });
    // ref: https://github.com/twbs/bootstrap/issues/12852
    $(document).ready(function () {
        $(".navbar-nav li a").click(function (event) {
            /* if not clicking on the dropdown-toggle */
            if (!$(this).hasClass("dropdown-toggle")) {
                $(".navbar-collapse").collapse('hide');
            }
        });
    });
});