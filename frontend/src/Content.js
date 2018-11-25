import React, { Component } from 'react';
import WelcomeView from './WelcomeView'
import VotingStart from './VotingStart'
import Voting1 from './Voting1'
import Voting2 from './Voting2'
import Voting3 from './Voting3'
import Voting4 from './Voting4'
import Results from './Results'

const VIEWS = {
  0: WelcomeView,
  1: VotingStart,
  2: Voting1,
  3: Voting2,
  4: Voting3,
  5: Voting4,
  6: Results,
}
class Content extends Component {

  constructor(props){
      super(props)

      this.state = {
        viewIndex: 0,
        vote: null,
      }
  }

  changeView(viewIndex){
    console.log(viewIndex)
    this.setState({viewIndex: viewIndex})
    if(viewIndex > 0){
      this.props.logToggle(true)
    } else {
      this.props.logToggle(false)
    }
  }

  vote(vote){
    this.setState({vote: vote});
    this.changeView(4)
  }

  renderView(){
    const ComponentName = VIEWS[this.state.viewIndex] || WelcomeView;
    return (<ComponentName vote={this.state.vote} viewIndex={this.state.viewIndex} vote={(e) => this.vote(e)} onClick={(viewIndex) => this.changeView(viewIndex+1)}/>)
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
