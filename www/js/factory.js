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
		clearTasks: function(){
			tasks.length = 0;
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

.factory('UF', function($http, AuthFactory, TasksFactory, webserverurl) {
    return {
        login: function(user) {
            return $http.post(webserverurl + 'auth/login', user);
        },
        signup: function(user) {
            return $http.post(webserverurl + 'auth/signup', user);
        },
        logout: function() {
            AuthFactory.deleteAuth();
            TasksFactory.clearTasks();
        }
    };
})

.factory('AuthFactory', ['LSF', function(LSF) {

    var userKey = 'user';
    var tokenKey = 'token';

    var AuthAPI = {
        isLoggedIn: function() {
            return this.getUser() === null ? false : true;
        },
        getUser: function() {
            return LSF.getKey(userKey);
        },
        setUser: function(user) {
            return LSF.setKey(userKey, user);
        },
        getToken: function() {
            return LSF.getKey(tokenKey);
        },
        setToken: function(token) {
            return LSF.setKey(tokenKey, token);
        },
        deleteAuth: function() {
            LSF.deleteKey(userKey);
            LSF.deleteKey(tokenKey);
        }
    };
    return AuthAPI;
}])

.factory('LSF', function() {
    return {
        clearKeys: function() {
            return localStorage.clear();
        },
        getKey: function(key) {
            return JSON.parse(localStorage.getItem(key));
        },
        setKey: function(key, data) {
            return localStorage.setItem(key, JSON.stringify(data));
        },
        deleteKey: function(key) {
            return localStorage.removeItem(key);
        }
    };
})

.factory('TokenInterceptor', ['$q', 'AuthFactory', function($q, AuthFactory) {
  return {
    request: function(config) {
        config.headers = config.headers || {};
        var token = AuthFactory.getToken();
        var user = AuthFactory.getUser();
        console.log((token ? 'yes' : 'no'));
        if (token && user) {
          //config.headers['x-access-token'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InBhc3N3b3JkIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7InBhc3N3b3JkIjp0cnVlLCJlbWFpbCI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7InBhc3N3b3JkIjoiMjAwMCIsImVtYWlsIjoibW9yaUBtYWlsLmNvbSIsIl9pZCI6IjU3ZmZmNzM5Mzg1MzcwOGQ3MjdmN2EwNSJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsXSwiJF9fb3JpZ2luYWxfdmFsaWRhdGUiOltudWxsXSwiJF9fb3JpZ2luYWxfcmVtb3ZlIjpbbnVsbF19LCJfcG9zdHMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W10sIiRfX29yaWdpbmFsX3ZhbGlkYXRlIjpbXSwiJF9fb3JpZ2luYWxfcmVtb3ZlIjpbXX0sImlhdCI6MTQ3NzQzNDQ1M30.xZmCKRL-RU8DqBIWdTcpYYvrRCQXeQ3zn8afpbDq414";
          config.headers['x-access-token'] = token;
          config.headers['Content-Type'] = "application/json";
          //console.log(config.headers['x-access-token']);
        }
        return config || $q.when(config);
    }      
  }
}])