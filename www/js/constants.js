angular.module('starter')
 
.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
 
.constant('USER_ROLES', {
  admin: 'admin_role',
  public: 'public_role'
});

//var url='http://95.211.75.201/~digitalbookshelf/dev/api/';
var url='http://95.211.75.201/~travelnewsdm/api/';