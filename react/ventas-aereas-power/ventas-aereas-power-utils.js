const React = require('react')
const ReactDOM = require('react-dom')

const ventas = require('./ventas-aereas-dominio')

/***********************************************
    Superclase con métodos comunes entre las distintas pantallas
 ***********************************************/
class PantallaAplicacionVuelos extends React.Component {
    rootComponent() { return this.props.rootComponent }

    vuelo() { return this.props.vuelo }

    store() { return ventas.store }
    
    /*
     Acciones de navegación
     */
    mostrarVueloActual() { this.props.rootComponent.mostrarDetalleVuelo(this.vuelo()) }
    mostrarVentaPasaje() { this.props.rootComponent.mostrarVentaPasaje(this.vuelo()) }
    mostrarInfoAvion(avion) { this.rootComponent().mostrarInfoAvion(avion) }
    mostrarListaVuelos() { this.props.rootComponent.mostrarListaVuelos() }
    mostrarDetallePasajesVendidos() { this.props.rootComponent.mostrarDetallePasajesVuelo(this.vuelo()) }
    agregarVueloNormal() { this.props.rootComponent.mostrarFormAgregarVuelo() }

    /*
     Utilitarios para render
     */
    encabezadoDeTabla(titulos) {
        return titulos.map((titulo, ix) => (<th key={ix}>{titulo}</th>))
    }

    datoEnFila(label, valor, anchoLabel = 3) {
        return (
            <div className="row" style={{ marginBottom: "6px" }}>
                <div className={"col-md-" + anchoLabel} style={{ fontWeight: "bold" }}>{label}</div>
                <div className={"col-md-" + (12 - anchoLabel)}>{valor}</div>
            </div>
        )
    }

    // ejemplo de parámetro con valor por defecto
    botonStandard(label, accion, clasesAdicionales = "btn-info") {
        return (
            <button className={"btn " + clasesAdicionales} style={{ marginRight: "12px" }} onClick={accion}>
                {label}
            </button>
        )
    }
}


module.exports.PantallaAplicacionVuelos = PantallaAplicacionVuelos
