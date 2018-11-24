import React, { Component } from 'react';

class WelcomeViewAlt extends Component {

  render() {
    return (
      <div id="WelcomeView">
          <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 class="display-4">Welcome to VoteXYZ Voting Platform</h1>
            <p class="lead">
              You can vote and follow the results on this platform. Your vote will be totally anonymous. Before you vote, you might check how online voting system works here.</p>
          </div>

        <div id="content-description" class="container" >
          <div class="card-deck mb-3 text-center">
            <div class="card card-custom mb-4 shadow-sm">
                <h4 class="card-title pricing-card-title">Prove your idendity with </h4 >
            </div>
            <div class="card card-custom mb-4 shadow-sm">
                <h4  class="card-title pricing-card-title">Vote anonymously thanks to </h4 >
            </div>
            <div class="card card-custom mb-4 shadow-sm">
                <h4  class="card-title pricing-card-title">Follow the referendum </h4 >
            </div>
          </div>

          <button type="button" class="btn btn-info" onClick={this.props.onClick}>Log in</button>
        </div>
        </div>
    );
  }
}

export default WelcomeViewAlt;
