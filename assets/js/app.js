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

////jquery for modal in new-cat.html
// $(function () {
//   'use strict';
//
//   $('#submit-new').on('click', function () {
//     console.log('modal is working');
//     $('.modal-container').addClass('showing');
//   });
//
//   $('.modal-x, .modal-container').on('click', function () {
//     $('.modal-container').removeClass('showing');
//   });
//
//   $('.modal').click(function (event) {
//     event.stopPropagation();
//   });
//
// });
