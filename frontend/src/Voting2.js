import React, { Component } from 'react';
import VotingBar from './VotingBar'

class Voting2 extends Component {

  render() {
    return (
      <div id="Voting2">
      <VotingBar viewIndex={this.props.viewIndex} />
        <div class="voting-personal-info textc">
        <h4>Should the United Kingdom stay in the EU?</h4>
          <div class="voting-personal-buttons">
          <div class="cd-switch">
            <div class="switch">
              <input type="radio" name="choice" id="yes" />
              <label for="yes">Yes</label>
              <input type="radio" name="choice" id="no" />
              <label for="no">No</label>
              <span class="switchFilter"></span>
            </div>
            </div>
          </div>
        </div>
        <div class="voting-final-confirm-buttons">
          <button type="button" class="btn btn-info" onClick={() => {this.props.vote(1)}}>Vote</button>
          <br />
          <a href="#"  class="link">Cancel</a>
        </div>
      </div>
    );
  }
}

export default Voting2;
