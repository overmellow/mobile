// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
    .state('app.tasks', {
      url: '/tasks',
      views: {
        'menuContent': {
          templateUrl: 'templates/tasks.html',
          controller: 'TasksCtrl'
        }
      }
    })
    .state('app.test', {
      url: '/test',
      views: {
        'menuContent': {
          templateUrl: 'templates/test.html',
          controller: 'TestCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/tasks/:taskId',
    views: {
      'menuContent': {
        templateUrl: 'templates/task.html',
        controller: 'TaskCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/tasks');
})
.config(['$httpProvider', function($httpProvider){
  $httpProvider.interceptors.push(interceptor);
  }]);

var interceptor = function($q){ 
  return {
    request: function(config){
        config.headers['x-access-token'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InBhc3N3b3JkIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7InBhc3N3b3JkIjp0cnVlLCJlbWFpbCI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7InBhc3N3b3JkIjoiMjAwMCIsImVtYWlsIjoibW9yaUBtYWlsLmNvbSIsIl9pZCI6IjU3ZmZmNzM5Mzg1MzcwOGQ3MjdmN2EwNSJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsXSwiJF9fb3JpZ2luYWxfdmFsaWRhdGUiOltudWxsXSwiJF9fb3JpZ2luYWxfcmVtb3ZlIjpbbnVsbF19LCJfcG9zdHMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W10sIiRfX29yaWdpbmFsX3ZhbGlkYXRlIjpbXSwiJF9fb3JpZ2luYWxfcmVtb3ZlIjpbXX0sImlhdCI6MTQ3NzQzNDQ1M30.xZmCKRL-RU8DqBIWdTcpYYvrRCQXeQ3zn8afpbDq414";
      return config;
    },
  }
}