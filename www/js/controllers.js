angular.module('starter.controllers', [])

.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, TasksFactory, TF, $location) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.signedin = false;
  $rootScope.$on('showLoginModal', function($event, scope, cancelCallback, callback) { 
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  });

  $rootScope.loginFromMenu = function() {
    $rootScope.$broadcast('showLoginModal', $scope, null, null);
  }

  
})

.controller('TasksCtrl', function($scope, TF, TasksFactory, $ionicActionSheet, $ionicModal, $timeout, Loader, RF, $location) {
  TF.getTasks()
   .then(function(res){      
      //$scope.tasks = res.data;
      TasksFactory.allTasks(res.data);
      $scope.tasks = TasksFactory.getTasks();
   });

   $scope.doRefresh = function(){
      TF.getTasks()
       .then(function(res){      
          //$scope.tasks = res.data;
          TasksFactory.allTasks(res.data);
          $scope.tasks = TasksFactory.getTasks();
       }).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });    
   }

    // Form data for the login modal
  $scope.newTaskData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/newtask.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.newtaskmodal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeNewTask = function() {
    $scope.newtaskmodal.hide();
  };

  // Open the login modal
  $scope.newTask = function() {
    $scope.newtaskmodal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.addTask = function(newtask) {
    Loader.showLoading('Adding Task ...');
    TF.addTask(newtask)
      .then(function(res) {
        //MF.addMessage(res.data.message);
        //Loader.toggleLoadingWithMessage(null, null, RF.redirectTo);
        Loader.hideLoading();
        $location.path('/')
        TasksFactory.addTask(res.data.newtask);
        $scope.closeNewTask();
        $scope.newTaskData = {};
    });
  }; 
})

.controller('TaskCtrl', function($scope, $stateParams, $location, TF, TasksFactory, Loader, RF) {
  //TF.getTask($stateParams.taskId)
   //.then(function(res){
      //$scope.task = res.data;
      $scope.task = TasksFactory.getTask($stateParams.taskId);
   //});

  $scope.editTask = function(task){
    console.log(task);
    TF.editTask(task._id, task)
      .then(function(res) {
        //MF.addMessage(res.data.message);
        Loader.toggleLoadingWithMessage(null, null, RF.redirectTo);
        //$location.path('/')
    });
  }
  
  $scope.deleteTask = function(deletetask){
    var confirmed = confirm('Are you sure to delete this task?');
    if (confirmed == true) {
      //$http.delete(webserverurl + 'tasks/' + deletetask._id)
      Loader.showLoading('Deleting');
      TF.deleteTask(deletetask._id)
        .then(function(res) {
          TasksFactory.deleteTask(deletetask._id);
          //MF.addMessage(res.data.message);
          //Loader.toggleLoadingWithMessage(null, null, RF.redirectTo);
          Loader.hideLoading();
          $location.path('/')
      });
    }   
  }
})

.controller('TestCtrl', function($scope) {
})

 .constant('webserverurl', 'http://ec2-52-53-169-151.us-west-1.compute.amazonaws.com:3000/');