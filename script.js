// TODO: Change it in prod
var BASE_API = "http://localhost:4242";

var gltypeApp = angular.module('gltypeApp', ['ngRoute', 'xeditable', 'ngCookies', 'bnx.module.facebook']);


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

        .when('/add/moments', {
            templateUrl : 'pages/moment-add.html',
            controller  : 'profilController'
        })

        .when('/edit/ingredient/:ingredientId', {
            templateUrl : 'pages/ingredients-edit.html',
            controller  : 'ingredientController'
        })

        .when('/all/ingredient', {
            templateUrl : 'pages/allingredient.html',
            controller  : 'allIngredientController'
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

        .when('/all/receipe', {
            templateUrl : 'pages/allreceipe.html',
            controller  : 'allReceipeController'
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

        .when('/all/product', {
            templateUrl : 'pages/allproduct.html',
            controller  : 'allProductController'
        })

        // route for the profil page
        .when('/profil', {
            templateUrl : 'pages/profil.html',
            controller  : 'profilController'
        })

        .when('/profil/:id', {
            templateUrl : 'pages/userprofil.html',
            controller  : 'userprofilController'
        });

});

gltypeApp.run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

gltypeApp.controller('mainController', function($scope, $http, $cookieStore) {
    $scope.user = {};
    $scope.webmaster = "Gilles TUAL";
    $scope.isConnected = ($cookieStore.get('TOKEN') == undefined || $cookieStore.get('TOKEN') == null) ? 1 : 0;
    $scope.locate = "index";

    if ($cookieStore.get("TOKEN") != undefined)
        $http({
            url: BASE_API + "/users/token/"+$cookieStore.get("TOKEN"),
            dataType: 'json',
            method: 'GET',
            data: {token:       $cookieStore.get("TOKEN")},
            headers: {
                "Content-Type": "application/json"
            }})
            .success(function (data, status, headers, config) {
                $scope.picture = data.picture;
                $scope.user.picture = data.picture;
                $scope.email = data.email;
                $scope.user.email = data.email;
            })
            .error(function (data, status, headers, config) {
                alert(data);
            });
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
                $("#registerModalSuccess").modal({
                    keyboard: true
                })
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
                    $cookieStore.put("TOKEN", data.token);
                    $cookieStore.put("email", person.email);
                    $cookieStore.put("role", data.role);
                    window.location.reload();
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
                window.location.reload();
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

gltypeApp.controller('searchController', function($scope, $http, $cookieStore) {
    $scope.form_search = {};
    $scope.receipes = {};
    $scope.products = {};
    $scope.ingredients = {};
    $scope.users = {};

    //search
    $scope.search_data = function ($form_search)
    {
        if ($form_search.choose == "user") {
            $http({
                url: BASE_API + "/users/name/" + $form_search.name,
                dataType: 'json',
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .success(function (data, status, headers, config) {
                    $scope.users = data;
                })
                .error(function (data, status, headers, config) {
                    alert("error");
                });
        }
        else {
            $http({
                url: BASE_API + "/search/ingredients/"
                + $form_search.name + "/"
                + ($form_search.minCal ? $form_search.minCal : 0 + "/")
                + ($form_search.minCal ? $form_search.minCal : 10000000 + "/0/10"),
                dataType: 'json',
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .success(function (data, status, headers, config) {
                    $scope.ingredients = data;
                })
                .error(function (data, status, headers, config) {
                    alert("error");
                });
            $http({
                url: BASE_API + "/search/products/"
                + $form_search.name + "/"
                + ($form_search.minCal ? $form_search.minCal : 0 + "/")
                + ($form_search.minCal ? $form_search.minCal : 10000000 + "/0/10"),
                dataType: 'json',
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .success(function (data, status, headers, config) {
                    $scope.products = data;
                })
                .error(function (data, status, headers, config) {
                    alert("error");
                });
            $http({
                url: BASE_API + "/search/receipes/"
                + $form_search.name + "/"
                + ($form_search.minCal ? $form_search.minCal : 0 + "/")
                + ($form_search.minCal ? $form_search.minCal : 10000000 + "/0/10"),
                dataType: 'json',
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .success(function (data, status, headers, config) {
                    $scope.receipes = data;
                })
                .error(function (data, status, headers, config) {
                    alert("error");
                });
        }
    }

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

gltypeApp.controller('profilController', function($scope, $route, $http, $cookieStore) {
    $scope.webmaster = "Gilles TUAL";
    $scope.user = {};
    $scope.moments = {};

    $http({
        url: BASE_API + "/users/token/"+$cookieStore.get("TOKEN"),
        dataType: 'json',
        method: 'GET',
        data: {token:		$cookieStore.get("TOKEN")},
        headers: {
            "Content-Type": "application/json"
        }})
        .success(function (data, status, headers, config) {
            $scope.user.firstname = data.firstname;
            $scope.user.email = data.firstname;
            $scope.user.lastname = data.lastname;
            $scope.user.picture = data.picture;
            $scope.user.email = data.email;
            $scope.user.about = data.about;
            $scope.user.role = (data.role == 1) ? "Consumer" : (data.role == 2) ? "Food supplier" : (data.role == 3) ? "Gastronomist" : "Admin";
            $http({
                url: BASE_API + "/moments/target/" + data._id,
                dataType: 'json',
                method: 'GET',
                data: {token: $cookieStore.get("TOKEN")},
                headers: {
                    "Content-Type": "application/json"
                }})
                .success(function (data, status, headers, config) {
                    $scope.moments = data;
                })
                .error(function (data, status, headers, config) {
                    alert(data);
                });

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
                $('#profil-success').show();
            })
            .error(function (data, status, headers, config) {
                $('#profil-error').show();
            });
    };

    //Add moment
    $scope.add_moment = function ($moment)
    {
        var datas = {
            token:		    $cookieStore.get("TOKEN"),
            name:           $moment.name,
            picture:		$moment.picture,
            description:	$moment.description,
            target_id:      null,
            date:           "2015-01-08T00:00:00.000Z"
        };

        $http({
            url: BASE_API + "/moments",
            dataType: 'json',
            method: 'POST',
            data: datas,
            headers: {
                "Content-Type": "application/json"
            }})
            .success(function (data, status, headers, config) {
                $route.reload();
                $("#momentAddModalSuccess").modal({
                    keyboard: true
                })
            })
            .error(function (data, status, headers, config) {
                $('#momentadd-error').show();
            });
    };

    $scope.add_comment = function ($c)
    {
        var datas = {
            token:		    $cookieStore.get("TOKEN"),
            comment:	    $c.comment,
            type:           "moment",
            date:           "2015-01-08T00:00:00.000Z",
            target_id:      $c.target_id
        };

        $http({
            url: BASE_API + "/comments",
            dataType: 'json',
            method: 'POST',
            data: datas,
            headers: {
                "Content-Type": "application/json"
            }})
            .success(function (data, status, headers, config) {
                $route.reload();
                $("#momentAddModalSuccess").modal({
                    keyboard: true
                })
            })
            .error(function (data, status, headers, config) {
                $('#momentadd-error').show();
            });
    };

});

gltypeApp.controller('userprofilController', function($scope, $route, $http, $cookieStore, $routeParams) {
    $scope.webmaster = "Gilles TUAL";
    $scope.user = {};
    $scope.moments = {};
    var uid;

    $http({
        url: BASE_API + "/users/" + $routeParams.id,
        dataType: 'json',
        method: 'GET',
        data: {token: $cookieStore.get("TOKEN")},
        headers: {
            "Content-Type": "application/json"
        }
    })
        .success(function (data, status, headers, config) {
            $scope.user.firstname = data.firstname;
            $scope.user.email = data.firstname;
            $scope.user.lastname = data.lastname;
            $scope.user.picture = data.picture;
            $scope.user.email = data.email;
            $scope.user.about = data.about;
            uid = data._id;
            $scope.user.role = (data.role == 1) ? "Consumer" : (data.role == 2) ? "Food supplier" : (data.role == 3) ? "Gastronomist" : "Admin";
            $http({
                url: BASE_API + "/moments/target/" + data._id,
                dataType: 'json',
                method: 'GET',
                data: {token: $cookieStore.get("TOKEN")},
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .success(function (data, status, headers, config) {
                    $scope.moments = data;
                })
                .error(function (data, status, headers, config) {
                    alert(data);
                });

        })
        .error(function (data, status, headers, config) {
            alert(data);
        });

    $scope.add_moment = function ($moment)
    {
        var datas = {
            token:		    $cookieStore.get("TOKEN"),
            name:           $moment.name,
            picture:		$moment.picture,
            description:	$moment.description,
            target_id:      $routeParams.id,
            date:           "2015-01-08T00:00:00.000Z"
        };

        $http({
            url: BASE_API + "/moments",
            dataType: 'json',
            method: 'POST',
            data: datas,
            headers: {
                "Content-Type": "application/json"
            }})
            .success(function (data, status, headers, config) {
                $route.reload();
                $("#momentAddModalSuccess").modal({
                    keyboard: true
                })
            })
            .error(function (data, status, headers, config) {
                $('#momentadd-error').show();
            });
    };

    $scope.add_comment = function ($c)
    {
        var datas = {
            token:		    $cookieStore.get("TOKEN"),
            comment:	    $c.comment,
            type:           "moment",
            date:           "2015-01-08T00:00:00.000Z",
            target_id:      $c.target_id
        };

        $http({
            url: BASE_API + "/comments",
            dataType: 'json',
            method: 'POST',
            data: datas,
            headers: {
                "Content-Type": "application/json"
            }})
            .success(function (data, status, headers, config) {
                $route.reload();
                $("#momentAddModalSuccess").modal({
                    keyboard: true
                })
            })
            .error(function (data, status, headers, config) {
                $('#momentadd-error').show();
            });
    };
});

gltypeApp.controller('ingredientController', function($scope, $http, $cookieStore, $routeParams) {

    $scope.ing = {};
    $scope.role = $cookieStore.get("role");
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
                $("#ingrAddModalSuccess").modal({
                    keyboard: true
                })
            })
            .error(function (data, status, headers, config) {
                $('#ingradd-error').show();
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
                $('#ingr-success').show();
            })
            .error(function (data, status, headers, config) {
                $('#ingr-error').show();
            });
    };

});

gltypeApp.controller('receipeController', function($scope, $http, $cookieStore, $routeParams) {
    $scope.receipe = {};
    $scope.ingr = {};
    $scope.role = $cookieStore.get("role");
    if ($routeParams.receipeId != undefined)
    {
        $scope.id = $routeParams.receipeId;
        $scope.receipe.id = $routeParams.receipeId;
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
                $scope.receipe.name= data.name;
                $scope.picture= data.picture;
                $scope.receipe.picture= data.picture;
                $scope.description = data.description;
                $scope.receipe.description = data.description;
                $scope.values = data.values;
                $scope.receipe.values= data.values;
            })
            .error(function (data, status, headers, config) {
                alert(data);
            });
    }

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
            $scope.ingr = data;
        })
        .error(function (data, status, headers, config) {
            alert(data);
        });

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
                $('#receipe-success').show();
            })
            .error(function (data, status, headers, config) {
                $('#receipe-error').show();
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
                $("#recAddModalSuccess").modal({
                    keyboard: true
                })
            })
            .error(function (data, status, headers, config) {
                $('#recadd-error').show();
            });
    };

});

gltypeApp.controller('productController', function($scope, $http, $cookieStore, $routeParams) {
    $scope.product= {};
    $scope.role = $cookieStore.get("role");
    if ($routeParams.productId != undefined)
    {
        $scope.id = $routeParams.productId;
        $scope.product.id = $routeParams.productId;
        $http({
            url: BASE_API + "/products/"+$routeParams.productId,
            dataType: 'json',
            method: 'GET',
            data: {
                token:		$cookieStore.get("TOKEN")
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

    $http({
        url: BASE_API + "/comments/target/"+$scope.id+"/type/product",
        dataType: 'json',
        method: 'GET',
        data: {
            token: $cookieStore.get("TOKEN"),
        },
        headers: {
            "Content-Type": "application/json"
        }})
        .success(function (data, status, headers, config) {
            $scope.comments = data;
            console.log($scope.comments);
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
            $scope.ingr = data;
        })
        .error(function (data, status, headers, config) {
            alert(data);
        });

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
                $('#prod-success').show();
            })
            .error(function (data, status, headers, config) {
                $('#prod-error').show();
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
                $("#prodAddModalSuccess").modal({
                    keyboard: true
                })
            })
            .error(function (data, status, headers, config) {
                $('#prodadd-error').show();
            });
    };

    $scope.add_comment = function ($c)
    {
        var datas = {
            token:		    $cookieStore.get("TOKEN"),
            comment:	    $c.comment,
            type:           "product",
            date:           "2015-01-08T00:00:00.000Z",
            target_id:      $scope.product.id
        };

        $http({
            url: BASE_API + "/comments",
            dataType: 'json',
            method: 'POST',
            data: datas,
            headers: {
                "Content-Type": "application/json"
            }})
            .success(function (data, status, headers, config) {
                $("#momentAddModalSuccess").modal({
                    keyboard: true
                })
            })
            .error(function (data, status, headers, config) {
                $('#momentadd-error').show();
            });
    };

});


gltypeApp.controller('allReceipeController', function($scope, $http, $cookieStore, $routeParams) {
    $http({
        url: BASE_API + "/receipes",
        dataType: 'json',
        method: 'GET',
        data: {
            token: $cookieStore.get("TOKEN")
        },
        headers: {
            "Content-Type": "application/json"
        }})
        .success(function (data, status, headers, config) {
            $scope.rec = data;
        })
        .error(function (data, status, headers, config) {
            alert(data);
        });
});

gltypeApp.controller('allIngredientController', function($scope, $http, $cookieStore, $routeParams) {
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
            $scope.ingr = data;
        })
        .error(function (data, status, headers, config) {
            alert(data);
        });
});

gltypeApp.controller('allProductController', function($scope, $http, $cookieStore, $routeParams) {
    $http({
        url: BASE_API + "/products",
        dataType: 'json',
        method: 'GET',
        data: {
            token: $cookieStore.get("TOKEN")
        },
        headers: {
            "Content-Type": "application/json"
        }})
        .success(function (data, status, headers, config) {
            $scope.prod = data;
        })
        .error(function (data, status, headers, config) {
            alert(data);
        });
});

/*[
 [
 {"moment":{"__v":0,"_id":"54ae45e5f8104856099fe1b8","date":"2015-01-08T00:00:00.000Z","description":"One of my moments edited 2 :)","name":"My Moment","owner_id":"54ad09006938b2b53d2b3f6b","target_id":"54ad09006938b2b53d2b3f6b","comments":[]},
 "comments":null,
 "user":{"_id":"54ad09006938b2b53d2b3f6b","about":"BJUTU student","email":"medard.etudiant@gmail.com","firstname":"Pierre","lastname":"Medard","picture":"http://www.tropclasse.com/images/2013/January/8/50ebe1d4910bb.jpg","role":1,"photos":[],"movies":[],"moments":[]}}
 ],
 [
 {"moment":{"name":"Another one !","description":"The other one description !","owner_id":"54ad09006938b2b53d2b3f6b","target_id":"54ad09006938b2b53d2b3f6b","date":"2015-07-31T16:00:00.000Z","_id":"54aedaff2933d37a567a764b","__v":0,"comments":[]},
 "comments":null,
 "user":{"_id":"54ad09006938b2b53d2b3f6b","about":"BJUTU student","email":"medard.etudiant@gmail.com","firstname":"Pierre","lastname":"Medard","picture":"http://www.tropclasse.com/images/2013/January/8/50ebe1d4910bb.jpg","role":1,"photos":[],"movies":[],"moments":[]}}
 ]
 ]*/