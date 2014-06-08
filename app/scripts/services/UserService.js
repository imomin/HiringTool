app.factory('UserService', function($firebase,BaseService) {
	// var userService = {};
	var _url = "https://hranalytics.firebaseio.com/users";
	var _ref = new Firebase(_url);;
	// angular.extend(userService,BaseService);
	// userService.init(_url,_ref);
	// return userService;
	return {
		getAll: function() {
			return $firebase(_ref);
		},
		getById: function(id) {
			return $firebase(new Firebase(_url + '/' + id));
		},
		add: function(item){
			//clean object and remove angular $$hash property
			var user = angular.copy(item);
				_ref.child(user.uid).set(user, function(error,data){
			});
    		//_ref.push(user);
		},
		update: function(item,id){
			var itemRef = new Firebase(_url + '/' + id);
			var toJson = angular.copy(item);
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
		}
	};
});