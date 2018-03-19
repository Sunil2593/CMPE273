import React, {Component} from 'react';
import './App.css';


import {BrowserRouter} from 'react-router-dom';
import HomePage from "./components/homepage.js";


class App extends Component {
    render() {
        return (
            <div className="App">
                {/*<HomePage/>*/}
                {/*<NewHomePage/>*/}
                <BrowserRouter>
                    <HomePage/>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
