const React = require('react')
const ReactDOM = require('react-dom')

const ventas = require('./ventas-aereas-dominio')

/*
  Una página más compleja, que muestra un dominio.
  Incluye una tabla generada dinámicamente.
 */
class InfoVuelosAviones extends React.Component {
    constructor(props) {
        super(props)
        this.state = { avionElegido: ventas.store.avionConNombre("Airbus 330") }
    }

    render() {
        return (
            <div className="container" style={{marginLeft: "20px", marginRight: "20px"}}>

                { /* datos del avion elegido */}
                <div className="panel panel-info" style={{ marginTop: "10px" }}>
                    <div className="panel-heading">
                        <h4>Avión {this.avionElegido().nombre()}</h4>
                    </div>
                    <div className="panel-body">
                        <div className="row" style={{ marginBottom: "5px" }}>
                            <div className="col-md-3" style={{ fontWeight: "bold" }}>Cantidad de vuelos</div>
                            <div className="col-md-9">{this.avionElegido().cantidadVuelosHechos()}</div>
                        </div>
                        <div className="row" style={{ marginBottom: "5px" }}>
                            <div className="col-md-3" style={{ fontWeight: "bold" }}>Capacidad</div>
                            <div className="col-md-9">{this.avionElegido().cantidadAsientos()}</div>
                        </div>
                        <div className="row" style={{ marginBottom: "5px" }}>
                            <div className="col-md-3" style={{ fontWeight: "bold" }}>Pasajeros transportados</div>
                            <div className="col-md-9">{this.avionElegido().cantidadTotalPasajeros()}</div>
                        </div>
                        <div className="row" style={{ marginBottom: "5px" }}>
                            <div className="col-md-3" style={{ fontWeight: "bold" }}>Porcentaje de ocupación</div>
                            <div className="col-md-9">{this.avionElegido().porcentajeOcupacion()}</div>
                        </div>
                    </div>
                </div>

                { /* seleccion de avion */}
                <div className="panel panel-info">
                    <div className="panel-body">
                        <div className="text-center">
                            <button className="btn btn-info" style={{ marginLeft: "10px", marginRight: "10px" }}
                                    onClick={() => this.elegirAvion("Airbus 330")}>
                                Airbus 330
                            </button>
                            <button className="btn btn-info" style={{ marginLeft: "10px", marginRight: "10px" }}
                                    onClick={() => this.elegirAvion("Boeing 737")}>
                                Boeing 737
                            </button>
                            <button className="btn btn-info" style={{ marginLeft: "10px", marginRight: "10px" }}
                                    onClick={() => this.elegirAvion("Embraer 190")}>
                                Embraer 190
                            </button>
                        </div>
                    </div>
                </div>

                { /* tabla de vuelos */}
                <div className="panel panel-success" style={{ marginTop: "50px" }}>
                    <div className="panel-heading">
                        <h4>Vuelos (de todos los aviones)</h4>
                    </div>
                    <div className="panel-body">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Tipo de vuelo</th>
                                    <th>Origen</th>
                                    <th>Destino</th>
                                    <th>Asientos libres</th>
                                    <th>Precio pasaje</th>
                                    <th>Pasajes vendidos</th>
                                    <th>Importe total vendido</th>
                                </tr>
                            </thead>
                            <tbody>
                                { /* una lista de expresiones JSX, vale poner esto dentro del render.
                                     La función del map devuelve una expresión JSX 
                                     (que en realidad es la creación de objetos de modelo HTML)
                                     correspondiente a un vuelo, 
                                     el map devuelve la lista de la expresión para cada vuelo.
                                   */
                                    ventas.store.vuelos().map(vuelo => {
                                    return (
                                        <tr key={vuelo.numero()}>
                                            <td>{vuelo.tipoAsString()}</td>
                                            <td>{vuelo.origen().nombre()}</td>
                                            <td>{vuelo.destino().nombre()}</td>
                                            <td>{vuelo.cantidadAsientosLibres()}</td>
                                            <td>{vuelo.precioPasaje()}</td>
                                            <td>{vuelo.cantidadPasajesEmitidos()}</td>
                                            <td>{vuelo.importeTotalPasajesEmitidos()}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    avionElegido() { return this.state.avionElegido }
    elegirAvion(nombreAvion) { this.setState({avionElegido: ventas.store.avionConNombre(nombreAvion)}) }
}

ReactDOM.render(
    <InfoVuelosAviones />,
    document.getElementById('reactPage')
);
