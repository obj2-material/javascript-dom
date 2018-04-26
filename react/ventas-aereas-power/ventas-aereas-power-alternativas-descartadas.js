/***********************************************
    funciones utilitarias
 ***********************************************/
function repeatArray(arr,times) {
    return range(0,times).reduce((bigArray, n) => bigArray.concat(arr), [])
}




/***********************************************
    Detalle pasajes de un vuelo, versión horizontal.
    Alternativa descartada.
 ***********************************************/
class DetallePasajesVueloHorizontal extends PantallaAplicacionVuelos {
    pasajes() { return this.vuelo().pasajesEmitidos() }

    render() {
        return (
            <div className="container recuadroPantalla">
                <div className="panel panel-success">
                    <div className="panel-heading">
                        <h4>
                            <div className="row">
                                <div className="col-md-3">Vuelo {this.vuelo().numero()}</div>
                                <div className="col-md-6">{this.vuelo().origen().nombre()} - {this.vuelo().destino().nombre()}</div>
                            </div>
                        </h4>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-12">{this.tablaPasajes()}</div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    tablaPasajes() {
        // uso esta cuenta desde hace 30 años
        const filas = Math.floor((this.pasajes().length - 1) / 4) + 1
        console.log(filas + " filas")
        return (
            <table className="table table-striped">
                <thead>
                    {/* version corta */}
                    <tr>{this.encabezadoDeTabla(repeatArray(["Nro", "DNI", "Precio"], 4))}</tr>
                    {/* version larga equivalente 
                    <tr>
                        { this.encabezadoDeTabla([
                            "Nro", "DNI", "Precio", "Nro", "DNI", "Precio", "Nro", "DNI", "Precio", "Nro", "DNI", "Precio"
                        ]) }
                    </tr>
                    */}
                </thead>
                <tbody>
                    {range(0, filas).map(n => this.filaEnTablaPasajes(n))}
                </tbody>
            </table>
        )
    }

    filaEnTablaPasajes(n) {
        return (<tr>{this.columnasFilaTablaPasajes(n)}</tr>)
    }

    columnasFilaTablaPasajes(n) {
        // version corta
        return range(0, 4).reduce((columnas, m) => columnas.concat(this.columnasParaPasaje(n * 4 + m)), [])
        /*    version larga equivalente
        let columnas = []
        range(0,3).forEach(m => {columnas = columnas.concat(this.columnasParaPasaje(this.pasajes()[n*4 + m]))})
        return columnas
        */
    }

    columnasParaPasaje(indice) {
        console.log("pasaje #" + indice)
        if (indice > this.pasajes().length) {
            return []
        } else {
            const pasaje = this.pasajes()[indice]
            console.log(pasaje)
            return [<td>{indice + 1}</td>, <td>{pasaje.dniPasajero()}</td>, <td>{pasaje.precio()}</td>]
        }
    }
}



/*
    Estos métodos son para habilitar la venta de un pasaje desde dentro de la tabla de vuelos,
    en InfoVuelos.

    También habría que agregar esto en el constructor
    
    this.state = { vueloParaVenderPasaje: null, dniPasajero: null }

    y cambiar el return de infoSobreVuelo por esto

    const recuadroVenderPasajeVuelo = this.recuadroParaVentaPasajeInline()
    let filasVuelo = [filaDatosVuelo]
    if (vuelo === this.state.vueloParaVenderPasaje) {
        filasVuelo.push(recuadroVenderPasajeVuelo)
    }
    return filasVuelo
*/
// prepararVentaPasajeParaVuelo(vuelo) {
//     const vueloAElegir = (this.state.vueloParaVenderPasaje === vuelo) ? null : vuelo
//     this.setState({ vueloParaVenderPasaje: vueloAElegir })
// }

// recuadroParaVentaPasajeInline() {
//     return (
//         <tr key={"VentaPasaje" + vuelo.numero()}>
//             <td colSpan="8">
//                 <div className="container" style={{
//                     borderWidth: "2px", borderStyle: "solid", borderColor: 'brown', marginLeft: "20px", marginRight: "20px",
//                     padding: "10px"
//                 }}>
//                     <div className="row">
//                         <div className="col-md-2" style={{ fontWeight: "bold" }}>DNI pasajero</div>
//                         <div className="col-md-6">
//                             <FormControl type="text"
//                                 name="dniPasajero"
//                                 value={this.state.dniPasajero}
//                                 onChange={(event) => this.setState({ dniPasajero: event.target.value })}
//                             />
//                         </div>
//                     </div>
//                     <div className="row" style={{ marginTop: "12px" }}>
//                         <div className="col-md-2" style={{ fontWeight: "bold" }}>Precio del pasaje</div>
//                         <div className="col-md-6">{vuelo.precioPasaje()}
//                         </div>
//                     </div>
//                     <div className="row" style={{ marginTop: "12px" }}>
//                         <div className="col-md-8" style={{ fontWeight: "bold" }}>
//                             <button className="btn btn-success">
//                                 Confirmar venta
//                                 </button>
//                         </div>
//                     </div>
//                     {/* <span style={{marginLeft: "20px"}}>Venta de pasajes para el vuelo { vuelo.numero() }</span> */}
//                 </div>
//             </td>
//         </tr>
//     )
// }
