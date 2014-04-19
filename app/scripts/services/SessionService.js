app.factory('SessionService', function($rootScope,$cookieStore) {
	this.user = {
		isAuthenticated:false
	}
	this.setUserAuthenticated = function(value){
		value ? $cookieStore.put('isAuthenticated',true) : $cookieStore.remove('isAuthenticated');
		this.user.isAuthenticated = value;
	},
	this.isUserAuthenticated  = function(){
		return $cookieStore.get('isAuthenticated') ? $cookieStore.get('isAuthenticated') :false;
	},
	this.setAuthenticatedUser = function(user){
		user ? $cookieStore.put('user',true) : $cookieStore.remove('user');
	},
	this.getAuthenticatedUser = function(){
		return $cookieStore.get('user') ? $cookieStore.get('user') :null;;
	}
	this.destroy = function () {
		$cookieStore.remove('isAuthenticated');
		$cookieStore.remove('user');
	}
	return this;
});