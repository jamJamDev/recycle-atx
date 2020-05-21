import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import CheckboxGroup from 'react-checkbox-group'

class Options extends Component {
    constructor(props) {
        super(props);
    }

    handleOptionsChange(e){
        console.log(e);
    }

    render() {
        return (
            <form>
                <label>
                    <input onChange={e => this.handleOptionsChange(e)} type="checkbox"
                        name="options" value="tires" />Tires
                </label>
                <label>
                  <input onChange={e => this.handleOptionsChange(e)} type="checkbox"
                        name="options" value="oil_filter" />Oil Filter
                </label>
                <label>
                    <input onChange={e => this.handleOptionsChange(e)} type="checkbox"
                        name="options" value="fluids" />Fluids
                </label>
            </form>
        )
    }
}

export default Options;