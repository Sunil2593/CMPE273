import React, {Component} from 'react';
import { withRouter } from 'react-router';
import * as API from '../Api/api';
import {Container, Row, Col, CardGroup, Card, CardBlock, Button, Input, InputGroup, InputGroupAddon} from "reactstrap";


let style2={width: '50%', padding: '10px', backgroundColor:"#eee"};

class Signup extends Component {


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
                    <div className="app flex-row align-items-center">
                        <Container>
                            <Row className="justify-content-center">
                                <Col md="8">
                                    <CardGroup className="mb-0">
                                        <Card className="p-4">
                                            <CardBlock className="card-body">
                                                <h1>Register</h1>
                                                <p className="text-muted">Register your account</p>
                                                <InputGroup className="mb-3">
                                                    <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                                                    <Input type="text" placeholder="Name"value={this.state.name}
                                                           onChange={(event) => {
                                                               this.setState({

                                                                   name:event.target.value

                                                               });
                                                           }}/>
                                                </InputGroup>
                                                <InputGroup className="mb-3">
                                                    <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                                                    <Input type="text" placeholder="Username"value={this.state.username}
                                                           onChange={(event) => {
                                                               this.setState({

                                                                   username:event.target.value

                                                               });
                                                           }}/>
                                                </InputGroup>
                                                <InputGroup className="mb-3">
                                                    <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                                                    <Input type="password" placeholder="Password"value={this.state.password}
                                                           onChange={(event) => {
                                                               this.setState({

                                                                   password:event.target.value

                                                               });
                                                           }}/>
                                                </InputGroup>
                                                <InputGroup className="mb-4">
                                                    <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                                                    <Input type="password" placeholder="Confirm Password" vvalue={this.state.confpassword}
                                                           onChange={(event) => {
                                                               this.setState({

                                                                   confpassword:event.target.value

                                                               });
                                                           }}/>
                                                </InputGroup>
                                                <Row>
                                                    <Col xs="6">
                                                        <Button color="primary" className="px-4" onClick={(event) => this.handleSubmit(event)}>Register</Button>
                                                    </Col>
                                                    <Col xs="6" className="text-right">
                                                        <Button color="link" className="px-0" onClick={(event) => this.login(event)}>Login</Button>
                                                    </Col>
                                                </Row>


                                            </CardBlock>
                                        </Card>
                                    </CardGroup>
                                </Col>
                            </Row>
                        </Container>

                        <div className="column" style={style2}>
                            <h1>Result</h1>
                            <div className="well">
                                <p name="myPara" id="myPara"></p>
                            </div>
                        </div>
                    </div>

                    </div>

        );
    }
}

export default withRouter(Signup);