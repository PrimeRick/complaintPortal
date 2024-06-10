import { useNavigate } from "react-router-dom"
import { RxDashboard } from "react-icons/rx";

export default function Sidebar() {
	const navigate = useNavigate()
	const who = localStorage.getItem('who')
	return (
		<>
			<div class="min-h-screen flex flex-col flex-shrink-0 antialiased bg-white text-red-800">
				<div class="fixed flex flex-col top-0 left-0 bg-white h-full border-r">
					<div class="flex items-center justify-center h-14 border-b">
						<div>Complaint Portal</div>
					</div>
					<div class="overflow-y-auto overflow-x-hidden flex-grow">
						<ul class="flex flex-col py-4 space-y-1">
							<li class="px-5">
							</li>
							{who=='user'?<></>:
							<li>
								<a href="/dashboard" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-red-50 text-red-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-700 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Admin Dashboard</span>
								</a>
							</li>
							}
							<li>
								<a href="/userDashboard" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-red-50 text-red-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-700 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">User Dashboard</span>
								</a>
							</li>
							<li>
								<a href="/complaint" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-red-50 text-red-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-700 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Lodge Complaint</span>
								</a>
							</li>
							<li>
								<button onClick={() => {
									localStorage.removeItem('token')
									localStorage.removeItem('who')
									navigate('/signin')
								}} class=" w-52 relative flex flex-row items-center h-11 focus:outline-none hover:cursor-pointer hover:bg-red-50 text-red-600 hover:text-red-800 border-l-4 border-transparent hover:border-red-700 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Logout</span>
								</button >
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

