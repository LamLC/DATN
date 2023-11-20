var app = angular.module("admin-app", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    	.when("/admin", {
            templateUrl: "/admin/home/index.html"
            
        })
        .when("/product", { 
            templateUrl: "/admin/product/index.html",
            controller: "product-ctrl" 
        })
        .when("/staf", { 
            templateUrl: "/admin/staff/index.html",
            controller: "staff-ctrl" 
        })
        .when("/customer-management", { 
            templateUrl: "/admin/Customer-Management/index.html",
            controller: "Customer-ctrl" 
        })
        .when("/order-management", {
            templateUrl: "/admin/Order-Management/index.html",
            controller: "order-management-ctrl"
        })
        .when("/authorize", {
            templateUrl: "/admin/authority/index.html",
            controller: "authority-ctrl"
        })
        .when("/unauthorize", {
            templateUrl: "/admin/authority/unauthorized.html",
            controller: "authority-ctrl"
        })
        .otherwise({
            template: "<h1 class='text-center'>FPT Polytechnic Administration</h1>"
        });
})