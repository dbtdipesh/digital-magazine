angular.module('magazines.services',[]).factory('MagazineFactory',['$http',function($http){
    var url='http://95.211.75.201/~digitalbookshelf/dev/api/';
   /* var headers = {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'Content-Type': 'application/json',
                'Accept': 'application/json'
            };*/

    return {
            getAllMagazines:function(){
               /* return $http.post('http://95.211.75.201/~digitalbookshelf/dev/api/get-all-magazines',{
                    headers:{
                        
                    }});*/
     			return $http.post(url+'get-all-magazines');
            },
            getReleaseById:function(id){
            	//data={id:1};
            	return $http.post(url+'get-release-by-id?id='+id);
            },

            getAllReleasesByMagazineId:function(){

                   

            	//var data={username:'kuber',password:'digital123'};
                // var data =JSON.stringify({username: 'kuber',password:'digital123' });
                 var data =JSON.stringify({magazine_id: '1'});
                //return $http.post('http://localhost/attendance/api/login',data);
               var ret= $http({
                            url: url+'get-all-releases-by-magazine-id?magazine_id=1',
                            method: "get",
                            data: data,
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                            });

                      //  $scope.$apply();

                        return ret; 
                    } 
            }        
        }
    
]);
