import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from 'react-datepicker';
import {loginUser, signupUser, postProjects} from "../actions";
import {bindActionCreators} from "redux";
import {FormGroup,Radio,ControlLabel,FormControl,HelpBlock} from "react-bootstrap";
import {connect} from "react-redux";
import RangeSlider from 'react-range-slider-bem';
import 'react-datepicker/dist/react-datepicker.css';



let style1={width: '50%', padding: '10px'};


class PostProject extends Component {

    state = {
        name:'',
        description:'',
        skillsRequired:'',
        budgetRange:'',
        files:'',
        status:'',
        estimateProjectCompletionDate:'',
        owner:localStorage.getItem('user_id')
    };

    handleChange(date) {
        this.setState({
            estimateProjectCompletionDate: date
        });
    }

    postProject = (e) => {
        e.preventDefault();
        this.props.postProjects(this.state,this.state.files);
        this.setState({
            name:'',
            description:'',
            skillsRequired:'',
            budgetRange:'',
            files:'',
            status:'',
            estimateProjectCompletionDate:''
        });
        document.getElementById("result").innerText="Project Posted"

    }
    render() {
        function FieldGroup({ id, label, help, ...props }) {
            return (
                <FormGroup controlId={id}>
                    <ControlLabel>{label}</ControlLabel>
                    <FormControl {...props} />
                    {help && <HelpBlock>{help}</HelpBlock>}
                </FormGroup>
            );
        }
        return (

            <div className="container-fluid">

                <div className="row">
                    <div className="column" style={style1} >
                        <h1>Post Project</h1>
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
                                    <label >Description:</label>
                                    <input type="text" className="form-control" value={this.state.description}
                                           onChange={(event) => {
                                               this.setState({
                                                   description:event.target.value
                                               });
                                           }}/>
                                </div>

                                <div className="form-group">
                                    <label >Skills Required:</label>
                                    <input type="text" className="form-control" value={this.state.skillsRequired}
                                           onChange={(event) => {
                                               this.setState({
                                                   skillsRequired:event.target.value
                                               });
                                           }}/>
                                </div>

                                <div className="form-group">
                                    <label >Budget Range:</label>
                                    <input type="number" className="form-control" value={this.state.budgetRange}
                                           onChange={(event) => {
                                               this.setState({
                                                   budgetRange:event.target.value
                                               });
                                           }}/>
                                </div>

                                <RangeSlider value={[20]} withBars />

                                <div className="form-group">
                                    <label >Status:</label>


                                <FormGroup>
                                    <Radio name="radioGroup" inline value={this.state.status}
                                           onChange={(event) => {
                                               this.setState({
                                                   status:"Hired"
                                               });
                                           }}>
                                        Hired
                                    </Radio>{' '}
                                    <Radio name="radioGroup" inline value={this.state.status}
                                           onChange={(event) => {
                                               this.setState({
                                                   status:"Not Hired"
                                               });
                                           }}>
                                        Not Hired
                                    </Radio>{' '}
                                </FormGroup>
                        </div>



                                <div className="form-group">
                                    <label >Estimate Project Completion Date:</label>

                                    <DatePicker
                                        selected={this.state.estimateProjectCompletionDate}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label >Upload File:</label>
                                    <input type="file"  value={this.state.files}
                                           onChange={(event) => {this.setState({
                                               files:event.target.files[0]
                                           });
                                           }}/>
                                </div>

                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={(event) => this.postProject(event)}>
                                    Post
                                </button>
                            </form>
                            <br/>
                            <p id="result">

                            </p>
                        </div>
                    </div>
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
    return bindActionCreators({loginUser: loginUser,signupUser: signupUser,postProjects:postProjects}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(PostProject);