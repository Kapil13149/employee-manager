import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import EmployeeDetails from './EmployeeDetails';

const Popup = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Open Modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal Heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EmployeeDetails />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Popup;
