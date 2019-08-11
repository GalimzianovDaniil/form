'use strict';

const form       = document.querySelector('#form'),
      nameInput  = form.querySelector('#name'),
      phoneInput = form.querySelector('#phone'),
      emailInput = form.querySelector('#email');

form.addEventListener('submit', function(event) {
    event.preventDefault();    

    if (checkInput(nameInput, /[^А-ё\s-]/) && checkInput(phoneInput, /[^\d\-+\s]/) && checkInput(emailInput, /.+@.+\..+/i, true)) {
        sendData(form)
                .then(() => alert('Форма успешно отправлена'))
                .catch(() => alert('Ошибка'));
    }

});

function showError(input) {
    const commentError =  input.getAttribute('validationError');

    input.classList.add('wrong_data');
    alert(commentError);
}

function hideError(input) {
    input.classList.remove('wrong_data');
}

function checkInput(input, redExp, mail=false) {
    if (mail && input.value !== '') {

        hideError(input);

        if (!(redExp.test(input.value))) {
            showError(input);
            return false;
        }

    } else {

        hideError(input);

        if (redExp.test(input.value)) {
            showError(input);
            return false;
        }
    }

    return true;
}


function sendData(form) {
    return new Promise(function(resolve, reject) {
        const request  = new XMLHttpRequest(),
              url      = form.getAttribute('action'),
              formData = new FormData(form);
        
        request.open('POST', url);  
        request.send(formData);

        request.addEventListener('readystatechange', function(){
            if (request.readyState == 4) {
                if (request.status == 200 && request.responseText == 'Всё хорошо.') {
                    resolve();
                } else {
                    reject();
                }
            }
            
        });

    });
    
}