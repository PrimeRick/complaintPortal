import React, { useEffect } from 'react'
import Tablesuper from './Tablesuper'
import Tablecomplaint from './Tablecomplaint'
export default function SuperAdminTable() {
    
    return (
        <>
            <div className="flex text-red-700 text-3xl items-center pl-60">Admins</div>
            <Tablesuper/>
            <br/>
            <br/>
            <span className="flex text-red-700 text-3xl items-center pl-96">Complaints</span>
            <br />
            <Tablecomplaint/>
        </>
    )
}
