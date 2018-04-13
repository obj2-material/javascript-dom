const React = require('react')
const ReactDOM = require('react-dom')

class SecondExample extends React.Component { 
    constructor(props) { 
        super(props); 
        this.state = { 
            texto: "Miren lo que va a pasar acá", tamanioFuente: "medium",
            showButton: true
        }
    }

    render() {
        const theStyle = { fontSize: this.state.tamanioFuente }

        // Abajo del texto, va a haber, o bien un botón, o bien un segundo paragraph.
        // Observar que se está asignando el resultado de una expresión JSX a una constante.
        // Para que esto tenga sentido, hay que recordar que JSX es una notación bonita para crear objetos
        // (ver el método renderSinJsx en first-example).
        const buttonOrMessage = this.state.showButton
            ? (<button onClick={ () => this.makeSomeChanges() }>React magic - reloaded</button>)
            : (<p><span>... y el botón se fue ...</span></p>)

        return (
            <div>
                <p><span style={ theStyle }>{ this.state.texto }</span></p>
                { /* se incluye el botón o segundo paragraph, es el valor de la constante */}
                { buttonOrMessage }
            </div>
        )
    }

    makeSomeChanges() { this.setState({ 
        texto: "Hello React", tamanioFuente: "25px", showButton: false 
    }) }

}


ReactDOM.render(
    <SecondExample />,
    document.getElementById('reactPage')
);
