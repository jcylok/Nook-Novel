const userId = window.location.pathname.split('/')[2];
console.log(userId);

const handleSuccess = (user) => {

  document.querySelector('title').innerHTML = `${user.firstName}'s Profile`


  document.querySelector('.wrapper').insertAdjacentHTML('beforeend', `
     <section class="welcome">
        <div>
            <h4><strong>${user.firstName}, welcome back!</strong> </h4>
            <p><strong>Email</strong>: ${user.email}</p>
            <p><strong>Like Genres</strong>: ${user.likedGenres}</p>
        </div>
     </section> 
  `);
}



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