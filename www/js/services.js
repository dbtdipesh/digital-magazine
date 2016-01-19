angular.module('magazines.services',[])
.factory('MagazineFactory',['$http',function($http){
    var releases=[];
    var tokenfull=window.localStorage.getItem('tokenkey');
    if(tokenfull!=null)
       token = tokenfull.split('.')[1];
     else
      token='';
    
    
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

              var tokenfull=window.localStorage.getItem('tokenkey');
              if(tokenfull!=null)
               token = tokenfull.split('.')[1];
             else
              token='';
            	//data={id:1};
            	return $http.post(url+'get-release-by-id?token='+token+'&id='+id);
            },

            getProfile:function(){
              var tokenfull=window.localStorage.getItem('tokenkey');
            if(tokenfull!=null)
               token = tokenfull.split('.')[1];
             else
              token='';
              //data={id:1};
              return $http({
                      method: 'get',
                      url: url+'get-user-detail-by-token?token='+token,
                      header:headers
                    });
            },

            updateProfile:function(email,fn,ln,contact){
              console.log(url+'update-my-profile?token='+token+'&email='+email+'&first_name='+fn+'&last_name='+ln+'&contact_number='+contact);
              var tokenfull=window.localStorage.getItem('tokenkey');
            if(tokenfull!=null)
               token = tokenfull.split('.')[1];
             else
              token='';
              //data={id:1};
              return $http({
                      method: 'get',
                      url: url+'update-my-profile?token='+token+'&email='+email+'&first_name='+fn+'&last_name='+ln+'&contact_number='+contact,
                      header:headers
                    });
            },
             subscribe:function(release_id,product_code,email,first_name,last_name,contact_number,password,cpassword,address,zip,city,email_payer,full_name,payer_address,payer_zip,payer_city,payer_contact_number){
              //console.log(url+'subscribe?token='+token+'&email='+email+'&first_name='+fn+'&last_name='+ln+'&contact_number='+contact);
              var tokenfull=window.localStorage.getItem('tokenkey');
            if(tokenfull!=null)
               token = tokenfull.split('.')[1];
             else
              token='';
              //data={id:1};
              return $http({
                      method: 'get',
                      url: url+'subscribe-by-release-id?token='+token+'&release_id='+release_id+'&product_code='+product_code+'&email='+email+'&first_name='+first_name+'&last_name='+last_name+'&contact_number='+contact_number+'&password='+password+'&address='+address+'&zip='+zip+'&city='+city+'&email_payer='+email_payer+'&full_name='+full_name+'&payer_address='+payer_address+'&payer_zip='+payer_zip+'&payer_city='+payer_city+'&payer_contact_number='+payer_contact_number,
                      header:headers
                    });
            },
            getAllReleasesByMagazineIdoff: function() {
 
 
              $cordovaSQLite.execute(db, "SELECT * FROM magazines WHERE deleted=0")
              .then(function(res){
              for(var i = 0; i < res.rows.length; i++){
              releases.push(res.rows.item(i));
              }
              },
              function(err){ 
              console.log("Error");
              })
               
              return releases;
              },

            getAllReleasesByMagazineId:function(){
              var tokenfull=window.localStorage.getItem('tokenkey');
              if(tokenfull!=null)
               token = tokenfull.split('.')[1];
             else
              token='';

                   console.log(url+'get-all-releases-by-magazine-id?token='+token+'&magazine_id=1');

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

  var retrieve = function(email) {
    console.log(url+'register?email='+email);
    return $q(function(resolve, reject) {
         var data ={email: email};
        var magazine_id='1';
        var user;

               $http({
                            url: url+'forgot-password?email='+email,
                            method: "post",
                            data: data,
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                            }).success(function(res){

                                console.log(res);
                                //return res;

                               if(res.status=='error'){
                                    //return res.message;
                                    reject(res.message);
                                    //alert(res.message);
                                }else{
                                       //user=res.data;
                                      //return res.message;
                                        //storeUserCredentials(name +'.'+ user.token);
                                        resolve(res.message);
                                      // alert(res.message);
                                }

                                
                            });

                          
    });
  };

  var changepassword = function(oldpassword,newpassword,token) {
    console.log(url+'change-password?oldpassword='+oldpassword);
    return $q(function(resolve, reject) {
         var data ={token: token,old_password: oldpassword,newpassword:newpassword};
        var magazine_id='1';
        var user;

               $http({
                            url: url+'change-password?token='+token+'&old-password='+oldpassword+'&new-password='+newpassword,
                            method: "post",
                            data: data,
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                            }).success(function(res){

                                console.log(res);
                                //return res;

                               if(res.status=='error'){
                                    //return res.message;
                                    reject(res.message);
                                    //alert(res.message);
                                }else{
                                       //user=res.data;
                                      //return res.message;
                                        //storeUserCredentials(name +'.'+ user.token);
                                        resolve(res.message);
                                      // alert(res.message);
                                }

                                
                            });

                          
    });
  };

   var register = function(email, fn,ln,contact) {
    //console.log(url+'register?email='+email+'&first_name='+fn+'&last_name='+ln);
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
                                    /*alert('a');
                                    return res.message;*/
                                    reject(res.message);
                                }else{
                                       user=res.data;
                                        
                                        storeUserCredentials(user.user_name +'.'+ user.token);
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
                                        console.log(user.token);
                                        storeUserCredentials(user.user_name +'.'+ user.token);
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
    retrieve: retrieve,
    changepassword: changepassword,
    isAuthenticated: function() {return isAuthenticated;},
    username: function() {return username;},
    role: function() {return role;}
  };
})

.factory('DBA', function($cordovaSQLite, $q, $ionicPlatform) {
  var self = this;

  // Handle query's and potential errors
  self.query = function (query, parameters) {
    parameters = parameters || [];
    var q = $q.defer();

    $ionicPlatform.ready(function () {
      $cordovaSQLite.execute(db, query, parameters)
        .then(function (result) {
          q.resolve(result);
        }, function (error) {
          console.warn('I found an error');
          console.warn(error);
          q.reject(error);
        });
    });
    return q.promise;
  }

  // Proces a result set
  self.getAll = function(result) {
    var output = [];

    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }

  // Proces a single result
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  }

  return self;
})

.factory('Releases', function($cordovaSQLite, DBA) {
  var self = this;

  self.all = function() {
    return DBA.query("SELECT * FROM magazines WHERE deleted=0")
      .then(function(result){
        return DBA.getAll(result);
      });
  }

   self.favourites = function() {
    return DBA.query("SELECT * FROM magazines WHERE deleted=0 AND favourite=1")
      .then(function(result){
        return DBA.getAll(result);
      });
  }

  self.get = function(id) {
    var parameters = [id];
    return DBA.query("SELECT * FROM magazines WHERE id = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  }

  self.add = function(member) {
    var parameters = [member.id, member.magazine_name];
    return DBA.query("INSERT INTO magazines (id, name) VALUES (?,?)", parameters);
  }

  self.remove = function(member) {
    var parameters = [member.id];
    return DBA.query("DELETE FROM magazines WHERE id = (?)", parameters);
  }

  self.update = function(origMember, editMember) {
    var parameters = [editMember.id, editMember.name, origMember.id];
    return DBA.query("UPDATE magazines SET id = (?), name = (?) WHERE id = (?)", parameters);
  }

  return self;
})
