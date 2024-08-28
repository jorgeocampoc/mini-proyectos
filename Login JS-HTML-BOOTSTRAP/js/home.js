const logo = document.getElementById('logo');

function generateDivUser() {
    let nameUser = localStorage.getItem('user');
    
    let res = `
    <img 
                src="https://ui-avatars.com/api/?name=${nameUser}" 
                alt="Bootstrap" 
                width="45" 
                height="45"
                class="rounded-circle"
                >
    `;
    document.getElementById('logo').innerHTML = res;
    document.getElementById('nameProfile').innerHTML = nameUser;
}


function generateAlertWelcome() {
    if (!localStorage.getItem('alertBand')) {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Operación exitosa",
            showConfirmButton: false,
            timer: 1500
        });
        localStorage.setItem('alertBand', 'true');
    }
}


function logout(){
    Swal.fire({
        title: "Estas seguro que deseas cerrar sesion?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Salir",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('user');
          localStorage.removeItem('alertBand');
          window.location.href = 'index.html';
        }
      });
   
}

generateDivUser();
generateAlertWelcome();