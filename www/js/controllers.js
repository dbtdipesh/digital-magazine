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
.controller('OfflineMagazineCtrl',function($scope,Releases,MagazineFactory,$ionicLoading,$stateParams,$ionicSlideBoxDelegate,$state,$ionicPopup,$ionicPlatform){
   $scope.doRefresh = function() {

 Releases.all().then(function(cdata){
       console.log(cdata);
       if(cdata.length>0){


        

        var magazines=[];

       cdata.forEach(function(entry) {
        console.log(entry.magazine_id)
          window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
            console.log(entry.magazine_id)
        fs.root.getDirectory(
            "Magazine/"+entry.magazine_id,
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
                        console.log(entry.magazine_id)
                        //$scope.filepath = fe.toURL();
                        magazines.push(entry);
                        console.log(entry)
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
       
        console.log(magazines);
         $scope.offlinemagazine=magazines;//JSON.stringify(magazines);
        // console.log($scope.offlinemagazine)
        // $scope.loopcount=Math.ceil($scope.offlinemagazine.length/4);
         //console.log(cdata.data);
        $ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();


         
        }else{
          alert('please logot and login again');

         // $ionicLoading.hide();
         // $state.go('login')
        }
        //console.log($scope.magazines);
    });

     $scope.$broadcast('scroll.refreshComplete'); 
  };




  
   Releases.all().then(function(cdata){
       console.log(cdata);
       if(cdata.length>0){


        var magazines=[];

       cdata.forEach(function(entry) {
        console.log(entry.id)
          window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
            console.log(entry.magazine_id)
        fs.root.getDirectory(
            "Magazine/"+entry.magazine_id,
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
                        console.log(entry.magazine_id)
                        //$scope.filepath = fe.toURL();
                        magazines.push(entry);
                        console.log(entry)
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
       
        console.log(magazines);
         $scope.offlinemagazine=magazines;//JSON.stringify(magazines);
        // console.log($scope.offlinemagazine)
        // $scope.loopcount=Math.ceil($scope.offlinemagazine.length/4);
         //console.log(cdata.data);
        $ionicSlideBoxDelegate.$getByHandle('epub-viewer').update();


         
        }else{
          alert('please logout and login again');

         // $ionicLoading.hide();
         // $state.go('login')
        }
        //console.log($scope.magazines);
    });
})
.controller('MagazineCtrl',function($scope,MagazineFactory,Releases,$ionicLoading,$stateParams,$ionicSlideBoxDelegate,$state,$ionicPopup,$ionicPlatform,$cordovaSQLite){
   


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

  if($stateParams.id!=undefined){
 $ionicLoading.hide();
  Releases.get($stateParams.id).then(function(cdata){
       console.log(cdata.length);
       if(cdata.magazine_id){
         $scope.magazine=cdata;

         //console.log(cdata)
        
         $scope.file={"file":cdata.extracted_file} 

         $scope.onlinepath=$scope.file.file;

         var statusDom; 
         var url=cdata.zip_file;


         var filename = url.substring(url.lastIndexOf('/')+1);
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
                                    encodeURI(url),
                                    p,
                                    function(entry) {
                                        $ionicLoading.hide();
                                        $scope.zipFile = entry.toURL();
                                        console.log($scope.zipFile);
                                        $ionicLoading.show({
                                            template: 'Installing...'
                                          });

                                        console.log("Extracting "+ $scope.zipFile);
                                        var ZipClient = new ExtractZipFilePlugin();
                                        ZipClient.extractFile('sdcard/Magazine/'+$stateParams.id+'/'+filename, extractOK, extractError);
                                        $scope.filepath = fe.toURL();
                                        $ionicLoading.hide();
                                         $scope.downloaded=true;
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
};
function extractOK(status)
{
    console.log("extractOK");
};

function extractError(error)
{ 
    console.log("extractError "+error);
};

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
                        console.log($scope.zipFile);
                        console.log("Extracting "+ $scope.zipFile);
                        var ZipClient = new ExtractZipFilePlugin();
                        ZipClient.extractFile('sdcard/Magazine/'+filename, extractOK, extractError);
                        //extractZipFile.unzip('cdvfile://localstorage/emulated/0/Magazine/', , extractError);
                        $scope.filepath
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
                }else{
               

               MagazineFactory.getAllReleasesByMagazineId().success(function(cdata){
                 //console.log(cdata);
                // alert('test');

                 if(cdata.message=='Succes'){
                    var selquery = "Delete from magazines";
                        $cordovaSQLite.execute(db, selquery, []).then(function(res) {
                          console.log('delete all');
                        });



                   
                   cdata.data.forEach(function(entry) {
                      var filename=entry.id+".jpg";
                      //console.log(entry.id)
                     var selquery = "SELECT * FROM magazines WHERE magazine_id = ?";
                        $cordovaSQLite.execute(db, selquery, [entry.id]).then(function(res) {
                            if(res.rows.length > 0) {
                                console.log("SELECTED -> " + res.rows.item(0).name + " " + res.rows.item(0).image);
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
                                    function(entry) {
                                        $ionicLoading.hide();
                                        $scope.imgFile = entry.toURL();
                                        console.log($scope.imgFile);
                                        
                                        $ionicLoading.hide();
                                      
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

                                //insert cover image ends


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

     Releases.all().then(function(cdata){
       console.log(cdata.length);
       if(cdata.length>0){
         $scope.magazines=cdata;
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


//first page loaded by this function starts
  Releases.all().then(function(cdata){
       console.log(cdata);
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

}

})

 
    
