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
      default_data: null,
      recycleTypes: [
        {'id':'oil', 'title': 'oil'},
        {'id':'oil_filter', 'title': 'oil filter'},
        {'id':'fluids', 'title': 'fluids'},
        {'id':'tires', 'title': 'tires'},
        {'id':'batteries', 'title': 'batteries'},
        {'id':'newspapers', 'title': 'newspapers'},
        {'id':'scrap_metal', 'title': 'scrap metal'},
        {'id':'aluminum', 'title': 'aluminum'}],
      selectedType: null,
    };
  }

  getRecycleTypes(){
    axios.get('https://data.austintexas.gov/resource/qzi7-nx8g.json').then((res) => {
      this.setState({
        data: res.data,
        default_data: res.data
      });
    }).catch(error => {
      console.error("Error getting response from API: ", error.response);
    });
  }

  componentWillMount(){
    this.getRecycleTypes();
  }

  handleTypeChange(e) {
    // TODO: Future Improvement - update to use checkbox to search for multiple types at once
    let new_data;
    new_data = this.state.default_data.slice();
    new_data = new_data.filter(data_item => data_item[e] === 'Yes');
    // TODO: State not updating for some reason
    this.setState({
      data: new_data
    }, () => {
      // TODO do I want to do anything after updating?
    });
  }

  render() {
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
            <select id="typeSelect" onChange={e => this.handleTypeChange(e.target.value)} value={this.state.value}>
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