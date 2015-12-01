﻿app.controller("HomeCtrl", function ($scope, $http) {
    $scope.angular_hello = "Hello from Angular!";
    var val = "Node";
    $http.get("/api/hello/" + val)
    .success(function (response) {
        $scope.node_hello = response;
    })
    .error(function (data, status) {
        $scope.node_hello = "call to node.js failed!";
        console.log(data);
        console.log(status);
    });
});