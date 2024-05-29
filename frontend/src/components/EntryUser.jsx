import React, { useState } from 'react'
import axios from 'axios'
import Button from './Button';

function EntryUser({status, description, createdAt, complaintId, feedback, dept}) {
  return (
    <>
    <tr>
      <th scope="row">1</th>
      <td>{complaintId}</td>
      <td>{dept}</td>
      <td>{status}</td>
      <td>{description}</td>
      <td>{createdAt}</td>
      {/* <td>{feedback}</td> */}
    </tr>
    </>
  )
}

export default EntryUser