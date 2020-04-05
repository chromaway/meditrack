import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'reactstrap';

import {getEquipment} from './equipment';

var ORDERED='ORDERED';
var ACCEPTED='ACCEPTED';
var REJECTED='REJECTED';




class OrderLine extends React.Component {
  constructor(props) {
    super(props);
    this.handleViewClick = this.handleViewClick.bind(this);
  }    

    handleViewClick(e) {
        this.props.onViewClick(this.props.id);//Raise event 
    }
    
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
                <td><Button onClick={this.handleViewClick} type="button" className="btn btn-secondary btn-sm">View</Button></td>
        </tr>
        );
    }
}

//

class OrdersList extends React.Component {
  constructor(props) {
    super(props);
    this.handleViewClick = this.handleViewClick.bind(this);
  }    

    handleViewClick(e) {
        this.props.onViewClick(e);//Raise event 
    }
    
    render () {
        var obj = getEquipment();
    console.log("EEQuipment:", obj);    
    return (
<table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Date</th>
      <th scope="col">Equipment</th>
      <th scope="col">Quantity</th>
            <th scope="col">Status</th>
      <th scope="col">View</th>                
    </tr>
  </thead>
            <tbody>
            {
                Object.entries(obj).map(([k, v]) =>
                                        <OrderLine
                                        key={v.id}
                                        onViewClick = {this.handleViewClick}
                                        id={v.id}
            index={v.index}
            date={v.date}
            equipment={v.equipment}
            quantity={v.quantity}
            status={v.status}
                    />)
            }
            
  </tbody>
</table>
        
  );
    }
}

export default OrdersList;









/*        
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
            
*/
