import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

import options from './data';

import 'react-bootstrap-typeahead/css/Typeahead.css';
// import './styles.css';

export default class TypeaheadExample extends React.Component {

  state = {
    selected: [],
    value: ''
  };

  render() {
    return (
      <Typeahead
      {...this.state}
      id="basic-example"
      defaultInputValue='ala'
      onChange={selected => this.setState({ selected })}
      onInputChange={value => this.setState({ value })}
      options={options}
      bsSize='sm'
      allowNew
      // multiple
      placeholder="Choose a state..."
    />
    )
    // return (
    //   <div className="row">
    //     <div className="col-6">
    //       <Typeahead
    //         {...this.state}
    //         id="basic-example"
    //         defaultInputValue='ala'
    //         onChange={selected => this.setState({ selected })}
    //         onInputChange={value => this.setState({ value })}
    //         options={options}
    //         bsSize='sm'
    //         allowNew
    //         // multiple
    //         placeholder="Choose a state..."
    //       />
    //     </div>
    //     <div className="col-6">
    //       <pre className="alert alert-primary">
    //         {JSON.stringify(this.state, null, 2)}
    //       </pre>
    //     </div>
    //   </div>
    // );
  }
}

