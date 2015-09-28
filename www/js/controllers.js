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
})
.controller('MagazineCtrl',['$scope','MagazineFactory','$ionicLoading',function($scope,MagazineFactory,$ionicLoading){
  $scope.i=0;

   $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  MagazineFactory.getAllReleasesByMagazineId().success(function(cdata){
       console.log(cdata);
       if(cdata.message=='Succes'){
         $scope.magazines=cdata.data;
         $scope.loopcount=Math.ceil($scope.magazines.length/4);
         //console.log(cdata.data);
         $ionicLoading.hide();
        }
        //console.log($scope.magazines);
    });
  
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
.controller('DetailCtrl', function($scope, $stateParams,MagazineFactory,$ionicLoading) {

console.log($stateParams.id);
   $scope.i=0;

   $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  MagazineFactory.getReleaseById($stateParams.id).success(function(cdata){
       console.log(cdata);
       if(cdata.message=='Success'){
         $scope.magazine=cdata.data; 
        // $scope.loopcount=Math.ceil($scope.magazines.length/4);
         //console.log(cdata.data);
         $ionicLoading.hide();
        }
        //console.log($scope.magazines);
    });

});


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