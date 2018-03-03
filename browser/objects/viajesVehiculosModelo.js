class Vehiculo {
    constructor(cantidadAsientos, velocidadMaxima, color) {
        this._cantidadAsientos = cantidadAsientos
        this._velocidadMaxima = velocidadMaxima
        this._color = color
    }

    velocidadMaxima() { return this._velocidadMaxima }
    cantidadAsientos() { return this._cantidadAsientos }
    color() { return this._color }
}

class Viaje {
    constructor(cantidadPasajeros, coloresPreferidos) {
        this._cantidadPasajeros = cantidadPasajeros
        this._coloresPreferidos = coloresPreferidos
        this._vehiculoAsignado = null
    }

    cantidadPasajeros() { return this._cantidadPasajeros }
    coloresPreferidos() { return this._coloresPreferidos ? this._coloresPreferidos : [] }
    vehiculoAsignado() { return this._vehiculoAsignado }

    puedeHacerlo(veh) { 
        return this.esCapacidadAdecuada(veh) && this.esColorAdecuado(veh)
    }
    esCapacidadAdecuada(veh) { return veh.cantidadAsientos() >= this.cantidadPasajeros() }
    esColorAdecuado(veh) { 
        return this.coloresPreferidos().isEmpty() || this.coloresPreferidos().contains(veh.color())
    }
}
