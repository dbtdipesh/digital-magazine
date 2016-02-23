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
//alert(screenheight);
          // resize meta viewport
          //$('meta[name=viewport]').attr('content', 'width='+screenwidth);



var datModule=angular.module('starter.controllers',[])

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


    if(window.Connection) {

      if(navigator.connection.type == Connection.NONE) {
          $ionicPopup.confirm({
              title: "Login Failed !!",
              content: "Please connect to internet"
          })
          .then(function(result) {
              if(!result) {
                  ionic.Platform.exitApp();
              }
          });
          $scope.$broadcast('scroll.refreshComplete');
      }
      else{
        AuthService.login(data.username, data.password).then(function(authenticated) {
          $state.go('app.magazine', {}, {reload: true});
          //$scope.setCurrentUsername(data.username);
        }, function(err) {
         var alertPopup = $ionicPopup.alert({
           title: 'Login Failed !!',
            template: 'Please check your credentials!'
          });
                                                            // alert("failed");

            return false;

        });//AuthService.login ends
     }//else ends navigator.connection.type
    }//window.connection ends
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
      return false;
    });
    }else{
  var alertPopup = $ionicPopup.alert({
        title: 'Failed',
        template: 'Please check your credentials!'
      });
       return false;
   // $state.go('login');
}
  };


})
.controller('ChangePasswordCtrl',function($scope, $state, $ionicPopup, AuthService){
  $scope.data = {};

  //$scope.data.username='D9yDxLZ0';
  //$scope.data.password='A58o6s9w';

  $scope.changepassword = function(data) {
    if(data.newpassword!=data.newpasswordagain){
      var alertPopup = $ionicPopup.alert({
        title: 'Failed',
        template: 'Please check your new passwords!'
      });
    }

    else if(data.oldpassword){

    var tokenfull=window.localStorage.getItem('tokenkey');

    if(tokenfull!==null)
       token = tokenfull.split('.')[1];
     else
      token='';
    AuthService.changepassword(data.oldpassword,data.newpassword,token).then(function(res) {
       var alertPopup;
      //$state.go('app.magazine', {}, {reload: true});
      //$scope.setCurrentUsername(data.username);
       alertPopup = $ionicPopup.alert({
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
       return false;
    });
    }else{
       var alertPopup = $ionicPopup.alert({
            title: 'Failed',
            template: 'Please check your credentials!'
          });
        return false;
}
  };


})
.controller('RegisterCtrl',function($scope, $state, $ionicPopup, AuthService){
  $scope.data = {};

 // $scope.data.username='D9yDxLZ0';
 // $scope.data.password='A58o6s9w';

  $scope.register = function(data) {
    AuthService.register(data.email, data.fn,data.ln,data.contact).then(function(res) {
      console.log(res);
      var alertPopup;

       alertPopup = $ionicPopup.alert({
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
        template: err
      });
      return false;
    });
  };

})
.controller('SettingCtrl',function($scope, $state, $http, $ionicPopup, AuthService){

  $scope.token = window.localStorage.getItem('tokenkey');
   $scope.logout = function() {

    AuthService.logout();
    $state.go('login');
  };
})
.controller('SubscribeCtrl',function($scope,$state,$ionicPopup,MagazineFactory,$stateParams,$cordovaSQLite){

  if(window.Connection) {

      if(navigator.connection.type == Connection.NONE) {
          $ionicPopup.confirm({
              title: "Subscription Failed !!",
              content: "Please connect to internet"
          })
          .then(function(result) {
              if(!result) {
                  ionic.Platform.exitApp();
              }
          });

      }else{
         $scope.token = window.localStorage.getItem('tokenkey');
           MagazineFactory.getProfile().then(function(res){
               $scope.data=res.data.data;
               console.log(res.data.data);
           });

            MagazineFactory.getReleaseById($stateParams.id).then(function(res){
               $scope.magazine=res.data.data;
               console.log( $scope.magazine);
           });
        $scope.id=$stateParams.id;
        $scope.goback=function(){
          window.history.back();
        }
         $scope.subscribe = function(data) {
            MagazineFactory.subscribe($scope.magazine.id,$scope.magazine.product_code,data.email,data.first_name, data.last_name, data.contact_number,data.password,data.cpassword,data.adress,data.zip,data.city,data.email_payer,data.full_name,data.payer_address,data.payer_zip,data.payer_city,data.payer_contact_number).then(function(res) {
          console.log(res);
         // $stateParams.id
          var upquery = "UPDATE magazines SET subscribed='true' WHERE id=?";

                                                    $cordovaSQLite.execute(db, upquery, [$scope.magazine.id]).then(function(res) {
                                                       // console.log("UPDATE ID -> " + res.insertId+">>"+id);
                                                        //$ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();
                                                    }, function (err) {

                                                        console.error(err);
                                                    });
                                                    $scope.magazine.subscribed=true;

          $state.go('app.detail', {id:$stateParams.id}, {reload: true});
          //$scope.setCurrentUsername(data.username);
        }, function(err) {
          var alertPopup = $ionicPopup.alert({
            title: 'Subscription Failed !!',
            template: 'Please check your credentials!'
          });
        });//AuthService.login ends

         };
      }
    }

})
.controller('ProfileCtrl',function($scope, $state, $http, $ionicPopup, MagazineFactory){

  $scope.token = window.localStorage.getItem('tokenkey');
   MagazineFactory.getProfile().then(function(res){
       $scope.data=res.data.data;
       console.log(res.data.data);
   });
    $scope.update = function(data) {

    if(window.Connection) {

      if(navigator.connection.type == Connection.NONE) {
          $ionicPopup.confirm({
              title: "Update Failed !!",
              content: "Please connect to internet"
          })
          .then(function(result) {
              if(!result) {
                  ionic.Platform.exitApp();
              }
          });

      }
      else{
        MagazineFactory.updateProfile(data.email,data.first_name, data.last_name, data.contact_number).then(function(res) {
          console.log(res);
          $state.go('app.profile', {}, {reload: true});
          //$scope.setCurrentUsername(data.username);
        }, function(err) {
          var alertPopup = $ionicPopup.alert({
            title: 'Update Failed !!',
            template: 'Please check your credentials!'
          });
        });//AuthService.login ends
     }//else ends navigator.connection.type
    }//window.connection ends
  };
})
.controller('FavouritesMagazineCtrl',function($scope,Releases,$ionicLoading,$stateParams,$ionicSlideBoxDelegate,$state,$ionicPopup,$ionicPlatform){
    Releases.favourites().then(function(cdata){
       console.log(cdata);
       if(cdata.length>0){
        $scope.favourites=cdata;
        $scope.loopcount=Math.ceil($scope.favourites.length/4);
        // $ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();
       }
     });


  })
.controller('OfflineMagazineCtrl',function($scope,Releases,MagazineFactory,$ionicLoading,$stateParams,$ionicSlideBoxDelegate,$state,$ionicPopup,$ionicPlatform,$cordovaFile){
   $scope.doRefresh = function() {

 Releases.all().then(function(cdata){
      // console.log(cdata);
       if(cdata.length>0){

        var magazines=[];

       cdata.forEach(function(entry) {
        //console.log(entry.id);
        //cordova plugin add org.apache.cordova.file
          window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
            console.log(entry.id)
        fs.root.getDirectory(
            "Magazine/"+entry.id,
            {
                create: false
            },
            function(dirEntry) {
                dirEntry.getFile(
                    'index.html',
                    {
                        create: false,
                        exclusive: false
                    },
                    function gotFileEntry(fe) {
                        $ionicLoading.hide();
                       // console.log(entry.id)
                        //$scope.filepath = fe.toURL();
                        magazines.push(entry);
                        //console.log(entry)
                        $scope.downloaded=true;
                        //$scope.filepath=fs.root.getDirectory+"Magazine/"+$stateParams.id+'index.html';
                        /*console.log($scope.zipFile);
                        console.log("Extracting "+ $scope.zipFile);
                        var ZipClient = new ExtractZipFilePlugin();
                        ZipClient.extractFile('sdcard/Magazine/'+filename, extractOK, extractError);
                        //extractZipFile.unzip('cdvfile://localstorage/emulated/0/Magazine/', , extractError);
                        $scope.filepath*/
                    },
                    function(error) {
                        $ionicLoading.hide();
                         $scope.downloaded=false;
                        console.log("Error getting file");
                    }
                );
            }
        );
    },
    function() {
        $ionicLoading.hide();
         $scope.downloaded=false;
        console.log("Error requesting filesystem");
    });


       });

       // console.log(magazines);
         $scope.offlinemagazine=magazines;//JSON.stringify(magazines);
        // console.log($scope.offlinemagazine.length);
        // console.log($scope.offlinemagazine)
         $scope.loopcount=Math.ceil($scope.offlinemagazine.length/4);
         //console.log($scope.loopcount);


         //$scope.$broadcast('scroll.refreshComplete');

        }else{
          alert('please logot and login again');

         // $ionicLoading.hide();
         // $state.go('login')
        }
        //console.log($scope.magazines);
    });
  $ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();
     $scope.$broadcast('scroll.refreshComplete');
  }; //doRefresh function ends

Releases.all().then(function(cdata){
      // console.log(cdata);
       if(cdata.length>0){

        var magazines=[];

       cdata.forEach(function(entry) {
        //console.log(entry.id)
          window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
           // console.log(entry.id)
        fs.root.getDirectory(
            "Magazine/"+entry.id,
            {
                create: false
            },
            function(dirEntry) {
                dirEntry.getFile(
                    'index.html',
                    {
                        create: false,
                        exclusive: false
                    },
                    function gotFileEntry(fe) {
                        $ionicLoading.hide();
                       // console.log(entry.id)
                        //$scope.filepath = fe.toURL();
                        magazines.push(entry);
                        //console.log(entry)
                        //$scope.downloaded=true;
                        //$scope.filepath=fs.root.getDirectory+"Magazine/"+$stateParams.id+'index.html';
                        /*console.log($scope.zipFile);
                        console.log("Extracting "+ $scope.zipFile);
                        var ZipClient = new ExtractZipFilePlugin();
                        ZipClient.extractFile('sdcard/Magazine/'+filename, extractOK, extractError);
                        //extractZipFile.unzip('cdvfile://localstorage/emulated/0/Magazine/', , extractError);
                        $scope.filepath*/
                    },
                    function(error) {
                        $ionicLoading.hide();
                         $scope.downloaded=false;
                        console.log("Error getting file");
                    }
                );
            }
        );
    },
    function() {
        $ionicLoading.hide();
         $scope.downloaded=false;
        console.log("Error requesting filesystem");
    });


       });

        setTimeout(function() {
        console.log(magazines);
         $scope.offlinemagazine=magazines;//JSON.stringify(magazines);
         console.log($scope.offlinemagazine);
         console.log($scope.offlinemagazine.length);
        // console.log($scope.offlinemagazine)
         $scope.loopcount=Math.ceil($scope.offlinemagazine.length/4);
         console.log($scope.loopcount);
         console.log($scope.offlinemagazine);
         $scope.$apply(function(){
          $scope.offlinemagazine = magazines;
         $scope.loopcount=Math.ceil($scope.offlinemagazine.length/4);
       });
        $ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();
      },1000);

         //$scope.$broadcast('scroll.refreshComplete');

        }else{
          alert('please logot and login again');

         // $ionicLoading.hide();
         // $state.go('login')
        }
        //console.log($scope.magazines);
    });
  //$ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();

})
.controller('MagazineCtrl',function($scope,MagazineFactory,Releases,$ionicLoading,$stateParams,$ionicSlideBoxDelegate,$state,$ionicPopup,$ionicPlatform,$cordovaSQLite,$ionicPlatform,$http,$ionicHistory,$cordovaZip,$sce,$ionicScrollDelegate){



  $scope.i=0;

  $scope.screenheight=screenheight;
  $scope.screenwidth=screenwidth;

  if(window.Connection) {

    if(navigator.connection.type == Connection.NONE) {
        $scope.connection=false;
    }else{
      $scope.connection=true;

    }
  }


   $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  if($stateParams.id != undefined){
    if($scope.connection){
      var pos=null;

          $ionicPlatform.ready(function() {
          // Platform stuff here.
         // console.log(device);
          navigator.geolocation.getCurrentPosition(onSuccess, onError);

        });


          function onSuccess(position){
           // alert("here");
             pos = "lat:"+position.coords.latitude+"lon:"+position.coords.longitude;
             console.log(pos);
             console.log(url);

           }
            function onError(error) {
                console.log('code: '    + error.code    + '\n' +
                        'message: ' + error.message + '\n');
            }
           //alert(pos);
           //console.log($state.$current.self.name);
      //app.open
      if($state.$current.self.name=='app.openonline' || $state.$current.self.name=='app.open'){
        //alert(url);

        $http.post(url+'read-statistics?action=open&token='+token+'&release_id='+$stateParams.id+'&device='+device.model+'&geo_location='+pos).success(function(res){
          console.log(res);
          window.localStorage.setItem('reading_statistics_id', res.data.statistics_id);
          window.localStorage.setItem('release_id', $stateParams.id);
          window.localStorage.setItem('device', device.model);
          window.localStorage.setItem('geo_location', pos);


        });
      }

      if($state.$current.self.name=='app.detail'){
          stat_id=window.localStorage.getItem('reading_statistics_id');
            if(stat_id){
                $http.post(url+'read-update-time-statistics?statistics_id='+stat_id).success(function(res){
                console.log(res);
                localStorage.removeItem("reading_statistics_id");
                localStorage.removeItem("release_id");
                localStorage.removeItem("device");
                localStorage.removeItem("geo_location");
              });

            }
          }


        //console.log($ionicHistory.viewHistory().forwardView.stateName);//"app.openonline"
        /*if($ionicHistory.viewHistory().forwardView!=null){
        var statename= $ionicHistory.viewHistory().forwardView.stateName?$ionicHistory.viewHistory().forwardView.stateName:undefined;
        if(statename!=undefined && statename=="app.openonline"){
            alert('a');
          //var stat_id=window.localStorage.getItem('reading_statistics_id');
          //$http.post(url+'read-update-time-statistics?statistics_id='+stat_id).success(function(res){
          //console.log(res);
          //localStorage.removeItem("reading_statistics_id");

        //});

      }*/




  }


 $ionicLoading.hide();
  Releases.get($stateParams.id).then(function(cdata){
       console.log(cdata);
       if(cdata.id){
         $scope.magazine=cdata;

         console.log(cdata);
        $scope.newversion =cdata.version;
         $scope.file={"file":cdata.extracted_file};

         if(window.Connection) {

              if(navigator.connection.type == Connection.NONE) {
                  $scope.connection=false;
              }else{
                $scope.connection=true;


                MagazineFactory.getReleaseById($stateParams.id).success(function(onlinedata){
                  console.log(onlinedata);
                  if(onlinedata.status=='error'){
                    $state.go('login');
                  }
                  $scope.newversion=onlinedata.data.version;
                });
              }

            }

         $scope.onlinepath=$scope.file.file;
         //console.log($scope.onlinepath);

         var zurl=cdata.zip_file;
         //console.log(zurl);


         var filename = zurl.substring(zurl.lastIndexOf('/')+1);
        // console.log(filename);
         $scope.oldversion =cdata.version;




          //favourite function starts
          $scope.favourite = function(id) {

            var upquery = "UPDATE magazines SET favourite=1 WHERE id=?";

                                                    $cordovaSQLite.execute(db, upquery, [$stateParams.id]).then(function(res) {
                                                        console.log("UPDATE ID -> " + res.insertId+">>"+id);
                                                        //$ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();
                                                    }, function (err) {

                                                        console.error(err);
                                                    });
                                                    $scope.magazine.favourite=1;
          };

          $scope.defavourite = function(id) {

            var upquery = "UPDATE magazines SET favourite=0 WHERE id=?";

                                                    $cordovaSQLite.execute(db, upquery, [$stateParams.id]).then(function(res) {
                                                        console.log("UPDATE ID -> " + res.insertId+">>"+id);
                                                        //$ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();
                                                    }, function (err) {

                                                        console.error(err);
                                                    });
                                                    $scope.magazine.favourite=0;
          };
          //favourite function ends


         $scope.download = function() {
            $ionicLoading.show({
              template: 'Downloading...'
            });
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
                fs.root.getDirectory(
                    "Magazine/"+$stateParams.id,
                    {
                        create: true
                    },
                    function(dirEntry) {
                        dirEntry.getFile(
                            filename,
                            {
                                create: true,
                                exclusive: false
                            },
                            function gotFileEntry(fe) {
                                var p = fe.toURL();
                                //console.log(fe);
                                //fe.remove();
                                console.log("start downloading..");
                                ft = new FileTransfer();
                               statusDom = document.querySelector('.loading');
                                ft.onprogress = function(progressEvent) {
                                  console.log(progressEvent);
                                    if (progressEvent.lengthComputable) {
                                      var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                                      statusDom.innerHTML = "<span>"+perc + "% loaded...</span>";
                                      //document.getElementById("statusDom").innerHTML = perc + "% loaded...";
                                    } else {
                                      if(statusDom.innerHTML == "") {
                                        statusDom.innerHTML = "Loading";
                                      } else {
                                        statusDom.innerHTML += ".";
                                      }
                                    }
                                  };



                                ft.download(
                                    encodeURI(zurl),
                                    p,
                                    function(entry) {
                                        $ionicLoading.hide();
                                        $scope.zipFile = entry.toURL();
                                        console.log($scope.zipFile);
                                        $http.post(url+'open-download?action=download&token='+token+'&release_id='+$stateParams.id+'&device='+device.model+'&geo_location='+pos).success(function(res){
                                          console.log(res);

                                       });
                                        $ionicLoading.show({
                                            template: 'Installing...'
                                          });

                                        //console.log("Extracting "+ $scope.zipFile);
                                       // console.log(entry.fullPath);

                                        //http://phonegap-plugins.com/plugins/michogar/extract-zipfile
                                        console.log("start extracting..");
                                       /* var ZipClient = new ExtractZipFilePlugin();

                                         console.log(file_path);

                                        ZipClient.extractFile(file_path, extractOK, extractError);*/

                                        console.log(dirEntry);
                                        console.log(entry.toURL());
                                        var file_path=entry.toURL().replace("file://", "");
                                        $cordovaZip
                                            .unzip(
                                              entry.toURL(), // https://github.com/MobileChromeApps/zip/blob/master/tests/tests.js#L32
                                              dirEntry.nativeURL // https://github.com/MobileChromeApps/zip/blob/master/tests/tests.js#L45
                                            ).then(function () {
                                              console.log('success');
                                            }, function () {
                                              console.log('unziperror');
                                            }, function (progressEvent) {
                                              // https://github.com/MobileChromeApps/zip#usage
                                              console.log(progressEvent);
                                            });



                                        $scope.filepath = dirEntry.nativeURL+'index.html';//fe.toURL();
                                        $ionicLoading.hide();
                                        $scope.downloaded=true;
                                        var upquery = "UPDATE magazines SET version=? WHERE id=?";

                                                    $cordovaSQLite.execute(db, upquery, [$scope.newversion,$stateParams.id]).then(function(res) {
                                                        console.log("UPDATE ID -> " + res.insertId+">>");

                                                        $scope.oldversion=$scope.newversion;
                                                        //$ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();
                                                    }, function (err) {

                                                        console.error(err);
                                                    });




                                    },
                                    function(error) {
                                        $ionicLoading.hide();
                                        $scope.downloaded=false;
                                        console.log("Download Error Source -> " + error.source);
                                    },
                                    false,
                                    null
                                );
                              fe.remove();
                            },
                            function() {
                                $ionicLoading.hide();
                                $scope.downloaded=false;
                                console.log("Get file failed");
                            }
                        );
                    }
                );
            },
            function() {
                $ionicLoading.hide();
                $scope.downloaded=false;
                console.log("Request for filesystem failed");
            });
        }; //function download ends

        function extractOK(status){
            console.log("extractOK");
        };

        function extractError(error){
            alert("extractError "+error);
        };

        $scope.downloaded=false;

        //check if magazine is in phonememory
         window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
              fs.root.getDirectory(
                  "Magazine/"+$stateParams.id,
                  {
                      create: false
                  },
                  function(dirEntry) {

                    console.log("Magazine/"+$stateParams.id);
                      dirEntry.getFile(
                          'index.html',
                          {
                              create: false,
                              exclusive: false
                          },
                          function gotFileEntry(fee) {
                              $ionicLoading.hide();
                              $scope.filepath = fee.toURL();
                              $scope.downloaded=true;
                             // alert('a');
                              //$scope.filepath=fs.root.getDirectory+"Magazine/"+$stateParams.id+'index.html';
                              //console.log($scope.zipFile);
                              //console.log("Extracting "+ $scope.zipFile);
                              //var ZipClient = new ExtractZipFilePlugin();
                              //ZipClient.extractFile('sdcard/Magazine/'+filename, extractOK, extractError);
                              //extractZipFile.unzip('cdvfile://localstorage/emulated/0/Magazine/', , extractError);
                              //$scope.filepath
                          },
                          function(error) {
                              $ionicLoading.hide();
                               $scope.downloaded=false;
                              console.log("Error getting file");
                          }
                      );
                  }
              );
          },
          function() {
              $ionicLoading.hide();
               $scope.downloaded=false;
              console.log("Error requesting filesystem");
          });




         //$ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();
         $ionicLoading.hide();
        }
        //console.log($scope.magazines);
    })
}else{


  $scope.doRefresh = function() {

    if(!$scope.searchKeyword)
        $scope.searching=false;
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
                    $scope.$broadcast('scroll.refreshComplete');
                }else{


               MagazineFactory.getAllReleasesByMagazineId().success(function(cdata){
                 console.log(cdata);

                if(cdata.status=='error'){
                    $state.go('login');
                  }

                 if(cdata.message=='Succes'){
                   /* var delquery = "Delete from magazines";
                        $cordovaSQLite.execute(db, delquery, []).then(function(res) {
                          console.log('deleted all');
                        });*/
                  var idarray=[];
                  cdata.data.forEach(function(entry) {
                      idarray.push(entry.id);
                  });
                  var ids = idarray.join();
                  //console.log(ids);

                     var upquery = "UPDATE magazines SET deleted=1 WHERE id NOT IN("+ids+")";
                     //console.log(upquery);

                        $cordovaSQLite.execute(db, upquery, []);


                   cdata.data.forEach(function(entry) {
                    var imgFile='';
                      var filename=entry.id+".jpg";
                      //console.log(entry.id)
                      //AND update_time < ?  AND  strftime('%s', updatetime) <  strftime('%s', ?)
                     var selquery = "SELECT * FROM magazines WHERE id = ? AND datetime(update_time) = datetime('"+entry.update_time+"')";
                     //console.log(selquery);
                        $cordovaSQLite.execute(db, selquery, [entry.id]).then(function(res) {
                            if(res.rows.length > 0) {
                                console.log("SELECTED -> " + res.rows.item(0).name + " " + res.rows.item(0).update_time);
                            } else {

                                //insert cover image starts
                                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
                                  fs.root.getDirectory(
                                      "Magazine",
                                      {
                                          create: true
                                      },
                                      function(dirEntry) {
                                          dirEntry.getFile(
                                              filename,
                                              {
                                                  create: true,
                                                  exclusive: false
                                              },
                                              function gotFileEntry(fe) {
                                                  var p = fe.toURL();
                                                  fe.remove();
                                                  ft = new FileTransfer();


                                                  ft.download(
                                                      encodeURI(entry.image),
                                                      p,
                                                      function(ec) {
                                                          //$ionicLoading.hide();
                                                          imgFile = ec.toURL();
                                                         var insertquery = "INSERT OR REPLACE INTO magazines (id, article,extracted_file,image,introduction,issued_date,name,subscribed,update_time,zip_file,deleted,is_free,release_id,content) VALUES (?,?,?,?,?,?,?,?,?,?,0,?,?,?)";

                                                    $cordovaSQLite.execute(db, insertquery, [entry.id, entry.article,entry.extracted_file,imgFile,entry.introduction,entry.issued_date,entry.name,entry.subscribed,entry.update_time,entry.zip_file,entry.is_free,entry.release_id,entry.content]).then(function(res) {
                                                        console.log("INSERT ID -> " + res.insertId+">>"+imgFile);
                                                        $scope.searching=false;
                                                        //$ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();
                                                    }, function (err) {

                                                        console.error(err);
                                                    });

                                                         // $ionicLoading.hide();

                                                      },
                                                      function(error) {
                                                         // $ionicLoading.hide();
                                                         // $scope.downloaded=false;
                                                         alert('Error downloading cover');
                                                         // alert("Download Error Source -> " + error.source);
                                                      },
                                                      false,
                                                      null
                                                  );
                                              },
                                              function() {
                                                 // $ionicLoading.hide();
                                                 // $scope.downloaded=false;
                                                  console.log("Get file failed");
                                              }
                                          );
                                      }
                                  );
                              },
                              function() {
                                  $ionicLoading.hide();
                                  $scope.downloaded=false;
                                  console.log("Request for filesystem failed");
                              });
                                //insert cover image ends
                                console.log("No results found");
                            }
                        }, function (err) {
                            console.error(err);
                        }); //select query execute ends
                    }); //cdata foreach ends

                   }// message==succes ends
                 })/*.finally(function(){
                 $ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();
                 //$scope.$broadcast('scroll.refreshComplete');
                 })*/;
                 // getAllReleasesByMagazineId ends
                 MagazineFactory.getAllReleasesByMagazineId().success(function(cdata){
                   console.log(cdata);
                    if(cdata.message=='Succes'){

                      $scope.magazines=cdata.data;
                       $scope.loopcount=Math.ceil($scope.magazines.length/4);
                       console.log($scope.loopcount);
                      // $ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();
                       $scope.$broadcast('scroll.refreshComplete');

                    }
                 });



                } //if navigator.connection.type ends
            }//window.Connection







  }; //refresh function ends
//first page loaded by this function starts
  Releases.all().then(function(cdata){
       //console.log(cdata);
       if(cdata.length>0){
         $scope.magazines=cdata;
         $scope.loopcount=Math.ceil($scope.magazines.length/4);
         //console.log(cdata.data);
       // $ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();
        $scope.searching=false;
        $scope.totalrows=[];
        angular.forEach($scope.magazines, function(value, key) {
            //console.log(key + ': ' + value.content);
            $string=$scope.magazines[key].content;
            //console.log($string);
            $pagearray=$string.split("|||");
            $scope.totalrows.push({"image":$scope.magazines[key].image,"id":$scope.magazines[key].id,"introduction":$scope.magazines[key].introduction,"article":$scope.magazines[key].extracted_file.article,"pages":$pagearray,'extracted_file':$scope.magazines[key].extracted_file});
          });
         $ionicLoading.hide();
        }else{
          //alert('please logot and login again');

          $ionicLoading.hide();
         // $state.go('logout')
        }
        //console.log($scope.magazines);
    });
//first page loaded by this function ends
//$ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();
$ionicLoading.hide();
}
//search function starts
  $scope.search=function($string){
    //console.log($scope.magazines);
   // alert("here")

    //console.log($string)
    if($string==""){
        $scope.searching=false;
    }else{
     $scope.searching=true;
   }
    //console.log($scope.totalrows);
   var myHtml='';
    angular.forEach($scope.totalrows, function(value, key){
      //console.log($scope.totalrows[key].pages)
      console.log($scope.totalrows[key].id)
      $pages=$scope.totalrows[key].pages;
      $pagelist='';
      $found=false;
      downloaded=false;
      $i=0;
      $j=1;

       //filepath=$scope.totalrows[key].extracted_file;
                            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {

                              fs.root.getDirectory(
                                  "Magazine/"+$scope.totalrows[key].id,
                                  {
                                      create: false
                                  },
                                  function(dirEntry) {
                                      dirEntry.getFile(
                                          'index.html',
                                          {
                                              create: false,
                                              exclusive: false
                                          },
                                          function gotFileEntry(fe) {
                                              $ionicLoading.hide();
                                             // console.log(entry.id)
                                              filepath = fe.toURL();
                                              //magazines.push(entry);
                                              //console.log(entry)
                                              downloaded=true;


                                              //$scope.filepath=fs.root.getDirectory+"Magazine/"+$stateParams.id+'index.html';
                                              /*console.log($scope.zipFile);
                                              console.log("Extracting "+ $scope.zipFile);
                                              var ZipClient = new ExtractZipFilePlugin();
                                              ZipClient.extractFile('sdcard/Magazine/'+filename, extractOK, extractError);
                                              //extractZipFile.unzip('cdvfile://localstorage/emulated/0/Magazine/', , extractError);
                                              $scope.filepath*/
                                          },
                                          function(error) {
                                             // $ionicLoading.hide();
                                               downloaded=false;
                                              console.log("Error getting file");
                                          }
                                      );
                                  }
                              );
                          },
                          function() {
                             //$ionicLoading.hide();

                               downloaded=false;
                              console.log("Error requesting filesystem");
                          });




        angular.forEach($pages, function(val, jindex){
         // console.log($pages[jindex]);
          if($pages[jindex].toLowerCase().indexOf($string.toLowerCase())>=0)
                        {
                         // alert(downloaded);
                            if(downloaded){
                                //$pagelist+='<a href="'+filepath+'?page-no='+$j+'" class="btn btn-default inappbrowser"  style="margin:0 5px 5px 0; text-align:left;">Page Number <span class="badge">'+(parseInt(jindex)+1)+'</span><br/> '+$pages[jindex].substr(0,$pages[jindex].indexOf('!!!'))+' </a>';
                                path=filepath;
                            }else{


                              if(window.Connection) {

                                  if(navigator.connection.type == Connection.NONE) {
                                    path='#app/detail/'+$scope.totalrows[key].id;
                                  }else{
                                    path=$scope.totalrows[key].extracted_file;
                                  }
                              }else{
                                  path='#app/detail/'+$scope.totalrows[key].id;
                              }


                            }
                                $pagelist+='<div class="pagelist" onclick="window.open(\''+path+'?page-no='+$j+'\', \'_blank\', \'location=no,presentationstyle=fullscreen,closebuttoncaption=Return,zoom=no\')"><a href="javascript:void();" class=" inappbrowser"><div class="page-no">Page Number <span class="badge">'+(parseInt(jindex)+1)+'</span></div><div class="page-detail"> '+$pages[jindex].substr(0,$pages[jindex].indexOf('!!!'))+'</div></a></div>';

                            $found=true;
                            $i++;
                        }
                        $j++;

                    });

        //console.log($pagelist);
                 if($found && $string!="")
                    {
                      //$scope.thisCanBeusedInsideNgBindHtml = $sce.trustAsHtml(someHtmlVar);
                       myHtml +='<div class="color-red insearch"><a href="#app/detail/'+$scope.totalrows[key].id+'"  id="'+$scope.totalrows[key].id+'" ><img  src="'+$scope.totalrows[key].image+'"></a><div class="pagelists">'+$pagelist+'</div></div>';
                       console.log(myHtml);
                    }

        });

        $scope.myHTML = $sce.trustAsHtml(myHtml);
        //$window.location.reload(true);
         $ionicScrollDelegate.scrollTop();
      //console.log($pages);



  }
//search function ends
});



