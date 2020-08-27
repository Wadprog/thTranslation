import React from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Spreasheets = () => {
  return (
    <>
      <Link to='/'>Home</Link>
      <div className='App p-5'>
        <h2> All Spreadsheet used </h2>
        <Table striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Spreasheets;
