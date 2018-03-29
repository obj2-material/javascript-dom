class Disco {
    constructor(nombre, anio) {
        this._nombre = nombre
        this._anio = anio
        this._copiasVendidas = []
    }
    nombre() { return this._nombre }
    anio() { return this._anio }

    regCopiasEnPais(elPais) {
        return this._copiasVendidas.find(cxp => cxp.pais == elPais)
        // undefined si no hay registro de copias vendidas en el pais que se indica
    }
    copiasVendidasEnPais(elPais) {
        const reg = this.regCopiasEnPais(elPais)
        return reg ? reg.copias : 0
    }
    totalCopias() { return _.sumBy(this._copiasVendidas, (cxp) => cxp.copias) }
    tieneCopiasEnPais(elPais) { return this._copiasVendidas.some(cxp => cxp.pais == elPais) }
    paisesConRegistroDeCopias() { return this._copiasVendidas.map(cxp => cxp.pais) }

    agregarCopiasVendidasEnPais(elPais, cant) {
        const reg = this.regCopiasEnPais(elPais)
        if (reg) {
            reg.copias += cant
        } else {
            this._copiasVendidas.push({ pais: elPais, copias: cant })
        }
        return this
    }
    agregarMuchasCopiasVendidas(paisesYCantidades) {
        for (let index = 0; index < paisesYCantidades.length; index+=2) {
            const pais = paisesYCantidades[index];
            const cantidad = paisesYCantidades[index+1];
            this.agregarCopiasVendidasEnPais(pais, cantidad)
        }
        return this
    }
}

class Banda {
    constructor(nombre) {
        this._nombre = nombre
        this._discos = []
    }
    nombre() { return this._nombre }

    agregarDisco(disco) { this._discos.push(disco) }
    discos() { return this._discos }
    discoConNombre(_nombre) { return this._discos.find(disco => disco.nombre() == _nombre) }
    discosConVentasEnPais(_pais) {
        return this.discos().filter((disco) => disco.tieneCopiasEnPais(_pais))
    }
    copiasVendidasEnPais(pais) {
        return _.sumBy(this.discos(), disco => disco.copiasVendidasEnPais(pais))
    }    
    totalCopias() { return _.sumBy(this._discos, (disco) => disco.totalCopias()) }
}

class BaseDeBandas {
    constructor(bandasIniciales) {
        this._bandas = Object.assign([], bandasIniciales)
    }

    agregarBanda(banda) { this._bandas.push(banda) }
    agregarBandas(bandas) { bandas.forEach(banda => this.agregarBanda(banda)) }
    bandas() { return this._bandas }
    bandaConNombre(_nombre) { return this._bandas.find(banda => banda.nombre() == _nombre) }

    totalCopias() { return _.sumBy(this.bandas(), (banda) => banda.totalCopias()) }
    cantidadBandas() { return this.bandas().length }
    cantidadTotalDiscos() { return _.sumBy( this.bandas(), (banda) => banda.discos().length )}
    totalCopiasVendidasEnPais(pais) {
        return _.sumBy(this.bandas(), banda => banda.copiasVendidasEnPais(pais))
    }    
}

let soda = new Banda("Soda Stereo")
soda.agregarDisco(new Disco("Dynamo").agregarMuchasCopiasVendidas([
    "Argentina", 150000, "Uruguay", 10000, "Chile", 30000, "Mexico", 80000, "Perú", 18000
]))
soda.agregarDisco(new Disco("Signos").agregarMuchasCopiasVendidas([
    "Argentina", 250000, "Uruguay", 14000, "Chile", 25000, "Mexico", 40000,
    "España", 24000, "EE.UU.", 72000
]))
soda.agregarDisco(new Disco("Canción Animal").agregarMuchasCopiasVendidas([
    "Argentina", 320000, "Chile", 38000, "Mexico", 70000, "España", 42000, "Perú", 17000
]))
let sumo = new Banda("Sumo")
sumo.agregarDisco(new Disco("Divididos por la felicidad").agregarMuchasCopiasVendidas([
    "Argentina", 70000, "Uruguay", 5000, "Bolivia", 3000, "Mexico", 1500
]))
sumo.agregarDisco(new Disco("After Chabon").agregarMuchasCopiasVendidas([
    "Argentina", 130000, "Uruguay", 16000, "Chile", 2200, "Venezuela", 1200
]))
let virus = new Banda("Virus")
virus.agregarDisco(new Disco("Relax").agregarMuchasCopiasVendidas([
    "Argentina", 75000, "Uruguay", 25000, "Chile", 8500, "Colombia", 10000, "España", 6000
]))
virus.agregarDisco(new Disco("Locura").agregarMuchasCopiasVendidas([
    "Argentina", 110000, "Uruguay", 18000, "Chile", 11500, "Colombia", 3000, "Ecuador", 1800
]))

var base = new BaseDeBandas([soda, sumo, virus])    

