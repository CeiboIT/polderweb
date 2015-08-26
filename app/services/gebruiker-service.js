angular.module('polderweb')
  .factory('User',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope, $q, userService)
     {
      var currentUser = userService.get(); //20150801
      var lastId="";
//      var myUser = new TUser();
      var myUser = new TUser();
      return {
        findAll: function () {
			$rootScope.display.userUsername=true; 
			$rootScope.display.userPasswrd=true;
			var defer = $q.defer();
            userService.get().$promise.then(function(res){
                myUser.fromObject({Bedrijf : 0
				                 , Username : 'admin'
								 , Passwrd : '123456'});
          // Service.SvcUser("R", currentUser.username, myUser, function(result) { 
          // we don't need a common username
          Service.SvcUser("R", myUser, function(result) { 
                defer.resolve(result.toObject());
//           alert(JSON.stringify(result.toObject()));
                });
            });
             return defer.promise;
        },
        // a user can only be found be specifying the right username + passwrd 

        getUser: function (userId) {
            var defer = $q.defer();
             userService.get().$promise.then(function(res){
             myUser.fromObject({Bedrijf : 0
			                   ,Username : userId
							   ,Passwrd : '123456'
							   });
             Service.SvcUser("R", myUser, function(result) {
                var data = _.find(result.toObject(), {'Username':userId});
                defer.resolve(data);
           alert(JSON.stringify(data));
             });
            });
            return defer.promise;
        },

        addUser: function (User,Passwrd) {
           userService.get().$promise.then(function(res){
                myUser.fromObject({Bedrijf : res.bedrijf
				                  ,Username : User
								  ,Passwrd : Passwrd});
//                Service.SvcUser("C", currentUser.username, myUser);
                Service.SvcUser("C", myUser);
            });
        },

        updateUser:function(User,Passwrd){
           userService.get().$promise.then(function(res){
                myUser.fromObject({Bedrijf : res.bedrijf
				                       ,Username : User
									   ,Passwrd : Passwrd});
//                Service.SvcUser("U", currentUser.username, myUser);
                Service.SvcUser("U", myUser);
            });
        },

        delUser:function(User,Passwrd){
         userService.get().$promise.then(function(res){
                myUser.fromObject({Bedrijf : res.bedrijf
				                       ,Username : User
									   ,Passwrd : Passwrd});
//             Service.SvcUser("D", currentUser.username, myUser);
             Service.SvcUser("D", myUser);
         });

          // _.remove($rootScope.user,function(users){
          //   return users.user===userId;
          // });
        },
        nextUser:function(userId, cb){
          var index=_.findIndex($rootScope.user, function(users){
            return users.User===userId;
          });
          if(index===-1 || index+1 >= $rootScope.user.length){
           // return cb();
           return cb($rootScope.user[0]);
          }
          return cb($rootScope.user[index+1]);
        },
        preUser:function(userId, cb){
          var index=_.findIndex($rootScope.user, function(users){
            return users.User===userId;
          });
          if(index===-1 || index===0){
           // return cb();
           return cb($rootScope.user[0]);
          }
          return cb($rootScope.user[index-1]);
        }
      };
    }]);
