let ultimoNumeroPasajero = 0
let ultimoNumeroVuelo = 0

/***********************************************
    Avion
 ***********************************************/
class Avion {
    constructor(cantidadAsientos, alturaCabina, nombre) {
        this._cantidadAsientos = cantidadAsientos
        this._alturaCabina = alturaCabina
        this._nombre = nombre
    }

    cantidadAsientos() { return this._cantidadAsientos }
    alturaCabina() { return this._alturaCabina }
    nombre() { return this._nombre }

    vuelosRegistrados() { return elStore.vuelosDeAvion(this) }
    cantidadVuelosHechos() { return this.vuelosRegistrados().length }
    cantidadTotalPasajeros() {
        return this.vuelosRegistrados().reduce(
            (total, vuelo) => total + vuelo.cantidadAsientosOcupados(), 0
        )
    }
    porcentajeOcupacion() {
        const asientosTotal = this.cantidadAsientos() * this.cantidadVuelosHechos()
        const asientosOcupados = this.cantidadTotalPasajeros()
        return (asientosTotal == 0) ? 0 : Math.round((asientosOcupados * 100) / asientosTotal)
    }
}



/***********************************************
    Vuelo
 ***********************************************/
class Vuelo {
    constructor(origen, destino, tiempoDeVuelo, precioStandard) {
        this._origen = new Ciudad(origen)
        this._destino = new Ciudad(destino)
        this._tiempoDeVuelo = tiempoDeVuelo
        this._precioStandard = precioStandard

        this._avion = null
        this._politicaPrecio = politicasDePrecio.estricta
        this._pasajesEmitidos = []

        this.asignarNumero()
    }
    asignarNumero() {
        ultimoNumeroVuelo++
        this._numero = ultimoNumeroVuelo
    }

    origen() { return this._origen }
    destino() { return this._destino }
    setOrigen(ciudad) { this._origen = ciudad }
    setDestino(ciudad) { this._destino = ciudad }
    numero() { return this._numero }
    precioStandard() { return this._precioStandard }

    pasajesEmitidos() { return this._pasajesEmitidos }
    cantidadPasajesEmitidos() { return this.pasajesEmitidos().length }

    avion() { return this._avion }
    setAvion(avion) { this._avion = avion }
    politicaPrecio() { return this._politicaPrecio }
    setPoliticaPrecio(politica) { this._politicaPrecio = politica }

    cantidadAsientosLibres() {
        return this.cantidadAsientosDisponibles() - this.cantidadAsientosOcupados()
    }
    cantidadAsientosOcupados() { return this.pasajesEmitidos().length }
    precioPasaje() { return this._politicaPrecio.precioPasaje(this) }
    importeTotalPasajesEmitidos() {
        return this.pasajesEmitidos().reduce(
            (total, pasaje) => total + pasaje.precio(), 0
        )
    }

    venderPasaje(dniPasajero) {
        this._pasajesEmitidos.push(new Pasaje(dniPasajero, this, this.precioPasaje()))
    }

    venderPasajesAutomaticos(cant) {
        for (let index = 0; index < cant; index++) {
            ultimoNumeroPasajero++
            let ultimoPasajeroRellenado = "0000" + ultimoNumeroPasajero
            ultimoPasajeroRellenado = ultimoPasajeroRellenado.substr(ultimoPasajeroRellenado.length-4,4)
            const dniPasajero = "6528" + ultimoPasajeroRellenado
            this.venderPasaje(dniPasajero)
        }
    }
}

class VueloNormal extends Vuelo {
    cantidadAsientosDisponibles() { return this.avion().cantidadAsientos() }
    tipoAsString() { return "Normal" }
}

class VueloDeCarga extends Vuelo {
    cantidadAsientosDisponibles() { return 30 }
    tipoAsString() { return "De carga" }
}

class VueloCharter extends Vuelo {
    constructor(origen, destino, tiempoDeVuelo, precioStandard, asientosOcupadosDeEntrada) {
        super(origen, destino, tiempoDeVuelo, precioStandard)
        this._asientosOcupadosDeEntrada = asientosOcupadosDeEntrada
    }
    tipoAsString() { return "Charter" }

    cantidadAsientosDisponibles() { return this.avion().cantidadAsientos() - 25 }
    cantidadAsientosOcupados() {
        return super.cantidadAsientosOcupados() + this._asientosOcupadosDeEntrada
    }
}


/***********************************************
    Políticas de precio para un vuelo
 ***********************************************/
const politicaDePrecioEstricta = {
    precioPasaje: function (vuelo) { return vuelo.precioStandard() },
    nombre: function() { return "Estricta" }
}
const politicaDePrecioVentaAnticipada = {
    precioPasaje: function (vuelo) {
        let elPrecio = vuelo.precioStandard()
        if (vuelo.cantidadPasajesEmitidos() < 40) {
            elPrecio *= 0.3
        } else if (vuelo.cantidadPasajesEmitidos() >= 40 && vuelo.cantidadPasajesEmitidos() < 80) {
            elPrecio *= 0.6
        }
        return elPrecio
    },
    nombre: function () { return "Venta anticipada" }
}
const politicaDePrecioRemate = {
    precioPasaje: function (vuelo) {
        return (vuelo.cantidadAsientosLibres() > 20
            ? vuelo.precioStandard() * .25 : vuelo.precioStandard() * .5)
    },
    nombre: function () { return "Remate" }
}
const politicasDePrecio = {
    estricta: politicaDePrecioEstricta, ventaAnticipada: politicaDePrecioVentaAnticipada,
    remate: politicaDePrecioRemate
}



/***********************************************
    Pasaje
 ***********************************************/
class Pasaje {
    constructor(dniPasajero, vuelo, precio) {
        this._dniPasajero = dniPasajero
        this._vuelo = vuelo
        this._precio = precio
    }

    dniPasajero() { return this._dniPasajero }
    vuelo() { return this._vuelo }
    precio() { return this._precio }
}





/**********************************************************
 Ciudad que puede ser origen o destino de un vuelo
 *********************************************************/
class Ciudad {
    constructor(nombre) { 
        this._nombre = nombre 
        this._pais = null
    }

    nombre() { return this._nombre }
    pais() { return this._pais }
    setPais(pais) { this._pais = pais }

    pasajerosQueLlegaron() {
        return elStore.vuelosHaciaCiudad(this).reduce(sumadorCantidadAsientosOcupados, 0)
    }

    pasajerosQueSalieron() {
        return elStore.vuelosDesdeCiudad(this).reduce(sumadorCantidadAsientosOcupados, 0)
    }
}

// para no repetir la funcion
const sumadorCantidadAsientosOcupados = (acum, vuelo) => acum + vuelo.cantidadAsientosOcupados()



/**********************************************************
    VueloStore
 *********************************************************/
class VueloStore {
    constructor() {
        this._vuelos = []
        this._aviones = []
        this._ciudades = []
    }

    agregarVuelos(nuevosVuelos) { nuevosVuelos.forEach(vuelo => this.agregarVuelo(vuelo)) }
    agregarVuelo(nuevoVuelo) {
        nuevoVuelo.setOrigen(this.ciudadConNombre(nuevoVuelo.origen().nombre()))
        nuevoVuelo.setDestino(this.ciudadConNombre(nuevoVuelo.destino().nombre()))
        this._vuelos.push(nuevoVuelo)
    }
    agregarAviones(nuevosAviones) { nuevosAviones.forEach(avion => this._aviones.push(avion)) }

    vuelos() { return this._vuelos }
    vuelosDeAvion(avion) { return this._vuelos.filter(vuelo => vuelo.avion() == avion) }

    aviones() { return this._aviones }
    avionConNombre(nombre) { return this._aviones.find(avion => avion.nombre() == nombre) }

    politicasDePrecio() { return [politicaDePrecioEstricta, politicaDePrecioRemate, politicaDePrecioVentaAnticipada]}
    politicaDePrecioConNombre(nombre) {
        return this.politicasDePrecio().find(politica => politica.nombre() == nombre)
    }

    ciudadConNombre(nombre) {
        let ciudad = this._ciudades.find(ciudad => ciudad.nombre() == nombre)
        if (!ciudad) {
            ciudad = new Ciudad(nombre)
            this._ciudades.push(ciudad)
        }
        return ciudad
    }

    agregarCiudadEnPais(nombre, pais) { 
        const ciudad = this.ciudadConNombre(nombre)
        if (!ciudad.pais()) { ciudad.setPais(pais) }
    }

    ciudades() {
        // genero una copia, el array que mantiene el Store queda sin tocar
        let ordenado = Object.assign([], this._ciudades)

        // el sort no crea un array adicional, ordena el array 'ordenado'
        ordenado.sort((c1, c2) => c1.nombre().localeCompare(c2.nombre()))

        return ordenado
    }

    vuelosDesdeCiudad(ciudad) { return this.vuelos().filter(vuelo => vuelo.origen() == ciudad) }
    vuelosHaciaCiudad(ciudad) { return this.vuelos().filter(vuelo => vuelo.destino() == ciudad) }
}



// data

const airbus = new Avion(280, 4, "Airbus 330")
const boeing = new Avion(140, 6, "Boeing 737")
const embraer = new Avion(50, 5, "Embraer 190")
const fokker = new Avion(40, 4, "Fokker F-27")

const vuelo1 = new VueloCharter("Buenos Aires", "Estambul", 12, 2500, 70)
vuelo1.setAvion(airbus)
vuelo1.venderPasajesAutomaticos(60)

const vuelo2 = new VueloNormal("Bologna", "Kuala Lumpur", 10, 1400)
vuelo2.setAvion(boeing)
vuelo2.setPoliticaPrecio(politicasDePrecio.ventaAnticipada)
vuelo2.venderPasajesAutomaticos(100)

const vuelo3 = new VueloNormal("Roma", "Fez", 3, 500)
vuelo3.setAvion(embraer)
vuelo3.setPoliticaPrecio(politicasDePrecio.remate)
vuelo3.venderPasajesAutomaticos(45)

const vuelo4 = new VueloDeCarga("Paris", "Marrakesh", 3, 800)
vuelo4.setAvion(airbus)
vuelo4.setPoliticaPrecio(politicasDePrecio.remate)
vuelo4.venderPasajesAutomaticos(22)

const vuelo5 = new VueloNormal("Buenos Aires", "Paris", 14, 1800)
vuelo5.setAvion(airbus)
vuelo5.setPoliticaPrecio(politicasDePrecio.estricta)
vuelo5.venderPasajesAutomaticos(100)

const vuelo6 = new VueloNormal("Marrakesh", "Bologna", 9, 750)
vuelo6.setAvion(boeing)
vuelo6.setPoliticaPrecio(politicasDePrecio.ventaAnticipada)
vuelo6.venderPasajesAutomaticos(38)

const elStore = new VueloStore()

elStore.agregarCiudadEnPais('Buenos Aires', 'ARG')
elStore.agregarCiudadEnPais('Paris', 'FRA')
elStore.agregarCiudadEnPais('Fez', 'MAR')
elStore.agregarCiudadEnPais('Marrakesh', 'MAR')
elStore.agregarCiudadEnPais('Bologna', 'ITA')
elStore.agregarCiudadEnPais('Roma', 'ITA')
elStore.agregarCiudadEnPais('Estambul', 'TUR')
elStore.agregarCiudadEnPais('Kuala Lumpur', 'MYS')
elStore.agregarCiudadEnPais('Stavanger', 'NOR')
elStore.agregarCiudadEnPais('Oslo', 'NOR')
elStore.agregarCiudadEnPais('Bangkok', 'THA')
elStore.agregarCiudadEnPais('Barcelona', 'ESP')
elStore.agregarCiudadEnPais('Madrid', 'ESP')
elStore.agregarCiudadEnPais('Estocolmo', 'SWE')
elStore.agregarCiudadEnPais('Manchester', 'GBR')

elStore.agregarVuelos([vuelo1, vuelo2, vuelo3, vuelo4, vuelo5, vuelo6])
elStore.agregarAviones([boeing, airbus, embraer, fokker])


/* 
  Importante: hay que exportar lo que se usa explícitamente en el componente React.
  Observar que el nombre "de exportación" puede no coincidir con el nombre "interno".
 */
module.exports.store = elStore
module.exports.VueloNormal = VueloNormal

