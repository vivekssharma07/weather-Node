console.log('client side javascript file is loaded!');

const formSubmit = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
      messageOne.textContent = '';
const messageTwo = document.querySelector('#message-2');
      messageTwo.textContent = '';

formSubmit.addEventListener('submit',(e) => {
    e.preventDefault();
    const location = search.value;
    fetch('/weather?address='+location).then((response)=>{
            response.json().then((data) => {
                    if(data.error){
                        //console.log(data.error);
                        messageOne.textContent = data.error;   
                        messageTwo.textContent = '';                
                    } else {
                        messageOne.textContent = data.location;
                        messageTwo.textContent = data.forecast;
                        // console.log(data.location);
                        // console.log(data.forecast);
                    }
            })
    })
})
