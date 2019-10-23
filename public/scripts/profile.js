

const userId = window.location.pathname.split('/')[2];
console.log(userId);

const handleSuccess = (user) => {
    
  document.querySelector('title').innerHTML = `${user.firstName}'s Profile`


  document.querySelector('.pos-f-t').insertAdjacentHTML('beforeend', `
     <section>
        <div>
            <h4><strong>Name:</strong> ${user.firstName} ${user.lastName}</h4>
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