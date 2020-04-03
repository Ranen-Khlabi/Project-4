import React, { Component } from 'react';



export default class StudentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: ""
        };
    }

    OnchangeHandler = e => {
        this.setState({
          name: e.target.value
        });
      };

    // Get the name of the student from the form state
    OnsubmitHandler = e => {
        e.preventDefault();
        
        // The inputed name in a variable
        const studentName = this.state.name

        this.setState({
            name: ""
          })
          this.props.StudentLog(studentName);
        };


    render() {
        return (
            <div>
                <form onSubmit={this.OnsubmitHandler}>

                    <label > Student Name: </label>
                    <input placeholder = "Write your name " 
                           value = {this.state.name} 
                           onChange = {this.OnchangeHandler} 
                    />
                    <button type="submit">submit</button>

                </form>           
            </div>
        )
    }
}