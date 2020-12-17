import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import EditTraining from './EditTraining';
import AddTraining from './AddTraining';
import DeleteIcon from '@material-ui/icons/Delete';
import { format } from 'date-fns';
import './components.css';

export default function TrainingTable() {
    const [trainings, setTrainings] = useState([]);
  
    useEffect(() => fetchData(), []);
  
    const fetchData = () => {
      fetch('https://customerrest.herokuapp.com/api/trainings')
      .then(res => res.json())
      .then(data => setTrainings(data.content))
    }
    const deleteTraining = (link) => {
      fetch(link, {method: 'DELETE'})
      .then(res => fetchData())
      .catch(err => console.error(err))
    }
    
    const saveTraining = (training) => {
      fetch('https://customerrest.herokuapp.com/api/trainings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(training)
      })
      .then(res => fetchData())
      .catch(err => console.error(err))
    }
  
    const updateTraining =(training, link) => {
      fetch(link, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(training)
      })
      .then(res => fetchData())
      .catch(err => console.error(err))
    }
    
    const columns = [
      {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: 'links[1].href',
        Cell: row => <Button size="small" color="secondary" onClick={() => deleteTraining(row.value)}><DeleteIcon /></Button>
      },
      {
        sortable: false,
        filterable: false,
        width: 100,
        Cell: row => <EditTraining updateTraining={updateTraining} training={row.original} />
      },
      {
        Header: 'Customer',
        id: 'customer',
        accessor: 'links[2].href'
      },
      {
        Header: 'Date',
        accessor: 'date',
        id: 'date',
        Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy')} 
      },
      {
        Header: 'Duration',
        accessor: 'duration'
      },
      {
        Header: 'Activity',
        accessor: 'activity'
      }
    ]
  
    return (
      <div>
      <AddTraining saveTraining={saveTraining} />
      <h1>Trainings</h1>
      <ReactTable  className="table" filterable="true" data={trainings} columns={columns}/>
      </div>
    );
  }
