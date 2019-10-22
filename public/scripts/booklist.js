const $search = $('form').val();

const onSuccess = (res) => {
  res.items.forEach((book) => {
    const template = `
    <div class="book">
      <div class="book-img">
        <img class="book-img" src="${book.volumeInfo.imageLinks.thumbnail}"/>
      </div>
      <div class="book-info">
        <div class="book-title">${book.volumeInfo.title}</div>
        <div class="book-author">${book.volumeInfo.authors}</div>
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

$('form').on('submit', function (event) {
  event.preventDefault();
  $('.book-gallery').empty();
  search();
});

$('div.book').on('click', function () {
console.log('clicked');
const template = `
<div id="myModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <div id="allset">All Set!</div>
    <div id="all-set-description">You'll now start receiving emails on all things Hilary Duff</div>
    <button class="btn btn-primary" id="continue-browsing">CONTINUE BROWSING</button>
  </div>
</div>
`
$('.book-gallery').append(template);
});