        /**
         * Manipulacion Dom
         * 
         * obtener los botones
         * const divBotones = document.querySelector('#divBotones');
         * 
         * crear un elemento
         * const buttonNuevo = document.createElement('button');
         * 
         * crear un botton utilizando las anteriores variables
         * divBotones.append(buttonNuevo)
         * 
         * agregar estilo al boton creado
         * buttonNuevo.classList.add('btn-danger');
         * 
         * crear un input
         * inp = document.createElement('input')
         * document.body.append(inp)
         * 
         */

        //Patron modelç
        (() =>{
        'use strict'

        //variables globales
        let cartas = [],
            puntosJugador = 0,
            contadorIntentos = 1;
            const tipo = ['C','D','H','S'],
            especiales = ['J','Q','K'];


        // Referencias HTML
        const btnPedir = document.querySelector('#btnPedirCarta'),
              btnIniciarJuego = document.querySelector('#btnInicio'),
              divCartasJugador = document.querySelector('#jugador-cartas'),
              smallprueba = document.querySelector('#prueba'),
              smallprueb = document.createElement('small'),
              smallNumIntentos = document.querySelector('#intentos'),
              divNumeroIntentos = document.createElement('small'),
              smallnombreJugador = document.querySelector('#nombre-jugador'),
              divNombreJugador = document.createElement('small');


        //crear una baraja
        const crearCartas = ()=>{
            cartas = [];
            // Opcion 1 de llenar baraja
            // for (let i = 2; i <= 10; i++) {
            //     cartas.push(i+'C');
            //     cartas.push(i+'D');
            //     cartas.push(i+'H');
            //     cartas.push(i+'S');
            // }

            //Opcion 2 mejor codigo
            for (let i = 2; i <= 10; i++) {
                for( let t of tipo){
                cartas.push(i+t);
                }
            }
            //Llenando los especiales a la baraja
            for( let e of especiales){
                for( let t of tipo){
                    cartas.push(e+t);
                    }
                }
            return mesclar(cartas);
        }

        //funcion para barajar cartas
        function mesclar(){
            return _.shuffle(cartas);
        }

        //funcion para obtener una carta
        const tomarCarta = ()=>{
            if (cartas.length === 0) {
                //opcion 1, elimina desde la primera posicion
                // carta = cartas[0];
                // cartas.shift();

                //opcion 2 elimina desde la ultima pocision
                throw 'No quedan cartas';
            }
            return cartas.pop();
        }

        //Obtiene el valor de la carta
        const valorCarta = (carta)=>{
            carta = carta.substring(0,carta.length-1);
            return ( isNaN(carta))? 
                    ( carta ==='A')? 11:10
                    : carta*1;
        }

        //Obtiene un valor usando ternarios multinivel
        const valorCartaConTernario = (carta)=>{
            carta = carta.substring(0,carta.length-1);
            return (isNaN(carta))? (carta === 'A')? 11:10 : carta*1;
        }
        // const valor = valorCartaConTernario(tomarCarta());
        // console.log({valor});

        //funcion de manejar los puntos del jugador
        const puntosJug = (carta) =>{
            puntosJugador += valorCarta(carta);
            return puntosJugador;
        }

        //funcion crear carta
        function funCrearCarta(carta){
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            divCartasJugador.append(imgCarta); 
            imgCarta.classList.add('carta');
        }


        //Eventos
        //Boton Pedir Carta
        btnPedir.addEventListener('click',()=>{
            const carta = tomarCarta();
            puntosJugador = puntosJug(carta);

            smallprueb.classList.add('puntaje');
            smallprueb.textContent = puntosJugador;

            divNumeroIntentos.classList.add('puntaje');

            funCrearCarta(carta);
            setTimeout(() => {
                if(puntosJugador > 21){
                    btnPedir.disabled = true; 
                    alert("Perdiste");
                    btnIniciarJuego.disabled = false;
                    divNumeroIntentos.textContent = contadorIntentos++;

                }else if(  puntosJugador === 21){
                    btnPedir.disabled = true; 
                    alert("Ganaste");
                    btnIniciarJuego.disabled = false;
            divNumeroIntentos.textContent = contadorIntentos++;

                } 
            }, 10);
        });

        //Boton Iniciar juego
        btnIniciarJuego.addEventListener('click', ()=>{
            let nombre = prompt('digite el nombre','Anonimo'); 
            btnIniciarJuego.disabled = true;
            btnPedir.disabled = false;
            cartas = crearCartas();

            puntosJugador = 0;
            divCartasJugador.innerHTML = '';

            smallprueba.append(smallprueb);
            smallprueb.textContent = 0;
            smallprueb.classList.remove('puntaje');

            smallNumIntentos.append(divNumeroIntentos);
            divNumeroIntentos.textContent = contadorIntentos;

            smallnombreJugador.append(divNombreJugador);
            divNombreJugador.textContent = nombre;
            divNombreJugador.classList.add('nombre-jugador');


        });
        })();






