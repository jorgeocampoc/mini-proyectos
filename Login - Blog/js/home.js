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

let band = true

const logo = document.getElementById('logo');
const tagsBadgeId = document.getElementById('tags'); 
const posts = document.getElementById('posts');
const postsUser = document.getElementById('postsUser');
const tags = [
              {name:'HTML', color:'danger'},
              {name:'CSS', color:'primary'},
              {name:'JavaScript', color:'warning'},
              ];


const userLocal = JSON.parse(localStorage.getItem('user'));              
if( !userLocal ) window.location.href = 'index.html';




function generateDivUser() {
    let nameUser = JSON.parse(localStorage.getItem('user'));
    
    let res = `
    <img 
                src="https://ui-avatars.com/api/?name=${nameUser.nameUser}" 
                alt="Bootstrap" 
                
                class="rounded-circle custom-img "
                >
    `;
    document.getElementById('logo').innerHTML = res;
    document.getElementById('nameProfile').innerHTML = nameUser.nameUser;
}


function generateAlertWelcome() {
    if (!localStorage.getItem('alertBand')) {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Operación exitosa",
            showConfirmButton: false,
            timer: 2000
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


const contentTags = document.getElementById('content-tags');



function showPosts(){
  postsUser.classList.remove('active');
  posts.classList.add('active');
  let allPosts = JSON.parse( localStorage.getItem('posts') ) || [];
  generateAllPostsDiv(allPosts,'posts','allPosts');
  genereTagsBadge( true);
  

  
}
function filterPostByUser(){
    posts.classList.remove('active');
    postsUser.classList.add('active');
    let postUser = JSON.parse( localStorage.getItem('posts') ) || [];
    let user = JSON.parse(localStorage.getItem('user'));
    postUser = postUser.filter( p => p.id == user.id );
    generateAllPostsDiv(postUser, 'postUser', 'postsCards');
    genereTagsBadge( false );
    
}

/**Genere all cards psots */
let allPosts = JSON.parse( localStorage.getItem('posts') ) || [];
function generateAllPostsDiv( allPosts, tipe, idDiv ){
  document.getElementById('allPosts').innerHTML = '';
  document.getElementById('postsCards').innerHTML = '';
    let res = '';
    if( allPosts.length == 0 ){
      res = `
    <div class="card bg-light  shadow">
            <div class="card-body">
              <div class="card-title text-center">
                  Sin comentarios
              </div>
            </div>
          </div>
    `
      document.getElementById(idDiv).innerHTML = res;
    }else{
      allPosts.forEach( (p) =>{
        let footer = (tipe=='postUser')?`
              <div class="card-footer d-flex justify-content-around align-items-center">
                <small class="col align-middle">${p.date}</small>
                <div class="col d-flex justify-content-end">
                  <i onclick="deletePost('${p.idPost}')" class="mx-2 py-2 fa-2x text-danger fa-solid fa-trash"></i>
                  <i onclick="editPost('${p.idPost}')" 
                  type="button"  data-bs-toggle="modal" data-bs-target="#modalEdit"
                  class="mx-2 py-2 fa-2x text-primary fa-solid fa-square-pen"></i>
                </div>
              </div>`:`
              <div class="card-footer row justify-content-around ">
                <small class="col">${p.date}</small>
              </div>`;
        res+=`
        <div class="card my-1 shadow my-2" id='card-${p.id}'>
        <div class="card-body">
        <h5 class='text-center pb-3'> ${p.title} </h5>
                <span class="badge text-bg-${p.tag.color}">${p.tag.name}</span> <br>
                <small class="">Published by: ${p.user.nameUser}</small>
              </div>
              <div class="card-body">
                <p>${p.post}</p>
              </div>
            ${footer}
              </div>
        `
      })
      document.getElementById(idDiv).innerHTML = res;
    }
}

let postBtn = document.getElementById('postBtn')

/*/*Geenre TAgs badge*/
function genereTagsBadge( band ){
  
    
    if( band ){
      let res = '';
  tags.forEach( b =>{
    res+=`
     <span  onclick="filterByTag('${b.name}')" class="badge  tagSpan text-bg-${b.color}">${b.name}</span>
    `
  })
  document.getElementById('tags').innerHTML = res;
  postBtn.style.display = 'inline-block'
}else{
  document.getElementById('tags').innerHTML = '';
  postBtn.style.display = 'none'

    }

  
 
  
  
}



//*create  a post
function createPost(event) {
  event.preventDefault();
  
  if (event.target.checkValidity()) {
    let input = document.getElementById('post').value.trim();
    let title = document.getElementById('title').value.trim();
    let tag = parseInt(document.getElementById('tag').value);
    generatePostObject(input, title, tag);
    let allPosts = JSON.parse( localStorage.getItem('posts') ) || [];
    allPosts.push(postObject);
    localStorage.setItem('posts',JSON.stringify(allPosts))
    generateAllPostsDiv(allPosts, 'posts', 'allPosts');
    closeModal('staticBackdrop');
    document.getElementById('formCreatePost').classList.remove('was-validated');
    document.getElementById('formCreatePost').reset();
  } else
  generateAlert('error', 'Llene los campos', 'Error al crear post')
  document.getElementById('formCreatePost').classList.add('was-validated');
  document.getElementById('post').focus();{}

}

  const postObject = {
    idPost:null,
    id:null,
    post:'',
    user:null,
    date:null,
    tag:null,
    title:null
  }


function generatePostObject(input, title, tag){
  
  let options = { year: 'numeric', month: 'long', day: 'numeric' };
  let date = new Date().toLocaleDateString('es-ES', options);
  let user = JSON.parse(localStorage.getItem('user'));
  postObject.idPost = crypto.randomUUID();
  postObject.id = user.id;
  postObject.post = input;
  postObject.user= {... user};
  postObject.date = date;
  postObject.tag = { ...tags[tag] };
  postObject.title = title;
}

function generateAlert(tipo, message, title){
  Swal.fire({
    icon: tipo,
    title: title,
    text: message,
    
  });
}

function filterUserById(posts,idUser){
  return posts.filter( p=>p.id == idUser );
}


function filterByTag( tag ){
  let posts = JSON.parse( localStorage.getItem('posts') ) || [];
  posts = posts.filter( p => p.tag.name == tag );
  generateAllPostsDiv(posts, 'posts', 'allPosts')

}


function deletePost( idPost ){
  
  Swal.fire({
    title: "Estas seguro?",
    text: "Se eliminara el post si aceptas",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si",
    cancelButtonText:'No'
  }).then((result) => {
    if (result.isConfirmed) {
      let posts = JSON.parse( localStorage.getItem('posts') ) || [];
      posts = posts.filter( p => p.idPost !== idPost);
      localStorage.setItem('posts',JSON.stringify(posts));
      generateAllPostsDiv(posts, 'postUser', 'postsCards');
      Swal.fire({
        title: "Eliminado!",
        text: "Se elimino el post satisfactoriamente",
        icon: "success"
      });
    }
  });
}
function editPost( idPost ){
  let posts = JSON.parse( localStorage.getItem('posts') ) || [];
  posts = posts.filter( p=> p.idPost == idPost );
  posts = posts[0];
  document.getElementById('titleEdit').value = posts.title;
  document.getElementById('postEdit').value = posts.post;
  localStorage.setItem('idPost', idPost);
  
}

function saveEditPost(){
  let newTitle =document.getElementById('titleEdit').value.trim();
  let newPost = document.getElementById('postEdit').value.trim();
  if( newTitle !== '' && newPost !== '' ){
    let idPost = localStorage.getItem('idPost');
    let posts = JSON.parse( localStorage.getItem('posts') ) || [];
    let indexPsot = posts.findIndex( p => p.idPost == idPost );
    posts[indexPsot].title = newTitle;
    posts[indexPsot].post = newPost;
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let date = new Date().toLocaleDateString('es-ES', options);
    posts[indexPsot].date = date; 
    localStorage.setItem('posts',JSON.stringify(posts));
    posts = posts.filter( p => p.id == JSON.parse(localStorage.getItem('user')).id );
    generateAllPostsDiv(posts, 'postUser', 'postsCards');
    closeModal('modalEdit');
    localStorage.removeItem('idPost')
  }else{
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "los campos no deben estar vacios",
      showConfirmButton: false,
      timer: 2000
    });
    document.getElementById('formEdit').classList.add('was-validated');
  }


}


function closeModal(idModal){
  let modal = bootstrap.Modal.getInstance( document.getElementById(idModal) );
    if( modal ){
      modal.hide();
    }
}



generateDivUser();
generateAlertWelcome();
genereTagsBadge( band );
generateAllPostsDiv(allPosts,'posts','allPosts');

document.getElementById('formCreatePost').addEventListener('submit', createPost);
