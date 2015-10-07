angular.module('magazines.services',[])
.factory('MagazineFactory',['$http',function($http){
    var url='http://95.211.75.201/~digitalbookshelf/dev/api/';
   /* var headers = {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'Content-Type': 'application/json',
                'Accept': 'application/json'
            };*/

    return {
            getAllMagazines:function(){
               /* return $http.post('http://95.211.75.201/~digitalbookshelf/dev/api/get-all-magazines',{
                    headers:{
                        
                    }});*/
     			return $http.post(url+'get-all-magazines');
            },
            getReleaseById:function(id){
            	//data={id:1};
            	return $http.post(url+'get-release-by-id?token=AzEXshrS&id='+id);
            },

            getAllReleasesByMagazineId:function(){

                   

            	//var data={username:'kuber',password:'digital123'};
                // var data =JSON.stringify({username: 'kuber',password:'digital123' });
                 var data =JSON.stringify({magazine_id: '1'});
                //return $http.post('http://localhost/attendance/api/login',data);
               var ret= $http({
                            url: url+'get-all-releases-by-magazine-id?token=AzEXshrS&magazine_id=1',
                            method: "get",
                            data: data,
                           // headers: headers//{'Content-Type': 'application/x-www-form-urlencoded'},
                            });

                      //  $scope.$apply();

                        return ret; 
                    } 
            }        
        }
    
])
.service('AuthService', function($q, $http, USER_ROLES) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var username = '';
  var isAuthenticated = false;
  var role = '';
  var authToken;
 
  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }
 
  function storeUserCredentials(token) {
    window.localStorage.setItem('tokenkey', token);
    useCredentials(token);
  }
 
  function useCredentials(token) {
    username = token.split('.')[0];
    isAuthenticated = true;
    authToken = token;
 
    if (username == 'admin') {
      role = USER_ROLES.admin
    }
    if (username == 'user') {
      role = USER_ROLES.public
    }
 
    // Set the token as header for your requests!
    $http.defaults.headers.common['X-Auth-Token'] = token;
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem('tokenkey');
  }
 
  var login = function(name, pw) {
    return $q(function(resolve, reject) {
      if ((name == 'admin' && pw == '1') || (name == 'user' && pw == '1')) {
        // Make a request and receive your auth token from your server
        storeUserCredentials(name + '.yourServerToken');
        resolve('Login success.');
      } else {
        reject('Login Failed.');
      }
    });
  };
 
  var logout = function() {
    destroyUserCredentials();
  };
 
  var isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };
 
  loadUserCredentials();
 
  return {
    login: login,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function() {return isAuthenticated;},
    username: function() {return username;},
    role: function() {return role;}
  };
})
