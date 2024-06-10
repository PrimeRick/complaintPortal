import UserTable from '../components/UserTable'
import AdminTable from '../components/AdminTable'
import SuperAdminTable from '../components/SuperAdminTable'
import Sidebar from '../components/Sidebar'   
import StickyNavbar from '../components/Navbar'

export default function Dashboard(){
    const who = localStorage.getItem('who')
    return (
        // <div className='grid grid-cols-12'>  
        <div className=''>  
            <div className='col-span-2'>
                    {/* <Sidebar/> */}
                    <StickyNavbar/>
            </div>
            <br />
            <div className='sm: pl-2 col-span-9'>
                {who=='user'? <UserTable/>:
                    who=='admin'? <AdminTable/>:
                        <SuperAdminTable/>
                }
            </div> 
        </div>
    )
}