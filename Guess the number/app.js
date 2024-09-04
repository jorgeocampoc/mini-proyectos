/**Selecciones globales */
let buttonStart = document.getElementById("startBtn");
let btnPlay = document.getElementById("playBtn");
let content = document.getElementById("content");
let btnTryAttemp = document.getElementById("tryAttemp");
let selectDifficult = document.getElementById("accordionOptions");
let collapseEasyPlay = document.getElementById("collapseEasy");
let divGameInProcess = document.getElementById("gameInProcess");
let attempsValue = 0;
let secondsValue = 0;
const body = document.querySelector("body");
let count = 0;
let intervalId = "";
let timeScord = -1;
let numRandom = 0;
let nivelTime = ''
/**Objct difficults */
let difficults = [
  {
    nivel: "facil",
    time: 9999999999,
    timeImg: "/assets/img/infinity.svg",
    attempts: 9999999999,
    attemptsImg: "/assets/img/infinity.svg",
  },
  {
    nivel: "medio",
    time: 30,
    attempts: 10,
  },
  {
    nivel: "dificil",
    time: 15,
    attempts: 5,
  },
];

body.classList.add("animateBody");

/** write the time and attemps for each level */
const writeLevel = () => {
  for (let i = 0; i < 2; i++) {
    document.getElementById(`time-${i}`).innerHTML = `
    ${difficults[i + 1].time} SEGUNDOS`;
    document.getElementById(`attemp-${i}`).innerHTML = `
    ${difficults[i + 1].attempts}`;
  }
};

/**Btn Start */
const start = () => {
  buttonStart.style.display = "none";
  showOptions();
  writeLevel();
};

/**Show options */
const showOptions = () => {
  accordionOptions.style.setProperty("display", "block", "important");
  selectDifficult.style.display = "block";
  generateTransition(selectDifficult);
};

/**Btn play */
const play = (nivel) => {
  accordionOptions.style.setProperty("display", "none", "important");
  gameInProcess(nivel);
};

/**Game in proccess */
const gameInProcess = (nivel) => {
  divGameInProcess.style.display = "block";
  generateTransition(divGameInProcess);
  generateDivGame(nivel);
};

/**generate divFame */
const generateDivGame = (nivel) => {
  if (nivel == "easy") {
    game(difficults[0]);
  }
  if (nivel == "medium") {
    game(difficults[1]);
  }
  if (nivel == "hard") {
    game(difficults[2]);
  }
};

/**Generate tags divGame */
const game = (objectDifficukt) => {
  nivelTime =Object.assign({}, objectDifficukt)
  attempsValue = objectDifficukt.attempts;
  secondsValue = objectDifficukt.time;
  
  let auxP =
    objectDifficukt.nivel == "facil"
      ? `<p class="text-center  mb-5 text-dark"><img src="assets/img/infinityBlack.svg" width="35" alt="img"></p>`
      : `<p class="text-center mb-5 text-dark" id='timeLevel'>${objectDifficukt.time}</p>`;
  let auxA =
    objectDifficukt.nivel == "facil"
      ? `<div class="col-6"> <code class='lett-spacing'>
                            Intentos: 
                            </code> 
          <img src="assets/img/infinityBlack.svg" width="35" alt="img">
          </div>`
      : ` <div class="col-6"> <code class='lett-spacing'>Intentos: </code> 
          <span id='attempValue'> ${objectDifficukt.attempts} </span> </div>`;
  divGameInProcess.innerHTML = `
  <div class="card p-5 " id='cardGameInProcess'>
      <h3 class="card-title">
          Adivina el Numero
      </h3>
      <hr>
      <div class="card-body">
        <div class="row"> 
        ${auxP}
          <div class="col-6"> <code class='lett-spacing'>Dificultad: 
          </code> <span class='lett-spacing'> ${objectDifficukt.nivel}</span> </div>
        ${auxA}
        </div>
      </div>
      <div class="card-body">
          <input 
              type="text" 
              class="form-control w-75 m-auto border-black" 
              placeholder="Ingrese un numero"
              id='number'
              onkeydown="if(event.key === 'Enter') tryAttempts('${objectDifficukt.nivel}')"
          >
          <button onclick="tryAttempts('${objectDifficukt.nivel}')"  
          class="btn btn-success w-25 my-4 rounded-5"  id='tryAttemp' >
              Probar
          </button>
          <div class="card-footer" style="display: none;" id='alertDiv'>
              
          </div>
      </div>
  </div>`;

  var number = document.getElementById("number");
  /**focus input */
  setTimeout(() => {
    number.focus();
  }, 1000);
  timeOn(objectDifficukt);
};

/**generate the animation - down to origin*/
const generateTransition = (etiqueta) => {
  etiqueta.classList.add("transition");
  setTimeout(() => {
    etiqueta.classList.add("startTransition");
  }, 500);
};

/**Btn tryGuess */
const tryAttempts = (nivel) => {
  let alertDiv = document.getElementById("alertDiv");
  numRandom = Math.floor(Math.random() * 10) + 1;
  let num = parseInt(number.value);
  if (isNaN(num) || num < 1 || num > 10) {
    alertDiv.style.display = "block";
    generateAlert(
      "danger",
      "Numero invalido, solo se permiten numeros del 1 al 10."
    );
  } else {
    if (num !== numRandom) {
      alertDiv.style.display = "none";
      number.focus();
      number.value = "";
      attempsValue -= 1;
      modificDivGameAttempt(attempsValue, nivel);
    } else {
      alertDiv.style.display = "none";
      // alert('Ganaste');
      clearInterval(intervalId);
      generateModal("win", timeScord, attempsValue, nivel);
      
    }
  }
  if (attempsValue == 0) {
    clearInterval(intervalId);
    generateModal("loss");
  }
};

/**Generate divAlert */
const generateAlert = (colorAlert, message) => {
  let alertDiv = document.getElementById("alertDiv");
  alertDiv.innerHTML = `<div class="alert alert-${colorAlert}" role="alert">
              ${message}
              </div>`;
};

/**Modific the value of attemps */
const modificDivGameAttempt = (valueAttempt, nivel) => {
  nivel !== "facil"
    ? (document.getElementById("attempValue").innerHTML = valueAttempt)
    : "";
};

/**GenerateTimeInterval */
const timeOn = (nivelObject) => {
  if (nivelObject.nivel !== "facil") {
    count = nivelObject.time;
    intervalId = setInterval(() => {
      if (count < 0) {
        clearInterval(intervalId);
        // alert( 'Perdiste...' );
        generateModal();
      } else {
        document.getElementById("timeLevel").innerHTML = count;
        timeScord += 1;
        count -= 1;
      }
    }, 1000);
  }
};

/**Generate modal */
const generateModal = (finalState, score, attemps, nivel) => {
  let attmpetsFinal =
    nivel == "medio"
      ? difficults[1].attempts - attemps
      : difficults[2].attempts - attemps;

  let win =
    nivel == "facil"
      ? `  
              <code >
                  <h1 class='text-center fs-1 lett-spacing my-3 py-2 text-uppercase'>
                  Ganaste 
                  </h1> 
                  </code> <br>
                  <p class='text-white text-center'>El numero a divinar fue ${numRandom} </p>
              `
      : `  
               <code class="">
                  <h1 class='text-center fs-1 lett-spacing my-3 py-2 '>GANASTE </h1> 
                </code> </br>
                <p class='text-white text-center'>El numero a divinar fue ${numRandom} </p>
                <p class='ms-5 pt-3 lett-spacing text-white'>
                Tiempo: ${score} seg
                </p><br>
                <p class='ms-5 lett-spacing text-white'>
                intentos: ${attmpetsFinal + 1}
                </p>
                `;
  let loss = `    <code >
                  <h1 class='text-center fs-1 lett-spacing my-3 py-2  text-uppercase'>
                  PERDISTE
                  </h1> 
                </code>
                    `;
  let resultInfo = finalState == "win" ? win : loss;
  let res = `
   <div 
        class="modal fade " id="staticBackdrop" 
        data-bs-backdrop="static" 
        data-bs-keyboard="false" 
        tabindex="-1" 
        aria-labelledby="staticBackdropLabel" 
        aria-hidden="true">
  <div class="modal-dialog ">
    <div class="modal-content bg-dark ">
      
      <div class="modal-body text-underline-custom">
          ${resultInfo}
      </div>
     
        
        <button 
            type="button" onclick='closeModal()' 
            class="btn btn-outline-success mb-5 mt-2 mx-5 rounded-5 p-3">
            Volver a inicio
        </button>
      
    </div>
  </div>
</div>
   `;
  document.body.insertAdjacentHTML("beforeend", res);
  openModal();
};

const openModal = () => {
  let modalElement = document.getElementById("staticBackdrop");
  let modal = new bootstrap.Modal(modalElement);
  modal.show();
};

const closeModal = () => {
  let modalElement = document.getElementById("staticBackdrop");
  let modal = bootstrap.Modal.getInstance(modalElement);
  if (modal) {
    modal.hide();
    location.reload();
    // document.getElementById('restartGame').style.display = 'block'
  }
};

const changeBackground = (nivel) => {};




// const restartGame = ()=>{
//   console.log(nivelTime.attempts);
//  count = nivelTime.time;
//  attempsValue = nivelTime.attempts;
//  timeScord = -1
// //  attempsValue = 1;
// modificDivGameAttempt(attempsValue, nivelTime.nivel);
// timeOn(nivelTime);
// }