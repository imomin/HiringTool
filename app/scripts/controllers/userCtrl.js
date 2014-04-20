app.controller("userCtrl", function($scope, $location, $firebase, AuthService, SessionService) {
	$scope.user = {};
	$scope.add = function () {
		AuthService.createUser($scope.user);
	};
});
app.controller("editProfileCtrl", function($scope, $location, $firebase,UserService, SessionService) {

});