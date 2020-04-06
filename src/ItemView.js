/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import {getEquipment} from './equipment';

class ItemView extends Component {
    constructor(props) {

        super(props);
        // this.state = {
        //     modal: props.isOpen
        // }
        this.onClose = props.onClose;
    }
    
// const  = (props) => {
//   const {
//     buttonLabel,
//       className,
//       id,
//       isOpen
//   } = props;

//    const [modal, setModal] = useState(isOpen);


//const toggle = () => setModal(!modal);

   // toggle () {
   //  this.setState({modal:!this.state.modal})
   // }

    render() {
        var modal = this.props.isOpen;
//        var toggle = this.toggle;
        var close = this.props.onClose;
        if (!this.props.isOpen) {
            return (<div></div>)
        }

        var eqList= getEquipment()
        console.log("Hello");
        console.log(eqList);
        var id = this.props.id;
        console.log(id);
            
        var eq = eqList[id] || {};
        console.log(eq);

        
     return (
       <div>
         <Modal isOpen={modal} toggle={close}>
           <ModalHeader toggle={close}>Item details</ModalHeader>
             <ModalBody>
             <p>Id: {this.props.id}</p>
             <p>Date: {eq.date}</p>
             <p>Status: {eq.status}</p>
             <p>Quantity: {eq.quantity}</p>
             <p>From: {eq.from}</p>                          
           </ModalBody>
           <ModalFooter>
             <Button color="primary" onClick={close}>Request</Button>{' '}
             <Button color="secondary" onClick={close}>Cancel</Button>
           </ModalFooter>
         </Modal>
       </div>
     );
   }
}
//      //<Button color="danger" onClick={toggle}>{buttonLabel}</Button>

export default ItemView;
