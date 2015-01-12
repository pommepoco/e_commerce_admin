'use strict';

var module = angular.module("adminApp", ['ngRoute', 'ngCookies']);

module.run(function($rootScope, $cookieStore, $location) {
	console.log($cookieStore.get('auth'));
	console.log();
	if ($cookieStore.auth && $cookieStore.auth.logged) {
		$rootScope.auth = $cookieStore.auth;
	}
	else {
		$rootScope.auth = {
			logged: false,
			login: "",
			status: 0,
		};
		$location.path('/connection');
	}
	$rootScope.$on('$routeChangeStart', function (event) {

		if (!$rootScope.auth.logged) {
			console.log('DENY');
			//event.preventDefault();
			$location.path('/connection');
		}
		else {
			console.log('ALLOW');
		}
	});
});

module.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/test', {
				templateUrl: 'app/partials/test.html',
				controller: 'AuthCtrl',
			}).
			when('/dashboard', {
				templateUrl: 'app/partials/dashboard.html',
				controller: 'UsersCtrl',
			}).
			when('/connection', {
				templateUrl: 'app/partials/connection.html',
				controller: 'AuthCtrl',
			}).
			otherwise({
				redirectTo: '/connection',
			});
	}]);
