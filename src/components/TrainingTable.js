import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { format } from 'date-fns';
import './components.css';
import moment from 'moment';


export default function TrainingTable() {
    const [trainings, setTrainings] = useState([]);
   
    useEffect(() => fetchData(), []);
  
    const fetchData = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(res => res.json())
      .then(data => setTrainings(data))
    }
    const deleteTraining = (id) => {
      if(window.confirm('Are you sure?')){
      fetch('https://customerrest.herokuapp.com/api/trainings/' + id, 
      {method: 'DELETE'})
      .then(res => fetchData())
      .then(res => console.log(res))
      .catch(err => console.error(err))
    }
  }
  
    const columns = [
      {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: 'id',
        Cell: row => <div><Button size="small" color="secondary" onClick={() => deleteTraining(row.value)}><DeleteIcon /></Button>
        </div>
      },
      {
        Header: 'Date',
        id: 'date',
        accessor: 'date',
        Cell: ({ value }) => { return moment(value).format("DD.MM.YYYY, hh:mm A")}  
      },
      {
        Header: 'Duration',
        accessor: 'duration'
      },
      {
        Header: 'Activity',
        accessor: 'activity'
      },
      {
        Header: 'Customer',
        id: "customerfirstname",
        accessor: row => `${row.customer.firstname} ${row.customer.lastname}`
      }
    ]
  
    return (
      <div>
      <h1>Trainings</h1>
      <ReactTable  className="table" filterable="true" data={trainings} columns={columns}/>
      </div>
    );
  }
