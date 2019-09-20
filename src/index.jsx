import React from 'react';
import Console from './console.jsx'
import { render } from 'react-dom';
class App extends React.Component {
    render() {
        return <p> Hello React!</p>;
    }
}
Console()

render(<App />, document.getElementById('app'));