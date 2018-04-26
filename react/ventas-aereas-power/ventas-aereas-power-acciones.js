const React = require('react')
const ReactDOM = require('react-dom')

const ventas = require('./ventas-aereas-dominio')

const reactUtils = require('./react-utils')

const ventasAereasUtils = require('./ventas-aereas-power-utils')

/***********************************************
    VentaPasaje
 ***********************************************/
class VentaPasaje extends ventasAereasUtils.PantallaAplicacionVuelos {
    constructor(props) {
        super(props)
        this.state = { dniPasajero: "" }
    }

    render() {
        return (
            <div className="container recuadroPantalla">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <h4>Vender un pasaje</h4>
                    </div>
                    <div className="panel-body">
                        { this.resumenVuelo() }
                        <div style={{ marginTop: "12px", marginLeft: "40px", marginRight: "40px" }}>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="dniPasajero">DNI pasajero</label>
                                    <input type="text" className="form-control" id="dniPasajero"
                                        value={this.state.dniPasajero}
                                        onChange={(event) => this.setState({ dniPasajero: event.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Precio del pasaje</label>
                                    <p className="form-control-static" style={{ paddingTop: "0px" }}>
                                        {this.vuelo().precioPasaje()}
                                    </p>
                                </div>
                            </form>
                            <reactUtils.BotoneraForm>
                                {this.botonStandard("Confirmar venta", () => this.confirmarVenta(), "btn-success")}
                                {this.botonStandard("Cancelar", () => this.mostrarVueloActual(), "btn-default")}
                            </reactUtils.BotoneraForm>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    resumenVuelo() {        
        return (
            <div style={{
                marginLeft: "40px", marginRight: "40px", marginTop: "10px", marginBottom: "40px",
                fontSize: "larger",
                borderStyle: "solid", borderWidth: "2px", borderColor: "SkyBlue", borderRadius: "10px",
                paddingTop: "20px", paddingBottom: "20px", paddingLeft: "10px", paddingRight: "10px"
            }}>
                <div className="row">
                    <div className="col-md-4">
                        <span style={{ marginRight: "6px", fontWeight: "bold" }}>Vuelo</span>
                        <span>
                            {this.vuelo().origen().nombre()} - {this.vuelo().destino().nombre()}
                        </span>
                    </div>
                    <div className="col-md-4">
                        <span>
                            {this.vuelo().pasajesEmitidos().length} pasajes emitidos
                                </span>
                    </div>
                    <div className="col-md-4">
                        <span>
                            {this.vuelo().cantidadAsientosLibres()} asientos libres
                                </span>
                    </div>
                </div>
                <div className="row" style={{ marginTop: "12px" }}>
                    <div className="col-md-4">
                        <span style={{ marginRight: "6px", fontWeight: "bold" }}>Política de precio</span>
                        <span>
                            {this.vuelo().politicaPrecio().nombre()}
                        </span>
                    </div>
                    <div className="col-md-4">
                        <span style={{ marginRight: "6px", fontWeight: "bold" }}>Precio standard</span>
                        <span>
                            {this.vuelo().precioStandard()}
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    confirmarVenta() {
        // event.preventDefault()
        // accion de negocio
        this.vuelo().venderPasaje(this.state.dniPasajero)
        // navegacion
        this.props.rootComponent.mostrarDetalleVuelo(this.vuelo())
    }
}



/***********************************************
    Agregado de vuelo
 ***********************************************/
class AgregadoVuelo extends ventasAereasUtils.PantallaAplicacionVuelos {
    constructor(props) {
        super(props)
        this.state = { nombreAvion: '', origen: '', destino: '', 
            nombrePolitica: '', precioStandard: '', tiempoDeVuelo: '',
            erroresValidacion: []
        }
    }
    render() {
        return (
            <div className="container recuadroPantalla">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <h4>Agregar un vuelo</h4>
                    </div>
                    <div className="panel-body">
                        { this.renderErroresValidacion() }
                        <form>
                            <div className="form-group">
                                <label>Tipo de vuelo</label>
                                <p className="form-control-static" style={{ paddingTop: "0px", paddingBottom: "0px" }}>Normal</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="avion">Avion</label>
                                { this.selectAvion() }
                            </div>
                            <div className="form-group">
                                <label htmlFor="origen">Origen</label>
                                {/* Si no hago setState en el onChange, tipeo y no pasa naranja */}
                                <input type="text" className="form-control" id="origen"
                                    value={ this.state.origen }
                                    onChange={(event) => this.setState({ origen: event.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="origen">Destino</label>
                                <input type="text" className="form-control" id="origen"
                                    value={this.state.destino}
                                    onChange={(event) => this.setState({ destino: event.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="origen">Tiempo de vuelo</label>
                                <input type="text" className="form-control" id="origen"
                                    value={this.state.tiempoDeVuelo}
                                    onChange={(event) => this.setState({ tiempoDeVuelo: event.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="origen">Precio standard</label>
                                <input type="text" className="form-control" id="origen"
                                    value={this.state.precioStandard}
                                    onChange={(event) => this.setState({ precioStandard: event.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="avion">Política de precio</label>
                                { this.selectPoliticaDePrecio() }
                            </div>
                        </form>
                        <reactUtils.Botonera>
                            {this.botonStandard("Confirmar nuevo vuelo", () => this.confirmarNuevoVuelo(), "btn-success")}
                            {this.botonStandard("Cancelar", () => this.mostrarListaVuelos(), "btn-default")}
                        </reactUtils.Botonera>
                    </div>
                </div>
            </div>
        )
    }

    erroresValidacion() {
        let errores = []
        if (!this.state.origen || !this.state.origen.length) {
            errores.push("Hay que cargar el origen")
        }
        if (!this.state.destino || !this.state.destino.length) {
            errores.push("Hay que cargar el destino")
        }
        if (!this.state.politica) {
            errores.push("Hay que cargar la política de precios")
        }
        if (!this.state.avion) {
            errores.push("Hay que cargar el avión")
        }

        // el tiempo de vuelo tiene que ser un número positivo
        if (!this.state.tiempoDeVuelo) {
            errores.push("Hay que cargar el tiempo de vuelo")
        } else {
            const tiempoNumero = Number(this.state.tiempoDeVuelo)
            if (!Number.isFinite(tiempoNumero)) {
                errores.push("El tiempo de vuelo debe ser un número")
            } else if (!Number.isInteger(tiempoNumero)) {
                errores.push("El tiempo de vuelo debe ser entero, no puede tener decimales")
            } else if (tiempoNumero <= 0) {
                errores.push("El tiempo de vuelo debe ser mayor a cero")
            }
        }
        return errores
    }

    confirmarNuevoVuelo() {
        // validaciones
        const losErrores = this.erroresValidacion()

        if (losErrores.length) {
            // hay errores: no hago nada y los muestro
            this.setState({erroresValidacion: losErrores})
        } else {
            // no hay errores: procedo

            // accion de negocio
            // cuando tenga servidor acá va a ir un POST
            const nuevoVuelo = new ventas.VueloNormal(
                this.state.origen, this.state.destino, Number(this.state.tiempoDeVuelo), Number(this.state.precioStandard)
            )
            nuevoVuelo.setAvion(this.state.avion ? this.store().avionConNombre(this.state.avion) : null)
            nuevoVuelo.setPoliticaPrecio(this.state.politica ? this.store().politicaDePrecioConNombre(this.state.politica) : null)
            this.store().agregarVuelo(nuevoVuelo)
    
            // navegacion
            this.mostrarListaVuelos()
        }
    }

    selectAvion() {
        return (            
            <select className="form-control" 
                value={this.state.avion}
                onChange={(event) => this.manejarSeleccionAvion(event.target.value) }
            >
                <option key={"no-option"} value={""}>...elegir...</option>
                { this.store().aviones().map((avion) => 
                    <option key={avion.nombre()} value={avion.nombre()}>{ avion.nombre() }</option>
                ) }
            </select>
        )
    }

    manejarSeleccionAvion(value) {
        this.setState({ avion: value })
    }

    selectPoliticaDePrecio() {
        return (            
            <select className="form-control" 
                value={this.state.politica}
                onChange={(event) => this.manejarSeleccionPoliticaDePrecio(event.target.value) }
            >
                <option key={"no-option"} value={""}>...elegir...</option>
                { this.store().politicasDePrecio().map((politica) => 
                    <option key={politica.nombre()} value={politica.nombre()}>{politica.nombre() }</option>
                ) }
            </select>
        )
    }

    manejarSeleccionPoliticaDePrecio(value) {
        this.setState({ politica: value })
    }

    renderErroresValidacion() {
        if (this.state.erroresValidacion.length) {
            return (
                <div style={{
                    marginTop: "20px", marginBottom: "20px",
                    borderStyle: "solid", borderWidth: "2px", borderColor: "Crimson", borderRadius: "6px",
                    paddingTop: "6px", paddingBottom: "20px", paddingLeft: "30px", paddingRight: "30px"
                }}>
                    <div className="row" style={{ marginBottom: "12px" }}>
                        <div className="col-md-12">
                            <h4>Errores en la carga de datos</h4>
                        </div>
                    </div>
                    {this.state.erroresValidacion.map((err,indice) => (
                        <div className="row" key={indice} style={{ marginBottom: "6px" }}>
                            <div className="col-md-12">
                                {err}
                            </div>
                        </div>
                    ))}
                </div>
            )
        } else {
            return null
        }
    }

}


module.exports.VentaPasaje = VentaPasaje
module.exports.AgregadoVuelo = AgregadoVuelo