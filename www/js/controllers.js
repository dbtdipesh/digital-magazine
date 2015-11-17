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
.controller('OfflineMagazineCtrl',function($scope,MagazineFactory,$ionicLoading,$stateParams,$ionicSlideBoxDelegate,$state,$ionicPopup,$ionicPlatform){
   $scope.doRefresh = function() {

 MagazineFactory.getAllReleasesByMagazineId().success(function(cdata){
       console.log(cdata);
       if(cdata.message=='Succes'){


        

        var magazines=[];

       cdata.data.forEach(function(entry) {
        console.log(entry.id)
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
                        console.log(entry.id)
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
    }).error(function(err){
      alert('err');
     // $state.go('login');
     // $ionicLoading.hide();

    });

     $scope.$broadcast('scroll.refreshComplete'); 
  };




  
   MagazineFactory.getAllReleasesByMagazineId().success(function(cdata){
       console.log(cdata);
       if(cdata.message=='Succes'){


        

        var magazines=[];

       cdata.data.forEach(function(entry) {
        console.log(entry.id)
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
                        console.log(entry.id)
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
    }).error(function(err){
      alert('err');
     // $state.go('login');
     // $ionicLoading.hide();

    });
})
.controller('MagazineCtrl',function($scope,MagazineFactory,$ionicLoading,$stateParams,$ionicSlideBoxDelegate,$state,$ionicPopup,$ionicPlatform){
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
  MagazineFactory.getReleaseById($stateParams.id).then(function(cdata){
       //console.log(cdata);
       if(cdata.data.message=='Success'){
         $scope.magazine=cdata.data.data;

         console.log(cdata.data)
        
         $scope.file={"file":cdata.data.data.extracted_file} 

         $scope.onlinepath=$scope.file.file;

         var statusDom; 
         var url=cdata.data.data.zip_file;


         var filename = url.substring(url.lastIndexOf('/')+1);
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
}
function extractOK(status)
{
    console.log("extractOK");
}

function extractError(error)
{ 
    console.log("extractError "+error);
}

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
})
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



*//*
.controller("FileController", function($scope, $ionicLoading,$q) {
 
console.log('file controller')
$scope.download = function() {
  console.log('download called')
    $ionicLoading.show({
      template: 'Loading...'
    });
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
        fs.root.getDirectory(
            "ExampleProject",
            {
                create: true
            },
            function(dirEntry) {
                dirEntry.getFile(
                    "test.png", 
                    {
                        create: true, 
                        exclusive: false
                    }, 
                    function gotFileEntry(fe) {
                        var p = fe.toURL();
                        fe.remove();
                        ft = new FileTransfer();
                        ft.download(
                            encodeURI("https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/2/000/058/15a/33b3b0e.jpg"),
                            p,
                            function(entry) {
                                $ionicLoading.hide();
                                $scope.imgFile = entry.toURL();
                            },
                            function(error) {
                                $ionicLoading.hide();
                                alert("Download Error Source -> " + error.source);
                            },
                            false,
                            null
                        );
                    }, 
                    function() {
                        $ionicLoading.hide();
                        console.log("Get file failed");
                    }
                );
            }
        );
    },
    function() {
        $ionicLoading.hide();
        console.log("Request for filesystem failed");
    });
}
 
    

$scope.load = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
        fs.root.getDirectory(
            "ExampleProject",
            {
                create: false
            },
            function(dirEntry) {
                dirEntry.getFile(
                    "test.png", 
                    {
                        create: false, 
                        exclusive: false
                    }, 
                    function gotFileEntry(fe) {
                        $ionicLoading.hide();
                        $scope.imgFile = fe.toURL();
                    }, 
                    function(error) {
                        $ionicLoading.hide();
                        console.log("Error getting file");
                    }
                );
            }
        );
    },
    function() {
        $ionicLoading.hide();
        console.log("Error requesting filesystem");
    });
}



})*/