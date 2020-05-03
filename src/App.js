// TODO: CLEAN-UP
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
      // TODO: ADD ICONS :D display on results if it has it :)
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
      let new_data = res.data.map( item => {
        item.human_address = JSON.parse(item.address.human_address);
        return item;
      });
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
      // TODO - add a spinner, hide spinner here :thumbsup:
    });
  }

  render() {
    let listItems;
    if(this.state.data){
      listItems = this.state.data.map((item) =>
            <li>
                <h3>{item.business_name}</h3>
                <ul className="info-list">
                    <li className="address">{item.human_address.address}</li>
                    <li className="city-zip">{item.human_address.city}, {item.human_address.state} - {item.human_address.zip}</li>
                </ul>
            </li>
        );
    } else {
      listItems = null
    }
    return <div className="App">
      <div className="App-header">
        <div className="row">
          <div className="col-sm-12">
            <h2>Recycle ATX</h2>
          </div>
          <div className="col-sm-12">
            <FontAwesomeIcon icon={faRecycle} class="recycle" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <label for="typeSelect">Select what you need to recycle:</label>
          </div>   
          <div className="col-sml-12 select-wrapper">
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
        <ul className="result-list">
          {listItems}
        </ul>
      </div>
    </div>;
  }
}

export default App;