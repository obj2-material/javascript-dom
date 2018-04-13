const React = require('react')
const ReactDOM = require('react-dom')

class FirstExample extends React.Component { 
    constructor(props) { 
        super(props); 
        this.state = { texto: "Miren lo que va a pasar acá", tamanioFuente: "medium"}
    }

    render() {
        const theStyle = { fontSize: this.state.tamanioFuente }
        return (
            <div>
                <p><span style={ theStyle }>
                    { this.state.texto }
                </span></p>
                <button onClick={() => this.changeTextAndFont()}>React magic</button>
            </div>
        )
    }

    changeTextAndFont() { 
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
                { onClick: function onClick() { return self.fillDemo(); } },
                'JS magic'
            )
        );
    }

}

ReactDOM.render(
    <FirstExample />,
    document.getElementById('reactPage')
);
