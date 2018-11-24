import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './Nav'
import Content from './Content'
import Footer from './Footer'


class App extends Component {

  constructor(props) {
  super(props);
  this.state = { loggedIn: false };
}

  logToggle(e) {
    this.setState({
      loggedIn: e
    })
  }

  render() {
    return (
      <div className="App">
        <Nav loggedIn={this.state.loggedIn} />
        <Content logToggle={(e) => this.logToggle(e)} />
        <Footer />
      </div>
    );
  }
}

export default App;
