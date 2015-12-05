app.controller("HistoryCtrl", function ($scope, $rootScope, $location, PopUp, Event) {   
    $scope.popup = function (msg) {
        PopUp.popup(msg);
    };

    $scope.photo_src = [
        "http://matchbin-assets.s3.amazonaws.com/public/sites/352/assets/21OL_ins_8_14_Health_fair.jpg",
        "http://matchbin-assets.s3.amazonaws.com/public/sites/352/assets/21OL_ins_8_14_Health_fair.jpg",
        "http://matchbin-assets.s3.amazonaws.com/public/sites/352/assets/21OL_ins_8_14_Health_fair.jpg",
        "http://matchbin-assets.s3.amazonaws.com/public/sites/352/assets/21OL_ins_8_14_Health_fair.jpg"        
    ];

    Event.allEventDesc(function (response) {
        $scope.events = response;
    });

    $scope.isFirstEventInNewDate = function (idx) {
        return Event.isFirstEventInNewDate(idx, $scope.events, Event.isPastEvent);
    }

    $scope.isPastEvent = Event.isPastEvent;
});