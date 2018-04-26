// para requests
const superagent = require('superagent')
const axios = require('axios')

/***********************************************
    Información sobre países
 ***********************************************/
class PaisDataObject {
    constructor() {
        this._nombre = null
        this._poblacion = null
        this._superficie = null
        this._prefijoTelefonico = null
        this._sufijoInternet = null
    }
    nombre() { return this._nombre }
    poblacion() { return this._poblacion }
    superficie() { return this._superficie }
    prefijoTelefonico() { return this._prefijoTelefonico }
    sufijoInternet() { return this._sufijoInternet }

    inventado(nombre, numero) {
        this._nombre = nombre
        this._poblacion = numero * 10000000
        this._superficie = numero * 200000
        this._prefijoTelefonico = (50 + numero).toString()
        this._sufijoInternet = "." + nombre.substr(0,2).toLowerCase()
        return this
    }

    setApiDataPackage(data) {
        this._nombre = data.translations.es
        this._poblacion = data.population
        this._superficie = data.area
        this._prefijoTelefonico = data.callingCodes[0]
        this._sufijoInternet = data.topLevelDomain[0]
        return this
    }
}

/*
  No hace falta pasarle una continuation porque devuelve una Promise.
 */
function fetchCountryInfoUsingPromises(countryCode) {
    // si no hay pais, va null como info del pais
    if (countryCode) {
        /*
          response.status: qué pasó con el pedido (p.ej. 200 es "OK")
          response.body: la info que envía el servidor, en este caso un JSON
         */
        return axios
            .get('https://restcountries.eu/rest/v2/alpha/' + countryCode)
            .then(function (response) {
                return Promise.resolve(new PaisDataObject().setApiDataPackage(response.data))
            })
    } else {
        return Promise.resolve(null)
    }
}

function fakeFetchCountryInfoUsingPromises(countryCode) {
    const countrySeed = fakeCountries.find(fakeCountry => fakeCountry.code == countryCode)
    if (countrySeed) {
        return Promise.resolve(new PaisDataObject().inventado(countrySeed.nombre, countrySeed.numero))
    } else {
        return Promise.resolve(null)
    }
}


function fetchCountryInfoUsingContinuation(countryCode, continuation) {
    // si no hay pais, va null como info del pais
    if (countryCode) {
        /*
          response.status: qué pasó con el pedido (p.ej. 200 es "OK")
          response.body: la info que envía el servidor, en este caso un JSON
         */
        superagent
            .get('https://restcountries.eu/rest/v2/alpha/' + countryCode)
            .end(function (error, response) {
                // el argumento de continuation llega al "info" dentro
                // de InfoVuelos.mostrarInfoCiudad
                continuation(new PaisDataObject().setApiDataPackage(response.body))
            })
    } else {
        continuation(null)
    }
}

function fakeFetchCountryInfoUsingContinuation(countryCode, continuation) {
    const countrySeed = fakeCountries.find(fakeCountry => fakeCountry.code == countryCode)
    if (countrySeed) {
        continuation(new PaisDataObject().inventado(countrySeed.nombre, countrySeed.numero))
    } else {
        continuation(null)
    }
}

const fakeCountries = [
    {code: 'ARG', nombre: 'Argentina', numero: 1},
    {code: 'ITA', nombre: 'Italia', numero: 2},
    {code: 'FRA', nombre: 'Francia', numero: 3},
    {code: 'THA', nombre: 'Tailandia', numero: 4},
    {code: 'MAR', nombre: 'Marruecos', numero: 5},
    {code: 'MYS', nombre: 'Malasia', numero: 6},
    {code: 'TUR', nombre: 'Turquía', numero: 7},
    {code: 'NOR', nombre: 'Noruega', numero: 8},
    {code: 'SWE', nombre: 'Suecia', numero: 9},
    {code: 'GBR', nombre: 'Reino Unido', numero: 10},
    {code: 'ESP', nombre: 'España', numero: 11}
]





module.exports.fetchCountryInfoUsingContinuation = fetchCountryInfoUsingContinuation
module.exports.fetchCountryInfoUsingPromises = fetchCountryInfoUsingPromises
module.exports.fakeFetchCountryInfoUsingContinuation = fakeFetchCountryInfoUsingContinuation
module.exports.fakeFetchCountryInfoUsingPromises = fakeFetchCountryInfoUsingPromises