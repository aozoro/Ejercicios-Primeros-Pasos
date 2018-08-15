function puntuarMano(mano){
	var resultado=0;
	for(var i=0; i<mano.length; i=i+1){
		resultado=resultado+puntuarCarta(mano[i])
	}
	return resultado;
}

function puntuarCarta(carta){
	var resultado=carta.valor;
	if(carta.valor===1){
		resultado=20;
	}
	if(carta.palo==="c" || carta.palo==="d"){
		resultado=resultado*2;
	}
	return resultado
}

function programa(jugador1,jugador2){
	var ganador=1;
	if (puntuarMano(jugador1)<=puntuarMano(jugador2)){
		ganador=2;
		if(puntuarMano(jugador1)===puntuarMano(jugador2)){
			return console.log("Hubo un empate")
		}
	}
	return console.log("El ganador es el jugador " + ganador)
}

//Ejemplo
baraja1=[{palo:"c",valor:10},{palo:"d",valor:1},{palo:"p",valor:2}]
baraja2=[{palo:"p",valor:10},{palo:"d",valor:9},{palo:"c",valor:5},{palo:"d",valor:2}]
programa(baraja1,baraja2)
