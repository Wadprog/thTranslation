import React from "react";
import { Modal, Spinner } from "react-bootstrap";
const LoadingModal = ({ show }) => {
  return (
    <Modal show={show} animation={true} size="xl">
      <Modal.Body>
        <div className='d-flex justify-content-center'>
          <div>
            <Spinner animation='border' size='sm' />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingModal;
