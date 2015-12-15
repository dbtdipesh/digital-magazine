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
   $scope.logout = function() {

    AuthService.logout();
    $state.go('login');
  };
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
         $ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();
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
        //console.log(entry.id)
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
         console.log($scope.offlinemagazine.length);
        // console.log($scope.offlinemagazine)
         $scope.loopcount=Math.ceil($scope.offlinemagazine.length/4);
         console.log($scope.loopcount);
        

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
.controller('MagazineCtrl',function($scope,MagazineFactory,Releases,$ionicLoading,$stateParams,$ionicSlideBoxDelegate,$state,$ionicPopup,$ionicPlatform,$cordovaSQLite,$ionicPlatform,$http,$ionicHistory){



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

  if($stateParams.id!=undefined){
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
                alert('code: '    + error.code    + '\n' +
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
       //console.log(cdata.length);
       if(cdata.id){
         $scope.magazine=cdata;

        // console.log(cdata)
        $scope.newversion =cdata.version;
         $scope.file={"file":cdata.extracted_file};

         if(window.Connection) {

              if(navigator.connection.type == Connection.NONE) {
                  $scope.connection=false;
              }else{
                $scope.connection=true;


                MagazineFactory.getReleaseById($stateParams.id).success(function(onlinedata){
                  console.log(onlinedata.data.version);
                  $scope.newversion=onlinedata.data.version;
                });
              }

            }

         $scope.onlinepath=$scope.file.file;

         var statusDom; 
         var zurl=cdata.zip_file;
        // console.log(url);


         var filename = zurl.substring(zurl.lastIndexOf('/')+1);
         $scope.oldversion =cdata.version;
         //console.log(filename);
        // $scope.filepath='Magazine/index.html';
         //console.log($scope.filepath);

        /* File extStore = Environment.getExternalStorageDirectory();
          File myFile = new File(extStore.getAbsolutePath() + "/Magazine/"+$stateParams.id+'/'+index.html);

          if(myFile.exists()){
              alert('exists')
              $scope.downloaded=true;
          }else{
            $scope.downloaded=false;
          }*/

         /* $cordovaFile.checkDir(cordova.file.externalRootDirectory, "/Magazine/"+$stateParams.id+'/'+index.html)
            .then(function (success) {
              alert('exists')
              $scope.downloaded=true;
            }, function (error) {
              $scope.downloaded=false;
            });*/
          $scope.downloaded=false;


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
                                fe.remove();
                                ft = new FileTransfer();
                               /* statusDom = document.querySelector('#status');
                                ft.onprogress = function(progressEvent) {
                                    if (progressEvent.lengthComputable) {
                                      var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                                      statusDom.innerHTML = perc + "% loaded...";
                                    } else {
                                      if(statusDom.innerHTML == "") {
                                        statusDom.innerHTML = "Loading";
                                      } else {
                                        statusDom.innerHTML += ".";
                                      }
                                    }
                                  };*/

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

                                        console.log("Extracting "+ $scope.zipFile);
                                        var ZipClient = new ExtractZipFilePlugin();
                                        ZipClient.extractFile('sdcard/Magazine/'+$stateParams.id+'/'+filename, extractOK, extractError);
                                        $scope.filepath = fe.toURL();
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
                                        alert("Download Error Source -> " + error.source);
                                    },
                                    false,
                                    null
                                );
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

        function extractOK(status)
        {
            console.log("extractOK");
        };

        function extractError(error)
        { 
            console.log("extractError "+error);
        };


        //check if magazine is in phonememory
         window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
              fs.root.getDirectory(
                  "Magazine/"+$stateParams.id,
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
                              $scope.filepath = fe.toURL();
                              $scope.downloaded=true;
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





         /*JSZipUtils.getBinaryContent('resources/Archive.zip', function(err, data) {
          if(err) {
            throw err; // or handle err
            
          }
         var zip = new JSZip(data);
          //console.log(zip.file('test.html').asText());
          var text=zip.file('index.html').asText();
          console.log(text);
          text.replace('javascript/','js/');
          $scope.content=text;
          console.log(text)
          //$('#test').html(index);
        });*/




      /*  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
      filesystem = fs;
      zipPath = fs.root.fullPath + filename
      resourceURL = zipPath;
      var fileTransfer = new FileTransfer();

      fileTransfer.download(url, zipPath, function (entry) {
               console.log(entry.fullPath+"  Hello!"); // entry is fileEntry object
               
               var loader = new ZipLoader(entry.fullPath);
                $.each(loader.getEntries(entry.fullPath), function(i, entry) {
                console.log("Name: "+ entry.name()+ " Size: "+ entry.size+ " is Directory: "+ entry.isDirectory());
                });

                }, function (error) {
                    console.log("Some error");
              });

        }, function (error) {
               console.log("Some error");
      });
*/




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

          $ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();
         $ionicLoading.hide();
        }
        //console.log($scope.magazines);
    })
}else{


  $scope.doRefresh = function() {



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
                 //console.log(cdata);

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
                                                         var insertquery = "INSERT OR REPLACE INTO magazines (id, article,extracted_file,image,introduction,issued_date,name,subscribed,update_time,zip_file,deleted) VALUES (?,?,?,?,?,?,?,?,?,?,0)";

                                                    $cordovaSQLite.execute(db, insertquery, [entry.id, entry.article,entry.extracted_file,imgFile,entry.introduction,entry.issued_date,entry.name,entry.subscribed,entry.update_time,entry.zip_file]).then(function(res) {
                                                        console.log("INSERT ID -> " + res.insertId+">>"+imgFile);
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
                       $ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();
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
        $ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();
         $ionicLoading.hide();
        }else{
          //alert('please logot and login again');

          $ionicLoading.hide();
         // $state.go('logout')
        }
        //console.log($scope.magazines);
    })
//first page loaded by this function ends
$ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();
$ionicLoading.hide();
}

})

 
    
