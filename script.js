var gltypeApp = angular.module('gltypeApp', ['ngRoute', 'xeditable']);



gltypeApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            })

            // route for the search page
            .when('/search', {
                templateUrl : 'pages/search.html',
                controller  : 'searchController'
            })

            .when('/food', {
                templateUrl : 'pages/food.html',
                controller  : 'foodController'
            })

            .when('/admin', {
                templateUrl : 'pages/admin.html',
                controller  : 'adminController'
            })

            .when('/promote', {
                templateUrl : 'pages/promote.html',
                controller  : 'promoteController'
            })

            .when('/stats', {
                templateUrl : 'pages/stats.html',
                controller  : 'statsController'
            })

            // route for the profil page
            .when('/profil', {
                templateUrl : 'pages/profil.html',
                controller  : 'profilController'
            });

    });

gltypeApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

gltypeApp.controller('mainController', function($scope) {
		$scope.webmaster = "Gilles TUAL";
        $scope.isConnected = 0;
        $scope.user = "sirRoux";
        $scope.role = "Food Supplier";
        $scope.profilpic = "./img/tual_g.jpg";
        $scope.locate = "index";
        $scope.icon = "./img/iconme.png";
        $scope.connect = function(){
            if ($scope.isConnected == 0)
                $scope.isConnected = 1;
            else
                $scope.isConnected = 0;
        }
	});

gltypeApp.controller('aboutController', function($scope) {
		$scope.webmaster = "Gilles TUAL";
		$scope.members = [{firstname:'Gilles', lastname:'TUAL', img: './img/tual_g.jpg', role: 'Project Leader / Designer', age:'22'},
        {firstname: '一同', lastname:'王', img: './img/empty.jpg', role: 'Android Developer', age:'24'},
        {firstname: 'Thomas', lastname:'LACROIX', img: './img/empty.jpg', role: 'Web Developer', age:'21'},
        {firstname: 'Morgan', lastname:'', img: './img/empty.jpg', role: 'Android Developer', age:'?'},
        {firstname: 'Pierre', lastname:'MEDARD', img: './img/empty.jpg', role: 'API Developer', age:'21'},
        {firstname: 'Yan', lastname:'', img: './img/empty.jpg', role: 'Android Developer', age:'?'}];
    });

gltypeApp.controller('contactController', function($scope) {
   		$scope.webmaster = "Gilles TUAL";
    });

gltypeApp.controller('searchController', function($scope) {
        $scope.foodDummy = [{type:'Recipe', name:'Phare Breton', img: './img/food.jpg', desc: 'A good dessert !'},
        {type:'Food', name:'Apple', img: './img/apple.jpg', desc: 'The best fruit ! Ask to newton !'}];
    });

gltypeApp.controller('foodController', function($scope) {
        $scope.foodDummy = [{type:'Recipe', name:'Phare Breton', img: './img/food.jpg', desc: 'A good dessert !'},
        {type:'Food', name:'Apple', img: './img/apple.jpg', desc: 'The best fruit ! Ask to newton !'}];
    });

gltypeApp.controller('adminController', function($scope) {

    });

gltypeApp.controller('promoteController', function($scope) {

    });

gltypeApp.controller('statsController', function($scope) {

    });

gltypeApp.controller('profilController', function($scope) {
        $scope.webmaster = "Gilles TUAL";
        $scope.bio = "I'm a professional food supplier with many prizes. Last one was nobel price. I'm awesome !";
    });

