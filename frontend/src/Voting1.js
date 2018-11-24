import React, { Component } from 'react';
import VotingBar from './VotingBar'

class Voting1 extends Component {

  render() {
    return (
      <div id="Voting1">
      <VotingBar viewIndex={this.props.viewIndex} />
        <div class="voting-personal-info textc">
        <h4>Personal Information</h4>
          <ul>
            <li>Name:  <b>John Doe</b></li>
            <li>Surname: <b>Doe</b> </li>
            <li>ID number: <b>123456</b> </li>
            <li>Date of birth: <b>11.12.1986 </b></li>
            <li>City: <b>London</b> </li>
            <li>State: <b>London</b> </li>
          </ul>
          <div class="voting-personal-buttons">
            <button type="button" class="btn btn-light">Cancel</button>
            <button type="button" class="btn btn-info" onClick={() => this.props.onClick(this.props.viewIndex)}>Confirm and Proceed</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Voting1;
