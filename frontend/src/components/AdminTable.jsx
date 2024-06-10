import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Entry from './Entry';

function AdminTable() {
	const [complaints, setComplaints] = useState([]);
	const [isTableVisible, setIsTableVisible] = useState(false);
	const [isMediumScreen, setIsMediumScreen] = useState(false);
	const token = localStorage.getItem('token');

	useEffect(() => {
		// Fetch complaints data
		axios.get(`http://localhost:3000/v1/admin/dashboard`, {
			headers: {
				Authorization: token
			}
		})
			.then((response) => {
				if (response.data.msg == 'token expired') {
					localStorage.removeItem('token')
					localStorage.removeItem('who')
					localStorage.removeItem('complaintType')
					alert('Session Expired !! \nPlease Sign In Again')
					navigate('/signin')
				}
				setComplaints(response.data.complaints);
				setIsTableVisible(true); // Show the table after fetching data
			})
			.catch((error) => {
				console.error('Error fetching complaints:', error);
			});

		// Check initial screen size
		handleScreenSizeChange();

		// Add event listener for screen size changes
		window.addEventListener('resize', handleScreenSizeChange);

		// Cleanup function
		return () => {
			window.removeEventListener('resize', handleScreenSizeChange);
		};
	}, []);

	// Function to handle screen size changes
	const handleScreenSizeChange = () => {
		setIsMediumScreen(window.matchMedia('(min-width: 768px)').matches);
	};

	return (
		<>
			{isTableVisible && (
				<div className={isMediumScreen ? "overflow-visible" : "hidden"}>
					<span className="flex text-red-700 text-3xl items-center pl-60 ">Complaints</span>
					<br />
					<button type='button' class="btn btn-success" onClick={()=>{
                        const config = {
                            headers: {
                                Authorization: localStorage.getItem('token'),
                                'Content-Type': 'application/json'
                            }, 
                            responseType: 'blob'
                        }
                        axios.get('http://localhost:3000/v1/admin/downloadExcel', config)
                        .then((response)=>{
                            const url = window.URL.createObjectURL(new Blob([response.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', 'complaints.xlsx'); // Specify the file name
                            document.body.appendChild(link);
                            link.click();
                            link.parentNode.removeChild(link); // Clean up the DOM
                        })
                    }}>Downlaod</button>
					<table className="w-full">
						{/* Table content */}
						<colgroup>
							<col style={{ width: "3%" }} />
							{/* <col style={{ width: "15%" }} /> */}
							<col style={{ width: "9%" }} />
							<col style={{ width: "9%" }} />
							<col style={{ width: "36%" }} />
							<col style={{ width: "17%" }} />
							<col style={{ width: "26%" }} />
						</colgroup>
						<thead className="text-[#4D4D4D]">
							<tr className="bg-[#F2F2F2]">
								<th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider rounded-l">
									#
								</th>
								{/* <th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider rounded-l">
									Complaint Id
								</th> */}
								<th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider rounded-l">
									CPF
								</th>
								<th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider">
									Status
								</th>
								<th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider rounded-r">
									Description
								</th>
								<th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider">
									Created At
								</th>
								<th className="px-3 py-[10px] text-left text-sm font-medium tracking-wider rounded-r">
									Feedback
								</th>
								{/* <span className="absolute bg-[#E6E6E6] w-[calc(100%-20px)] h-[1px] bottom-0 left-[10px]"></span> */}
							</tr>
						</thead>
						<tbody className="bg-white divide-[#E6E6E6]">
							{complaints.map((elem, index) => (
								<Entry
									index={index+1}
									cpf={elem.cpf}
									status={elem.state}
									createdAt={elem.createdAt}
									description={elem.description}
									complaintId={elem._id}
									feedback={elem.feedback}
									isTableVisible={isTableVisible}
								/>
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}

export default AdminTable;