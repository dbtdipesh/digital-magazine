// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var db;
var shortName = 'WebSqlDB';
var version = '1.0';
var displayName = 'WebSqlDB';
var maxSize = 65535;
var starter=angular.module('starter', ['ionic', 'starter.controllers','magazines.services','ngCordova'])

.run(function($ionicPlatform, $ionicPopup,$cordovaSQLite,MagazineFactory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

/*  window.addEventListener("orientationchange", function(){
    //alert('Orientation changed to ' + screen.orientation);
     screen.lockOrientation('portrait');
     $state.go($state.current, {}, {reload: true});
});*/

/*  window.addEventListener("orientationchange", function() {
  // Announce the new orientation number
  //alert(window.orientation);
  //autoResize('iframe1');
  // $state.go($state.current, {}, {reload: true});
}, false);*/
  
    if(window.cordova && window.cordova.plugins.Keyboard) {
     // screen.lockOrientation('portrait');
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
       cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  
    if(window.Connection) {

                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Internet Not Connected",
                        content: "The magazine list may be older."
                    })
                    .then(function(result) {
                        if(!result) {
                            ionic.Platform.exitApp();
                        }
                    });
                }else{
                   db = $cordovaSQLite.openDB("my.db");
                    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS magazines(magazine_id INTEGER NOT_NULL PRIMARY KEY, article TEXT NULL, extracted_file TEXT NULL, image TEXT NULL, introduction TEXT NULL, issued_date TEXT NULL, name TEXT NULL, subscribed TEXT NULL, update_time TEXT NULL, zip_file TEXT NULL").then(function(res){
                          console.log(res);
                    });

                      /*console.log('start')
                   var insertquery = "INSERT INTO magazines (magazine_id, article,extracted_file,image,introduction,issued_date,name,subscribed,update_time,zip_file) VALUES (?,?,?,?,?,?,?,?,?,?)";
                                  $cordovaSQLite.execute(db, insertquery, [1, 'test','test','test','test','test','test','test','test','test']).then(function(res) {
                                      console.log("INSERT ID -> " + res.insertId);
                                  }, function (err) {
                                      console.error(err);
                                  });
                  console.log('end')*/

               MagazineFactory.getAllReleasesByMagazineId().success(function(cdata){
                 //console.log(cdata);

                 if(cdata.message=='Succes'){
                   
                   cdata.data.forEach(function(entry) {

                      //console.log(entry.id)
                     var selquery = "SELECT * FROM magazines WHERE magazine_id = ?";
                        $cordovaSQLite.execute(db, selquery, [entry.id]).then(function(res) {
                            if(res.rows.length > 0) {
                                console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
                            } else {
                                console.log("No results found");

                                  var insertquery = "INSERT INTO magazines (magazine_id, article,extracted_file,image,introduction,issued_date,name,subscribed,update_time,zip_file) VALUES (?,?,?,?,?,?,?,?,?,?)";
                                  $cordovaSQLite.execute(db, insertquery, [entry.id, entry.article,entry.extracted_file,entry.image,entry.introduction,entry.issued_date,entry.name,entry.subscribed,entry.update_time,entry.zip_file]).then(function(res) {
                                      console.log("INSERT ID -> " + res.insertId);
                                  }, function (err) {
                                      console.error(err);
                                  });
                            }
                        }, function (err) {
                            console.error(err);
                        });  
                    });

                   }
                 });
               

                 
                }
            }
          
   
 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
                fs.root.getDirectory(
                    "Magazine/",
                    {
                        create: true
                    }
                );
            },
            function() {
                
            });





  });


/* if (!window.openDatabase) {
   // not all mobile devices support databases  if it does not, the
//following alert will display
   // indicating the device will not be albe to run this application
   alert('Databases are not supported in this browser.');
   return;
 }

 // this is called when an error happens in a transaction
function errorHandler(transaction, error) {
   alert('Error: ' + error.message + ' code: ' + error.code);

}

// this is called when a successful transaction happens
function successCallBack() {
   //alert("DEBUGGING: success");

}
function nullHandler(){};

  //alert("DEBUGGING: we are in the run() function");
  db = openDatabase(shortName, version, displayName,maxSize);

 db.transaction(function(tx){
    tx.executeSql('CREATE TABLE IF NOT EXISTS Magazines(magazine_id INTEGER NOT_NULL PRIMARY KEY, article TEXT NULL, extracted_file TEXT NULL, image TEXT NULL, introduction TEXT NULL, issued_date TEXT NULL, name TEXT NULL, subscribed TEXT NULL, update_time TEXT NULL, zip_file TEXT NULL)',
[],nullHandler,errorHandler);
 },errorHandler,successCallBack);*/



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
    //controller: 'AppCtrl'
    controller: 'LoginCtrl'
    
  })
  .state('forget', {
    url: '/forget',
    templateUrl: 'forget.html',
    //controller: 'AppCtrl'
    controller: 'ForgetCtrl'
    
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
        controller:'SettingCtrl'
        
      }
    }
  })
.state('app.contacts', {
    url: '/contacts',
    views: {
      'menuContent': {
        templateUrl: 'contacts.html',
        controller:'FileController'
        
      }
    }
  })
  
  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'profile.html',
        controller:'ProfileCtrl'
      }
    }
  })

  .state('newRegister', {
    url: '/newRegister',
    
        templateUrl: 'registration-new-subscriber.html',
         controller:'RegisterCtrl'
    
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
  .state('app.downloaded', {
    url: '/downloaded',
    views: {
      'menuContent': {
        templateUrl: 'downloaded-magazine-page.html',
        controller: 'OfflineMagazineCtrl'
      }
    }
  })
   .state('app.detail', {
    url: '/detail/{id}',
    views: {
      'menuContent': {
        templateUrl: 'subscription-detail-page.html',
         controller: 'MagazineCtrl'
      }
    }
  })

   .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'about.html',
        
      }
    }
  })

    .state('app.open', {
    url: '/open/{id}',
    views: {
      'menuContent': {
        templateUrl: 'open.html',
         controller: 'MagazineCtrl'
      }
    }
  })
    .state('app.openonline', {
    url: '/openonline/{id}',
    views: {
      'menuContent': {
        templateUrl: 'openonline.html',
         controller: 'MagazineCtrl'
      }
    }
  })
  // if none of the above states are matched, use this as the fallback
  var token1=window.localStorage.getItem('tokenkey');
  //alert(token1)
  if(token1==undefined){
    //alert('check'+token1);
    $urlRouterProvider.otherwise('/login');
  }
  else{
    $urlRouterProvider.otherwise('/app/magazine');
  }
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

.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
 
    if ('data' in next && 'authorizedRoles' in next.data) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        $state.go($state.current, {}, {reload: true});
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      }
    }
    
    if (!AuthService.isAuthenticated()) {
      if (next.name !== 'login' && next.name !== 'newRegister' && next.name !== 'forget') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });
})
.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}])