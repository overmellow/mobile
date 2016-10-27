angular.module('starter')
 .factory("TF", function($http, webserverurl) {
	return {
		getTasks: function() {
			return $http.get(webserverurl + 'tasks');
		},
		getTask: function(taskId){
			return $http.get(webserverurl + 'tasks/' + taskId)
		},
		addTask: function(newtask){
			return $http.post(webserverurl + 'tasks', newtask);
		},
		deleteTask: function(taskId){
			return $http.delete(webserverurl + 'tasks/' + taskId);
		},
		editTask: function(taskId, task){
			return $http.put(webserverurl + 'tasks/' + taskId, task)
		}
	};
})

.factory('TasksFactory', function() {	
	var tasks = [];
	return {
		allTasks: function(allTasks){
			tasks = allTasks;
		},
		getTasks: function() {
			return tasks;
		},
		getTask: function(taskId){
			var task;
			tasks.forEach(function(element, index){
				if (element._id == taskId)
					task = element;						
			})
			return task;
		},
		addTask: function(newTask){
			tasks.push(newTask);
		},
		getNewTaskId: function(){
			var newTaskId = tasks[(tasks.length - 1)].id + 1;
			return newTaskId;
		},
		deleteTask: function(taskId){
			tasks.forEach(function(element, index){
				if (element._id == taskId)
					tasks.splice(index, 1)
			})
		},
		editTask: function(taskId, task){
			tasks.forEach(function(element, index){
				if (element._id == taskId)
					element = task;
			})
		},				
	};
})

.factory('Loader', ['$ionicLoading', '$timeout', '$rootScope',
	function($ionicLoading, $timeout, $rootScope) {
		var LOADERAPI = {
			showLoading: function(text) {
				text = text || 'Loading...';
				$ionicLoading.show({
					template: text
				});
			},
			hideLoading: function() {
				$ionicLoading.hide();
			},
			toggleLoadingWithMessage: function(text, timeout, fun) {
				LOADERAPI.showLoading(text);
				//$rootScope.showLoading(text);
				$timeout(function() {
					fun();
					LOADERAPI.hideLoading();
				}, timeout || 3000);
			}
		};
		return LOADERAPI;
}])

.factory("RF", function($location) {
	return {
		redirectTo: function() {
			$location.path('/');
		},
	};
})