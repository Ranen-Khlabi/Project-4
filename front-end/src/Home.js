import React, { Component } from "react";
import "./App.css";
import { IoMdMail, IoLogoSlack, IoLogoGithub } from "react-icons/io";


export default class Home extends Component {
    render() {
      return (
        <div className="home">
          <h4>Hello!</h4>
          <h5>It is a website that helps <strong>students</strong> or anyone who wants to search
              <br/>for a reference or book that helps them through this site,<br/>
              and also anyone who wants to <strong>contribute</strong> to publishing a reference or book.</h5>
              <br/>
              <h4>Contact us!</h4>
              <a href="#"><IoMdMail/></a>
              <a href=""><IoLogoSlack/></a>
              <a href=""><IoLogoGithub/></a>
        </div>
      );
    }
  }