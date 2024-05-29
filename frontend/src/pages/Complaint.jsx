import React from 'react'
import Sidebar from '../components/Sidebar'
import Card from '../components/Card'
import civil from '../assets/civil.svg'
import electricpole from '../assets/electricpole.svg'
import canteen from '../assets/canteen.svg'
import housekeeperIcon from '../assets/housekeeper-icon.svg'

function Complaint() {
    return (
        <div className='grid grid-cols-12'>
            <div className='col-span-2'>
                <Sidebar/>
            </div>
            <div className='col-span-9'>
                <div className='w-full grid grid-cols-2'>
                    <Card title={"CIVIL"} src={civil}/>
                    <Card title={"ELECTRICAL"} src={electricpole}/>
                    <Card title={"CANTEEN"} src={canteen}/>
                    <Card title={"HOUSEKEEPING"}  src={housekeeperIcon}/>
                </div>
            </div>
        </div>
  )
}

export default Complaint