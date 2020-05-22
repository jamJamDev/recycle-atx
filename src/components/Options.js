import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import CheckboxGroup from 'react-checkbox-group';
import optionsData from './../optionsData';

class Options extends Component {
    handleOptionsChange(e){
        console.log(e);
        console.log(e.currentTarget);
        //TODO need to handle updating checkbox group's values
        // https://medium.com/@wlodarczyk_j/handling-multiple-checkboxes-in-react-js-337863fd284e
    }

    render() {
        return (
            <ul className="filter-options">
                <CheckboxGroup name="options-list" value={optionsData} onChange={this.handleOptionsChange}>
                  {(Checkbox) => (
                    <>
                        {optionsData.map((option, index) => (
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