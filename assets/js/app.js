// ;var XHR = new.XMLHttpRequest();
// XHR.onReadyStateChange = function(){
//


var tabbyApp = angular.module('tabbyApp', ['ngRoute']);

tabbyApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', { //main page
                templateUrl : 'landing-page.html',
            })
            .when('/NewCat',  {
                templateUrl : 'new-cat.html',
            })
            .when('/DetailsEdit', {
                templateUrl : 'details-edit.html',
            })
            .when('/Cart', {
                templateUrl : 'cart.html',
            })
          });

// }//closes xhr
