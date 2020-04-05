import React, { Component } from "react";
import ContributorForm from './contributors/components/ContributorForm';
import {createNewContributor} from './contributors/api'
import StudentForm from './students/components/StudentForm';
import { createNewStudent } from './students/api';


export default class Register extends Component {

      // Add new student
  addnewStudent = name => {
    createNewStudent(name)
      .then(res => {
        console.log(res.data.student);
      })
      .catch(error => {
        console.log(error);
      });
  };

    // Add new contributor
    addNewContributor = name => {
        createNewContributor(name)
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
            <h4> HELLO <br/> Register with us :) </h4>
            <StudentForm addnewStudent={this.addnewStudent}/>
            <ContributorForm addNewContributor={this.addNewContributor}/>
        </div>
      );
    }
  }