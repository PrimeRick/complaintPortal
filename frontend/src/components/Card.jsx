import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Card({src, title}) {
    const navigate = useNavigate()
    return (
        <>
            <div class="card mb-4 text-center row g-0 " className='card row'>
                <div class="row g-0" className='row'>
                    <div class="col-md-4">
                        <img src={`${src}`} class="img-fluid rounded-start img-fluid scale-125" alt="..." style={{ height: "200px", width: "300px",marginLeft:'10px' }} />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <b><h5 class="card-title">{title}</h5></b>
                            <i>{`Click below to register complaint for ${title}`}</i>
                            <br /> <br /> <br />
                            <button onClick={()=>{
                                localStorage.setItem('complaintType', title)
                                navigate('/complain')
                            }} class="btn btn-outline-danger">Register Complaint</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card