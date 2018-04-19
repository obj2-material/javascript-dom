const React = require('react')
const ReactDOM = require('react-dom')

class FirstExample extends React.Component { 
    constructor(props) { 
        super(props); 
        // el state incluye los aspectos dinámicos de la página
        this.state = { texto: "Miren lo que va a pasar acá", tamanioFuente: "medium"}
    }

    render() {
        const theStyle = { fontSize: this.state.tamanioFuente }
        // esto es una expresión JSX, parece HTML pero no lo es
        // ver renderSinJsx() abajo
        return (
            <div>
                <p><span style={ theStyle }>
                    {/*  Los elementos dinámicos no necesitan id, 
                         lo dinámico se expresa en JavaScript entre llaves */}
                    { this.state.texto }
                </span></p>
                <button onClick={() => this.changeTextAndFont()}>React magic</button>
            </div>
        )
    }

    // función que reacciona al evento de apretar el botón
    changeTextAndFont() { 
        // al cambiar el state *usando setState*,
        // React se encarga solito de actualizar la pantalla
        this.setState({ texto: "Hello React", tamanioFuente: "25px" }) 
    }

    /**
     * Esto no anda porque hay que usar setState,
     * si no lo hacemos, React no reac-ciona
     */
    changeTextAndFont_badVersion() { 
        this.state.texto = "Hello React"
        this.state.tamanioFuente = "25px" 
    }


    /*
     Este método devuelve exactamente el mismo objeto que render().
     La diferencia es cómo se crea este objeto: usando notación JS normal
     en lugar de JSX.

     Moraleja: JSX es una notación para crear objetos JS.
    */
    renderSinJsx() {
        const theStyle = { fontSize: this.state.tamanioFuente }
        const self = this;

        return React.createElement(
            'div', null,
            React.createElement(
                'p', null,
                React.createElement( 'span', { style: theStyle }, this.state.texto )
            ),
            React.createElement(
                'button',
                { onClick: function onClick() { return self.changeTextAndFont(); } },
                'JS magic'
            )
        );
    }

}

ReactDOM.render(
    <FirstExample />,
    document.getElementById('reactPage')
);
