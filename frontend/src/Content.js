import React, { Component } from 'react';
import WelcomeView from './WelcomeView'
import VotingStart from './VotingStart'
import Voting1 from './Voting1'

const VIEWS = {
  0: WelcomeView,
  1: VotingStart,
  2: Voting1,
  3: Voting3,
}
class Content extends Component {

  constructor(props){
      super(props)

      this.state = {
        viewIndex: 0
      }
  }

  changeView(viewIndex){
    console.log(viewIndex)
    this.setState({viewIndex: viewIndex})
  }

  renderView(){
    const ComponentName = VIEWS[this.state.viewIndex] || WelcomeView;
    return (<ComponentName viewIndex={this.state.viewIndex} onClick={(viewIndex) => this.changeView(viewIndex+1)}/>)
  }

  render() {
    return (
      <div id="Content">
        {this.renderView()}
        <div class="content-spacer"></div>
      </div>
    );
  }
}

export default Content;
