import React, { Component } from "react";
import ContributorForm from './contributors/components/ContributorForm';
import {createNewContributor} from './contributors/api'
import StudentForm from './students/components/StudentForm';
import { createNewStudent } from './students/api';


export default class Register extends Component {

    // Add new student
    addnewStudent = student => {
    createNewStudent(student)
      .then(res => {
        console.log(res.data.student);
      })
      .catch(error => {
        console.log(error);
      });
  };

    // Add new contributor
    addNewContributor = contributor => {
        createNewContributor(contributor)
          .then(res => {
            console.log(res.data.contributor);
          })
          .catch(error => {
            console.log(error);
          });
      };


    render() {
      return (
        <div>
            <h2> HELLO Register with us :) </h2>
            <br/>
            <h4>If you want to get a book or reference in any field?</h4>
            <StudentForm addnewStudent={this.addnewStudent}/>
            <h4>or you want contribute with us to share book or reference?</h4>
            <ContributorForm addNewContributor={this.addNewContributor}/>
        </div>
      );
    }
  }