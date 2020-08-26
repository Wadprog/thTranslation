import React from "react";
import { Spinner } from "react-bootstrap";

const index = () => {
  return (
    <div className='d-flex justify-content-center'>
      <div>
        <Spinner animation='border' size='sm' />
      </div>
    </div>
  );
};

export default index;
