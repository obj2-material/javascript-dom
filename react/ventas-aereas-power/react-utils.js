const React = require('react')
const ReactDOM = require('react-dom')

// cargo de lodash solamente lo que uso
const defaultTo = require('lodash.defaultto')




/***************************************************************
    Clases React utilitarias
 ***************************************************************/
class Botonera extends React.Component {
    render() {
        return (
            <div className="row" style={{ marginTop: this.margenSuperior() }}>
                <div className="col-md-12">
                    {this.props.children}
                </div>
            </div>
        )
    }

    margenSuperior() { return defaultTo(this.props.marginTop, this.margenSuperiorDefault()) }

    margenSuperiorDefault() { return "30px" }
}

class BotoneraForm extends Botonera {
    margenSuperiorDefault() { return "0px" }
}


module.exports.Botonera = Botonera
module.exports.BotoneraForm = BotoneraForm