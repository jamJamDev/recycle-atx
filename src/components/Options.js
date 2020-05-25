import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import CheckboxGroup from 'react-checkbox-group';

class Options extends Component {
    handleOptionsChange(e){
        // Add or remove value to or from the selectedTypes array
        if(e.target.checked){
            this.props.selectedTypes.push(e.target.value)
        } else {
            for (var i = 0; i < this.props.selectedTypes.length; i++){
                if (this.props.selectedTypes[i] == e.target.value){
                    this.props.selectedTypes.splice(i,i);
                }
            }
        }
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