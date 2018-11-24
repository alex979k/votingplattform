import React, { Component } from 'react';
import VotingBar from './VotingBar'

class Voting4 extends Component {


  render() {
    return (
      <div id="Voting4">
      <VotingBar viewIndex={this.props.viewIndex} />
      <div class="loader-text-bold">
        Thank you for voting!
        <br/>
        You're vote has been received.
        <br/><br/>
        You can see the referendum results from <a href="#" class="text-red-link" onClick={() => this.props.onClick(5)}><span class="text-red" > 12.11.2018 at 15:00.</span></a>
      </div>
      <div class="voting-final-confirm-buttons">
        <button type="button" class="btn btn-danger" onClick={() => this.props.onClick(-1)}>Log out</button>
        <br />
        <a href="#" class="link" onClick={() => this.props.onClick(-1)}>Go to home page</a>
      </div>
      </div>
    );
  }
}

export default Voting4;
