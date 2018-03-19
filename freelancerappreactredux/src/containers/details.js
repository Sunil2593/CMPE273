import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {displayProjectDetails,makeBid,getListOfAllBids,hireFreelancer} from "../actions";
import { Grid, Row,FormControl,Label} from 'react-bootstrap';
import {ListGroup, ListGroupItem} from 'reactstrap'
import {Tabs, Tab} from 'react-bootstrap-tabs'




class Details extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bidValue:'',
            projectId:this.props.project.project_id,
            userId:localStorage.getItem('user_id'),
            days:'',
            changed:'',
            disable:localStorage.getItem('projectDisable')
        };

    }


    componentWillReceiveProps(nextProps){

        if(nextProps)
        {
            this.setState({
                changed:'Yes'
            })
        }

    }
    hireFreelancer=(e,user)=>{
        e.preventDefault();
        user.project_id=this.state.projectId;
        this.props.hireFreelancer(user);
        document.getElementById(user.user_id).className="btn btn-success";
        document.getElementById(user.user_id).innerText="Hired";
        document.getElementById(user.user_id).disabled="true";

    }

    renderBidsList() {
        if (this.props.selectedProjectBids != null) {

            return this.props.selectedProjectBids.map((user) => {
                return (
                    <ListGroupItem action
                        id={user.bid_id}
                        key={user.bid_id}>
                        <Label>Name: </Label>{user.name}<br/>
                        <Label>Skills: </Label>{user.skills}<br/>
                        <Label>Bid: </Label>{user.bid}<br/>
                        {this.state.disable==='true' && <div>
                            <Label>Email: </Label>{user.email}<br/>
                            <Label>Phone No: </Label>{user.phone_no}<br/>
                            <Label>About Me: </Label>{user.about_me}<br/>
                            <button
                                id={user.user_id}
                                className="btn btn-primary"
                                type="button"
                                onClick={(event) => this.hireFreelancer(event,user)}>
                                <Label id={user.user_id}>Hire</Label>
                            </button>
                            </div>}
                    </ListGroupItem>

                );
            });
        }
    }

    markBid = (e) => {
        e.preventDefault();
        this.props.makeBid(this.state);
        this.props.getListOfAllBids(this.state);
    }



    renderItem() {

        if (this.props.project != null) {
                return (
                        <Grid>
                            <Row className="text-center"><h1>Projects Details</h1></Row>

                <Tabs
            defaultActiveKey={1}
            id="controlled-tab-example"
                >
                <Tab eventKey={1} label="Projects Details">
            <div>
                    Name: {this.props.project.name}<br/>
                    Description: {this.props.project.description}<br/>
                    Skill Required: {this.props.project.skills_required}<br/>
                    Budget Range: {this.props.project.budget_range}<br/>
                    Status: {this.props.project.status}<br/>
                    Estimate Project Completion Date: {this.props.project.estimate_project_completion_date.toString().slice(0,10)}<br/><br/>
                {this.state.disable==='false' && <form>
                    <FormControl
                        id="formControlsText"
                        type="number"
                        label="Bid:"
                        value={this.state.bidValue}
                        placeholder="Enter Bid Value"
                        onChange={(event) => {
                            this.setState({
                                bidValue:event.target.value,
                                projectId:this.props.project.project_id
                            });
                        }}
                    />
                    <br/>
                    <FormControl
                        id="formControlsText"
                        type="number"
                        label="No of Days To Complete:"
                        value={this.state.days}
                        placeholder="Enter Number of Days"
                        onChange={(event) => {
                            this.setState({
                                days:event.target.value
                            });
                        }}
                    />
                    <br/>
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={(event) => this.markBid(event)}>
                        Bid
                    </button>
                </form>}



            </div>
        </Tab>
            <Tab eventKey={2} label="All Bids">
                <ListGroup>
                    {this.renderBidsList()}
                </ListGroup>
            </Tab>
        </Tabs>
                        </Grid>
                );

        }
    }

    render() {

        return (
            <div className="container-fluid">
                            {this.renderItem()}
            </div>

        );

    }
}

function mapStateToProps(state) {
    return {
        project:state.selectedproject,
        selectedProjectBids:state.selectedprojectbids
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({displayProjectDetails: displayProjectDetails,makeBid:makeBid,getListOfAllBids:getListOfAllBids,hireFreelancer:hireFreelancer}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Details);