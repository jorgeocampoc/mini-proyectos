// Archivo creado con Minifier, para proteger la sintaxis del codigo, para reducir su tamanio
(()=>{"use strict";let e=[],t=0,n=1,a=["C","D","H","S"],r=["J","Q","K"],s=document.querySelector("#btnPedirCarta"),l=document.querySelector("#btnInicio"),d=document.querySelector("#jugador-cartas"),o=document.querySelector("#prueba"),i=document.createElement("small"),c=document.querySelector("#intentos"),u=document.createElement("small"),p=document.querySelector("#nombre-jugador"),b=document.createElement("small"),m=()=>{e=[];for(let t=2;t<=10;t++)for(let n of a)e.push(t+n);for(let s of r)for(let l of a)e.push(s+l);return f(e)};function f(){return _.shuffle(e)}let $=()=>{if(0===e.length)throw"No quedan cartas";return e.pop()},g=e=>isNaN(e=e.substring(0,e.length-1))?"A"===e?11:10:1*e,C=e=>t+=g(e);function L(e){let t=document.createElement("img");t.src=`assets/cartas/${e}.png`,d.append(t),t.classList.add("carta")}s.addEventListener("click",()=>{let e=$();t=C(e),i.classList.add("puntaje"),i.textContent=t,u.classList.add("puntaje"),L(e),setTimeout(()=>{t>21?(s.disabled=!0,alert("Perdiste"),l.disabled=!1,u.textContent=n++):21===t&&(s.disabled=!0,alert("Ganaste"),l.disabled=!1,u.textContent=n++)},10)}),l.addEventListener("click",()=>{let a=prompt("digite el nombre","Anonimo");l.disabled=!0,s.disabled=!1,e=m(),t=0,d.innerHTML="",o.append(i),i.textContent=0,i.classList.remove("puntaje"),c.append(u),u.textContent=n,p.append(b),b.textContent=a,b.classList.add("nombre-jugador")})})();