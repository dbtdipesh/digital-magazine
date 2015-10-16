angular.module('magazines.services',[])
.factory('MagazineFactory',['$http',function($http){

    var tokenfull=window.localStorage.getItem('tokenkey');
    token = tokenfull.split('.')[1];
    //alert(token)
    
    var headers = {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'Content-Type': 'application/json',
                'Accept': 'application/json'
            };

    return {
            getAllMagazines:function(){
               /* return $http.post('http://95.211.75.201/~digitalbookshelf/dev/api/get-all-magazines',{
                    headers:{
                        
                    }});*/
     			return $http.post(url+'get-all-magazines');
            },
            getReleaseById:function(id){
            	//data={id:1};
            	return $http.post(url+'get-release-by-id?token='+token+'&id='+id);
            },

            getProfile:function(){
              //data={id:1};
              return $http({
                      method: 'get',
                      url: url+'get-user-detail-by-token?token='+token,
                      header:headers
                    });
            },

            getAllReleasesByMagazineId:function(){

                   

            	//var data={username:'kuber',password:'digital123'};
                // var data =JSON.stringify({username: 'kuber',password:'digital123' });
                 var data =JSON.stringify({magazine_id: '1',token:token});
                //return $http.post('http://localhost/attendance/api/login',data);
               var ret= $http({
                            url: url+'get-all-releases-by-magazine-id?token='+token+'&magazine_id=1',
                            method: "get",
                            data: data,
                           //headers: headers//{'Content-Type': 'application/x-www-form-urlencoded'},
                            }).success(function(res){
                                return res;
                            }).error(function(error){
                                //reject('Login Failed.');
                                return error;
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
    var token = window.localStorage.getItem('tokenkey');
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
    //console.log(username);
    isAuthenticated = true;
    authToken = token;

     role = USER_ROLES.admin
 
    // if (username == 'admin') {
    //   role = USER_ROLES.admin
    // }
    // if (username == 'user') {
    //   role = USER_ROLES.public
    // }
 
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

   var register = function(email, fn,ln,contact) {
    console.log(url+'register?email='+email+'&first_name='+fn+'&last_name='+ln);
    return $q(function(resolve, reject) {
         var data ={email: email, first_name: fn,last_name: ln,magazine_id: 1};
        var magazine_id='1';
        var user;

               $http({
                            url: url+'register?email='+email+'&first_name='+fn+'&last_name='+ln+'&magazine_id='+magazine_id+'&contact_number='+contact,
                            method: "post",
                            data: data,
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                            }).success(function(res){

                                console.log(res)

                               if(res.status=='error'){
                                    return res.message;
                                }else{
                                       user=res.data;
                                        
                                        storeUserCredentials(name +'.'+ user.token);
                                        resolve('Login success.');
                                }

                                /*if(res.type==undefined &&  res.status=='ok'){

                                        user=res.data;
                                        console.log(user[1]);
                                        storeUserCredentials(name +'.'+ user.token);
                                        resolve('Login success.');
*/

                                /*}else{
                                    // reject('Login Failed.');
                                }*/

                            });

                          
    });
  };
 
  var login = function(name, pw) {
    console.log(url+'login?username='+name+'&password='+pw);
    return $q(function(resolve, reject) {
         var data =JSON.stringify({username: name, password: pw});
        var user;

               $http({
                            url: url+'login?username='+name+'&password='+pw,
                            method: "get",
                            data: data,
                           // headers: headers//{'Content-Type': 'application/x-www-form-urlencoded'},
                            }).success(function(res){

                                console.log(res)

                                if(res.type==undefined &&  res.status=='ok'){

                                        user=res.data;
                                        //console.log(user.token);
                                        storeUserCredentials(name +'.'+ user.token);
                                        resolve('Login success.');


                                }else{
                                    reject('Login Failed.');
                                }

                            });

                            ////console.log(user);
                            // return false;
               
              // alert(ret);
/*
      if ((name == 'admin' && pw == '1') || (name == 'user' && pw == '1')) {
        // Make a request and receive your auth token from your server
        storeUserCredentials(name + '.yourServerToken');
        resolve('Login success.');
      } else {
        reject('Login Failed.');
      }*/
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
    register: register,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function() {return isAuthenticated;},
    username: function() {return username;},
    role: function() {return role;}
  };
})
