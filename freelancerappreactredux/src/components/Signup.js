import React, {Component} from 'react';
import { Route, withRouter } from 'react-router';
import * as API from '../Api/api';
import Homepage from "./Homepage";

let style1={width: '50%', padding: '10px'};
let style2={width: '50%', padding: '10px', backgroundColor:"#eee"};

class Login extends Component {


    state = {

        name:'',
        password:'',
        confpassword:'',
        username:'',
        answer:''

    };


    login = () => {
        this.props.history.push('/');
    }


    handleSubmit = (event) => {
        if(this.state.password===this.state.confpassword) {
            API.signup(this.state)
                .then((response) => {

                    this.setState({

                        name: '',
                        password: '',
                        confpassword: '',
                        username: '',
                        answer: response.answer

                    });
                    document.getElementById('myPara').innerHTML = response.answer;

                    if (response.answer === 'Your Signup is Successfull') {
                        document.getElementById('myPara').innerHTML = response.answer+' .You will be redirected to Login Page';
                    }

                    setTimeout(() => {
                        if (response.answer === 'Your Signup is Successfull') {
                            this.props.history.push('/');
                        }
                    }, 3000);


                });
        }
        else
        {
            document.getElementById('myPara').innerHTML = "Password doesn't match Confirm Password";
        }
    };



    render() {
        return (

            <div className="container-fluid">
                <Route exact path="/Signup" render={() => (
                <div className="row">
                    <div className="column" style={style1} >
                        <h1>Signup Page</h1>
                        <div className="well">
                            <form>
                                <div className="form-group">
                                    <label >Name:</label>
                                    <input type="text" className="form-control" value={this.state.name}
                                           onChange={(event) => {
                                               this.setState({

                                                   name:event.target.value

                                               });
                                           }}/>
                                </div>

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

                                <div className="form-group">
                                    <label > Confirm Password:</label>
                                    <input type="password" className="form-control" value={this.state.confpassword}
                                           onChange={(event) => {
                                               this.setState({

                                                   confpassword:event.target.value

                                               });
                                           }}/>
                                </div>
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={(event) => this.handleSubmit(event)}>
                                    Submit
                                </button>

                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={(event) => this.login(event)}>
                                    Login
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
                <Route exact path="/" render={() => (
                    <div>
                        <Homepage />
                    </div>
                )}/>

            </div>
        );
    }
}

export default withRouter(Login);