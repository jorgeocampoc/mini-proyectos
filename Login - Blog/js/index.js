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
    id:0,
    nameUser:'',
    password:'',
    name:'',
    lastName:'',
    gender:'',
    phone:'',
    email:'',
    city:''
}


const d = document;




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
    console.log(event.target.checkValidity());
    getUser();
    if( event.target.checkValidity() ){
        if( !isExiste( user, users  ) ){
            let id = parseInt(localStorage.getItem('id')) || 0;
            user.id = id + 1;
            users.push( user )
            localStorage.setItem( 'users', JSON.stringify(users) );
            localStorage.setItem('id', id + 1);
            generateAlert('success', `El usuario ${user.nameUser} fue registrado`, 'Ir a login')
        }else{
            generateAlert('error', `El usuario ${user.nameUser} no esta disponible`, 'Regresar')
        }
    }else{
       //hacer un form y recorrer todos los clkas input 
        
    }
}

function generateAlert(tipo, message, action){
    Swal.fire({
        title: "Operación exitosa",
        text: message,
        icon: `${tipo}`,
        confirmButtonText: `${action}`
    }).then((result) => {
        if( tipo == 'success' ){
            if (result.isConfirmed) {
                goToLogin();
                document.getElementById('formRegister').classList.remove('was-validated');
                d.getElementById('formRegister').reset();
            }
        }
        
    });
}


const loginUser = ( event )=>{
    event.preventDefault();
    let users = JSON.parse(localStorage.getItem('users')) || [];
    user.nameUser = nameLog.value;
    user.password = passwordLog.value;
    if( nameLog.value.trim() !== '' && passwordLog.value.trim() !== '' ){
        if( isExiste( user, users ) ){
            document.getElementById('formLogin').classList.remove('was-validated');
            localStorage.setItem('user', user.nameUser);
            d.getElementById('formLogin').reset();
            window.location.href = 'home.html'
        }else{
            generateAlertNoExiste('error', 'El usuario/contraseña son invalidas')
            d.getElementById('formLogin').reset();
        }
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

function getUser(){  
    user.nameUser = d.getElementById('nameReg').value.trim();
    user.password = d.getElementById('passwordReg').value.trim();
    user.name = d.getElementById('name').value.trim();
    user.lastName = d.getElementById('lastName').value.trim();
    user.gender = d.querySelector(`input[name="sexo"]:checked`).value || '';
    user.email =d.getElementById('email').value.trim();
    user.phone =d.getElementById('number').value.trim();
    user.city =d.getElementById('city').value.trim();
}



function isExiste( user, users ){
    let res = false;
    if( users !== null ){
        for (let i = 0; i < users.length; i++) {
            if( users[i].nameUser == user.nameUser){
                res = true;
                break 
            }
        }
    }
    return res;
}


/**function return true if any fields are empty */
function validateNotEmpty( user ){
    return ( user.name == '' || user.lastName == '' || 
        user.gender == '' || user.phone == '' || user.email == '' ||
        user.city == '' || user.nameUser == '' ||user.password == '' )? true: false;
}





d.getElementById('formRegister').addEventListener('submit', registerUser)
d.getElementById('formLogin').addEventListener('submit', loginUser)