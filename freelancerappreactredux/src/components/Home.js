import React, {Component} from 'react';
import { withRouter } from 'react-router';
import * as API from "../Api/api";

class Home extends Component {

    state = {

            name:this.props.message,
            user_id:''

    };

    componentDidMount () {
        API.login(this.state)
            .then((response) => {

                this.setState({



                });
                if(response.answer==='Your Login is Sucessfull')
                {
                    this.props.history.push('/Home');
                }
            });
    };

render() {
        return (
            <div className="row justify-content-md-center">

                <div className="col-md-3">
                        <div className="alert alert-warning" >
                            Hello {this.props.message}
                        </div>
                        <div className="alert alert-warning">

                        </div>

                </div>
            </div>

        );
    }
}

export default withRouter(Home);