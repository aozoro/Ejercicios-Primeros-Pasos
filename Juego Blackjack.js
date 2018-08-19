function valorAleatorio(){
	return Math.floor(Math.random() * 12) + 1;
}

function paloAleatorio(){
	var i= Math.floor(Math.random()*4);
	var asignarPalo=["C","D","T","P"];
	return asignarPalo[i];
}

function noRepeticion(carta,cartasUsadas){
	for (var i=0;i<cartasUsadas.length;i=i+1){
		if (cartasUsadas[i].valor===carta.valor && cartasUsadas[i].palo===carta.palo){
			return true;
		}
	}
	return false;
}

function cartaAleatoria(cartasUsadas=[]){
	var carta={valor: valorAleatorio(), palo: paloAleatorio()};
	while(noRepeticion(carta,cartasUsadas)){
		carta={valor: valorAleatorio(), palo: paloAleatorio()};
	}
	return carta
}

function mensajeMano( mensaje1, mensaje2){
	if (mensaje1===""){
		return mensaje2;
	}else{
		return mensaje1 + ", " +mensaje2; 
	}
}

function mensajeInput(mensaje1,mensaje2){
	var valorCondicional="";
	while(valorCondicional != "YES" && valorCondicional != "NO" ){
		valorCondicional = prompt("Tus cartas son: " +  mensaje1 + "\n"+ "Las del crupier: " + mensaje2 + ", NN.\n" + "'YES': Pedir carta\n" + " 'NO': Plantarse");
	}
	if (valorCondicional=="YES"){
		return true;
	}else{
		return false;
	}
}

function puntuarMano(mano){
	var cantidadAses=cantidadAS(mano);
	var contadorAs=0;
	var resultado1=0;
	var resultado2=0;
	
	for (var i=0; i< mano.length; i=i+1){
		var numero=mano[i].valor;
		if (numero===1){
			contadorAs=contadorAs+1;
			if(cantidadAses===contadorAs){
				resultado1=resultado1+1;
				resultado2=resultado2+11;
			}else{
				resultado1=resultado1+1;
				resultado2=resultado2+1;			
			}
		}else{
			resultado1=resultado1+valorCarta(numero);
			resultado2=resultado2+valorCarta(numero);
		}
	}	
	return valorOptimo(resultado1,resultado2);
}

function valorOptimo(valor1, valor2){
	if (valor1>21 && valor2>21){
		return Math.min(valor1,valor2);
	}
	if (valor1<=21 && valor2<=21){
		return Math.max(valor1,valor2);
	}
	if (valor1<=21 && valor2>21){
		return valor1;
	}
	if (valor1>21 && valor2<=21){
		return valor2;
	}
}

function valorCarta(numero){
	var resultado=numero;
	if (numero>10){
		resultado=10;
	}
	return resultado;
}

function cantidadAS(mano){
	var resultado=0;
	for(var i=0; i<mano.length; i=i+1){
		if(mano[i].valor===1){
			resultado=resultado+1;
		}
	}
	return resultado;
}

function programaBlackjack(terminar=false){
	if (terminar){
		return alert('¡Adios, hasta la próxima!'+ "\n" +'Elaborado por: aozoro@gmail.com');
	}
	
	var cartasUsadas=[]
	var manoCrupier=[]
	var manoJugador=[]
	var msjJugador=""

	clear()
	for (i=0;i<=1;i++){
		manoJugador[i]=cartaAleatoria(cartasUsadas);
		cartasUsadas[cartasUsadas.length]=manoJugador[i];
		manoCrupier[i]=cartaAleatoria(cartasUsadas);
		cartasUsadas[cartasUsadas.length]=manoCrupier[i];
		msjJugador=mensajeMano(msjJugador, manoJugador[i].valor + manoJugador[i].palo);
	}

	msjCrupier=manoCrupier[0].valor + manoCrupier[0].palo

	var puntuacionJugador=puntuarMano(manoJugador);
	var sw= true 
	
	while(sw && puntuacionJugador<21){
		sw = mensajeInput(msjJugador, msjCrupier)
		if (sw){
			var carta=cartaAleatoria(cartasUsadas)
			manoJugador[manoJugador.length]=carta;
			cartasUsadas[cartasUsadas.length]=carta;
			msjJugador=mensajeMano(msjJugador, carta.valor+carta.palo);
			puntuacionJugador=puntuarMano(manoJugador)			
		}
	}

	var puntuacionCrupier=puntuarMano(manoCrupier);
	msjCrupier=mensajeMano(msjCrupier,manoCrupier[1].valor + manoCrupier[1].palo)

	var txt="Tus cartas: " + msjJugador + ".\n"

	if (puntuacionJugador>21 || puntuacionCrupier > puntuacionJugador){
		txt = txt + "Las del Crupier: " + msjCrupier + ".\n" + "Perdiste, vuelve a intentarlo." 
	}else if(puntuacionJugador===21 && manoJugador.length===2){
		txt = txt + "¡Ganaste, hizo BLACKJACK!"
	}else{
		while(puntuacionCrupier < puntuacionJugador && puntuacionCrupier<21){
			alert(txt + "Las del Crupier: " + msjCrupier)
			var carta= cartaAleatoria(cartasUsadas);
			manoCrupier[manoCrupier.length]=carta;
			cartasUsadas[cartasUsadas.length]=carta;
			msjCrupier=mensajeMano(msjCrupier,carta.valor+carta.palo);
			puntuacionCrupier=puntuarMano(manoCrupier);
		}
		
		txt = txt + "Las del Crupier: " + msjCrupier + ".\n"
		if(puntuacionCrupier>21){
			txt = txt  + "¡Felicitaciones, ganaste!"
		}else if (puntuacionJugador<puntuacionCrupier){
			txt = txt + "Perdiste, vuelve a intentarlo." 
		}else if(puntuacionJugador===puntuacionCrupier){
			txt = txt  + "Empataste" 
		}else{
			txt = txt  + "¡Felicitaciones, ganaste!"
		}
	}
	alert(txt)
	
	sw=false
	sw=confirm('¿Desea volver a jugar?')
	programaBlackjack(!(sw))
}

programaBlackjack()



