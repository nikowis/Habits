import React, {Component} from 'react';
import './App.css';

class App extends Component {

    state = {
        data: []
    };

    componentDidMount() {
    }

    
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <link rel="stylesheet"
                          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
                          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
                          crossOrigin="anonymous"/>
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
                    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
                          Hello world!
                </header>
            </div>
        );
    }
}

export default App;
