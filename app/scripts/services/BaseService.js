app.factory('BaseService', function($firebase) {
	var _url = null;
	var _ref = null;

	return {
		init: function (url) {
			this._url = url;
            this._ref = new Firebase(this._url);
        },
		getAll: function() {
			return $firebase(this._ref);
		},
		getById: function(id) {
			return $firebase(new Firebase(this._url + '/' + id));
		},
		add: function(item){
			//clean object and remove angular $$hash property
			var toJson = angular.copy(item);
    		this._ref.push(toJson);
		},
		update: function(item,id){
			var itemRef = new Firebase(this._url + '/' + id);
			var toJson = angular.copy(item);
			itemRef.update(toJson);
		},
		delete: function(id){
    		var itemRef = new Firebase(this._url + '/' + id);
    		itemRef.remove();
		},
		deleteAll: function(){
    		this._ref.remove();
		},
		getRef: function(){
			return this._ref;
		}
	};
});