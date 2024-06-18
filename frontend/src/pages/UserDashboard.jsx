import UserTable from '../components/UserTable'
import NavbarWithMegaMenu from '../components/Navbar'

export default function UserDashboard(){
    const who = localStorage.getItem('who')
    return (
        <div>  
            <div className=''>
                <NavbarWithMegaMenu/>
            </div>
            <br />
            <div className='sm: pl-2 col-span-9' style={{marginTop:'5%'}}>
                <UserTable/>
            </div> 
        </div>
    )
}