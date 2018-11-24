import React, { Component } from 'react';

class VotingStart extends Component {

  render() {
    return (
      <div id="VotingStart">
        <div class="top-text textc">
          Welcome John, <br /> You have successfully logged in.
          </div>
          <div class="mid-card">
            <div class="card">
              <div class="card-body">
                <p>You can vote for the following referendum</p>
                <a><h4 class="display-4 referendum-text">United Kingdom European Union membership referendum 24.11.2016</h4></a>
                <br />
                <button type="button" class="btn btn-info" onClick={() => this.props.onClick(this.props.viewIndex)}>Cast a vote</button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default VotingStart;
