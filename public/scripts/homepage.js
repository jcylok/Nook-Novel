// console.log('GET THAT KNOWLEDGE');

/*!
 * Start Bootstrap - Agency v5.2.2 (https://startbootstrap.com/template-overviews/agency)
 * Copyright 2013-2019 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-agency/blob/master/LICENSE)
 */

!function(e){"use strict";e('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var a=e(this.hash);if((a=a.length?a:e("[name="+this.hash.slice(1)+"]")).length)return e("html, body").animate({scrollTop:a.offset().top-54},1e3,"easeInOutExpo"),!1}}),e(".js-scroll-trigger").click(function(){e(".navbar-collapse").collapse("hide")}),e("body").scrollspy({target:"#mainNav",offset:56});function a(){100<e("#mainNav").offset().top?e("#mainNav").addClass("navbar-shrink"):e("#mainNav").removeClass("navbar-shrink")}a(),e(window).scroll(a)}(jQuery);


const form = document.querySelectorAll('form')
console.log(form)

for (let i = 0; i < form.length; i++) {
form[i] && form[i].addEventListener('submit', (event) => {
    let formIsValid = true;
    const userData = {};
    event.preventDefault();


    const removeElements = (elms) => elms.forEach(el => el.remove());
    removeElements( document.querySelectorAll(".alertMessage") );
    

    // Add Alert Message
    [...form[i].elements].forEach(input => {
      if (input.type !== 'submit' && input.value === '') {
        formIsValid = false;
        input.classList.add('input-error');
        input.insertAdjacentHTML('afterend', `
          <div class='alertMessage'>
            Please enter your ${input.id}
          </div>
      `);
      } else if (input.type === 'password' && input.value.length < 5) {
        formIsValid = false;
        input.classList.add('input-error');
        input.insertAdjacentHTML('afterend', `
          <div class='alertMessage'>
            Password must be at least 5 characters
          </div>
      `);
      }


      if (input.id === 'confirmed password') {
          if (input.value !== document.getElementById('password').value) {
            formIsValid = false;
            input.classList.add('input-error');
            input.insertAdjacentHTML('afterend', `
              <div class='alertMessage'>
                Password not matched
              </div>
          `);

          }
      }
  
      if (input.type !== 'submit' && formIsValid) {
        // console.log(input.value);
        userData[input.name] = input.value;
      }
    });
  
    console.log(userData);

    // Handle Signup Form
  if (form[i].id === 'signUpForm' && formIsValid) {
    console.log('Submitting new user --> ', userData);
    fetch('/api/v1/signup', {
      method: 'POST',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(userData)
    })
      .then(dataStream => dataStream.json())
      .then(res => {
        console.log(res);
        if (res.status === 201) return window.location = '/login';
      })
      .catch(err => console.log(err));
  }

  // Handle Login
  if (form[i].id === 'login-nav' && formIsValid) {
    console.log('Submitting user login --> ', userData);
    fetch('/api/v1/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(dataStream => dataStream.json())
      .then(res => {
        console.log(res);
        if (res.status === 201) return window.location = `/profile/${res.data.id}`;
      })
      .catch(err => console.log(err));
  }
  

  
  });
}
