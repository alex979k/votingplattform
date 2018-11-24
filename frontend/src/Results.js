import React, { Component } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts';

class Results extends Component {

  constructor(props){
    super(props)

    this.state = {
      data: [{name: 'Referendum', yes: 1000, no: 2000, amt: 3000}],
    }
  }

  render() {
    const total = this.state.data[0].yes + this.state.data[0].no
  return (
      <div id="Results">
        <div class="results-left">
          <div class="results-header-left">
            Referendum results
          </div>
          <div class="results-text-left display-4">
            United Kingdom European Union membership referendum 24.11.2016
          </div>
          <br />
          <div class="results-text-left-mid">
            <p>Should the United Kingdom remain a member of European Union?</p>
          </div>

          <BarChart width={600} height={300} data={this.state.data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <CartesianGrid strokeDasharray="3 3"/>
           <XAxis dataKey="name"/>
           <YAxis/>
           <Tooltip/>
           <Legend />
           <Bar dataKey="yes" fill="#4ECDC4"/>
           <Bar dataKey="no" fill="#FF6B6B" />
          </BarChart>

          <div class="results-text-bottom">
            <ul>
              <li>Total voters: {total}</li>
              <li>Participation: {total} / {(total * 1.2)} </li>
            </ul>
          </div>
        </div>
        </div>
    );
  }
}

export default Results;
