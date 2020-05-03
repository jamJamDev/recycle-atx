import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { faRecycle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      recycleTypes: [
        {'id':'oil', 'title': 'oil'},
        {'id':'oil_filter', 'title': 'oil filter'},
        {'id':'fluids', 'title': 'fluids'},
        {'id':'tires', 'title': 'tires'},
        {'id':'batteries', 'title': 'batteries'},
        {'id':'newspapers', 'title': 'newspapers'},
        {'id':'scrap_metal', 'title': 'scrap metal'},
        {'id':'aluminum', 'title': 'aluminum'}],
      filteredGradeData: '',
    };
  }

  getRecycleTypes(){
    axios.get('https://data.austintexas.gov/resource/qzi7-nx8g.json').then((res) => {
      console.log(res);
      this.setState({
        data: res.data
      });
      console.log("STATE:", this.state);
    }).catch(error => {
      console.log(error.response);
    });
  }

  componentWillMount(){
    this.getRecycleTypes();
  }

  handleTypeChange(e){
    axios.get('https://data.austintexas.gov/resource/qzi7-nx8g.json').then((res) => {
      console.log("RESPONSE", res);
      this.setState({
        data: res.data
      });
    //  TODO: loop through ids - if hasAttribute 'blah' & === 'Yes' return to results
    }).catch(error => {
      console.log(error.response);
    });
  }

  render() {
    //const listItems = [<li>test</li>, <li>test</li>, <li>test</li>];
    let listItems;
    if(this.state.data){
      listItems = this.state.data.map((item) =>
            <li><b>{item.business_name}:</b> {item.address.human_address}</li>
        );
    } else {
      listItems = null
    }
    return <div className="App">
      <div className="App-header">
        <div class="row">
          <div class="col-sm-12">
            <h2>Recycle ATX</h2>
          </div>
          <div class="col-sm-12">
            <FontAwesomeIcon icon={faRecycle} class="recycle" />
          </div>
        </div>
        <div class="row">
          <div class="col-sml-12">
            <label for="typeSelect">Select what you need to recycle:</label>
            <select id="typeSelect" onChange={this.handleTypeChange} value={this.state.value}>
              <option value='all'>All</option>
              {this.state.recycleTypes.map(function (type, i) {
                    return <option
                        key={type.id}
                        value={type.id}>
                      {type.title}
                    </option>
                  }
              )};
            </select>
          </div>
        </div>
        <ul>
          {listItems}
        </ul>
      </div>
    </div>;
  }
}

export default App;