'use strict';

/* Controllers */

function IndexCtrl($scope, $http) {
  $http.get('/api/posts').
    success(function(data, status, headers, config) {
      $scope.posts = data.posts;
    });
}

function AddPostCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.submitPost = function () {
    $http.post('/api/post', $scope.form). 
      success(function(data) {
        console.log('OK');
        $location.path('/'); 
      });
  };
}

function ReadPostCtrl($scope, $http, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.form = data.post;
    });
 
  $scope.editPost = function() {
    console.log('Editing the controller!');
    $http.put('/api/post/' + $routeParams.id, $scope.form).
      success(function(data) {
        $scope.form = data.post;
        $location.url('/readPost/' + $routeParams.id);
      });
  };
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });

  $scope.deletePost = function() {
    $http.delete('/api/post/' + $routeParams.id).
      success(function(data) {
        $location.url('/');
        console.log('Deleted!');
      });
  };

  $scope.home = function() {
    $location.url('/');
  };
}
