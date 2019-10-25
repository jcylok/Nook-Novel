const userId = window.location.pathname.split('/')[2];
console.log(userId);

const handleSuccess = (user) => {

  document.querySelector('title').innerHTML = `${user.firstName}'s Profile`


  document.querySelector('.wrapper').insertAdjacentHTML('beforeend', `
      <section class="welcome">
        Welcome Back, ${user.firstName}!
      </section> 
  `);
}

// Handle Logout
const logoutButton = document.getElementById('logout');
console.log(logoutButton);
// Listen for logout click event

logoutButton.addEventListener('click', (event) => {
  event.preventDefault();
  fetch('/api/v1/logout', {
    method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
  })
    .then(dataStream => dataStream.json())
    .then(res => {
      localStorage.clear();
      if (res.status === 200) {
        window.location = '/';
        
      }
    })
})


const getProfile = () => {
    fetch(`/api/v1/profile/${userId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(dataStream => dataStream.json())
      .then(res => {
        console.log(res);
        handleSuccess(res.data);
      })
      .catch(err => console.log(err));
  }
  
  getProfile();



$(document).ready(function() {
    $(".menu-icon").on("click", function() {
          $("nav ul").toggleClass("showing");
    });
});

// Scrolling Effect

$(window).on("scroll", function() {
    if($(window).scrollTop()) {
          $('nav').addClass('black');
    }

    else {
          $('nav').removeClass('black');
    }
})



  function moveToSelected(element) {

    $('#carousel div').click(function() {
      moveToSelected($(this));
    });
    
    $('#prev').click(function() {
      moveToSelected('prev');
    });
    
    $('#next').click(function() {
      moveToSelected('next');
    });

    if (element == "next") {
      var selected = $(".selected").next();
    } else if (element == "prev") {
      var selected = $(".selected").prev();
    } else {
      var selected = element;
    }
  
    var next = $(selected).next();
    var prev = $(selected).prev();
    var prevSecond = $(prev).prev();
    var nextSecond = $(next).next();
  
    $(selected).removeClass().addClass("selected");
  
    $(prev).removeClass().addClass("prev");
    $(next).removeClass().addClass("next");
  
    $(nextSecond).removeClass().addClass("nextRightSecond");
    $(prevSecond).removeClass().addClass("prevLeftSecond");
  
    $(nextSecond).nextAll().removeClass().addClass('hideRight');
    $(prevSecond).prevAll().removeClass().addClass('hideLeft');
  
  }
  
  // Eventos teclado
  $(document).keydown(function(e) {
      switch(e.which) {
          case 37: // left
          moveToSelected('prev');
          break;
  
          case 39: // right
          moveToSelected('next');
          break;
  
          default: return;
      }
      e.preventDefault();
  });

$('form').on('submit', function(event) {
  event.preventDefault();
  console.log($('#searchinfo').val());
  let userSearchItem = $('#searchinfo').val();
  $('#map').attr('src', `https://www.google.com/maps/embed/v1/search?q=coffee%20near%20${userSearchItem}&key=AIzaSyCPNBaefh5KaA5eWAmZvyl4-m7hqfOVnoE`);
})




// AJAX CALL FOR RECOMMENDED BOOKS
const recommendedBooksArr = [];
const googleKeysArr = []
let counter = 0;

const onError = (err) => {
  console.log(err)
}

const pushImagesIntoArray = (res) => {
  recommendedBooksArr.push(res.volumeInfo.imageLinks.thumbnail);
  // counter++;
  console.log(recommendedBooksArr);
  // if (counter === 7) {
    $('.first-pic').attr('src',`${recommendedBooksArr[recommendedBooksArr.length-1]}`);
    $('.second-pic').attr('src',`${recommendedBooksArr[recommendedBooksArr.length-2]}`);
    $('.third-pic').attr('src',`${recommendedBooksArr[recommendedBooksArr.length-3]}`);
    $('.fourth-pic').attr('src',`${recommendedBooksArr[recommendedBooksArr.length-4]}`);
    $('.fifth-pic').attr('src',`${recommendedBooksArr[recommendedBooksArr.length-5]}`);
    $('.sixth-pic').attr('src',`${recommendedBooksArr[recommendedBooksArr.length-6]}`);
    $('.seventh-pic').attr('src',`${recommendedBooksArr[recommendedBooksArr.length-7]}`);
  // }
};

const pullFromBooksGoogle = (res) => {
  // googleKeysArr.push(res.data.googleKey);
  // counter ++;
  // if (counter === 7) {
  //   $('.first-pic').attr('id',`${googleKeysArr[0]}`);
  //   $('.second-pic').attr('id',`${googleKeysArr[1]}`);
  //   $('.third-pic').attr('id',`${googleKeysArr[2]}`);
  //   $('.fourth-pic').attr('id',`${googleKeysArr[3]}`);
  //   $('.fifth-pic').attr('id',`${googleKeysArr[4]}`);
  //   $('.sixth-pic').attr('id',`${googleKeysArr[5]}`);
  //   $('.seventh-pic').attr('id',`${googleKeysArr[6]}`);
  // }

  $.ajax({
    method: 'GET',
    url: res.data.googleKey,
    success: pushImagesIntoArray,
    error: onError,
  });
};

const bookIdArr = [];

const pullRecommended = (res) => {
  res.data.recommendedBooks.forEach((book) => {

  $.ajax({
    method: 'GET',
    url: `/api/v1/books/${book}`,
    success: pullFromBooksGoogle,
    error: onError,
  })

  bookIdArr.push(res.data.recommendedBooks);
  // console.log(bookIdArr);
  // $('.first-pic').attr('id',`${bookIdArr[0][bookIdArr.length-1]}`);
  // $('.second-pic').attr('id',`${bookIdArr[1][bookIdArr.length-2]}`);
  // $('.third-pic').attr('id',`${bookIdArr[2][bookIdArr.length-3]}`);
  // $('.fourth-pic').attr('id',`${bookIdArr[3][bookIdArr.length-4]}`);
  // $('.fifth-pic').attr('id',`${bookIdArr[4][bookIdArr.length-5]}`);
  // $('.sixth-pic').attr('id',`${bookIdArr[5][bookIdArr.length-6]}`);
  // $('.seventh-pic').attr('id',`${bookIdArr[6][bookIdArr.length-7]}`);
  });
};

$.ajax({
  method: 'GET',
  url: `/api/v1/users/${localStorage.userId}`,
  success: pullRecommended,
  error: onError,
});

// AJAX CALL FOR SAVED BOOKS
const savedBooksArr = [];

const pushSavedImages = (res) => {
  console.log(res.volumeInfo.imageLinks.thumbnail)
  savedBooksArr.push(res.volumeInfo.imageLinks.thumbnail);
  console.log(savedBooksArr.length);
    $('.first-saved').attr('src',`${savedBooksArr[savedBooksArr.length-1]}`);
    $('.second-saved').attr('src',`${savedBooksArr[savedBooksArr.length-2]}`);
    $('.third-saved').attr('src',`${savedBooksArr[savedBooksArr.length-3]}`);
    $('.fourth-saved').attr('src',`${savedBooksArr[savedBooksArr.length-4]}`);
    $('.fifth-saved').attr('src',`${savedBooksArr[savedBooksArr.length-5]}`);
    $('.sixth-saved').attr('src',`${savedBooksArr[savedBooksArr.length-6]}`);
};

const pullSavedFromBooksGoogle = (res) => {
  $.ajax({
    method: 'GET',
    url: res.data.googleKey,
    success: pushSavedImages,
    error: onError,
  });
};

const pullSaved = (res) => {
  res.data.booksWantToRead.forEach((book) => $.ajax({
    method: 'GET',
    url: `/api/v1/books/${book}`,
    success: pullSavedFromBooksGoogle,
    error: onError,
  }));
};

$.ajax({
  method: 'GET',
  url: `/api/v1/users/${localStorage.userId}`,
  success: pullSaved,
  error: onError,
});

$( ".getinfo" ).dblclick(function() {
  console.log($(this).attr('src'));
});


