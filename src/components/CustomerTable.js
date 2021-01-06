import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import EditCustomer from './EditCustomer';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';


export default function CustomerTable() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = (training) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(training)
    })
  
    .then(res => res.json())
    .then(data => setCustomers(data.content))
  }
  const deleteCustomer = (link) => {
    if(window.confirm('Are you sure?')) {
    fetch(link, {method: 'DELETE'})
    .then(res => fetchData())
    .catch(err => console.error(err))
    }
  }
  const saveCustomer = (customer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
    .then(res => fetchData())
    .then(res => console.log(res))
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
    .then(res => console.log(res))
    .catch(err => console.error(err))
  }

  const updateCustomer =(customer, link) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
    .then(res => fetchData())
    .catch(err => console.error(err))
  }
  const columns = [
    {
      sortable: false,
      filterable: false,
      width: 50,
      accessor: 'links[1].href',
      Cell: row => <div><Button size="small" color="secondary" onClick={() => deleteCustomer(row.value)}><DeleteIcon /></Button>
      </div>
    },
    {
      sortable: false,
      filterable: false,
      width: 50,
      Cell: row => <EditCustomer updateCustomer={updateCustomer} customer={row.original} />
    },
    {
      sortable: false,
      filterable: false,
      width: 150,
      accessor:'links[1].href',
      Cell: row => <AddTraining saveTraining={saveTraining} customerid={row.value} />
    },
    {
      Header: 'Firstname',
      accessor: 'firstname'
    },
    {
      Header: 'Lastname',
      accessor: 'lastname'
    },
    {
      Header: 'Streetaddress',
      accessor: 'streetaddress'
    },
    {
      Header: 'Postcode',
      accessor: 'postcode'
    },
    {
      Header: 'City',
      accessor: 'city'
    },
    {
      Header: 'Email',
      accessor: 'email'
    },
    {
      Header: 'Phone',
      accessor: 'phone'
    }
  ]

  return (
    <div>
    <AddCustomer saveCustomer={saveCustomer} />
    <h1>Customers</h1>
    <ReactTable className="table" filterable="true" data={customers} columns={columns}/>
    </div>
  );
}
