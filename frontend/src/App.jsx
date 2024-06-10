import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './pages/Signin'
import './App.css'
import Complaint from './pages/Complaint'
import Dashboard from './pages/Dashboard'
import Complain from './pages/Complain'
import UserDashboard from './pages/UserDashboard'

function App() {

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/signin' element={<Signin/>}/>
					<Route path='/complaint' element={<Complaint/>}/>
					<Route path='/dashboard' element={<Dashboard/>}/>
					<Route path='/userDashboard' element={<UserDashboard/>}/>
					<Route path='/complain' element={<Complain/>}/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
