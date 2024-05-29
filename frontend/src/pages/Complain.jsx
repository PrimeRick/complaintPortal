import React, { useState } from 'react'
import Plant from '../components/Plant';
import Colony from '../components/Colony';
import Sidebar from '../components/Sidebar';

function Complain() {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className='grid grid-cols-12'>
            <div className='col-span-2'>
                <Sidebar />
            </div>
            <div className='col-span-5 text-center'>
                <div >
                    <h4>SELECT THE PLACE FOR YOUR COMPLAIN</h4>

                    <select class="form-select" aria-label="Disabled select example" value={selectedOption} onChange={handleChange} >
                        <option selected>Open this select menu</option>
                        <option value="plant">Plant</option>
                        <option value="colony">Colony</option>
                    </select>


                    <p>Selected option: {selectedOption}</p>
                    {selectedOption === 'plant' && <div>ENTER YOUR QUATER NUMBER <Plant/></div>}
                    {selectedOption === 'colony' && <div>ENTER YOUR QUATER NUMBER  <Colony/></div>}
                </div>
            </div>
        </div>
    );
}

export default Complain