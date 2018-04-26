const React = require('react')
const ReactDOM = require('react-dom')

// cargo de lodash solamente lo que uso
const sortBy = require('lodash.sortby')

const reactUtils = require('./react-utils')

const ventasAereasUtils = require('./ventas-aereas-power-utils')
const acciones = require('./ventas-aereas-power-acciones')
const vistas = require('./ventas-aereas-power-vistas')


// para ver, aunque no está incluido: ventas-aereas-power-alternativas-descartadas


/***********************************************
    AplicacionVuelos
 ***********************************************/
const pantallas = { 
    infoVuelos: 1, ventaPasajes: 2, detalleVuelo: 3, detallePasajes: 4, agregarVuelo: 5, infoAvion: 6, ventaMasivaPasajes: 7
}
class AplicacionVuelos extends React.Component {
    constructor(props) {
        super(props)
        this.state = { pantallaActual: pantallas.infoVuelos }
        this._vueloActual = null
        this._avionActual = null
        this._ultimaAccion = null
    }

    mostrarVentaPasaje(vuelo) {
        this._vueloActual = vuelo
        this.setState({ pantallaActual: pantallas.ventaPasajes })
    }

    mostrarInfoAvion(avion) {
        this._avionActual = avion
        this.setState({ pantallaActual: pantallas.infoAvion })
    }

    mostrarDetalleVuelo(vuelo) {
        this._vueloActual = vuelo
        this.setState({ pantallaActual: pantallas.detalleVuelo })
    }

    mostrarDetallePasajesVuelo(vuelo) {
        this._vueloActual = vuelo
        this.setState({ pantallaActual: pantallas.detallePasajes })
    }

    mostrarListaVuelos() {
        this.setState({ pantallaActual: pantallas.infoVuelos })
    }

    mostrarFormAgregarVuelo() {
        this.setState({ pantallaActual: pantallas.agregarVuelo })
    }

    setUltimaAccion(accion) {
        this._accionAnterior = this._ultimaAccion
        this._ultimaAccion = accion
    }

    render() {
        if (this.state.pantallaActual === pantallas.infoVuelos) {
            this.setUltimaAccion(() => this.mostrarListaVuelos())
            return (<InfoVuelos rootComponent={this}/>)
        } else if (this.state.pantallaActual === pantallas.detalleVuelo) {
            this.setUltimaAccion(() => this.mostrarDetalleVuelo(this._vueloActual))
            return (<vistas.DetalleVuelo rootComponent={this} vuelo={this._vueloActual} />)
        } else if (this.state.pantallaActual === pantallas.ventaPasajes) {
            this.setUltimaAccion(() => this.mostrarVentaPasaje(this._vueloActual))
            return (<acciones.VentaPasaje rootComponent={this} vuelo={this._vueloActual} />)
        } else if (this.state.pantallaActual === pantallas.detallePasajes) {
            this.setUltimaAccion(() => this.mostrarDetallePasajesVuelo(this._vueloActual))
            return (<vistas.DetallePasajesVuelo rootComponent={this} vuelo={this._vueloActual} />)
        } else if (this.state.pantallaActual === pantallas.agregarVuelo) {
            this.setUltimaAccion(() => mostrarFormAgregarVuelo())
            return (<acciones.AgregadoVuelo rootComponent={this} />)
        } else if (this.state.pantallaActual === pantallas.infoAvion) {
            this.setUltimaAccion(() => this.mostrarInfoAvion(this._avionActual))
            return (<vistas.InfoAvion rootComponent={this} avion={this._avionActual} accionParaVolver={this._accionAnterior} />)
        }
    }
}


/***********************************************
    InfoVuelos
 ***********************************************/
class InfoVuelos extends ventasAereasUtils.PantallaAplicacionVuelos {
    constructor(props) {
        super(props)
        this.state = { listaDeVuelos: [], ciudadActual: null }
    }

    /* 
        si la información a mostrar viniera de un server, el pedido a un server
        debería hacerse en el componentDidMount().
        El setState se hace en la función que responde al evento "llegó la info".

        En este caso no es necesario porque los datos los tiene el browser, lo hago así
        para poder dejar este comentario.
    */
    componentDidMount() { this.setState({listaDeVuelos: this.store().vuelos()}) }

    ciudadActual() { return this.state.ciudadActual }

    render() {
        return (
            <div>
                <div className="container recuadroPantalla">
                    <div className="row">
                        <div className={"col-md-" + ((this.ciudadActual()) ? 8 : 12)}>
                            <div className="panel panel-success">
                                <div className="panel-heading">
                                    <h3>Vuelos</h3>
                                </div>
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {this.tablaVuelos()}
                                        </div>
                                    </div>
                                    <reactUtils.Botonera>
                                        {this.botonStandard("Agregar vuelo normal", () => this.agregarVueloNormal())}
                                    </reactUtils.Botonera>
                                </div>
                            </div>
                        </div>
                        { this.infoCiudadElegida() }
                    </div>
                </div>
            </div>
        )
    }

    tablaVuelos() {
        return (
            <table className="table table-striped">
                <thead>
                    { /* forma concisa de definir los títulos */ }
                    <tr>
                        { this.encabezadoDeTabla( [ "", "Tipo de vuelo", "Origen", "Destino", 
                            this.linkOrdenarPorAvion(), "Asientos libres", "Precio pasaje" ] )
                        }
                    </tr>
                    { /* forma "tradicional" equivalente */
                    /*
                    <tr>
                        <th>""</th>
                        <th>"Tipo de vuelo"</th>
                        <th>"Origen"</th>
                        <th>"Destino"</th>
                        <th>"Avión"</th>
                        <th>"Asientos libres"</th>
                        <th>"Precio pasaje"</th>
                    </tr>
                    */}
                </thead>
                <tbody>
                    {this.state.listaDeVuelos.map( vuelo => this.infoSobreVuelo(vuelo) )}
                </tbody>
            </table>
        )
    }

    infoSobreVuelo(vuelo) {
        const filaDatosVuelo = (
            <tr key={vuelo.numero()}>
                <td>{this.botonParaMostrarDetalle(vuelo)}</td>
                <td>{vuelo.tipoAsString()}</td>
                <td>{this.linkCiudad(vuelo.origen())}</td>
                <td>{this.linkCiudad(vuelo.destino())}</td>
                <td>{this.linkAvion(vuelo.avion())}</td>
                <td>{vuelo.cantidadAsientosLibres()}</td>
                <td>{vuelo.precioPasaje()}</td>
            </tr>
        )
        return filaDatosVuelo
    }

    botonParaMostrarDetalle(vuelo) {
        return (
            <button className="btn btn-info btn-xs" onClick={() => this.mostrarDetalleVuelo(vuelo)}>
                Detalle
            </button>
        )
    }

    linkCiudad(ciudad) {
        if (ciudad) {
            return ( <a href="#" onClick={() => this.mostrarInfoCiudad(ciudad)}>{ ciudad.nombre() }</a> )
        } else {
            return "No asignado"
        }
    }

    linkAvion(avion) {
        return (
            <a href="#" onClick={() => this.mostrarInfoAvion(avion)}>{ avion.nombre() }</a>
        )
    }

    linkOrdenarPorAvion() {
        return (<a href="#" onClick={() => this.ordenarPorAvion()}>Avión</a>)
    }

    infoCiudadElegida() {
        if (this.ciudadActual()) {
            /* la info que en JS (o en cualquier lenguaje) serían parámetros del constructor,
               usando JSX van como atributos del "tag" */
            /* ciudadActual están en el state de InfoVuelos. 
               El componente InfoCiudad, en lugar de recibir la ciudadActual, se la pide a su parentComponent.
               OJO que si estuviera usando InfoCiudad en distintos contextos, tal vez convenga
               pasarle explícitamente la ciudad, aunque a veces sea redundante.               
             */
            return (
                <div className="col-md-4">
                    <vistas.InfoCiudad rootComponent={this.rootComponent()} parentComponent={this} />
                </div>
            )
        } else {
            return null
        }    
    }

    mostrarInfoCiudad(ciudad) { this.setState({ ciudadActual: ciudad }) }
    dejarDeMostrarCiudad() { this.setState({ ciudadActual: null }) }

    mostrarDetalleVuelo(vuelo) { this.rootComponent().mostrarDetalleVuelo(vuelo) }

    ordenarPorAvion() {
        this.setState({ listaDeVuelos: sortBy(this.state.listaDeVuelos, [vuelo => vuelo.avion().nombre(), vuelo => vuelo.numero()])})
    }

    /* Así se maneja si se decide obtener la info del pais elegido en este componente, y que a 
       InfoCiudad le llegue ya resuelto.
       Prefiero como está ahora, se descargó de un poco de responsabilidad el componente InfoVuelos
       que es más pesado. Además el componente InfoCiudad quedó más independiente, si alguien lo quiere usar,
       alcanza con suministrarle la ciudad.
     */
    // mostrarInfoCiudadResolviendoPais(ciudad) {
    //     this.setState({ paraUnCachito: true })
    //     setTimeout(() => {
    //         infoPaises.fetchCountryInfo(ciudad.pais(), (info) => {
    //             this.setState({ paraUnCachito: false, ciudadActual: ciudad, infoPais: info })
    //         })
    //     }, 2000)
    // }
    // infoCiudadElegidaResolviendoPais() {
    //     if (this.state.paraUnCachito) {
    //         return (
    //             <div className="col-md-4">
    //                 <h1>Pará un cachito</h1>
    //             </div>
    //         )
    //     } else if (this.ciudadActual()) {
    //         return (
    //             <div className="col-md-4">
    //                 <vistas.InfoCiudad rootComponent={this.rootComponent()} parentComponent={this} />
    //             </div>
    //         )
    //     } else {
    //         return null
    //     }
    // }

}



/***********************************************
    Conexión con HTML
 ***********************************************/
ReactDOM.render(
    <AplicacionVuelos />,
    document.getElementById('reactPage')
);


