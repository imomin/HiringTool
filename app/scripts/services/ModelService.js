app.factory('ModelService', function($firebase,BaseService,SessionService) {
	//var modelService = {}
	var user = SessionService.getAuthenticatedUser();
	debugger;
	var _url = "https://hranalytics.firebaseio.com/users/"+ user +"/models";
	var _ref = new Firebase(_url);	
	//angular.extend(modelService,BaseService);
	//modelService.init(_url,_ref);
	return {		
		getAll: function() {
			return $firebase(_ref);
		},
		getById: function(id) {
			return $firebase(new Firebase(_url + '/' + id));
		},
		add: function(item){
			//clean object and remove angular $$hash property
			var toJson = angular.copy(item);
    		_ref.push(toJson);
		},
		update: function(item,id){
			var itemRef = new Firebase(_url + '/' + id);
			var toJson = angular.copy(item);
			//sync criterias with existing candidate's skills.
			angular.forEach(toJson.candidates, function(candidate, key){
				for (var i = 0; i < toJson.criterias.length; i++) {
					if(!candidate.skills[i]){//add new
						candidate.skills.push({"name":toJson.criterias[i].name,"score":"0"});
					}
				};
			});

			angular.forEach(toJson.candidates, function(candidate, key){
				for (var i = 0; i < candidate.skills.length; i++) {
					if(!toJson.criterias[i]){//delete
						candidate.skills[i] = null;						
					}
				}
			});

			itemRef.update(toJson);
			
		},
		delete: function(id){
    		var itemRef = new Firebase(_url + '/' + id);
    		itemRef.remove();
		},
		deleteAll: function(){
    		_ref.remove();
		},
		getRef: function(){
			return _ref;
		},
		addCandidate: function(modelId,candidate){
			var toJson = angular.copy(candidate);
			new Firebase(_url +'/'+ modelId + '/candidates').push(toJson);
		},
		updateCandidate: function(modelId,candidateId,candidate){
			var toJson = angular.copy(candidate);
			new Firebase(_url +'/'+ modelId + '/candidates/' + candidateId).update(toJson);
		},
		deleteCandidate: function(modelId,candidateId){
			new Firebase(_url +'/'+ modelId + '/candidates/' + candidateId).remove();
		}
	};
});