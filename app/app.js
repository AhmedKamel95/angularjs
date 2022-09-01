var myNinjaApp = angular.module("myNinjaApp", ["ngRoute", "ngAnimate"]);

myNinjaApp.config([
  "$routeProvider",
  "$locationProvider",
  ($routeProvider, $locationProvider) => {
    $locationProvider.html5Mode = true;

    $routeProvider
      .when("/home", {
        templateUrl: "views/home.html",
        controller: "NinjaController",
      })
      .when("/contact", {
        templateUrl: "views/contact.html",
        controller: "ContactController",
      })
      .when("/contact-success", {
        templateUrl: "views/contact-success.html",
      })
      .when("/directory", {
        templateUrl: "views/directory.html",
        controller: "NinjaController",
      })
      .otherwise({
        redirectTo: "/home",
      });
  },
]);

myNinjaApp.run(() => {});

myNinjaApp.directive("randomNinja", [
  function () {
    return {
      restrict: "E",
      scope: {
        ninjas: "=",
        title: "=",
      },
      template: "{{title}}",
      transculde: true,
      controller: function ($scope) {
        $scope.random = Math.floor(Math.random() * 4);
      },
    };
  },
]);

myNinjaApp.controller("NinjaController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.removeNinja = function (ninja) {
      var removedNinja = $scope.ninjas.indexOf(ninja);
      $scope.ninjas.splice(removedNinja, 1);
    };

    $scope.addNinja = () => {
      $scope.ninjas.push({
        name: $scope.newninja.name,
        belt: $scope.newninja.belt,
        rate: parseInt($scope.newninja.rate),
        available: true,
      });
      $scope.newninja.name = undefined;
      $scope.newninja.belt = undefined;
      $scope.newninja.rate = undefined;
    };

    $http.get("data/ninjas.json").then(({ data }) => {
      console.log("data: ", data);
      $scope.ninjas = data;
    });
  },
]);

myNinjaApp.controller("ContactController", [
  "$scope",
  "$location",
  function ($scope, $location) {
    $scope.sendMessage = function () {
      $location.path("contact-success");
    };
  },
]);
