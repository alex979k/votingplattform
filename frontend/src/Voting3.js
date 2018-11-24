import React, { Component } from 'react';
import VotingBar from './VotingBar'

class Voting3 extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
  }

  render() {
    const props = this.props
    setTimeout(function(){
       props.onClick(4)
    }, 1500);

    return (
      <div id="Voting3">
      <VotingBar viewIndex={this.props.viewIndex} />
        <div class="lds-circle"><div></div></div>
        <div class="loader-text">
        Please wait until your vote is received. Do not close this window.
        </div>
      </div>
    );
  }
}

export default Voting3;
