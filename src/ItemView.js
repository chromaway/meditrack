/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
     return (
       <div>
         <Modal isOpen={modal} toggle={close}>
           <ModalHeader toggle={close}>Item</ModalHeader>
           <ModalBody>
             Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
           </ModalBody>
           <ModalFooter>
             <Button color="primary" onClick={close}>Do Something</Button>{' '}
             <Button color="secondary" onClick={close}>Cancel</Button>
           </ModalFooter>
         </Modal>
       </div>
     );
   }
}
//      //<Button color="danger" onClick={toggle}>{buttonLabel}</Button>

export default ItemView;
