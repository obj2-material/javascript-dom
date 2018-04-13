const React = require('react')
const ReactDOM = require('react-dom')

class ZerothExample extends React.Component { 
    render() {
        return (
            <h1>Esto lo puso React</h1>
        )
    }
}

ReactDOM.render(
    <ZerothExample />,
    document.getElementById('reactPage')
);
