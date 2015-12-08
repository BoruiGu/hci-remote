app.controller("MyLevelCtrl", function ($scope, $rootScope, $http) {
    $http.get("/api/level/" + $rootScope.username)
    .success(function (response) {
        $scope.level_info = response;
    });

    $scope.username = $rootScope.username;

    $scope.user_chart = [
        { username: 'Freudia', level: 5 },
        { username: 'Ingrid', level: 5 },
        { username: 'Cielo', level: 5 },
        { username: 'Senna', level: 3 },
        { username: 'Goma', level: 3 },
        { username: 'Shermie', level: 3 },
        { username: 'Saiya', level: 3 },
        { username: '###', level: 2 },
        { username: 'Millia', level: 2 },
        { username: 'Zenon', level: 2 },
    ];
});