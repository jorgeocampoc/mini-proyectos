var punteroImg = 1;
let mapTreasure;
let widht = 400;
let height = 400;
let clicks = 0;
let a = document.getElementById("a");
let b = document.getElementById("b");
let p = document.getElementById("p");
let count = document.getElementById("count");
let sec = document.getElementById("sec");
let contador = document.getElementById("count");
let segundos = document.getElementById("segundos");
let randomNum = (value) => Math.floor(Math.random() * value);
let buttonStart = document.getElementById("start");
let imgPointer = document.getElementById("1");
let distance = 0;
let help = 0;
let band = false;
let bandClick = false;
let seconds = 0;
let imgSelect = 0;

let treasure = {
  x: randomNum(widht),
  y: randomNum(height),
};
let differentX = 0;
let differentY = 0;

// button "start game"
buttonStart.addEventListener("click", function () {
  // start game
  startGame();
  // hidden PREV
  a.style.display = "none";
  // hidden NEXT
  b.style.display = "none";
  // board <p>
  p.innerHTML = "";
  count.style.display = "block";
  sec.style.display = "block";
  bandClick = true;
  blockButton();
  mouseOn();
});

const takeDistante = (event, treasure) => {
  differentX = event.offsetX - treasure.x;
  differentY = event.offsetY - treasure.y;
  return Math.sqrt(differentX * differentX + differentY * differentY);
};

const takeHelp = (distance) => {
  if (distance < 15) {
    p.innerHTML = "Burning";
    return "Burning";
  } else if (distance < 20) {
    p.innerHTML = "Very Hot";
    return "Very Hot";
  } else if (distance < 80) {
    p.innerHTML = "Warm";
    return "Warm";
  } else if (distance < 40) {
    p.innerHTML = "Hot";
    return "Hot";
  } else if (distance < 160) {
    p.innerHTML = "Cold";
    return "Cold";
  }
};
let name = ""
// start the game
function startGame() {
  //start seconds
  name = prompt("Enter your name:")
  setInterval(secondsCount, 1000);
  mapTreasure = document.getElementById(punteroImg);
  // update the image selector
  mapTreasure.addEventListener("click", () => {

 
    clicks++;
    contador.textContent = "Clicks:" + clicks;
    distance = takeDistante(event, treasure);
    help = takeHelp(distance);
    if (distance < 15) {
      let res = convertTime(seconds);
      alert(`Congratulations ${name} your score is:
        \nClicks: ${clicks}\nTime: ${res}
        `);
      location.reload();
    }
  });
}

//convert seconds to minutes
function convertTime(sec) {
  let min = 0;
  if (sec < 60) {
    return `${sec} seconds`;
  } else {
    while (sec > 59) {
      min++;
      sec -= 60;
    }
    return `${min} minutes y ${sec} seconds`;
  }
}

function blockButton() {
  buttonStart.disabled = true;
  buttonStart.style.cursor = "not-allowed";
  buttonStart.style.opacity = 2;
}

function mouseOn() {
  console.log(punteroImg);
  imgPointer = document.getElementById(punteroImg);
  imgPointer.addEventListener("mouseover", function () {
    imgPointer.style.cursor = "pointer";
  });
}
function mouseOff() {
  imgPointer.addEventListener("mouseover", function () {
    imgPointer.style.cursor = "auto";
  });
}
//****************************************** */

//seconds
function secondsCount() {
  if (!band) {
    seconds++;
    segundos.textContent = seconds + " seconds";
  }
}

// cambia imagenes mediante la clase slides
let slideIndex = 0;
mostrarSlides(slideIndex);
function cambiarSlide(n) {
  mostrarSlides((slideIndex += n));
}
function mostrarSlides(n) {
  const slides = document.getElementsByClassName("slide");

  if (n >= slides.length) {
    slideIndex = 0;
  }

  if (n < 0) {
    slideIndex = slides.length - 1;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  punteroImg = Number(slideIndex + 1);
  slides[slideIndex].style.display = "block";
}

//************************************************ */



