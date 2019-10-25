const $search = $('form').val();

const modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
const $browse = $("#continue-browsing");

const onSuccess = (res) => {
  res.items.forEach((book) => {
    const template = `
    <div class="book" id=${book.selfLink}>
      <div class="book-img">
        <img class="book-img" src="${book.volumeInfo.imageLinks.thumbnail}"/>
      </div>
      <div class="book-info">
        <div class="book-title">${book.volumeInfo.title}</div>
        <div class="book-author">${book.volumeInfo.authors}</div>
      <div class="icons">
        <a href="#" class ="icon fas fa-bookmark"></a>
        <a href="#" class ="icon fas fa-star"></a>
        <a href="#" class ="icon fas fa-check-square"></a>
      </div>
    </div>
    `;
    $('.book-gallery').append(template);
  });
};

const onError = (err) => {
  console.log(err);
};

const search = () => {
  $.ajax({
  method: 'GET',
  url: `https://www.googleapis.com/books/v1/volumes${$search}`,
  data: $('form').serialize(),
  success: onSuccess,
  error: onError,
  });
};

const bookSuccess = (res) => {
  console.log(res.volumeInfo)
  const template = `
  <div id="myModal" class="modal" display="block">
    <div class="modal-content">
      <span class="close">&times;</span>
      <div class="book-image-modal">
        <img class="modal-image" src="${res.volumeInfo.imageLinks.thumbnail}" />
        </div>
      <div class="book-info">
        <div class="book-title-modal">${res.volumeInfo.title}</div>
        <div class="book-author-modal">${res.volumeInfo.authors}</div>
        <div class="book-genre-modal">${res.volumeInfo.categories[0]}</div>
        <div class="book-description-modal">${res.volumeInfo.description}</div>
      </div>
    </div>
  </div>
  `
  $('.container').append(template);

}

const detailError = () => {

}

const bookDetails = function(event) {
  $.ajax({
    method: 'GET',
    url: ($(event.target.parentNode.parentNode)[0].id || $(event.target.parentNode)[0].id),
    success: bookSuccess,
    error: detailError,
  });
};

$('.book-gallery').on('click', '.book', function(event) {
  bookDetails(event);
});


$('form').on('submit', function (event) {
  event.preventDefault();
  $('.book-gallery').empty();
  search();
});

// When the user clicks on <span> (x), close the modal
// $('.container').on('click', '.close', function() {
//   const modal = $('.modal');
//   modal.style.display = "none";
//   // modal.toggle(display);
// });

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// ADD BOOKS TO RECOMMENDED, WANT TO READ, READ
const bookAdded = (res) => {
  console.log(res.data);
}

const addToWantToRead = (res) => {
  bookId = {bookId: res.data._id};
  $.ajax({
    method: 'PUT',
    url: `/api/v1/users/wanttoread/${localStorage.userId}`,
    data: bookId,
    success: bookAdded,
    error: onError,
  });
};

const addBookToDatabase1 = (event) => {
  const bookLink = event.target.parentNode.parentNode.parentNode.id;
  $.ajax({
    method: 'POST',
    url: '/api/v1/books/',
    data: {
      googleKey: bookLink,
    },
    success: addToWantToRead,
    error: onError,
  });
};

const addToRecommendedBooks = (res) => {
  bookId = {bookId: res.data._id};
  $.ajax({
    method: 'PUT',
    url: `/api/v1/users/recommend/${localStorage.userId}`,
    data: bookId,
    success: bookAdded,
    error: onError,
  });
};

const addBookToDatabase2 = (event) => {
  const bookLink = event.target.parentNode.parentNode.parentNode.id;
  $.ajax({
    method: 'POST',
    url: '/api/v1/books/',
    data: {
      googleKey: bookLink,
    },
    success: addToRecommendedBooks,
    error: onError,
  });
};

const addToHaveRead = (res) => {
  bookId = {bookId: res.data._id};
  $.ajax({
    method: 'PUT',
    url: `/api/v1/users/haveread/${localStorage.userId}`,
    data: bookId,
    success: bookAdded,
    error: onError,
  });
};

const addBookToDatabase3 = (event) => {
  const bookLink = event.target.parentNode.parentNode.parentNode.id;
  $.ajax({
    method: 'POST',
    url: '/api/v1/books/',
    data: {
      googleKey: bookLink,
    },
    success: addToHaveRead,
    error: onError,
  });
};

// Click Listener for Bookmark button
$('.book-gallery').on('click', '.fa-bookmark', function
(event) {
  event.preventDefault();
  addBookToDatabase1(event);
});

// Click Listener for Recommend button
$('.book-gallery').on('click', '.fa-star', function
(event) {
  event.preventDefault();
  addBookToDatabase2(event);
});

// Click Listener for have Read button
$('.book-gallery').on('click', '.fa-check-square', function
(event) {
  event.preventDefault();
  addBookToDatabase3(event);
});



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

// add profile page link
$('#profilelink').attr('href', `/profile/${localStorage.userId}`) 


$('.container').on('click' , '.close', function() {
  $('#myModal').remove();
})