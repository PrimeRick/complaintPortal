import React from 'react'
import { useNavigate } from 'react-router-dom'

function Card({src, title}) {
    const navigate = useNavigate()
    return (
        <>
            <div class="card mb-3 text-center row g-0" className='card row'>
                <div class="row g-0" className='row'>
                    <div class="col-md-4">
                        <img src={`${src}`} class="img-fluid rounded-start img-fluid" alt="..." style={{ height: "200px", width: "300px" }} />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{title}</h5>
                            <p class="card-text">Click below to register a complaint against {title} </p>
                            <br />
                            <button onClick={()=>navigate('/complain')} class="btn btn-outline-danger">Register Complaint</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card