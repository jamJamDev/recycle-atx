// TODO: CLEAN-UP
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { faRecycle, faOilCan, faSprayCan, faFilter, faTint, faTruckMonster, faBatteryFull, faNewspaper, faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import AppHeader from './components/AppHeader';
import Options from './components/Options';
import BackToTop from './components/BackToTop';
import optionsData from './optionsData';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      default_data: null,
      // TODO: ADD ICONS :D display on results if it has it :)
      recycleTypes: optionsData,
      selectedTypes: [],
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

  handleTypeChange(passed_data, selected_types) {
    this.setState({
        data: passed_data,
        selectedTypes: selected_types
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
                    <ul className="icons-list">
                        {(item.oil && (item.oil == 'Yes' || item.oil == 'yes')) ? <li><FontAwesomeIcon icon={faOilCan} className="oil-can" /></li>:<div></div>}
                        {(item.oil_filter && (item.oil_filter == 'Yes' || item.oil_filter == 'yes')) ? <li><FontAwesomeIcon icon={faFilter} className="oil-filter" /></li>:<div></div>}
                        {(item.fluids && (item.fluids == 'Yes' || item.fluids == 'yes')) ? <li><FontAwesomeIcon icon={faTint} className="fluids" /></li>:<div></div>}
                        {(item.tires && (item.tires == 'Yes' || item.tires == 'yes')) ? <li><FontAwesomeIcon icon={faTruckMonster} className="tires" /></li>:<div></div>}
                        {(item.batteries && (item.batteries == 'Yes' || item.batteries == 'yes')) ? <li><FontAwesomeIcon icon={faBatteryFull} className="batteries" /></li>:<div></div>}
                        {(item.newspapers && (item.newspapers == 'Yes' || item.newspapers == 'yes')) ? <li><FontAwesomeIcon icon={faNewspaper} className="newspapers" /></li>:<div></div>}
                        {(item.scrap_metal && (item.scrap_metal == 'Yes' || item.scrap_metal == 'yes')) ? <li><FontAwesomeIcon icon={faWrench} className="scrap-metal" /></li>:<div></div>}
                        {(item.aluminum && (item.aluminum == 'Yes' || item.aluminum == 'yes')) ? <li><FontAwesomeIcon icon={faSprayCan} className="aluminum" /></li>:<div></div>}
                    </ul>
                </ul>
            </li>
        );
    } else {
      listItems = null
    }
    return <div className="App">
      <div className="App-header">
        <AppHeader />
        <div className="row">
          <div className="col-sm-12">
            <label>Select what you need to recycle:</label>
          </div>
        </div>
        <Options options={this.state.recycleTypes} selectedTypes={this.state.selectedTypes} defaultData={this.state.default_data} data={this.state.data} handleTypeChange={this.handleTypeChange.bind(this)}/>
        <ul className="result-list">
          {listItems}
        </ul>
        <BackToTop />
      </div>
    </div>;
  }
}

export default App;