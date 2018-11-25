import React, { Component } from 'react';

class WelcomeView extends Component {

  render() {
    return (
      <div id="WelcomeView">
      <div class="welcome-background">
      <img class="welcome-background-img" src="london.png" />
          <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h4 class="display-4">Welcome to OnGuard</h4>
            <p class="lead">
              You can vote and follow the results on this platform. Your vote will be totally anonymous. Before you vote, you might check how online voting system works here.</p>
          </div>
          <button type="button" class="btn btn-info" onClick={() => this.props.onClick(this.props.viewIndex)}>Log in</button>
        </div>
        <img class="welcome-background-img-bottom" src="flaglogos.png" />
        </div>
    );
  }
}

export default WelcomeView;
