class Golondrina {
  constructor() { this._energia = 0 }
  energia() { return this._energia }
  comer(gramos) { this._energia += gramos * 4 }
  volar(kms) { this._energia -= kms + 10 }
}


const pepita = new Golondrina()
pepita.comer(30)
