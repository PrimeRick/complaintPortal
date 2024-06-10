import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import civil from '../assets/civil.svg'
import electricpole from '../assets/electricpole.svg'
import canteen from '../assets/canteen.svg'
import housekeeperIcon from '../assets/housekeeper-icon.svg'

function Complaint() {
    return (
        <div className=''>
            <div>
                <Navbar />
            </div>
            <br />
            <div className='itmes-center grid grid-cols-2 pl-[10%] pr-[10%]'>
                <div>
                    <Card title={"Civil"} src={civil} />
                </div>
                <div>
                    <Card title={"Electrical"} src={electricpole} />
                </div>
                <div>
                    <Card title={"Canteen"} src={canteen} />
                </div>
                <div>
                    <Card title={"Housekeeping"} src={housekeeperIcon} />
                </div>
            </div>
        </div>
    )
}

export default Complaint