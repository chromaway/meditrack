import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'reactstrap';

var ORDERED='ORDERED';
var ACCEPTED='ACCEPTED';
var REJECTED='REJECTED';

class OrderLine extends React.Component {
    render() {
        const status = {
            ORDERED: 'Ordered',
            ACCEPTED: 'Accepted',
            REJECTED: 'Rejected'
        }
        
        return (
        <tr>
                <th scope="row">{this.props.index}</th>
                <td>{this.props.date}</td>
                <td>{this.props.equipment}</td>
                <td>{this.props.quantity}</td>
                <td>{status[this.props.status]}</td>
        </tr>
        );
    }
}

//
function OrdersList() {
    return (
<table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Date</th>
      <th scope="col">Equipment</th>
      <th scope="col">Quantity</th>
      <th scope="col">Status</th>            
    </tr>
  </thead>
            <tbody>
    <OrderLine index='1'
        date='2020-04-12'
        equipment='Respirators'
        quantity='4'
        status='ORDERED'
            />
    <OrderLine index='2'
        date='2020-04-13'
        equipment='Masks'
        quantity='500'
        status='REJECTED'
            />
    <OrderLine index='3'
        date='2020-04-12'
        equipment='Robes'
        quantity='200'
        status='ACCEPTED'
            />
    <OrderLine index='4'
        date='2020-04-13'
        equipment='Doctors'
        quantity='10'
        status='ACCEPTED'
            />
    <OrderLine index='4'
        date='2020-04-13'
        equipment='Nurses'
        quantity='30'
        status='ACCEPTED'
            />
            
            
  </tbody>
</table>
        
  );
}

export default OrdersList;
