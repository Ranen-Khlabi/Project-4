import React, { Component } from "react";
import ContributorForm from './contributors/components/ContributorForm';
import StudentForm from './students/components/StudentForm';


export default class Register extends Component {
    render() {
      return (
        <div>
          <ContributorForm addNewContributor={this.addNewContributor}/>
          <StudentForm addnewStudent={this.addnewStudent}/>
        </div>
      );
    }
  }