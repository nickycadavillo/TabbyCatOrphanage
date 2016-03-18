//test controller
tabbyApp.controller('mainController', function($scope) {
    console.log("this works?")
    // create a message to display in our view
    $scope.message = 'THIS WORKS, I HOPE';
  });

//landing page controller to get all the cats from json file
tabbyApp.controller('landingPageController', [ '$http', '$scope', function($http, $scope){
  $scope.message = "SCOPE IS WORKING";
  $http.get('assets/json/tabbycat.json').success(function(data){
    $scope.cats = data
  });//close get
}]);//close controller

// new cat controller to update json file
tabbyApp.controller('newCatController', [ '$http', '$scope', function($http, $scope){
    $scope.something = "SCOPE IS WORKING";
    var newCat = "this is a new cat!";
    function postSuccess(){
      console.log("success!");
    };
    function postFailure(){
      console.log("failure!");
    };

    $('.submit-btn').click(function(){
      console.log("we clicked");
      $http.post('assets/json/tabbycat.json', newCat).then(postSuccess, postFailure);
    })


}]);//close controller

//details-edit controller
tabbyApp.controller('editPageController', [ '$http', '$scope', function($http, $scope){
  $scope.message = "scope success";
  $http.get('assets/json/tabbycat.json').success(function(data){
    $scope.cats = data
  });//close get
}]);//close controller
