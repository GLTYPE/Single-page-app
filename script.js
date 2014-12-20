// TODO: Change it in prod
var BASE_API = "http://localhost:4242";

var gltypeApp = angular.module('gltypeApp', ['ngRoute', 'xeditable', 'ngCookies']);


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

            .when('/add/ingredient', {
                templateUrl : 'pages/ingredients-add.html',
                controller  : 'ingredientController'
            })

            .when('/edit/ingredient/:ingredientId', {
                templateUrl : 'pages/ingredients-edit.html',
                controller  : 'ingredientController'
            })
            
            .when('/receipe/:receipeId', {
                templateUrl : 'pages/receipes.html',
                controller  : 'receipeController'
            })

            .when('/add/receipe', {
                templateUrl : 'pages/receipes-add.html',
                controller  : 'receipeController'
            })

            .when('/edit/receipe/:receipeId', {
                templateUrl : 'pages/receipes-edit.html',
                controller  : 'receipeController'
            })
            
            .when('/product/:productId', {
                templateUrl : 'pages/products.html',
                controller  : 'productController'
            })
            
            .when('/edit/product/:productId', {
                templateUrl : 'pages/products-edit.html',
                controller  : 'productController'
            })

            .when('/add/product', {
                templateUrl : 'pages/products-add.html',
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
        $scope.isConnected = ($cookieStore.get('TOKEN') == undefined || $cookieStore.get('TOKEN') == null) ? 1 : 0;
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
		        			$cookieStore.put("TOKEN", data.token.slice(1, -1));
		        			$cookieStore.put("email", person.email);
		        			$cookieStore.put("role", data.role);
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

gltypeApp.controller('ingredientController', function($scope, $http, $cookieStore, $routeParams) {

	$scope.ing = {};
	if ($routeParams.ingredientId != undefined)
		{
			$scope.id = $routeParams.ingredientId;
			$scope.ing.id = $routeParams.ingredientId;
			$http({
	            url: BASE_API + "/ingredients/"+$routeParams.ingredientId,
	            dataType: 'json',
	            method: 'GET',
	            data: {
	            	token: $cookieStore.get("TOKEN")
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
	        	$scope.values = data.values;
	        	$scope.ing.values= data.values;
	        })
	    	.error(function (data, status, headers, config) {
	            alert(data);
	        });
		}
	
    //Add Ingredient
    $scope.add_ingredient = function ($ingredient)
    {
      var datas = {
        	token:		$cookieStore.get("TOKEN"),
          	name:			$ingredient.name,
          	picture:		$ingredient.picture,
          	description:	$ingredient.description,
          	values:			$ingredient.values
      };
      
       $http({
            url: BASE_API + "/ingredients",
            dataType: 'json',
            method: 'POST',
            data: datas,
            headers: {
                "Content-Type": "application/json"
            }})
            .success(function (data, status, headers, config) {
    			alert("Add done");
        	})
        	.error(function (data, status, headers, config) {
                alert(data);
            });
    }; 
    
    //Update ingredient
    $scope.edit_ingredient = function ($ingredient)
    {
      var datas = {
        	token:		$cookieStore.get("TOKEN"),
          	name:			$ingredient.name,
          	picture:		$ingredient.picture,
          	description:	$ingredient.description,
          	values:			$ingredient.values
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

gltypeApp.controller('receipeController', function($scope, $http, $cookieStore, $routeParams) {
	$scope.receipe = {};
	if ($routeParams.receipeId != undefined)
		{
			$scope.id = $routeParams.receipeId;
			$scope.ing.id = $routeParams.receipeId;
			$http({
	            url: BASE_API + "/receipes/"+$routeParams.receipeId,
	            dataType: 'json',
	            method: 'GET',
	            data: {
	            	token: $cookieStore.get("TOKEN")
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
	        	$scope.values = data.values;
	        	$scope.ing.values= data.values;
	        })
	    	.error(function (data, status, headers, config) {
	            alert(data);
	        });

            $http({
                url: BASE_API + "/ingredients",
                dataType: 'json',
                method: 'GET',
                data: {
                    token: $cookieStore.get("TOKEN")
                },
                headers: {
                    "Content-Type": "application/json"
                }})
            .success(function (data, status, headers, config) {
                $scope.ingr.name = data.name;
                $scope.ingr.picture= data.picture;
                $scope.ingr.description = data.description;
                $scope.ingr.values= data.values;
            })
            .error(function (data, status, headers, config) {
                alert(data);
            });
		}
	
	
    //Update Receipe
    $scope.edit_receipe = function ($receipe)
    {
      var datas = {
        	token:		$cookieStore.get("TOKEN"),
          	name:			$receipe.name,
          	picture:		$receipe.picture,
          	description:	$receipe.description,
          	values:			$receipe.values
      };
      
       $http({
            url: BASE_API + "/receipes/"+$routeParams.receipeId,
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
    
    //Add Receipe
    $scope.add_receipe = function ($receipe)
    {
      var datas = {
        	token:		$cookieStore.get("TOKEN"),
          	name:			$receipe.name,
          	picture:		$receipe.picture,
          	description:	$receipe.description,
          	values:			$receipe.values,
          	ing: {}
      };
      
       $http({
            url: BASE_API + "/receipes",
            dataType: 'json',
            method: 'POST',
            data: datas,
            headers: {
                "Content-Type": "application/json"
            }})
            .success(function (data, status, headers, config) {
    			alert("Add done");
        	})
        	.error(function (data, status, headers, config) {
                alert(data);
            });
    }; 
	
});

gltypeApp.controller('productController', function($scope, $http, $cookieStore, $routeParams) {
    $scope.product= {};
    if ($routeParams.productId != undefined)
    	{
    	$scope.id = $routeParams.productId;
    	$scope.product.id = $routeParams.productId;
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
	        	$scope.values = data.values;
	        	$scope.product.values= data.values;
	        })
	    	.error(function (data, status, headers, config) {
	            alert(data);
	        });
    	}
       	
	
    //Update product
    $scope.edit_product = function ($product)
    {
      var datas = {
        	token:		$cookieStore.get("TOKEN"),
          	name:			$product.name,
          	picture:		$product.picture,
          	description:	$product.description,
          	values:			$product.values,
          	brand:			$product.brand
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
    
    //Add product
    $scope.add_product = function ($product)
    {
      var datas = {
        	token:		$cookieStore.get("TOKEN"),
          	name:			$product.name,
          	picture:		$product.picture,
          	description:	$product.description,
          	values:			$product.values,
          	brand:			$product.brand
      };
      
       $http({
            url: BASE_API + "/products",
            dataType: 'json',
            method: 'POST',
            data: datas,
            headers: {
                "Content-Type": "application/json"
            }})
            .success(function (data, status, headers, config) {
    			alert("Add done");
        	})
        	.error(function (data, status, headers, config) {
                alert(data);
            });
    }; 
    
});

