//ajouter les controlleurs après leur création ici :
var userApp = angular.module('userApp', ['appRoutes','userControllers','userServices', 'ngAnimate', 'mainController', 'managementController', 'authServices'])  //appRoutes est injecté depuis routes.js


.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptors');
});
/*
.config(function(){
console.log('testing app.js')
});

*/