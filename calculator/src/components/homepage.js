import React, {Component} from 'react';
import * as API from '../api/api';
let style1={width: '50%', padding: '10px'};
let style2={width: '50%', padding: '10px', backgroundColor:"#eee"};

class HomePage extends Component {

    state = {

            input1:'',
            input2:'',
            operation:'',
            answer:''


    };




    handleSubmit = (event) => {
        API.doLogin(this.state)
            .then((response) => {

                    this.setState({

                            input1:this.state.input1,
                            input2:this.state.input2,
                            operation:this.state.operation,
                            answer:response.answer

                    });
                    document.getElementById('myPara').innerHTML=response.answer;

            });
    };



    render() {
        return (

            <div className="container-fluid">
                <div className="row">
                    <div className="column" style={style1} >
                        <h1>Calci Input</h1>
                        <div className="well">
                            <form>
                                <div className="form-group">
                                    <label >Input 1:</label>
                                    <input type="text" className="form-control" value={this.state.input1}
                                           onChange={(event) => {
                                               this.setState({

                                                       input1:event.target.value

                                               });
                                           }}/>
                                </div>
                                <div className="form-group">
                                    <label >Input 2:</label>
                                    <input type="text" className="form-control" value={this.state.input2}
                                           onChange={(event) => {
                                               this.setState({

                                                       input2:event.target.value

                                               });
                                           }}/>
                                </div>
                                <div className="form-group">
                                    <label >Operation:</label>
                                    <select id = "dropdown" onChange={(event) => {
                                        this.setState({

                                                operation:event.target.value

                                        })}}>
                                        <option value="N/A">N/A</option>
                                        <option value="+">+</option>
                                        <option value="-">-</option>
                                        <option value="*">*</option>
                                        <option value="/">/</option>
                                    </select>
                                </div>
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={(event) => this.handleSubmit(event)}>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>


                    <div className="column" style={style2}>
                        <h1>Screen here</h1>
                        <div className="well">
                            <p name="myPara" id="myPara"></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;