'use strict';

var app = angular.module('projectApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'firebase',
  'vr.directives.slider'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/modelList.html',
        controller: 'modelListCtrl',
        requireLogin: true
      })
      .when('/details/:id?', {
        templateUrl: 'views/ModelDetails.html',
        controller: 'modelDetailsCtrl',
        requireLogin: true
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'userCtrl',
        requireLogin: false
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'userCtrl',
        requireLogin: false
      })
      .otherwise({
        redirectTo: '/',
        requireLogin: true
      });
  })
  .run(function ($rootScope, $location,$cookieStore, SessionService) {    
    $rootScope.$on('$routeChangeStart', function (event, currRoute, prevRoute) {
      if (currRoute.$$route.requireLogin && !SessionService.isUserAuthenticated()) {      
          event.preventDefault();    
          $location.path('/login');
        }
    });
});