// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var starter=angular.module('starter', ['ionic', 'starter.controllers','magazines.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
       cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'menu.html',
    controller: 'AppCtrl'
  })

 
  .state('login', {
    url: '/login',
    templateUrl: 'login-main.html',
    controller: 'AppCtrl'
    
  })
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'search.html',
        
      }
    }
  })
.state('app.setting', {
    url: '/setting',
    views: {
      'menuContent': {
        templateUrl: 'setting.html',
        
      }
    }
  })
  
  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'profile.html',
        
      }
    }
  })

  .state('newRegister', {
    url: '/newRegister',
    
        templateUrl: 'registration-new-subscriber.html',
       
    
  })


  .state('digitalAccess', {
    url: '/digitalAccess',
    
        templateUrl: 'digital-access.html',
      
    
  })

  .state('app.subscriberVerification', {
    url: '/subscriberVerification',
    views: {
      'menuContent': {
        templateUrl: 'subscriber-verification.html',
        // controller: 'DetailCtrl'
      }
    }
  })

 .state('app.magazine', {
    url: '/magazine',
    views: {
      'menuContent': {
        templateUrl: 'magazine-page.html',
        controller: 'MagazineCtrl'
      }
    }
  })
   .state('app.detail', {
    url: '/detail/{id}',
    views: {
      'menuContent': {
        templateUrl: 'subscription-detail-page.html',
         controller: 'DetailCtrl'
      }
    }
  })

    .state('app.open', {
    url: '/open/{id}',
    views: {
      'menuContent': {
        templateUrl: 'open.html',
         //controller: 'DetailCtrl' 
      }
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
})

.config(['$httpProvider', function($httpProvider,$http) {
        $httpProvider.defaults.useXDomain = true;
        //$httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $httpProvider.defaults.headers.common["Accept"] = "application/json";
        $httpProvider.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
       // $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    }
])
/*.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common = 'Content-Type: application/json';
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        //$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    }]);*/






























