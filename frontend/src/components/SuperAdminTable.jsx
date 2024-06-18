import React, { useEffect } from 'react'
import Tablesuper from './Tablesuper'
import Tablecomplaint from './Tablecomplaint'
export default function SuperAdminTable() {
    
    return (
        <>
            <Tablesuper/>
            <br/>
            <br/>
            <br />
            <Tablecomplaint/>
        </>
    )
}
