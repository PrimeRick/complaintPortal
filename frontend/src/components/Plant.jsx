import React, { useState } from 'react'

function Plant() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      <select class="form-select" aria-label="Disabled select example" value={selectedOption} onChange={handleChange}>
        <option selected>Open this select menu</option>
        <option value="QUATER 1">QUATER 1</option>
        <option value="QUATER 2">QUATER 2</option>
        <option value="QUATER 3">QUATER 3</option>
        <option value="QUATER 4">QUATER 4</option>
      </select>
      <select class="form-select" aria-label="Disabled select example" value={selectedOption} onChange={handleChange}>
        <option selected>Open this select menu</option>
        <option value="QUATER 1">QUATER 1</option>
        <option value="QUATER 2">QUATER 2</option>
        <option value="QUATER 3">QUATER 3</option>
        <option value="QUATER 4">QUATER 4</option>
      </select>
      <br></br>
      <label for="exampleFormControlTextarea1">COMPLAINT</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="15" placeholder='ENTER YOUR COMPLAINT '></textarea>
      <br />
      <button type="button" class="btn btn-success">SUBMIT</button>
    </>
  )
}

export default Plant