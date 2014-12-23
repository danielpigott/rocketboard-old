var rocketboardApp = angular.module('rocketboardApp', []);

rocketboardApp.controller('UserController', ['$http',function ($http) {
    var self = this;
    self.users = [];
    $http.get('/users').success(function(data) {
        angular.forEach(data, function (user) {
            user.score = parseFloat(user.score);
            self.users.push(user);
        });
    });
    self.addPoint = function(user) {
        console.log('adding point');
        var index =  _.findIndex(self.users, function(u) {
            return u.member == user.member;
        });
        $http.post('/users/' + user.member + '/updatescore', {score : 1}).
              success(function(data, status, headers, config) {
                  // this callback will be called asynchronously
                  // when the response is available
                  self.users[index].score = parseInt(self.users[index].score,10) +  1;
              }).
              error(function(data, status, headers, config) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
              });
    };
    self.deleteUser = function(user) {
        var index =  _.findIndex(self.users, function(u) {
            return u.member == user.member;
        });
        $http.delete('/users/' + user.member).
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                self.users.splice(index, 1);
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
             });
    };

}]);
