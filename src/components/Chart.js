import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
  Legend
} from '@devexpress/dx-react-chart-material-ui';
import _ from "lodash";
import './components.css';

function Statistics () {
    const[trainings, setTrainings] = useState([]);
   
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(res => res.json())
        .then(data => setTrainings(data))
        .then(data => console.log(trainings))
        .catch(err => {
            console.log(err)
        })
      }
      const data = 
      _.chain(trainings)
      .groupBy('activity')
      .map((value, key) => ({ activity: key, totalamount: _.sumBy(value, 'duration')}))
      .value()
  
return (
  <div className="chart">
  <Paper>
    <Chart
      data={data}
      height={660}
    >
    <ArgumentAxis />
    <ValueAxis />
      <BarSeries name="Duration (min)" valueField="totalamount" argumentField="activity" />
      <Legend />
    </Chart>
  </Paper>
  </div>
);
}export default Statistics;