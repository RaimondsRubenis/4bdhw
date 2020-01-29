//Normālos gadījumos šeit būtu $getJSON, kas datus saņemtu caur API, konkrēti šim uzdevumam izveidoju vienkāršu data list
var data = [
  {
    "id": 0,
    "pic": "https://images.unsplash.com/photo-1580200346290-a0bd91f0debd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "title": "Green trees",
    "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "fontSize": "20px",
    "textColor": "black",
    "backgroundColor": "#32a852",
  },
  {
    "id": 1,
    "pic": "https://images.unsplash.com/photo-1580231679388-43b7bf42f7c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "title": "Sahara",
    "text": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "fontSize": "19px",
    "textColor": "black",
    "backgroundColor": "#b594e3",
  },
  {
    "id": 2,
    "pic": "https://images.unsplash.com/photo-1580237995396-a21928e71e63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "title": "Blue sea",
    "text": " Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "fontSize": "",
    "textColor": "black",
    "backgroundColor": "#fffbd6",
  }
];
var reverse = [1, -1];  // Array to toggle reverse (Initial sort is from end to start)

$( document ).ready(function() {
  loadItems();
});

function loadItems() {
  $('.main').empty();
  $.each(data, function (key, val) {
    createListItems(val.id, val.pic, val.title, val.text, val.backgroundColor, val.fontSize, val.textColor);
  });
}

function createListItems(id, pic, title, text, color, fontSize, textColor) {
  item = $('.main').append(
    $('<div>').addClass('section').append(
      $('<div>').addClass('container').css({"background-color": color}).append(
        $('<a>').attr({onclick: "remove(this)", id: id}).text("X"), $('<img>').attr('src', pic), $('<h1>').append(title), $('<p>').append(text).css({"font-size": fontSize, "color": textColor})
      )
    )
  );
}

function remove(e) {
  var toDelete = e.id;
  data = data.filter(function( obj ) {
    return obj.id != toDelete;
  }, loadItems());

}

// http://css-tricks.com/snippets/jquery/serialize-form-to-json/
$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

$(function() {
  $('form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serializeObject();
    data.push(
      {id: data.length ,pic: formData.pic, title: formData.title, text: formData.text, fontSize: formData.fontSize, textColor: formData.textColor, backgroundColor: formData.backgroundColor}
    );
    loadItems();
  });
});

function sortData(sortBy) {
  data.sort(dataSorter(sortBy));
  loadItems();
}

function dataSorter(field) {
  var key = function(x) {
    return x[field]
  };
  reverse.unshift(reverse.pop())
  return function(a, b) {
    return a = key(a), b = key(b), parseInt(reverse,10) * ((a > b) - (b > a));
  }
}
