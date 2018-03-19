import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {displayProjectDetails, displayAllProjects,logoutUser,getListOfAllBids,getListOfAllProjectsAsEmployer,getListOfAllProjectsBidOn,checklogin} from "../actions";
import { ButtonToolbar, Button} from 'react-bootstrap'
import { Card, CardImg, CardBody, CardTitle,Row, Col } from 'reactstrap';
import history from "./history";
import image from "./myProfile.jpg";

class Home extends Component {
    state={
        projectId:'',
        status:''
};

    componentDidMount() {

        if(this.props.session.userData.message==="loggedOut")
        {
            history.push('/login');
        }
        this.props.displayAllProjects({user_id:localStorage.getItem('user_id'),name:'aditya'});

        if(this.state.status==="loggedOut")
        {
            history.push('/login');
        }

    }

    componentWillUpdate(nextProps, nextState){

        if(nextState.status==="loggedOut")
        {
            history.push('/login');
        }

    }

    componentWillReceiveProps(nextProps){

        this.setState({status:nextProps.session.userData.message});

        if(nextProps.session.userData.message==="loggedOut")
        {
            history.push('/login');
        }

    }

    componentWillMount() {
        /*this.props.checklogin();*/
    }


    handleProjectClick = (e) => {
        e.preventDefault();
        var projectId=e.target.id;
        var projectDetails={projectId:projectId,projectName:"me"};
        this.setState({projectId:projectId});
        localStorage.setItem("projectId",projectId);
        this.props.displayProjectDetails(projectDetails);
        this.props.getListOfAllBids(projectDetails);
        localStorage.setItem('projectDisable',false);
        history.push('/details');

    }

    logout = (e) => {
        e.preventDefault();
        this.props.logoutUser();
    }

    getDashboard = (e) => {
        e.preventDefault();
        var userDetails={user_id:localStorage.getItem('user_id')};
        this.props.getListOfAllProjectsAsEmployer(userDetails);
        this.props.getListOfAllProjectsBidOn(userDetails);
        history.push('/dashboard');
    }

    postProject = (e) => {
        e.preventDefault();
        history.push('/postproject');
    }

    getProfile = (e) => {
        e.preventDefault();
        history.push('/profile');
    }


    renderList() {
        if (this.props.projects !== "No Result") {

            return this.props.projects.map((project) => {
                return (
                    <li className="list-group-item list-group-item-info"
                        id={project.project_id}
                        key={project.project_id}
                        onClick={(event) => this.handleProjectClick(event)}>
                        Name: {project.name}
                        <br/>
                        Description: {project.description}
                        <br/>
                        <br/>
                    </li>

                );
            });
        }
    }

    render() {

            return (
                <div>

                    <Row>
                        <Col sm="3">
                            <Card body>
                                <CardTitle>Welcome {this.props.session.userData.username}</CardTitle>
                                <CardImg top width="100%" src={image} alt="Card image cap" />
                            </Card>
                        </Col>
                        <Col sm="9">
                            <Card body>
                                <CardBody>
                                    <ButtonToolbar>
                                        <Button bsStyle="link" onClick={(event) => this.getProfile(event)}>Profile</Button>
                                        <Button bsStyle="link" onClick={(event) => this.postProject(event)}>Post Project</Button>
                                        <Button bsStyle="link" onClick={(event) => this.getDashboard(event)}>Dashboard</Button>
                                        <Button bsStyle="link" onClick={(event) => this.logout(event)}>Logout</Button>
                                    </ButtonToolbar>


                                    <ul className="list-group text-center">
                                        {this.renderList()}
                                    </ul>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

            </div>

            );

    }
}

function mapStateToProps(state) {
    return {
        projects:state.projects,
        session:state.loginsigup
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({displayProjectDetails: displayProjectDetails,displayAllProjects:displayAllProjects,logoutUser:logoutUser,getListOfAllBids:getListOfAllBids,getListOfAllProjectsAsEmployer:getListOfAllProjectsAsEmployer,getListOfAllProjectsBidOn:getListOfAllProjectsBidOn,checklogin:checklogin}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Home);