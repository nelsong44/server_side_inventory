$(document).ready(function() {

  // add item to server-side inventory list and call itemIntoObject() on button click
  $('#addButton').on('click', function() {
    //acknowledge user added an item
    alert("You've added an item to your list!!");
    itemIntoObject();
  }); // end click event
  // call getItems() on button click
  $('#viewButton').on('click', getItems);
  // getItems();
}); // end onReady()

// function to add item to list and format into object to send to server
function itemIntoObject() {
  console.log('itemIntoObject called');
  // item object
  var itemObjectToSend = {
    item: $('#addItem').val()
  }; // end object
  //make ajax call to send item object to server
  $.ajax ({
    type: 'POST',
    data: itemObjectToSend,
    url: '/newItem',
    success: function(response) {
      console.log('post response ' , response);
      //clear current list from DOM
      $('.list').empty();
      // clear user input from input field
      document.getElementById('addItem').value = '';
    } //end success
  }); //end ajax
} // end itemIntoObject()

// function to get itemArrayObject from server and update display on button click
function getItems() {
  console.log('getItems called');
  $.ajax ({
    type: 'GET',
    url: '/allItems',
    success: function(response) {
      console.log(response); // response is an object {list: arrayItem}

      // $('#sortItem').on('click', function() {
      //   for (var j=0; j<response.list.length; j++) {
      //   var searchFor = $('#sortItem').val().includes(response.list[i]);
      //   if(searchFor === true) {
      //     alert ('Yes! ' + response.list[j] + ' is on your list.');
      //   }
      //   else {
      //     alert('That animal is not on your list.');
      //   } // end if statement
      //   console.log(searchFor);
      //   } // end for loop
      // }); // end on click

      // aooend list items to DOM
      for(var i = 0; i<response.list.length; i++) {
      $('.list').append('<p>' + response.list[i] + '</p>');
      } // end for loop
    } // end success
  }); // end ajax
} // end getItems()
