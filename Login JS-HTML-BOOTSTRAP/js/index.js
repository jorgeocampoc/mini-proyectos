(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()



const user = {
    name:'',
    password:''
}


const d = document;

const nameReg = d.getElementById('nameReg');
const passwordReg = d.getElementById('passwordReg');


const nameLog = d.getElementById('nameLog');
const passwordLog = d.getElementById('passwordLog');

const cardRegister = document.getElementById('cardRegister');
const cardLogin = document.getElementById('cardLogin');



function goToLogin(){
    d.getElementById('formRegister').reset();
    cardRegister.style.display = 'none';
    cardLogin.style.display = 'block';
    document.getElementById('formRegister').classList.remove('was-validated');
}
function goToRegister(){
    d.getElementById('formLogin').reset();
    cardRegister.style.display = 'block';
    cardLogin.style.display = 'none';
    document.getElementById('formLogin').classList.remove('was-validated');
}


const registerUser = ( event )=>{
    event.preventDefault();
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    if( nameReg.value.trim() !== '' && passwordReg.value.trim() !== '' ){
        user.name = nameReg.value.trim();
        user.password = passwordReg.value.trim();
        if( !isExiste( user, users ) ){
            users.push( user )
            localStorage.setItem( 'users', JSON.stringify(users) );
            generateAlert('success', user.name, 'Ir a login')
        }else{
            generateAlert('error', user.name, 'Regresar')
        }
    }else{
        if( nameReg.value.trim() == '' ){
            nameReg.focus();
        }
        else if( passwordReg.value.trim() == '' ){
            passwordReg.focus();
        }
    }

    
    
}

function generateAlert(tipo, userName, action){
    Swal.fire({
        title: "Operación exitosa",
        text: `El usuario "${userName}" fue registrado`,
        icon: `${tipo}`,
        confirmButtonText: `${action}`
    }).then((result) => {
        if( tipo == 'success' ){
            if (result.isConfirmed) {
                    goToLogin();
            }
        }
        document.getElementById('formRegister').classList.remove('was-validated');
        d.getElementById('formRegister').reset();
    });
}


const loginUser = ( event )=>{
    event.preventDefault();
    let users = JSON.parse(localStorage.getItem('users')) || [];
    user.name = nameLog.value;
    user.password = passwordLog.value;
    if( isExiste( user, users ) ){
        localStorage.setItem('user', user.name);
        d.getElementById('formLogin').reset();
        window.location.href = 'home.html'
    }else{
        generateAlertNoExiste('error', 'El usuario/contraseña son invalidas')
        d.getElementById('formLogin').reset();

    }

}


function generateAlertNoExiste(tipo, message){
    Swal.fire({
        title: 'Operacion fallida',
        text: `${message}`,
        icon: `${tipo}`
      }).then( (res)=>{
        d.getElementById('formLogin').reset();
        document.getElementById('formLogin').classList.remove('was-validated');

      } )

}

// function cleanInputs(){
//     user.name = '';
//     user.password = '';
//     nameLog.value = '';
//     passwordLog.value = '';
//     nameReg.value = '';
//     passwordReg.value = '';

// }



function isExiste( user, users ){
    let res = false;
    if( users !== null ){
        for (let i = 0; i < users.length; i++) {
            if( users[i].name == user.name && users[i].password == user.password ){
                res = true;
                break 
            }
        }
    }
    return res;
}







d.getElementById('formRegister').addEventListener('submit', registerUser)
d.getElementById('formLogin').addEventListener('submit', loginUser)