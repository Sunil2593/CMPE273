import React, {Component} from 'react';
import { Route, withRouter } from 'react-router';
import * as API from '../Api/api';
import Signup from "./Signup";
import Home from "./Home";


let style1={width: '50%', padding: '10px'};
let style2={width: '50%', padding: '10px', backgroundColor:"#eee"};

class HomePage extends Component {

    state = {

        password:'',
        username:'',
        answer:''

    };
    signup = () => {
        this.props.history.push('/Signup');
    }

    handleSubmit = (event) => {
        API.login(this.state)
            .then((response) => {

                this.setState({

                    password:this.state.password,
                    username:this.state.username,
                    answer:response.answer

                });
                document.getElementById('myPara').innerHTML=response.answer;
                if(response.answer==='Your Login is Sucessfull')
                {
                    this.props.history.push('/Home');
                }

            });

    };



    render() {
        return (

            <div className="container-fluid">

                <Route exact path="/" render={() => (
                <div className="row">
                    <div className="column" style={style1} >
                        <h1>Login Page</h1>
                        <div className="well">
                            <form>

                                <div className="form-group">
                                    <label >Username:</label>
                                    <input type="text" className="form-control" value={this.state.username}
                                           onChange={(event) => {
                                               this.setState({

                                                   username:event.target.value

                                               });
                                           }}/>
                                </div>
                                <div className="form-group">
                                    <label >Password:</label>
                                    <input type="password" className="form-control" value={this.state.password}
                                           onChange={(event) => {
                                               this.setState({

                                                   password:event.target.value

                                               });
                                           }}/>
                                </div>

                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={(event) => this.handleSubmit(event)}>
                                    Login
                                </button>

                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={this.signup}>

                                    Signup
                                </button>
                            </form>
                        </div>
                    </div>


                    <div className="column" style={style2}>
                        <h1>Result</h1>
                        <div className="well">
                            <p name="myPara" id="myPara"></p>
                        </div>
                    </div>
                </div>
                )}/>

                <Route exact path="/Signup" render={() => (
                    <div>
                        <Signup />
                    </div>
                )}/>

                <Route path="/Home" render={() => (
                    <div>
                        <Home message={this.state.username}/>
                    </div>
                )}/>

            </div>
        );
    }
}

export default withRouter(HomePage);