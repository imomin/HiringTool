app.factory('ModelService', function($firebase,BaseService) {
	var modelService = {}
	var _url = "https://hranalytics.firebaseio.com/models";
	angular.extend(modelService,BaseService);
	modelService.init(_url);
	return modelService;
});