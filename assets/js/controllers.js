
//test controller
tabbyApp.controller('mainController', function($scope) {
    console.log("this works?")
    // create a message to display in our view
    $scope.message = 'THIS WORKS, I HOPE';
  });

  var catID;
  var clickedCat;

//landing page controller to get all the cats from json file
tabbyApp.controller('landingPageController', [ '$http', '$scope', function($http, $scope){
  $scope.message = "SCOPE IS WORKING";
  //$scope.clickedCat ="";


  $scope.iClickedACat = function(index){
   clickedCat = index;
   console.log("clickedCat = " +clickedCat);
 }//end i clicked acat

  // $.ajax({
  //   type: 'GET',
  //   url: 'localhost:3001/allCats',
  //   data: allCats,
  //   type: "json",
  // }).done(function(allCats){$scope.cats = allCats;});

  //this seems to work!
  $http.get('http://localhost:3000/allCats').success(function(data){
    $scope.cats = data;
    catID = data.length;
    catID = (data[data.length-1].id)+1;
    console.log(catID);
    globalData = data;
    //console.log($scope.cats);
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

var cID;
var cName;
var cType;
var cPrice;
var cDesc;
var cImg;

var newCat;

    $('.submit-btn').click(function(data){

      cID = catID;
      cName = $("#frm-cat-name").val();
      cType = $("#frm-type").val();
      cPrice = $("#frm-price").val();
      cDesc = $("#frm-desc").val();
      cImg = $(".frm-img").val();

      newCat =  {'name': cName,'type': cType,'price': cPrice,'desc': cDesc ,'image': cImg};
      newCat.id = cID;//this is weird... why cant I put it inside the initial construction (one line above)?

      console.log($scope.data);

      console.log("we clicked");
      // $(.form).val('');

      $.ajax({
        method: "POST",
        url: 'http://localhost:3000/allCats',
        datatype: 'json',
        data: newCat,
      }).done(function()
      {
        console.log("posted!");
      });

      }); // closes submit-btn function

        //this angular.js implimentation of getting and posting to json. not working they might work...?
      // $http.post('http://localhost:3000/allCats', newCat).then(postSuccess, postFailure);

}]);//close controller


//modal controller
tabbyApp.controller('modalController', [ '$http', '$scope', function($http, $scope){

  // $(function () {
  //   'use strict';

    $('.submit-btn').on('click', function () {
      console.log('modal is working');
      $('.modal-container').addClass('showing');
    });

    $('.modal-x, .modal-container').on('click', function () {
      $('.modal-container').removeClass('showing');
    });

    $('.modal').click(function (event) {
      event.stopPropagation();
    });

  // });//close use strict

}]);//close controller

var globalData;

//details-edit controller
tabbyApp.controller('editPageController', [ '$http', '$scope', function($http, $scope){
  $scope.message = "scope success";

  $http.get('http://localhost:3000/allCats').success(function(data){
    $scope.cats = data;
    globalData = data;
    console.log("The data is="+data);

    $scope.cName = data[clickedCat].name;
    $scope.cPrice = data[clickedCat].price;
    $scope.cType = data[clickedCat].type;
    $scope.cDesc = data[clickedCat].desc;
    $scope.cImg = data[clickedCat].image;
    $scope.cRev = data[clickedCat].reviews;

    $('#frm-type').val(cType);

    console.log(cName);

  });//close get

  $scope.clickedCat = clickedCat;

  $scope.smushCatToCart = function(catIndexNum)
  {
    console.log("we're smushin cats!" + catIndexNum);
    myCart.push(globalData[catIndexNum]);
    reCalcTotal();
  }


  $scope.KILLKitty = function(catDex){
    console.log('trying to kill a cat...?')
    var newCatDex = globalData[catDex].id;
    $http.delete('http://localhost:3000/allCats/'+newCatDex);//deletes the cat element

    //all this commented out stuff is trying to renumber the cat id's so that we dont have deletion errors. it dosent work. we might get deletion errors.

    // //this refreshes global data with the cat element no longer there.
    // $http.get('http://localhost:3000/allCats').success(function(data){
    //   $scope.cats = data;
    //   globalData = data;
    // });//end get data
    //
    // var allNewCats=[];
    // for(var i=0; i<globalData.length; i++)//uses the NEW length of global data to renumber all the cat indexes.
    // {
    //   var catNAME = globalData[i].name; //now we re-reite all the cats with their same data, and a NEW id, so that there are no gaps in our cat array.
    //   var catTYPE = globalData[i].type;
    //   var catPRICE = globalData[i].price;
    //   var catDESC = globalData[i].desc;
    //   var catIMG = globalData[i].image;
    //   var catREV = globalData[i].reviews;
    //
    //   var catClone = {'id': i, 'name': catNAME,'type': catTYPE,'price': catPRICE,'desc': catDESC ,'image': catIMG, 'reviews': catREV};
    //
    //   allNewCats.push(catClone);
    //   console.log(allNewCats);
    //
    // }
    //
    //   $http.post('http://localhost:3000/', allNewCats).then(function(){console.log("cloned a cat");},function(){console.log("failed to clone!");});

  }//end kill kitty

  $scope.editKitty = function(catIndex)
  {

    cName = $("#frm-cat-name").val();
    cType = $("#frm-type").val();
    cPrice = $("#frm-price").val();
    cDesc = $("#frm-desc").val();
    cImg = $(".frm-img").val();
    cReviews = globalData[catIndex].reviews;

    goodCatIndex = globalData[catIndex].id;

    var editedCat =  {'id': globalData[catIndex].id, 'name': cName,'type': cType,'price': cPrice,'desc': cDesc ,'image': cImg, 'reviews': cReviews};

    $http.put('http://localhost:3000/allCats/'+goodCatIndex, editedCat).then(function(){console.log("SUCCESSFUL EDIT!");},function(){console.log("FAILED TO EDIT!");});

  }


}]);//close controller

var myCart = [];

tabbyApp.controller('cartPageController', ['$http','$scope', function($http, $scope){
 $scope.madwords ="we have scope!";
 $scope.remove;

 var temp=0;//this little chunk of code tallies the total price for the cats.

//this calculates the total when you go to the page.
 for(var u=0;u<myCart.length; u++)
 {
  temp = temp + myCart[u].price;
  console.log(temp);
  console.log("this cat is worth= " + myCart[u].price);
  $scope.total = temp;
 }

 $scope.removeFromCart = function(index){
  myCart.splice(index,1);
  //and this calculates the total when you delete a cat.
  temp=0;
  for(var u=0;u<myCart.length; u++)
  {
   temp = temp + myCart[u].price;
   console.log(temp);
   console.log("this cat is worth= " + myCart[u].price);
   $scope.total = temp;
  }
  // reCalcTotal();

 }


 $http.get('http://localhost:3000/allCats').success(function(data){
   $scope.cats = data;
   $scope.myCart = myCart;
  console.log(myCart);
});


}]);//end cart controller
