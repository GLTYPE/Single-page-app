﻿// TODO: Change it in prod
var BASE_API = "http://localhost:4242";

﻿var gltypeApp = angular.module('gltypeApp', ['ngRoute', 'xeditable', 'ngCookies']);


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
            
            .when('/ingredient/:ingredientId', {
                templateUrl : 'pages/ingredients.html',
                controller  : 'ingredientController'
            })

            .when('/product/:productId', {
                templateUrl : 'pages/products.html',
                controller  : 'productController'
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

gltypeApp.controller('mainController', function($scope, $http, $cookieStore) {
		$scope.webmaster = "Gilles TUAL";
        $scope.isConnected = ($cookieStore.get('TOKEN') == undefined) ? 0 : 1;
        $scope.user = "sirRoux";
        $scope.role = "Food Supplier";
        $scope.profilpic = "./img/tual_g.jpg";
        $scope.locate = "index";
        $scope.icon = "./img/iconme.png";
});

gltypeApp.controller('userController', function($scope, $http, $cookieStore)
		{
	
	    $scope.new_user = {};
	
	    //Register User to the API
	    $scope.register = function (person)
	    {
	      var datas = {
	        	firstname:	person.firstname,
	        	lastname:	person.lastname,
	        	picture:	person.picture,
	        	email:		person.email,
	        	about:		person.about,
	        	role:		person.role,
	        	password:	person.password
	        };
	      $http({
	            url: BASE_API + "/users",
	            dataType: 'json',
	            method: 'POST',
	            data: datas,
	            headers: {
	                "Content-Type": "application/json"
	            }})
	            .success(function (data, status, headers, config) {
	                alert(data);
	            }).error(function (data, status, headers, config) {
	                alert(data);
	            });
	    	};
	
	    //Log in a User
	    $scope.login = function (person)
	    {
	      var datas = {
	        	email:		person.email,
	        	password:	person.password
	      };
	      
	       $http({
	            url: BASE_API + "/users/connect",
	            dataType: 'json',
	            method: 'POST',
	            data: datas,
	            headers: {
	                "Content-Type": "application/json"
	            }})
	            .success(function (data, status, headers, config) {
	            	if (status == 400)
		        		alert(data);
		        	else if (status == 200)
		        		{
		        			alert("done");
		        			$cookieStore.put("TOKEN", data.slice(1, -1));
		        			$cookieStore.put("email", person.email);
		        			$cookieStore.put("password", person.password);
		        		}
            	})
            	.error(function (data, status, headers, config) {
	                alert(data);
	            });
	    };
	    
	    //Log out a User
	    $scope.logout = function ()
	    {
	      var datas = {
	        	token:		$cookieStore.get("TOKEN")
	      };
	      
	       $http({
	            url: BASE_API + "/users/disconnect",
	            dataType: 'json',
	            method: 'POST',
	            data: datas,
	            headers: {
	                "Content-Type": "application/json"
	            }})
	            .success(function (data, status, headers, config) {
        			alert("done");
        			$cookieStore.remove("TOKEN");
            	})
            	.error(function (data, status, headers, config) {
	                alert(data);
	            });
	    };
	
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

gltypeApp.controller('profilController', function($scope, $http, $cookieStore) {
        $scope.webmaster = "Gilles TUAL";
        $scope.user = {};
	    $http({
            url: BASE_API + "/users/token/"+$cookieStore.get("TOKEN"),
            dataType: 'json',
            method: 'GET',
            data: {token:		$cookieStore.get("TOKEN")},
            headers: {
                "Content-Type": "application/json"
            }})
            .success(function (data, status, headers, config) {
            	$scope.firstname = data.firstname;
            	$scope.user.email = data.firstname;
            	$scope.lastname = data.lastname;
            	$scope.user.lastname = data.lastname;
            	$scope.picture = data.picture;
            	$scope.user.picture = data.picture;
            	$scope.email = data.email;
            	$scope.user.email = data.email;
            	$scope.about = data.about;           	
            	$scope.user.about = data.about;
            	$scope.role = (data.role == 1) ? "Consumer" : (data.role == 2) ? "Food supplier" : (data.role == 3) ? "Gastronomist" : "Admin";
            	$scope.moments = data.moments;
            })
        	.error(function (data, status, headers, config) {
                alert(data);
            });
	       
	       
		    //Update User
		    $scope.update_profil = function ($user)
		    {
		      var datas = {
		        	token:		$cookieStore.get("TOKEN"),
		          	picture:	$user.picture,
		          	email:		$user.email,
		          	about:		$user.about
		      };
		      
		      if ($user.password != "")
		    	  datas['password'] = $user.password;
		       $http({
		            url: BASE_API + "/users/token/"+$cookieStore.get("TOKEN"),
		            dataType: 'json',
		            method: 'PUT',
		            data: datas,
		            headers: {
		                "Content-Type": "application/json"
		            }})
		            .success(function (data, status, headers, config) {
	        			alert("Edition done");
	            	})
	            	.error(function (data, status, headers, config) {
		                alert(data);
		            });
		    };
	       
    });

gltypeApp.controller('ingredientController', function($scope, $http, $cookieStoren, $routeParams) {

    $scope.ing= {};
    $http({
        url: BASE_API + "/ingredients/"+$routeParams.ingredientId,
        dataType: 'json',
        method: 'GET',
        data: {
        	token:		$cookieStore.get("TOKEN"),
        	id:			$scope.ingredientId        	
        },
        headers: {
            "Content-Type": "application/json"
        }})
        .success(function (data, status, headers, config) {
        	$scope.name = data.name;
        	$scope.ing.name= data.name;
        	$scope.picture= data.picture;
        	$scope.ing.picture= data.picture;
        	$scope.description = data.description;
        	$scope.ing.description = data.description;
        	$scope.value = data.value;
        	$scope.ing.value= data.value;
        })
    	.error(function (data, status, headers, config) {
            alert(data);
        });
       	
	
    //Update product
    $scope.edit_ing = function ($ing)
    {
      var datas = {
        	token:		$cookieStore.get("TOKEN"),
          	name:	$ing.name,
          	picture:	$ing.picture,
          	description:		$ing.description,
          	value:		$ing.value
      };
      
       $http({
            url: BASE_API + "/ingredients/"+$routeParams.ingredientId,
            dataType: 'json',
            method: 'PUT',
            data: datas,
            headers: {
                "Content-Type": "application/json"
            }})
            .success(function (data, status, headers, config) {
    			alert("Edition done");
        	})
        	.error(function (data, status, headers, config) {
                alert(data);
            });
    };
	
});

gltypeApp.controller('productController', function($scope, $http, $cookieStore, $routeParams) {
    $scope.product= {};
    $http({
        url: BASE_API + "/products/"+$routeParams.productId,
        dataType: 'json',
        method: 'GET',
        data: {
        	token:		$cookieStore.get("TOKEN"),
        },
        headers: {
            "Content-Type": "application/json"
        }})
        .success(function (data, status, headers, config) {
        	$scope.name = data.name;
        	$scope.product.name= data.name;

        	$scope.name = data.brand;
        	$scope.product.brand = data.brand;

        	
        	$scope.picture= data.picture;
        	$scope.product.picture= data.picture;
        	$scope.description = data.description;
        	$scope.product.description = data.description;
        	$scope.value = data.value;
        	$scope.product.value= data.value;
        })
    	.error(function (data, status, headers, config) {
            alert(data);
        });
       	
	
    //Update product
    $scope.edit_product = function ($product)
    {
      var datas = {
        	token:		$cookieStore.get("TOKEN"),
          	name:	$product.name,
          	picture:	$product.picture,
          	description:		$product.description,
          	value:		$product.value,
          	brand:		$product.brand
      };
      
       $http({
            url: BASE_API + "/products/"+$routeParams.productId,
            dataType: 'json',
            method: 'PUT',
            data: datas,
            headers: {
                "Content-Type": "application/json"
            }})
            .success(function (data, status, headers, config) {
    			alert("Edition done");
        	})
        	.error(function (data, status, headers, config) {
                alert(data);
            });
    };
    
});
