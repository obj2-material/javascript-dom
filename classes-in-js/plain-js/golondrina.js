class Golondrina {
  constructor() { this._energia = 0 }
  energia() { return this._energia }
  comer(gramos) { this._energia += gramos * 4 }
  volar(kms) { this._energia -= kms + 10 }
  estaFeliz() { throw "Hay que definir el método estaFeliz, abstracto en Golondrina" }
  tieneGanasDeCantar() { 
    return this.estaFeliz() && (this.energia() > 100) 
  }
}

class GolondrinaPensativa extends Golondrina {
  constructor() {
    super()
    this._nivelDeConcentracion = 10
  }
  pensar(minutos) { this._nivelDeConcentracion += minutos }
  comer(gramos) { 
    super.comer(gramos)
    this._nivelDeConcentracion -= 1
  }
  nivelDeConcentracion() { return this._nivelDeConcentracion }
  estaFeliz() { 
    return this.nivelDeConcentracion() >= 30 && this.nivelDeConcentracion() <= 50 
  }
}
   
class GolondrinaGolosa extends Golondrina {
  constructor() {
    super()
    this._loUltimoQueHizoFueComerMucho = false
  }
  comer(gramos) { 
    super.comer(gramos)
    if (gramos > 50) { 
      this._loUltimoQueHizoFueComerMucho = true
    }
  }
  estaFeliz() { return this._loUltimoQueHizoFueComerMucho }
}

class GolondrinaIncompleta extends Golondrina {
  comer(gramos) {
    super.comer(gramos + 10)
  }
}

class GolondrinaQueNoSabeComerPoco extends GolondrinaGolosa {
  comer(gramos) {
    if (gramos > 10) { super.comer(gramos) }
  }
}

   

class TamagotchiVolador {
  constructor() { this._felicidad = 300; this._edad = 0 }
  comer(gramos) { this._felicidad += 5; this._edad += 1 }
  volar(kms) { this._felicidad += kms; this._edad += 1 }
  llorar(minutos) { 
    this._felicidad -= 10 * minutos
    this._edad += minutos
  }
}

class Entrenador {
  entrenar(cosa) { 
    cosa.volar(20) ; cosa.comer(100) ; cosa.volar(20)
  }
}

const contadorComerVolar = {
  _cantidadDeVecesQueComio: 0,
  _cantidadDeVecesQueVolo: 0,
  comer: function(gramos) { this._cantidadDeVecesQueComio++ },
  volar: function(kms) { this._cantidadDeVecesQueVolo++ },
  cantidadDeVecesQueComio: function() { return this._cantidadDeVecesQueComio },
  cantidadDeVecesQueVolo: function() { return this._cantidadDeVecesQueVolo }
}


const pepita = new GolondrinaGolosa()
pepita.comer(30)
const tomi = new TamagotchiVolador()
const roque = new Entrenador()
