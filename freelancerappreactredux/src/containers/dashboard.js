import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {displayProjectDetails,getListOfAllBids} from "../actions";
import {ListGroup, ListGroupItem} from 'reactstrap'
import {Tabs, Tab} from 'react-bootstrap-tabs'
import history from "./history";


class Dashboard extends Component {
    renderDashboardBidsList() {
        if (this.props.dashboardBids != null && this.props.dashboardBids.length>=1 && this.props.dashboardBids!== undefined) {
            if (this.props.dashboardBids instanceof Array) {
                return this.props.dashboardBids.map((project) => {
                    return (
                        <ListGroupItem action
                            id={project.bid_id}
                            onClick={(event) => this.handleProjectClick(event, project.project_id)}
                            key={project.bid_id}>
                            Name: {project.name}
                            <br/>
                            Description: {project.description}
                            <br/>
                            Bid Value: {project.bid}
                        </ListGroupItem>

                    );
                });
            }
        }
    }

    handleProjectClick = (e,projectId) => {
        e.preventDefault();
        var projectDetails={projectId:projectId,projectName:"me"};
        this.props.displayProjectDetails(projectDetails);
        this.props.getListOfAllBids(projectDetails);
        localStorage.setItem('projectDisable',true);
        history.push('/details');

    }

    renderDashboardProjectsEmployerList() {
        if (this.props.dashboardProjects != null && this.props.dashboardProjects.length>=1 && this.props.dashboardProjects!== undefined) {
            if (this.props.dashboardProjects instanceof Array) {
                return this.props.dashboardProjects.map((project) => {
                    return (
                        <ListGroupItem action
                            id={project.project_id}
                            onClick={(event) => this.handleProjectClick(event, project.project_id)}
                            key={project.project_id}>
                            Name: {project.name}
                            <br/>
                            Description: {project.description}
                        </ListGroupItem>

                    );
                });
            }
        }
    }



    renderItem() {
        if (this.props.dashboardProjects != null && this.props.dashboardBids) {

            return (
            <div className="container-fluid">
                <Tabs
                    defaultActiveKey={1}
                    id="controlled-tab-example"
                >
                    <Tab eventKey={1} label="Projects Posted as Employer">
                        <ListGroup>
                            {this.renderDashboardProjectsEmployerList()}
                        </ListGroup>
                    </Tab>
                    <Tab eventKey={2} label="List of all the Projects you have bid on">
                        <ListGroup>
                            {this.renderDashboardBidsList()}
                        </ListGroup>
                    </Tab>
                </Tabs>
            </div>
            );

        }
    }

    render() {

        return (
            <div className="row justify-content-md-center">
                        {this.renderItem()}
            </div>


        );

    }
}

function mapStateToProps(state) {
    return {
        dashboardProjects:state.dashboardProjects,
        dashboardBids:state.dashboardBids
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({displayProjectDetails: displayProjectDetails,getListOfAllBids:getListOfAllBids}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);