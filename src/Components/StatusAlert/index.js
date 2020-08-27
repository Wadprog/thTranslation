import React, { useState } from "react";
import { Modal } from "react-bootstrap";
const StatusModal = ({ show, good, handleShow }) => {
  return (
    <Modal show={show} animation={true} size='xl'>
     
      <Modal.Body>
        <div className='d-flex justify-content-center'>
          <div>
            {
              <i
                className={`fa fa-5x fa-${good ? "check" : "times"} $text-${
                  good ? "success" : "danger"
                }`}
              ></i>
            }
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default StatusModal;
