//Normālos gadījumos šeit būtu $getJSON, kas datus saņemtu caur API, konkrēti šim uzdevumam izveidoju vienkāršu data list
var data = [
  {
    "pic": "https://images.unsplash.com/photo-1580200346290-a0bd91f0debd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "title": "Green trees",
    "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "fontSize": "20px",
    "textColor": "black",
    "backgroundColor": "#32a852",
  },
  {
    "pic": "https://images.unsplash.com/photo-1580231679388-43b7bf42f7c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "title": "Sahara",
    "text": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "fontSize": "19px",
    "textColor": "black",
    "backgroundColor": "#b594e3",
  },
  {
    "pic": "https://images.unsplash.com/photo-1580237995396-a21928e71e63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "title": "Blue sea",
    "text": " Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "fontSize": "",
    "textColor": "black",
    "backgroundColor": "#fffbd6",
  }
];

$.each(data, function (key, val) {
  createListItems(val.pic, val.title, val.text, val.backgroundColor, val.fontSize, val.textColor);
});

function createListItems(pic, title, text, color, fontSize, textColor) {
  item = $('.main').append(
    $('<div>').addClass('section').append(
      $('<div>').addClass('container').css({"background-color": color}).append(
        $('<a>').attr('onclick', "remove(this)").text("X"), $('<img>').attr('src', pic), $('<h1>').append(title), $('<p>').append(text).css({"font-size": fontSize, "color": textColor})
      )
    )
  );
}

// TODO: Implement removing the item from the data list object in use
function remove(e) {
  e.closest('div.section').remove();
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

// TODO: Implement adding the submitted data to the data list object in use
$(function() {
  $('form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serializeObject();
    createListItems(formData.pic, formData.title, formData.text, formData.backgroundColor, formData.fontSize, formData.textColor);
  });
});
