import React, { Component } from 'react';

class Nav extends Component {
  render() {
    return (
      <div id="Nav">
      <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <img src="fingerprint.png" width="40px" height="40px"/><h5 class="my-0 mr-md-auto font-weight-normal">VotingXYZ</h5>
          <nav class="my-2 my-md-0 mr-md-3">
            <a class="p-2 text-dark" href="#">How it works</a>
            <a class="p-2 text-dark" href="#">Referendum info</a>
          </nav>
          <a class="btn btn-outline-primary btn-custom" href="#">Login</a>
        </div>
      </div>
    );
  }
}

export default Nav;
