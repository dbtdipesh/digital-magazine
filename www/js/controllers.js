var Book;
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    screenwidth = w.innerWidth || e.clientWidth || g.clientWidth,
    screenheight = w.innerHeight|| e.clientHeight|| g.clientHeight;

  if (window.orientation == 0 || window.orientation == 180) {
            // portrait
            screenheight = screenheight;
          } else if (window.orientation == 90 || window.orientation == -90) {
            // landscape
            screenheight = screenwidth;
          }

          // resize meta viewport
          //$('meta[name=viewport]').attr('content', 'width='+screenwidth);



var datModule=angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
     $scope.modal.show();
    //alert("a")
    //console.log('a')
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

    $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };


})
.controller('LoginCtrl',function($scope, $state, $ionicPopup, AuthService){
  $scope.data = {};

  //$scope.data.username='D9yDxLZ0';
  //$scope.data.password='A58o6s9w';
 
  $scope.login = function(data) {
    AuthService.login(data.username, data.password).then(function(authenticated) {
      $state.go('app.magazine', {}, {reload: true});
      //$scope.setCurrentUsername(data.username);
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };

})
.controller('ForgetCtrl',function($scope, $state, $ionicPopup, AuthService){
  $scope.data = {};

  //$scope.data.username='D9yDxLZ0';
  //$scope.data.password='A58o6s9w';
 
  $scope.retrieve = function(data) {
    if(data.username){
    AuthService.retrieve(data.username).then(function(res) {
      //$state.go('app.magazine', {}, {reload: true});
      //$scope.setCurrentUsername(data.username);
      var alertPopup = $ionicPopup.alert({
        title: 'Successfull!',
        template: res
      });
      $state.go('login', {}, {reload: true});
     // $state.go('app.magazine', {}, {reload: true});
      console.log(res);
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Failed!',
        template: err
      });
    });
    }else{
  var alertPopup = $ionicPopup.alert({
        title: 'Failed',
        template: 'Please check your credentials!'
      });
}
  };


})
.controller('RegisterCtrl',function($scope, $state, $ionicPopup, AuthService){
  $scope.data = {};

 // $scope.data.username='D9yDxLZ0';
 // $scope.data.password='A58o6s9w';
 
  $scope.register = function(data) {
    AuthService.register(data.email, data.fn,data.ln,data.contact).then(function(res) {
      var alertPopup = $ionicPopup.alert({
        title: 'Registration Successfull!',
        template: 'Enjoy !!'
      });
      $state.go('app.magazine', {}, {reload: true});
      console.log(res);
      //$state.go('app.magazine', {}, {reload: true});
      //$scope.setCurrentUsername(data.username);
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Registration failed!',
        template: 'Please check your credentials!'
      });
    });
  };

})
.controller('SettingCtrl',function($scope, $state, $http, $ionicPopup, AuthService){

  $scope.token = window.localStorage.getItem('tokenkey');
  alert($scope.token)
   $scope.logout = function() {

    AuthService.logout();
    $state.go('login');
  };
})
.controller('ProfileCtrl',function($scope, $state, $http, $ionicPopup, MagazineFactory){

  $scope.token = window.localStorage.getItem('tokenkey');
   MagazineFactory.getProfile().then(function(res){
       $scope.data=res.data.data
       console.log(res.data.data)
   })
})
.controller('MagazineCtrl',
  ['$scope','MagazineFactory','$ionicLoading','$stateParams','$ionicSlideBoxDelegate','$state','$ionicPopup'
  ,function($scope,MagazineFactory,$ionicLoading,$stateParams,$ionicSlideBoxDelegate,$state,$ionicPopup){
  $scope.i=0;

  $scope.screenheight=screenheight;
  $scope.screenwidth=screenwidth;

   $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });


//alert($stateParams.id)
  if($stateParams.id!=undefined){
     /* $scope.onSwipeLeft = function () {
        // Do whatever here to manage swipe left
        //alert("left");
        Book.nextPage();
      };
      $scope.onSwipeRight = function () {
        // Do whatever here to manage swipe left
        //alert("left");
        Book.prevPage();
      };*/

  MagazineFactory.getReleaseById($stateParams.id).then(function(cdata){
       //console.log(cdata);
       if(cdata.data.message=='Success'){
         $scope.magazine=cdata.data.data;

         console.log(cdata.data)
        
         $scope.file={"file":cdata.data.data.extracted_file} 

         $scope.filepath=$scope.file.file;


         //$scope.path='http://95.211.75.201/~digitalbookshelf/dev/resources/uploads/releases/zipfiles/1444733784/index.html';
        // console.log(cdata.data);
        // $scope.loopcount=Math.ceil($scope.magazines.length/4);
         //console.log(cdata.data);
           //Book = ePub('http://futurepress.github.io/epub.js/reader/moby-dick.epub');
          /* Book = ePub($scope.magazine.epub_file);

           Book.renderTo("area").then(function(){
              Book.setStyle("padding", "0 40px");
            });*/
          //Book.renderTo("area");


         $ionicLoading.hide();
        }
        //console.log($scope.magazines);
    })
}else{


  $scope.doRefresh = function() {



     MagazineFactory.getAllReleasesByMagazineId().then(function(cdata){
       //console.log(cdata);
       if(cdata.data.message=='Succes'){
         $scope.magazines=cdata.data.data;
         $scope.loopcount=Math.ceil($scope.magazines.length/4);
         //console.log($scope.loopcount);
        $ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();


        // $ionicLoading.hide();
        }else{
          
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'please logout and login again'
          });
          //$ionicLoading.hide();
         // $state.go('login')
        }
    })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
       
     });
  };

  MagazineFactory.getAllReleasesByMagazineId().success(function(cdata){
       console.log(cdata);
       if(cdata.message=='Succes'){
         $scope.magazines=cdata.data;
         $scope.loopcount=Math.ceil($scope.magazines.length/4);
         //console.log(cdata.data);
        $ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();


         $ionicLoading.hide();
        }else{
          alert('please logot and login again');

          $ionicLoading.hide();
         // $state.go('login')
        }
        //console.log($scope.magazines);
    }).error(function(err){
      alert('err');
     // $state.go('login');
      $ionicLoading.hide();

    });

}
   //$ionicLoading.hide();
  /*$scope.magazines1 = [
    { title: 'Hulk', id: 1, cover:'mag-01.jpg',subscribed:true },
    { title: 'Chill', id: 2, cover:'mag-02.jpg' ,subscribed:false},
    { title: 'Dubstep', id: 3, cover:'mag-03.jpg' ,subscribed:true},
    { title: 'Indie', id: 4, cover:'mag-02.jpg',subscribed:true },
    { title: 'Rap', id: 5 , cover:'mag-01.jpg',subscribed:false},
    { title: 'Cowbell', id: 6, cover:'mag-03.jpg',subscribed:true }
  ];

  $scope.loopcount3=Math.ceil($scope.magazines1.length/4);

  $scope.magazines2 = [
    { title: 'Reggae', id: 1, cover:'mag-03.jpg',subscribed:true },
    { title: 'Chill', id: 2, cover:'mag-02.jpg',subscribed:true },
    { title: 'Dubstep', id: 3, cover:'mag-01.jpg',subscribed:true },
    { title: 'Indie', id: 4, cover:'mag-02.jpg',subscribed:true },
    { title: 'Rap', id: 5 , cover:'mag-03.jpg',subscribed:true},
    { title: 'Cowbell', id: 6, cover:'mag-01.jpg',subscribed:true },
    { title: 'Cowbell', id: 7, cover:'mag-02.jpg',subscribed:true },
  ];

  $scope.loopcount2=Math.ceil($scope.magazines2.length/4);*/
}])
/*.controller('DetailCtrl', function($scope, $stateParams,MagazineFactory,$ionicLoading) {

//console.log($stateParams.id);
   $scope.i=0;

   $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  $scope.onSwipeLeft = function () {
  // Do whatever here to manage swipe left
  alert("left");
};

  MagazineFactory.getReleaseById($stateParams.id).success(function(cdata){
       console.log(cdata);
       if(cdata.message=='Success'){
         $scope.magazine=cdata.data; 
        // $scope.loopcount=Math.ceil($scope.magazines.length/4);
         //console.log(cdata.data);
           Book = ePub('http://futurepress.github.io/epub.js/reader/moby-dick.epub');
           //Book = ePub($scope.magazine.epub_file);

           Book.renderTo("area").then(function(){
              Book.setStyle("padding", "0 40px");
            });
          //Book.renderTo("area");

         $ionicLoading.hide();
        }
        //console.log($scope.magazines);
    });

});*/


/*datModule.factory('datfactory', function ($http, $q){

    this.getlist = function(){            
        return $http.get('http://95.211.75.201/~digitalbookshelf/dev/api/get-all-releases-by-magazine-id?magazine_id=1',{'Access-Control-Allow-Origin': 'localhost:*'})
            .then(function(response) {
              console.log(response.data); //I get the correct items, all seems ok here
             // $scope.$apply()
              return response.data;
            });            
    }
    return this;
});

datModule.controller('MagazineCtrl1', function ($scope, $state,$http,$ionicLoading,$q){
  console.log('MagazineCtrl');
  
  $scope.init = function(){
    $scope.page = 1;
    $scope.getReleases()
    .then(function(res){
      // success
      console.log('Magazines: ', res)
      $scope.magazines = res.data;
    }, function(status){
      // err
      $scope.pageError = status;
    })
  }

  $scope.setActive = function(index){
    angular.forEach($scope.imageList, function(image){
      image.active = false;
    })

    $scope.imageList[index].active = true
  }

  $scope.getReleases = function(){
    var defer = $q.defer();

    $http.get('http://95.211.75.201/~digitalbookshelf/dev/api/get-all-releases-by-magazine-id?magazine_id=1')
    .success(function(res){
      defer.resolve(res)
    })
    .error(function(status, err){
      defer.reject(status)
    })

    return defer.promise;
  }

  $scope.nextPage = function(){
    $scope.page += 1;

    $scope.getReleases()
    .then(function(res){
      
    })
  }

  $scope.init();
});



*/