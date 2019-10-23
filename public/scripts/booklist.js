const $search = $('form').val();
const db = require('../../models');

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
  console.log({err});
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
  const template = `
  <div id="myModal" class="modal" display="block">
    <div class="modal-content">
      <span class="close">&times;</span>
        <img class="modal-book-img" src="${res.volumeInfo.imageLinks.extraLarge}" />
      <div class="book-info">
        <div class="book-title">${res.volumeInfo.title}</div>
        <div class="book-description">${res.volumeInfo.description}</div>
      </div>
    </div>
  </div>
  `
  $('.container').append(template);

}

const bookDetails = function(event) {
  $.ajax({
    method: 'GET',
    url: ($(event.target.parentNode.parentNode)[0].id || $(event.target.parentNode)[0].id),
    success: bookSuccess,
    error: onError,
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
$('.container').on('click', '.close', function() {
  const modal = $('.modal');
  modal.style.display = "none";
  // modal.toggle(display);
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// ADD BOOKS TO RECOMMENDED, WANT TO READ, READ

const buttonSuccess = () => {
  console.log('success');
};

const grabBookInfo = (event) => {

}

const addBookToDatabase = (event) => {
  const bookLink = event.target.parentNode.parentNode.parentNode.id;
  db.Book.findOne( { googleKey: bookLink }, (err, foundBook) => {
    if (err) return console.log(err);

    if (foundBook) return console.log('Book already in database!');

    else {  
      $.ajax({
        method: 'POST',
        url: 'http://localhost:4000/api/v1/books/',
        data: {
          googleKey: bookLink,
        },
        success: buttonSuccess,
        error: onError,
      });
    };
  });
};

const wantToRead = (event) => {
  console.log()
  $.ajax({
    method: 'PUT',
    url: 'http://localhost:4000/api/v1/users/5db09cb80b102b9887381d46',
    data: {
      "booksWantToRead": $(event.target.parentNode.parentNode.parentNode.id)
    },
    success: buttonSuccess,
    error: onError,
  });
};


$('.book-gallery').on('click', '.fa-bookmark', function
(event) {
  addBookToDatabase(event);
});