app.controller("LoginController", function($scope, $rootScope, $cookieStore,$location, AuthService, SessionService){
    $scope.credentials = { email: null, password: null, rememberMe:false};
    $scope.isAuthenticated = false;
    $scope.invalidCredential = false;
    $scope.resetPasswordError = false;
    $scope.resetPasswordSuccess = false;
    
    $scope.login = function(){
        AuthService.login($scope.credentials);        
    }

    $rootScope.$on("login", function(event, user) {
        SessionService.setUserAuthenticated(true);
        SessionService.setAuthenticatedUser(user);
        $scope.isAuthenticated = true;
        $scope.invalidCredential = false;
        $location.path('/').replace();
        $scope.$apply();
    });
    
    $rootScope.$on("resetPassword", function(event,error){
        if (error) {
            $scope.$apply(function(){
                $scope.resetPasswordError = true;
            });
        }
        else {
            $scope.$apply(function(){
                $scope.resetPasswordSuccess = true;
            });
        }
    });

    $scope.logout = function() {
        AuthService.logout();
        SessionService.setUserAuthenticated(false);
        SessionService.setAuthenticatedUser(null);
        $scope.isAuthenticated = false;
        $rootScope.$on("logout", function(event) {
            // do logout things
            $scope.$apply(function(){
                $location.path('/').replace();        
            });        
        });
    };

    $rootScope.$on("loginError", function(event, error) {
        // tell the user about the error
        $scope.$apply(function(){
            $scope.invalidCredential = true;
        });
    });

    $scope.register = function(){
        $location.path('/profile/');
    };

    $scope.resetPassword = function () {
        if($scope.credentials.email){
            AuthService.sendPasswordResetEmail($scope.credentials.email);
        }
        else {
            alert("Enter the email address");

        }
    }
});