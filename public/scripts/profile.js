const userId = window.location.pathname.split('/')[2];
console.log(userId);

const handleSuccess = (user) => {

  document.querySelector('title').innerHTML = `${user.firstName}'s Profile`


  document.querySelector('.wrapper').insertAdjacentHTML('beforeend', `
      <section class="welcome">
        <div>
            <h4><strong>${user.firstName}, welcome back!</strong> </h4>
            <p><strong>Books & Coffee are always the perfect match...</strong></p>
        </div>
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




// AJAX
const recommendedBooksArr = [];

const onError = (err) => {
  console.log(err)
}


const googleKeysArr = []
let iterationCounter = 0;

const pushImagesIntoArray = (res) => {
  recommendedBooksArr.push(res.volumeInfo.imageLinks.medium);
  console.log(recommendedBooksArr);
  iterationCounter++;
    $('.first-pic').attr('src',`${recommendedBooksArr[0]}`);
    $('.second-pic').attr('src',`${recommendedBooksArr[1]}`);
    $('.third-pic').attr('src',`${recommendedBooksArr[2]}`);
    $('.fourth-pic').attr('src',`${recommendedBooksArr[3]}`);
    $('.fifth-pic').attr('src',`${recommendedBooksArr[4]}`);
    $('.sixth-pic').attr('src',`${recommendedBooksArr[5]}`);
    $('.seventh-pic').attr('src',`${recommendedBooksArr[6]}`);
};

const pullFromBooksGoogle = (res) => {
  console.log(res.data.googleKey);
  iterationCounter++;
  console.log(iterationCounter);

  $.ajax({
    method: 'GET',
    url: res.data.googleKey,
    success: pushImagesIntoArray,
    error: onError,
  });

  // if (iterationCounter === 5) {
  //   $('#carousel').append(`
  //   <div class="hideLeft" id="${googleKeysArr[0]}">
  //   <img class="first-pic" src="">
  //   </div>`
    
    // <div class="prevLeftSecond" id="${googleKeysArr[1]}">
    // <img class="second-pic" src="">
    // </div>
    
    // <div class="prev" id="${googleKeysArr[2]}">
    // <img class="third-pic" src="">
    // </div>
    
    // <div class="selected" id="${googleKeysArr[3]}">
    // <img class="fourth-pic" src="">
    // </div>
    
    // <div class="next" id="${googleKeysArr[4]}">
    // <img class="fifth-pic" src="">
    // </div>
    
    // <div class="nextRightSecond" id="${googleKeysArr[5]}">
    // <img class="sixth-pic" src="">
    // </div>
    
    // <div class="hideRight" id="${googleKeysArr[6]}">
    // <img class="seventh-pic" src="">
    // </div>
    // `
    // )};
};

const pullRecommended = (res) => {
  res.data.recommendedBooks.forEach((book) => $.ajax({
    method: 'GET',
    url: `/api/v1/books/${book}`,
    success: pullFromBooksGoogle,
    error: onError,
  }));
};

$.ajax({
  method: 'GET',
  url: `/api/v1/users/${localStorage.userId}`,
  success: pullRecommended,
  error: onError,
});

$( ".getinfo" ).dblclick(function() {
  console.log($(this).attr('src'));
});


