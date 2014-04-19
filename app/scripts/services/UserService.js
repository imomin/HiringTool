app.factory('UserService', function($firebase,ModelService) {
	var userService = {};
	var _url = "https://hranalytics.firebaseio.com/users";
	angular.extend(userService,ModelService);
	userService.init(_url);
	return userService;
});