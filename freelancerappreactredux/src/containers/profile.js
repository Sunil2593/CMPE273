import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {displayProjectDetails,updateProfile} from "../actions";

let style1={width: '50%', padding: '10px'};

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user_id:localStorage.getItem('user_id'),
            name:this.props.profile.name,
            email:this.props.profile.email,
            skills:this.props.profile.skills,
            phone_no:this.props.profile.phone_no,
            profile_image:this.props.profile.profile_image,
            about_me:this.props.profile.about_me
        };

    }

   /* state = {
        user_id:localStorage.getItem('user_id'),
        name:'',
        email:'',
        skills:'',
        phone_no:'',
        profile_image:'',
        about_me:''
    };*/

    updateProfile = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('file', this.state.profile_image);
        data.append('filename', 'myProfile');
        data.append('name', this.state.name);
        data.append('phone_no', this.state.phone_no);
        data.append('about_me', this.state.about_me);
        data.append('email', this.state.email);
        data.append('user_id', this.state.user_id);
        data.append('skills', this.state.skills);
        this.props.updateProfile(data);
        document.getElementById("result").innerText="Profile Updated"
    }

    renderItem() {

            return (
                <div className="container-fluid">

                    <div className="row">
                        <div className="column" style={style1} >
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
                                        <label >Email:</label>
                                        <input type="text" className="form-control" value={this.state.email}
                                               onChange={(event) => {
                                                   this.setState({
                                                       description:event.target.value
                                                   });
                                               }}/>
                                    </div>

                                    <div className="form-group">
                                        <label >Skills:</label>
                                        <input type="text" className="form-control" value={this.state.skills}
                                               onChange={(event) => {
                                                   this.setState({
                                                       skills:event.target.value
                                                   });
                                               }}/>
                                    </div>

                                    <div className="form-group">
                                        <label >About Me:</label>
                                        <input type="text" className="form-control" value={this.state.about_me}
                                               onChange={(event) => {
                                                   this.setState({
                                                       about_me:event.target.value
                                                   });
                                               }}/>
                                    </div>

                                    <div className="form-group">
                                        <label >Phone No:</label>
                                        <input type="text" className="form-control" value={this.state.phone_no}
                                               onChange={(event) => {
                                                   this.setState({
                                                       phone_no:event.target.value
                                                   });
                                               }}/>
                                    </div>

                                    <div className="form-group">
                                        <label >Upload Image:</label>
                                        <input type="file" className="form-control" value={this.state.profile_image}
                                               onChange={(event) => {this.setState({
                                                   profile_image:event.target.files[0]
                                               });
                                               }}/>
                                    </div>

                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={(event) => this.updateProfile(event)}>
                                        Update Profile
                                    </button>
                                </form>

                                <br/>
                                <p id="result">
                                </p>
                            </div>
                    </div>
                    </div>
            );


    }

    render() {

        return (
            <div className="content">
                        {this.renderItem()}
            </div>
        );

    }
}

function mapStateToProps(state) {
    return {
        profile:state.loginsigup.data,
        updateProfile:state.updateProfile
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({displayProjectDetails: displayProjectDetails,updateProfile:updateProfile}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Profile);