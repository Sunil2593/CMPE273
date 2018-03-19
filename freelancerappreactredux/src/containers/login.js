import React, {Component} from 'react';
import {Container, Row, Col, CardGroup, Card, CardBlock, Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import {loginUser, signupUser,checklogin} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import history from "./history";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Login extends Component {

    state = {
        userData:{
            username : '',
            password : '',
            message:'',
            status:'',
            loggedIn : false
        }
    };

    componentWillMount() {
        /*this.props.checklogin();*/
        if(this.props.session.userData.message==="loggedIn")
        {
            history.push('/home');
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.session.userData.message==="loggedIn")
        {
            history.push('/home');
        }
    }
    signup = () => {
        this.props.history.push('/Signup');
    }

    login = (e) => {
        e.preventDefault();
        this.props.loginUser();
    }
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
            <h1>Login</h1>
        <p className="text-muted">Sign In to your account</p>
        <InputGroup className="mb-3">
            <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
        <Input type="text" placeholder="Username"value={this.state.userData.username}
               onChange={(event) => {
                   this.setState({
                       userData:{
                           ...this.state.userData,
                           username: event.target.value
                       }
                   });
                   cookies.set('username', event.target.value, { path: '/' })
               }}/>
            </InputGroup>
        <InputGroup className="mb-4">
            <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
            <Input type="password" placeholder="Password" value={this.state.userData.password}
                   onChange={(event) => {
                       this.setState({
                           userData:{
                               ...this.state.userData,
                               password: event.target.value
                           }
                       });
                       cookies.set('password', event.target.value, { path: '/' })
                   }}/>
        </InputGroup>
        <Row>
        <Col xs="6">
            <Button color="primary" className="px-4" onClick={(event) => this.login(event)}>Login</Button>
    </Col>
        <Col xs="6" className="text-right">
            <Button color="link" className="px-0" onClick={this.signup.bind(this)}>Signup</Button>
            </Col>
        </Row>


    </CardBlock>
    </Card>
    </CardGroup>
    </Col>
    </Row>
    </Container>

    </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        session:state.loginsigup
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({loginUser: loginUser,signupUser: signupUser,checklogin:checklogin}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);