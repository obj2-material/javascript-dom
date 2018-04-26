const React = require('react')
const ReactDOM = require('react-dom')

const axios = require('axios')

// cargo de lodash solamente lo que uso
const range = require('lodash.range')

const reactUtils = require('./react-utils')
const ventasAereasUtils = require('./ventas-aereas-power-utils')
const infoPaises = require('./info-paises')


/***********************************************
    Detalle vuelo
 ***********************************************/
class DetalleVuelo extends ventasAereasUtils.PantallaAplicacionVuelos {
    render() {
        return (
            <div className="container recuadroPantalla">
                <div className="panel panel-success">
                    <div className="panel-heading">
                        <h4>Detalle de un vuelo</h4>
                    </div>
                    <div className="panel-body">
                        <form>
                            <div className="row">
                                {this.dato(3, "Número", this.vuelo().numero())}
                                {this.dato(3, "Tipo", this.vuelo().tipoAsString())}
                            </div>
                            <div className="row">
                                {this.dato(3, "Origen", this.vuelo().origen().nombre())}
                                {this.dato(3, "Destino", this.vuelo().destino().nombre())}
                                {this.dato(3, "Avion", this.linkAvion(this.vuelo().avion()))}
                            </div>
                            <div className="row">
                                {this.dato(3, "Capacidad del avión", this.vuelo().avion().cantidadAsientos())}
                                {this.dato(3, "Asientos disponibles", this.vuelo().cantidadAsientosDisponibles())}
                                {this.dato(3, "Asientos ocupados", this.vuelo().cantidadAsientosOcupados())}
                                {this.dato(3, "Asientos libres", this.vuelo().cantidadAsientosLibres())}
                            </div>
                            <div className="row">
                                {this.dato(3, "Pasajes vendidos", this.vuelo().pasajesEmitidos().length)}
                                {this.dato(3, "Precio standard", this.vuelo().precioStandard())}
                                {this.dato(3, "Precio actual pasaje", this.vuelo().precioPasaje())}
                                {this.dato(3, "Política de precio", this.vuelo().politicaPrecio().nombre())}
                            </div>
                            <div className="row">
                                {this.dato(3, "Importe total por ventas", this.vuelo().importeTotalPasajesEmitidos())}
                            </div>
                        </form>
                        <reactUtils.BotoneraForm>
                            {this.botonStandard("Vender pasaje", () => this.mostrarVentaPasaje())}
                            {this.botonStandard("Ver detalle pasajes vendidos", () => this.mostrarDetallePasajesVendidos())}
                            {this.botonStandard("Volver a lista de vuelos", () => this.mostrarListaVuelos())}
                        </reactUtils.BotoneraForm>
                    </div>
                </div>
            </div>
        )
    }


    /*
      Partes del render
     */
    dato(ancho, label, valor) {
        return (
            <div className={"col-md-" + ancho}>
                <div className="form-group">
                    <label>{label}</label>
                    <p className="form-control-static" style={{ paddingTop: "0px" }}>{valor}</p>
                </div>
            </div>
        )
    }

    linkAvion(avion) {
        return (
            <a href="#" onClick={() => this.mostrarInfoAvion(avion)}>
                {avion.nombre()}
            </a>
        )
    }

}


/***********************************************
    Detalle pasajes de un vuelo
 ***********************************************/
class DetallePasajesVuelo extends ventasAereasUtils.PantallaAplicacionVuelos {
    pasajes() { return this.vuelo().pasajesEmitidos() }
    cantidadPasajes() { return this.pasajes().length }

    render() {
        return (
            <div className="container recuadroPantalla">
                <div className="panel panel-success">
                    <div className="panel-heading">
                        <h4>
                            <div className="row">
                                <div className="col-md-3">Detalle de pasajes emitidos</div>
                                <div className="col-md-3">Vuelo {this.vuelo().numero()}</div>
                                <div className="col-md-6">{this.vuelo().origen().nombre()} - {this.vuelo().destino().nombre()}</div>
                            </div>
                        </h4>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            {range(0, 4).map(n => this.columnaPasajes(n))}
                        </div>
                        <reactUtils.Botonera>
                            {this.botonStandard("Volver al vuelo", () => this.mostrarVueloActual())}
                        </reactUtils.Botonera>
                    </div>
                </div>
            </div>
        )
    }

    columnaPasajes(nroColumna) {
        if (nroColumna > this.ultimaColumnaPasajes()) { return [] }

        // creanme que es así, lo saqué armando tablitas
        const cantidadColumnas = this.ultimaColumnaPasajes() + 1
        const filasDeEstaColumna = Math.floor(
            (this.cantidadPasajes() + (this.ultimaColumnaPasajes() - nroColumna)) / cantidadColumnas
        )
        const primerIndice =
            Math.floor(this.cantidadPasajes() / cantidadColumnas) * nroColumna
            + Math.min(this.cantidadPasajes() % cantidadColumnas, nroColumna)

        const recuadroTablita = {
            borderStyle: "solid", borderWidth: "1px", borderColor: "MediumAquaMarine", borderRadius: "10px",
            paddingTop: "5px", paddingLeft: "2px", paddingRight: "2px"
        }

        return (
            <div className="col-md-3" key={nroColumna}>
                <div style={recuadroTablita}>
                    {this.tablaPasajes(primerIndice, filasDeEstaColumna)}
                </div>
            </div>
        )
    }

    ultimaColumnaPasajes() {
        // uso esta cuenta desde hace 30 años
        const cantidadNoAcotada = Math.floor((this.cantidadPasajes() - 1) / 15)
        return Math.min(cantidadNoAcotada, 3)
    }

    tablaPasajes(indiceInicial, cantidad) {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>{this.encabezadoDeTabla(["Nro", "DNI", "Precio"])}</tr>
                </thead>
                <tbody>
                    {range(indiceInicial, indiceInicial + cantidad).map(indice => this.filaEnTablaPasajes(indice))}
                </tbody>
            </table>
        )
    }

    filaEnTablaPasajes(indice) {
        const pasaje = this.pasajes()[indice]
        return (
            <tr key={indice}><td>{indice + 1}</td><td>{pasaje.dniPasajero()}</td><td>{pasaje.precio()}</td></tr>
        )
    }
}



/***********************************************
    Información ciudad
 ***********************************************/
class InfoCiudad extends ventasAereasUtils.PantallaAplicacionVuelos {
    /*
     Si hay que definir un constructor, tiene que ser con un parámetro, y no hay que olvidarse
     de invocar al super como primera línea
     */
    constructor(props) {
        super(props)
        this.state = { infoPais: null }
    }
    ciudad() { return this.props.parentComponent.ciudadActual() }
    infoPais() { return this.state.infoPais }

    componentDidMount() {
        setTimeout(() => { this.resolveCoutryInfoUsingPromises() }, 2000)
    }

    /* Esto hace falta para que cambie la info del país cuando se cambia la ciudad
       que hay que mostrar, sin cerrar InfoCiudad y volverlo a abrir.
       Por lo que se ve, React no hace siempre new, a veces reusa instancias.
       Mucho no me gusta esta solución, pero no veo alternativa por el momento.
       Ver http://busypeoples.github.io/post/react-component-lifecycle/ .
     */
    componentDidUpdate() {
        setTimeout(() => { this.resolveCoutryInfoUsingPromises() }, 500)
    }

    /* Complementa el componentDidUpdate().
       La documentación dice que acá vale hacer setState y no fuerza un render() adicional */
    componentWillReceiveProps() {
        this.setState({ infoPais: null })
    }

    /* si uso continuation: la función que responde al evento "llegó la info"
       va como parámetro adicional del fetch */
    resolveCoutryInfoUsingContinuation() {
        infoPaises.fetchCountryInfoUsingContinuation(this.ciudad().pais(), 
            (info) => this.setState({ infoPais: info }) 
        )
    }

    /* si uso promises: la función que responde al evento "llegó la info"
       va como parámetro del then */
    resolveCoutryInfoUsingPromises() {
        infoPaises.fetchCountryInfoUsingPromises(this.ciudad().pais())
            .then( (info) => this.setState({ infoPais: info }) )
    }

    render() {
        // esto conviene ponerlo si InfoCiudad es ventana aparte
        {/* <div className="container recuadroPantalla"> */ }
        {/* </div > */ }
        if (this.infoPais()) {
            return (
                <div className="panel panel-success">
                    <div className="panel-heading">
                        <h4>Ciudad: {this.ciudad().nombre()}</h4>
                    </div>
                    <div className="panel-body" style={{ padding: "20px"}}>
                        { this.datoEnFila("Pasajeros que partieron", this.ciudad().pasajerosQueSalieron(), 6) }
                        { this.datoEnFila("Pasajeros que llegaron", this.ciudad().pasajerosQueLlegaron(), 6) }
                        { this.renderInfoPais() }
                        <reactUtils.Botonera>
                            {this.botonStandard("Limpiar información de ciudad", () => this.adiosAdios())}
                        </reactUtils.Botonera>
                    </div>
                </div>
            )
        } else {
            return (<h1>Pará un cachito</h1>)
        }
    }

    renderInfoPais() {
        if (this.infoPais()) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        {this.recuadroInfoPais()}
                    </div>
                </div> 
            )
        } else {
            return null
        }
    }

    /*
      Partes del render
     */
    recuadroInfoPais() {
        const anchoLabel = 6
        return (
            <div style={{
                marginTop: "20px",
                borderStyle: "solid", borderWidth: "2px", borderColor: "SkyBlue", borderRadius: "6px",
                paddingTop: "6px", paddingBottom: "20px", paddingLeft: "30px", paddingRight: "30px"
            }}>
                <div className="row" style={{ marginBottom: "6px" }}>
                    <div className="col-md-12">
                        <h4>País: {this.infoPais().nombre()}</h4>
                    </div>
                </div>
                {this.datoEnFila("Población", this.infoPais().poblacion(), anchoLabel)}
                {this.datoEnFila("Superficie", this.infoPais().superficie(), anchoLabel)}
                {this.datoEnFila("Prefijo telefónico", this.infoPais().prefijoTelefonico(), anchoLabel)}
                {this.datoEnFila("Sufijo Internet", this.infoPais().sufijoInternet(), anchoLabel)}
            </div>
        )
    }

    adiosAdios() { this.props.parentComponent.dejarDeMostrarCiudad() }
}



/***********************************************
    Información avión
 ***********************************************/
class InfoAvion extends ventasAereasUtils.PantallaAplicacionVuelos {
    constructor(props) {
        super(props)
        this.state = {avionDelServer: null}
    }
    avion() { return this.props.avion }
    avionDelServer() { return this.state.infoAvionDelServer }

    accionParaVolver() { return this.props.accionParaVolver }

    /* Habilitar esta linea para ver la info del server */
    componentDidMount() { this.fetchInfoAvionDelServer() }
    
    anchoLabel() { return 4 }

    render() {
        return (
            <div className="container recuadroPantalla">
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-success">
                            <div className="panel-heading">
                                <h4>
                                    Avión: {this.avion().nombre()}
                                    <span style={{marginLeft: "50px"}}>Información local</span>
                                </h4>
                            </div>
                            <div className="panel-body" style={{ padding: "20px" }}>
                                {this.datoEnFila("Altura de la cabina", this.avion().alturaCabina(), this.anchoLabel())}
                                {this.datoEnFila("Capacidad", this.avion().cantidadAsientos(), this.anchoLabel())}
                                {this.datoEnFila("Cantidad vuelos", this.avion().cantidadVuelosHechos(), this.anchoLabel())}
                                {this.datoEnFila("Pasajeros transportados", this.avion().cantidadTotalPasajeros(), this.anchoLabel())}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        { this.renderInfoAvionDelServer() }
                    </div>
                </div>
                <reactUtils.Botonera>
                    {this.botonStandard("Volver", () => this.volver())}
                </reactUtils.Botonera>
            </div>
        )
    }

    renderInfoAvionDelServer() {
        if (this.avionDelServer()) {
            return (
                <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h4>
                            Avión: {this.avionDelServer()._nombre}
                            <span style={{ marginLeft: "50px" }}>Información del server</span>
                        </h4>
                    </div>
                    <div className="panel-body" style={{ padding: "20px" }}>
                        {this.datoEnFila("Altura de la cabina", this.avionDelServer()._alturaCabina, this.anchoLabel())}
                        {this.datoEnFila("Capacidad", this.avionDelServer()._cantidadAsientos, this.anchoLabel())}
                    </div>
                </div>
            )            
        } else {
            return <h1>... info del avión en el server ...</h1>
        }
    }

    fetchInfoAvionDelServer() {
        // ATENTI acá.
        // Como a función que se le pasa al then no es una arrow function, "this" no es la instancia de InfoAvion
        // Para resolver eso, se define un "alias" para this, y se usa el alias en el cuerpo de la función
        // Este truco aparece en la literatura
        const self = this
        axios
            .get('http://localhost:7777/datosAvion?nombre=' + this.avion().nombre())
            .then(function(response) {
                self.setState({ infoAvionDelServer: response.data })
            })
    }

    volver() { this.accionParaVolver()() }
}


module.exports.DetalleVuelo = DetalleVuelo
module.exports.DetallePasajesVuelo = DetallePasajesVuelo
module.exports.InfoCiudad = InfoCiudad
module.exports.InfoAvion = InfoAvion
