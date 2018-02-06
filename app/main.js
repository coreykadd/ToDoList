//main.js
var Todo = angular.module('todo', []);

function mainController($scope, $http) {
    $scope.formData = {};

    //When on page, show all todos
    $http.get('/api/todos')
    .success(function(data){
        $scope.todos = data;
        console.log(data);
    })
    .error(function(data){
        console.log('Error ' + data);
    });

    //When submitting add form and send text to api
    $scope.createTodo = function(){
        $http.post('api/todos', $scope.formData)
        .success(function(data){
            $scope.formData = {};
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data){
            console.log('Error ' + data);
        });
    };

    //Delete a todo after checking it
    $scope.deleteTodo = function(){
        $http.delete('/api/todos/' + id)
        .success(function(data){
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data){
            console.log('Error ' + data);
        });
    };
}