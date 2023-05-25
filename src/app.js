window.onload = function () {
  let divSorteo = document.getElementById('divSorteo');
  let divOrdenadas = document.getElementById('divOrdenadas');
  let botonRobar = document.getElementById('botonRobar');
  let botonRefrescar = document.getElementById('botonRefrescar');

  //--------------------------------------------------------------------------------------------------------------------
  function generarPinta() {
    // Hago un random de 4 opciones que me devuelva un simbolo
    let iconoRandom = Math.floor(Math.random() * 4) + 1;
    let claseIcono = "";

    switch (iconoRandom) {
      case 1:
        // claseIcono = "♦";
        claseIcono = "diamonds";
        break;
      case 2:
        // claseIcono = "♥";
        claseIcono = "hearts";
        break;
      case 3:
        // claseIcono = "♠";
        claseIcono = "spades";
        break;
      case 4:
        // claseIcono = "♣";
        claseIcono = "clubs";
        break;
    }
    return claseIcono;
  }

  //--------------------------------------------------------------------------------------------------------------------
  function generarNumero() {
    // Hago un random de 13 opciones que me devuelva: A cuando sea 1, numeros del 2-10 y J-Q-K para el 11-12-13
    let numeroRandom = Math.floor(Math.random() * 13) + 1;
    let numeroSeleccionado = "";

    switch (numeroRandom) {
      case 1:
        numeroSeleccionado = "A";
        break;
      case 11:
        numeroSeleccionado = "J";
        break;
      case 12:
        numeroSeleccionado = "Q";
        break;
      case 13:
        numeroSeleccionado = "K";
        break;
      default:
        numeroSeleccionado = numeroRandom;
        break;
    }
    return numeroSeleccionado;
  }

  //--------------------------------------------------------------------------------------------------------------------
  //Funcion para crear las primeras cartas
  function crearCarta(nRepeticiones) {
    // Creo un for para repetir la funcion las veces que el usuario lo indique
    for (let i = 1; i <= nRepeticiones; i++) {
      let esRojo;
      // Genero las pintas y el n° en cada repeticion
      let pinta = generarPinta();
      let numero = generarNumero();
      let divCarta = document.createElement("div");
      // Le asigno un id unico a cada div generado
      divCarta.setAttribute("id", `divCarta${i}`);
      divCarta.setAttribute("class", "carta");
      // Creo el div contenedor del N°
      let divNumero = document.createElement("div");
      divNumero.setAttribute("id", "divNumero");
      // Pregunto si la pinta es corazon o diamante, si es así, devuelvo true, de lo contrario, falso
      (pinta === "diamonds" || pinta === "hearts") ? esRojo = true : esRojo = false;
      // Asigno la clase dependiendo de la pinta, y añado color rojo o negro dependiendo de esRojo
      divNumero.setAttribute("class", `numero ${pinta} ${esRojo ? "red" : "black"}`);
      // Añado a la carta el simbolo del numero generado
      let nodoTextoNumero = document.createTextNode(numero);
      divNumero.appendChild(nodoTextoNumero);
      divCarta.appendChild(divNumero);
      divSorteo.appendChild(divCarta);
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Funcion para crear y mostrar las cartas sorteadas
  let vecesLlamada = 0;
  function crearCartasSorteadas(array) {
    let diVuelta = document.createElement("div");
    for (let i = 0; i < array.length; i++) {
      let clases = array[i].clase;
      let numero = array[i].numero;
      let simboloCarta;

      switch (numero) {
        case 1:
          simboloCarta = "A";
          break;
        case 11:
          simboloCarta = "J";
          break;
        case 12:
          simboloCarta = "Q";
          break;
        case 13:
          simboloCarta = "K";
          break;
        default:
          simboloCarta = numero;
          break;
      }

      let divCarta = document.createElement("div");
      // Le asigno un id unico a cada div generado
      divCarta.setAttribute("id", `divCarta`);
      divCarta.setAttribute("class", "carta");
      // Creo el div contenedor del N°
      let divNumero = document.createElement("div");
      divNumero.setAttribute("id", "divNumero");
      // Asigno la clase dependiendo de la pinta, y añado color rojo o negro dependiendo de esRojo
      divNumero.setAttribute("class", `${clases}`);
      // Añado a la carta el simbolo del numero generado
      let nodoTextoNumero = document.createTextNode(simboloCarta);
      divNumero.appendChild(nodoTextoNumero);
      divCarta.appendChild(divNumero);
      diVuelta.setAttribute('id', `diVuelta${vecesLlamada}`)
      diVuelta.setAttribute('class', 'd-flex')
      diVuelta.appendChild(divCarta);
    }
    vecesLlamada++;
    divOrdenadas.appendChild(diVuelta);
  }


  //--------------------------------------------------------------------------------------------------------------------
  // Metodo de ordenacion 'selection'
  function selectionSort(inputArr) {
    let ncartas = inputArr.length;
    for (let i = 0; i < ncartas; i++) {
      // Buscamos el valor mas bajo dentro de nuestro array
      let nBajo = i;
      for (let z = i + 1; z < ncartas; z++) {
        if (inputArr[z].numero < inputArr[nBajo].numero) {
          nBajo = z;
        }
      }
      if (nBajo != i) {
        let aux = inputArr[i];
        inputArr[i] = inputArr[nBajo];
        inputArr[nBajo] = aux;
        // Llamo a la funcion de crear cartas sorteadas cada vez que haya algun cambio en el array
        crearCartasSorteadas(inputArr);
      }
    }
    return inputArr;
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Aqui paso los valores que furon generados al principio por numero y les asigna 
  function obtenerValores() {
    let sorteo = document.getElementById('divSorteo');
    let valorFinal = [];
    // Pregunto si existe alguna carta antes de ejecutar
    if (sorteo.childNodes.length >= 1) {
      for (let i = 0; i < sorteo.childNodes.length; i++) {
        let cartaActuaL = document.getElementById(`divCarta${i + 1}`);
        let clasesActuales = cartaActuaL.lastChild.className;
        let valorActual = cartaActuaL.lastChild.textContent;

        // Para hacerlo mas facil, volvere a convertir las letras a numeros y los almacenare en un array
        switch (valorActual) {
          case 'J':
            valorFinal[i] = { numero: 11, clase: clasesActuales };
            break;
          case 'Q':
            valorFinal[i] = { numero: 12, clase: clasesActuales };
            break;
          case 'K':
            valorFinal[i] = { numero: 13, clase: clasesActuales };
            break;
          case 'A':
            valorFinal[i] = { numero: 1, clase: clasesActuales };
            break;
          default:
            valorFinal[i] = { numero: parseInt(valorActual), clase: clasesActuales };
            break;
        }
      }
      return valorFinal;
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Añado un Event Listener a el boton robar
  botonRobar.addEventListener("click", function () {
    divSorteo.innerHTML = "";
    divOrdenadas.innerHTML = "";
    // Tomo el valor actual que tenga el input y lo asigno a una variable
    let input = document.getElementById('inputRepetir').value;
    crearCarta(input)
  });

  //--------------------------------------------------------------------------------------------------------------------
  // Boton para ordenar las cartas con el metodo de ordenamiento selectSort
  botonOrdenar.addEventListener("click", function () {
    // Si existe algun elemento con la clase divOrdenadas 
    if (divOrdenadas.childNodes.length <= 1) {
      // Llamo a la funcion para ordenar con los valores pasados de carta => numeros
      selectionSort(obtenerValores())
    }
  });

  //--------------------------------------------------------------------------------------------------------------------
  // Boton para refrescar la pagina
  botonRefrescar.addEventListener("click", function () {
    location.reload();
  });

}
