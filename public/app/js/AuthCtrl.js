'use strict';

module.controller("AuthCtrl", function($scope, $rootScope, $cookieStore, $location) {
	$scope.authAtempt = {
		login: "",
		password: "",
	};
	$scope.connection = function(){
		$scope.submitted = true;
		if	(	!$scope.connexion.login.$error.required &&
				!$scope.connexion.password.$error.required
			)
			socket.emit("authAtempt", $scope.authAtempt);
	};
	socket.on("authConf", function(info){
		if (info === null) {
			$scope.authFail = true;
		}
		else {
			$rootScope.auth = info;
			$rootScope.auth.logged = true;
			$cookieStore.put("auth", $rootScope.auth);
			$location.path('/dashboard');
		}
	});
})