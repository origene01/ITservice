const form = document.querySelector('form');
const spinner= document.querySelector('.spinner');
const mensaje = document.querySelector('.mensaje');

const nombre = form.name;
const email = form.email;
const message = form.mensaje;

const emailRegex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const usernameRegex = /^[a-z0-9_-]{3,16}$/
const mensajeRegex = /^.{1,255}$/

const validar = (tipo,value) => {

    switch (tipo) {
        case 'name':
            if(usernameRegex.test(value)){
                nombre.classList.remove('error');
                nombre.classList.add('success');
              
            } else {
                nombre.classList.add('error')
                mensaje.classList.remove('none','success');
                mensaje.classList.add('error');
                mensaje.textContent = 'Nombre incorrecto';
                mensaje.style.background= "orange";
                setTimeout(() => mensaje.classList.add('none'), 5000);
            }
            break;

            case 'email':
                if(emailRegex.test(value)){
                    email.classList.remove('error');
                    email.classList.add('success');
                } else {
                    email.classList.add('error')
                    mensaje.classList.remove('none','success');
                    mensaje.classList.add('error');
                    mensaje.textContent = 'Correo incorrecto';
                    mensaje.style.background ="orange";
                    setTimeout(() => mensaje.classList.add('none'), 5000);
                }
            break;

            case 'textArea':
                if(mensajeRegex.test(value)){
                    message.classList.remove('error');
                    message.classList.add('success');
                } else {
                    message.classList.add('error')
                    mensaje.classList.remove('none','success');
                    mensaje.classList.add('error');
                    mensaje.textContent = 'Mensaje incorrecto';
                    setTimeout(() => mensaje.classList.add('none'), 5000);
                }
            break;
        default: console.log('Dios te bendiga :)');
            break;
    }
}

nombre.addEventListener('blur', e =>{
    validar('name',e.target.value)
});
email.addEventListener('blur', e =>{
    validar('email',e.target.value)
});
message.addEventListener('blur', e =>{
    validar('textArea',e.target.value)
});




form.addEventListener('submit',(e) =>{
    e.preventDefault();
    const options = {
        method: 'POST',
        body: new FormData(e.target)
    }
    if(usernameRegex.test(nombre.value) && emailRegex.test(email.value) && mensajeRegex.test(message.value)){
        spinner.classList.remove('none');
        fetch('https://formsubmit.co/ajax/spanuwey@gmail.com',options)
        .then( res => res.ok ? res.json() : Promise.reject(res))
        .then( (json = 'hola') => {
            spinner.classList.add('none')
            mensaje.classList.remove('none','error');
            mensaje.classList.add('success');
            mensaje.textContent = 'Se envio correctamente';
            mensaje.style.background = "green";
            setTimeout(() => { mensaje.classList.add('none')}, 5000);
            nombre.classList.remove('success','error');
            email.classList.remove('success','error');
            message.classList.remove('success','error')
            form.reset();
        })
        .catch( err =>{
            mensaje.classList.remove('none','success');
            mensaje.classList.add('error');
            mensaje.textContent = 'ocurrio un error';
            mensaje.style.background ="red";
            setTimeout(() => { mensaje.classList.add('none')}, 5000);
    
        })
    } else {
        mensaje.classList.remove('none','success');
        mensaje.classList.add('error');
        mensaje.textContent = 'Llene el formulario';
        mensaje.style.background ="orange";
        setTimeout(() => { mensaje.classList.add('none')}, 5000);

    }
})