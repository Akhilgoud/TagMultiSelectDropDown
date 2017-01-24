(function()
{
    "use strict";
    var app = angular.module("dropDown",["tagDropDown"]);

    app.controller("mainCtrl",function($scope,$timeout){
         $scope.dropDownData = ["One","Two","Three","Four"];
         $scope.selectedValues = [];
         $timeout(function () {
           $scope.dropDownData.push("Five");
         }, 4000);
    });
}());
