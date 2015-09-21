angular.module('starter.controllers', [])

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
.controller('MagazineCtrl', function($scope) {
  $scope.i=0;
  $scope.magazines1 = [
    { title: 'Hulk', id: 1, cover:'mag-01.jpg',subscribed:true },
    { title: 'Chill', id: 2, cover:'mag-02.jpg' ,subscribed:false},
    { title: 'Dubstep', id: 3, cover:'mag-03.jpg' ,subscribed:true},
    { title: 'Indie', id: 4, cover:'mag-02.jpg',subscribed:true },
    { title: 'Rap', id: 5 , cover:'mag-01.jpg',subscribed:false},
    { title: 'Cowbell', id: 6, cover:'mag-03.jpg',subscribed:true }
  ];

  $scope.loopcount=Math.ceil($scope.magazines1.length/4);

  $scope.magazines2 = [
    { title: 'Reggae', id: 1, cover:'mag-03.jpg',subscribed:true },
    { title: 'Chill', id: 2, cover:'mag-02.jpg',subscribed:true },
    { title: 'Dubstep', id: 3, cover:'mag-01.jpg',subscribed:true },
    { title: 'Indie', id: 4, cover:'mag-02.jpg',subscribed:true },
    { title: 'Rap', id: 5 , cover:'mag-03.jpg',subscribed:true},
    { title: 'Cowbell', id: 6, cover:'mag-01.jpg',subscribed:true },
    { title: 'Cowbell', id: 7, cover:'mag-02.jpg',subscribed:true },
  ];

  $scope.loopcount2=Math.ceil($scope.magazines2.length/4);
})
.controller('DetailCtrl', function($scope, $stateParams) {
});

