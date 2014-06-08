app.factory('AuthService', function($rootScope, $location, $q, UserService, SessionService) {
    var authRef = new Firebase('https://hranalytics.firebaseio.com');
    this.auth = new FirebaseSimpleLogin(authRef, function(error, user) {        
        if (error) {
            $rootScope.$emit("loginError", error);
        } else if (user) {
            $rootScope.$emit("login", user);
        } else {
            $rootScope.$emit("logout");
        }
    });

    this.createUser = function(userObj){
        self = this;
        this.auth.createUser(userObj.email, userObj.password, function(error, user) {
            if(error){
                alert("Email already in use.");
            }
            if (!error) {
                userObj.id = user.id;
                userObj.uid = user.md5_hash;
                temp = userObj.password
                userObj.password = null;
                UserService.add(userObj);
                userObj.password = temp;
                userObj.rememberMe = false;
                self.login(userObj);
            }
        });
    }
    
    this.login = function(loginObj){
        this.auth.login('password', {
            email: loginObj.email,
            password: loginObj.password,
            rememberMe: loginObj.rememberMe
        });
    }
    
    this.changePassword = function(){
        this.auth.changePassword(email, oldPassword, newPassword, function(error, success) {
            if (!error) {
                console.log('Password changed successfully');
            }
        });       
    }

    this.sendPasswordResetEmail = function(email){
        this.auth.sendPasswordResetEmail(email, function(error) {
            $rootScope.$emit("resetPassword", error);
        });   
    }

    this.removeUser = function(email, password){
        this.auth.removeUser(email, password, function(error, success) {
            if (!error) {
             console.log('User deleted successfully');
            }
        });       
    }

    this.logout = function(){
        this.auth.logout();
    }
    
    return this;
});