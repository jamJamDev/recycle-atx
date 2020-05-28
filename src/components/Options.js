import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import CheckboxGroup from 'react-checkbox-group';

class Options extends Component {
    handleOptionsChange(e){
        let selected_value = e.target.value

        // Add or remove value to or from the selectedTypes array
        if(e.target.checked){
            this.props.selectedTypes.push(selected_value);

            let new_data = this.props.defaultData.filter(data_item => data_item[selected_value] == 'Yes')
            this.props.data.push(new_data)
            this.props.handleTypeChange(new_data);
        } else {
            // TODO update removal of unchecked option & this.props.handleTypeChange(new_data);
            for (var i = 0; i < this.props.selectedTypes.length; i++){
                if (this.props.selectedTypes[i] == selected_value){
                    this.props.selectedTypes.splice(i,i);
                }
            }
        }

//    let new_data;
//    if(e.target.value === 'all') {
//      new_data = this.props.default_data
//    } else {
//      new_data = this.props.default_data;
//      new_data = new_data.filter(data_item => data_item[e] === 'Yes');
//    }
//    // TODO: State not updating for some reason
//    this.setState({
//      data: new_data
//    }, () => {
//      // TODO do I want to do anything after updating?
//      // TODO - add a spinner, hide spinner here :thumbsup:
//    });


    }

    render() {
        return (
            <ul className="filter-options">
                <CheckboxGroup name="options-list" value={this.props.options} onChange={this.handleOptionsChange}>
                  {(Checkbox) => (
                    <>
                        {this.props.options.map((option, index) => (
                            <li>
                                <label>
                                  <input onChange={e => this.handleOptionsChange(e)} type="checkbox"
                                        name={option.id} value={option.id} />{option.title}
                                </label>
                            </li>
                        ))}
                    </>
                  )}
                </CheckboxGroup>
            </ul>
        )
    }
}

export default Options;