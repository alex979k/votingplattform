import React, { Component } from 'react';

class Nav extends Component {

  constructor(props){
    super(props)
    this.state = {loggedIn: false}
  }

  fakeLogin(){
    this.setState({loggedIn: true})
  }

  renderLogin(){
    if(!this.props.loggedIn && !this.state.loggedIn){
      return (<a class="btn btn-outline-primary btn-custom" onClick={this.fakeLogin.bind(this)} href="#">Login</a>)
    } else {
      return (<a href="#"><img class="profile-image" src="passportimage.jpg"  width="30"/></a>)
    }
  }
  render() {
    return (
      <div id="Nav">
      <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <img src="fingerprint.png" width="40px" height="40px"/><h5 class="my-0 mr-md-auto font-weight-normal">VotingXYZ</h5>
          <nav class="my-2 my-md-0 mr-md-3">
            <a class="p-2 text-dark" href="#">How it works</a>
            <a class="p-2 text-dark" href="#">Referendum info</a>
          </nav>
          {this.renderLogin()}
        </div>
      </div>
    );
  }
}

export default Nav;
