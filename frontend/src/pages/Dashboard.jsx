import UserTable from '../components/UserTable'
import AdminTable from '../components/AdminTable'
import SuperAdminTable from '../components/SuperAdminTable'
import Sidebar from '../components/Sidebar'
import { RecoilRoot } from 'recoil'

export default function Dashboard(){
    const who = localStorage.getItem('who')
    return (
        <div className='grid grid-cols-12'>  
            <div className='col-span-2'>
                <RecoilRoot>
                    <Sidebar/>
                </RecoilRoot>
            </div>
            <div className='sm: pl-2 col-span-9'>
                {who=='user'? <UserTable/>:
                    who=='admin'? <AdminTable/>:
                        <SuperAdminTable/>
                }
            </div> 
        </div>
    )
}