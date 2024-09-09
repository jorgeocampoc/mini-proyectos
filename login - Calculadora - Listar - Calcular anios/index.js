const send = () => {
  var name = document.getElementById("formGroupExampleInput").value.trim();
  var password = document.getElementById("formGroupExampleInput2").value.trim();
  if (name !== "" && password !== "") {
    const users = getUsers("users");
    const user = { id: users.length, name: name, password: password };
    login(users, user);
  }
};

function deshabilitarBoton() {
  var boton = document.getElementById("sent");
  boton.disabled = true;
}

const onModal = (event) => {
  event.preventDefault();
  var modal = new bootstrap.Modal(document.getElementById("miModal"));
  modal.show();
};
const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
const storedUsersList = JSON.parse(localStorage.getItem("usersList")) || [];

const sendRegister = () => {
  var errorContainer = document.getElementById("error-message");
  var errorContainerPassword = document.getElementById(
    "error-message-password"
  );
  var name = document.getElementById("name").value.trim();
  var password = document.getElementById("password").value.trim();
  var nameInput = document.getElementById("name");
  var nameInputPassword = document.getElementById("password");
  if (name === "") {
    errorContainer.innerHTML = "The name is required";
    nameInput.focus();

    errorContainerPassword.innerHTML = "";
  } else if (password === "") {
    errorContainerPassword.innerHTML = "The password is required";
    nameInputPassword.focus();
    errorContainer.innerHTML = "";
  } else {
    const users = getUsers("users");
    const user = { id: users.length, name: name, password: password };
    alreadyExists(users, user, "users");
  }
};
const offModal = () => {
  event.preventDefault();
  var miBoton = document.getElementById("registerUser");

  // Agregar el atributo data-bs-dismiss="modal"
  miBoton.setAttribute("data-bs-dismiss", "modal");
};
function getUsers(users) {
  let usuarios;
  if (localStorage.getItem(users) === null) {
    usuarios = [];
  } else {
    usuarios = JSON.parse(localStorage.getItem(users));
  }
  return usuarios;
}
function alreadyExists(users, user, tipo) {
  const band = users.find((u) => u.name === user.name);
  if (!band) {
    alert(`El usuario ${user.name} fue registrado `);
    users.push(user);
    localStorage.setItem(tipo, JSON.stringify(users));
    location.reload(true);
  } else {
    alert(`El user ${user.name} ya existe `);
  }
}
function login(users, user) {
  const band = users.find(
    (u) => u.name === user.name && u.password === user.password
  );
  if (band) {
    localStorage.setItem("user", user.name);
    window.location.href = "page.html";
  } else {
    alert("Usuario/contraseña invalidos");
  }
}

const saveUser = () => {
  const user = document.getElementById("userList").value.trim();
  const lastName = document.getElementById("lastNameList").value.trim();
  if (user !== "" && lastName !== "") {
    const fullName = user + " " + lastName;
    const users = getUsers("usersList");
    users.push(fullName);
    console.log(users);
    localStorage.setItem("usersList", JSON.stringify(users));
    document.getElementById("userList").value = "";
    document.getElementById("lastNameList").value = "";
    showUsers(fullName);
  }
};
var index = 0;
const showUsers = (user) => {
  let list = document.getElementById("listUsers");
  if (list) {
    index++;
    let newUser = document.createElement("li");
    newUser.className = "list-group-item";
    newUser.textContent = index + ".- " + user;
    list.appendChild(newUser);
  }
};
function loadUsers() {
  let usersList = getUsers("usersList");
  for (let index = 0; index < usersList.length; index++) {
    showUsers(usersList[index]);
  }
}
function loadName() {
  const nameUser = document.getElementById("loginName");
  if (localStorage.getItem("user")) {
    nameUser.className = "text-center fs-3";
    nameUser.innerHTML = localStorage.getItem("user").toUpperCase();
  }
}

document.addEventListener("DOMContentLoaded", loadUsers);
document.addEventListener("DOMContentLoaded", loadName);

const exit = (event) => {
  event.preventDefault();
  const band = confirm("¿ Quieres salir de la aplicacion?");
  if (band) {
    localStorage.removeItem("user");
    localStorage.removeItem("usersList");
    window.location.href = "index.html";
  }
};

const operation = (tipo) => {
  const result = document.getElementById("result");
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  if (num1 !== 0 && num2 !== 0) {
    switch (tipo) {
      case "add":
        result.textContent = num1 + num2;
        cleanCalculator();
        break;
      case "subtract":
        result.textContent = num1 - num2;
        cleanCalculator();
        break;
      case "multiply":
        result.textContent = num1 * num2;
        cleanCalculator();
        break;
      case "divition":
        result.textContent = num1 / num2;
        cleanCalculator();
        break;
      default:
        break;
    }
  }
};

const cleanCalculator = () => {
  document.getElementById("num1").value = "";
  document.getElementById("num2").value = "";
};

const calculatorYears = () => {
  const dateInput = document.getElementById("date").value;
  const age = getAge(dateInput);
  const res = document.getElementById("resultAge");
  res.innerHTML = age;
};

function getAge(dateString) {
  let currentDate = new Date();
  let inputDate = new Date(dateString);
  let age = currentDate.getFullYear() - inputDate.getFullYear();
  let differentMoths = currentDate.getMonth() - inputDate.getMonth();
  if (
    differentMoths < 0 ||
    (differentMoths === 0 && currentDate.getDate() < inputDate.getDate())
  ) {
    age--;
  }
  return age;
}

const toggleContrasena = () => {
  const pass = document.getElementById("formGroupExampleInput2");
  const labelPass = document.getElementById("flexCheckDisabled");
  pass.type = labelPass.checked ? "text" : "password";
};
