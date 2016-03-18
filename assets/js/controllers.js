//test controller
tabbyApp.controller('mainController', function($scope) {
    console.log("this works?")
    // create a message to display in our view
    $scope.message = 'THIS WORKS, I HOPE';
  });

//landing page controller to get all the cats from json file
tabbyApp.controller('landingPageController', [ '$http', '$scope', function($http, $scope){
  $scope.message = "SCOPE IS WORKING";

  // $.ajax({
  //   type: 'GET',
  //   url: 'localhost:3001/allCats',
  //   data: allCats,
  //   type: "json",
  // }).done(function(allCats){$scope.cats = allCats;});

  //this seems to work!
  $http.get('http://localhost:3000/allCats').success(function(data){
    $scope.cats = data;
    console.log($scope.cats);
  });//close get

}]);//close controller

//https://stormy-meadow-75496.herokuapp.com/cat/index

// new cat controller to update json file
tabbyApp.controller('newCatController', [ '$http', '$scope', function($http, $scope){
    $scope.something = "SCOPE IS WORKING";

    function postSuccess(){
      console.log("success!");
    };
    function postFailure(){
      console.log("failure!");
    };

    $('.submit-btn').click(function(){
      var newCat = {'name': 'JERKFACE','type': 'Special','price': 10,'desc': 'This is a gray cutie with an adorable baseball hat.','image': 'assets/images/fluffy-knight.png','reviews': [{'revName': 'Nicky C','text': 'This is the best cat ever. Yay!','stars': 5}]};


      console.log("we clicked");

      $.ajax({
        method: "POST",
        url: 'http://localhost:3000/allCats',
        datatype: 'json',
        data: newCat,
      }).done(function()
      {
        console.log("posted!");
      });

        //this angular.js implimentation of getting and posting to json. not working they might work...?
      // $http.post('http://localhost:3000/allCats', newCat).then(postSuccess, postFailure);
    })


}]);//close controller

//details-edit controller
tabbyApp.controller('editPageController', [ '$http', '$scope', function($http, $scope){
  $scope.message = "scope success";
  $http.get('assets/json/tabbycat.json').success(function(data){
    $scope.cats = data
  });//close get
}]);//close controller
