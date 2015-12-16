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
	
	$scope.html_click = function (e) {
        var dropdown_Obj = $("#my-navbar-collapse");
        // ref: http://stackoverflow.com/questions/1403615/use-jquery-to-hide-a-div-when-the-user-clicks-outside-of-it
        if (!dropdown_Obj.is(e.target) // if the target of the click isn't the container...
            && dropdown_Obj.has(e.target).length === 0) // ... nor a descendant of the container
            {
                $(".navbar-collapse").collapse('hide');
            }
    };
});