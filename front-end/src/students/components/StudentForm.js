import React, { Component } from 'react';
import "./Student.css";



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
          if ( this.props.StudentLog){
            this.props.StudentLog(studentName);}
            else if (this.props.addnewStudent){
            this.props.addnewStudent(studentName);}
        };


    render() {
        return (
            <div>
                <form className="contact" onSubmit={this.OnsubmitHandler}>
                    <div className="text">
                    <label > Student Name: </label>
                    <input placeholder = " Your Name " 
                           value = {this.state.name} 
                           onChange = {this.OnchangeHandler} 
                    />
                    <br/>
                    <button type="submit">submit</button>
                    </div>
                </form>           
            </div>
        )
    }
}