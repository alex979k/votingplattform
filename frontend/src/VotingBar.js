import React, { Component } from 'react';

class VotingBar extends Component {


  render() {
    return (
      <div id="VotingBar">
      <ul class="progress-indicator">
    	  <li class={(this.props.viewIndex > 1) ? "completed" : ""}> <span class="bubble"></span> Step 1. </li>
    	  <li class={(this.props.viewIndex > 2) ? "completed" : ""}> <span class="bubble"></span> Step 2. </li>
    	  <li class={(this.props.viewIndex > 4) ? "completed" : ""}> <span class="bubble"></span> Step 3. </li>
    	 </ul>
      </div>
    );
  }
}

export default VotingBar;
