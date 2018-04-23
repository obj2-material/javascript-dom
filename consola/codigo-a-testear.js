//------------------------- Golondrina
class Golondrina {
  constructor(energiaInicial) {
    this._energia = energiaInicial
  }

  energia() { return this._energia }
  comer(gramos) { this._energia += 4 * gramos }
  volar(kms) { this._energia -= 10 + kms }
  estaFeliz() { return this._energia >= 50 && this._energia <= 120 }
} 

