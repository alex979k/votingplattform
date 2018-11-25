import React, { Component } from 'react';
import VotingBar from './VotingBar'
import axios from 'axios'

class Voting3 extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
  }

  render() {
    const props = this.props

    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    axios.post('http://localhost:9000/api', 0)
      .then(function (response) {
        console.log("HALLO");
        console.log(response);
        props.onClick(4)
      })
      .catch(function (error) {
        console.log(error);
        props.onClick(-1)
      });

    /*setTimeout(function(){
      axios.get("http://fe7a5316.ngrok.io/count")
        .then(response => {
          // create an array of contacts only with relevant data
          /*const newState = Object.assign({}, this.state, {
            content: response.data
          });*
          console.log(response)
          this.setState({worked: 1}});
        })
        .catch(error => console.log(error));
       props.onClick(4)
    }, 1500);*/

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
