// TODO: CLEAN-UP
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../App.css';
import { faRecycle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

class AppHeader extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="app-header">
        <div className="row">
          <div className="col-sm-12">
            <h2>Recycle ATX</h2>
          </div>
          <div className="col-sm-12">
            <FontAwesomeIcon icon={faRecycle} class="recycle" />
          </div>
        </div>
      </div>    
    ) 
  }
}

export default AppHeader;