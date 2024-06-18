import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Space from '../components/Space'
import Navbar from '../components/Navbar'
import PhaseButton from '../components/PhaseButton';
import LocationButton from '../components/LocationButton';

const MyForm = () => {
    const [phase, setPhase] = useState('Select Phase');
    const [quarter, setQuarter] = useState('');
    const [location, setLocation] = useState('Select Location');
    const [showSubmitButton, setShowSubmitButton] = useState(false);

    const handleQuarterChange = (e) => {
        const enteredQuarter = e.target.value;
        setQuarter(enteredQuarter);
        // Show submit button only if quarter is entered
        setShowSubmitButton(!!enteredQuarter);
    };

    const handleLocationChange = (e) => {
        const enteredLocation = e.target.value;
        setQuarter(enteredLocation);
        // Show submit button only if location is entered
        setShowSubmitButton(!!enteredLocation);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Do something with phase and quarter or location
        // console.log('Selected Option:', selectedOption);
        // console.log('Phase:', phase);
        // console.log('Quarter:', quarter);
        // console.log('Location:', location);
    };

    return (
        <div className=''>
            <div className=''>
                <Navbar/>
            </div>
            <Container className="grid col-span-8 mt-[4%]">
                <Row className="justify-content-center mt-5">
                    <Col md={6}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="optionSelect">
                                <Form.Label><b style={{ color: 'maroon' }}>Select Plant or Colony:</b></Form.Label>
                                <LocationButton type={location} setType={setLocation}/>
                            </Form.Group>
                            {location === 'Colony' && (
                                <React.Fragment>
                                    <Form.Group controlId="phaseSelect">
                                        <Form.Label><b style={{ color: 'maroon' }}>Choose Phase:</b></Form.Label>
                                        <PhaseButton type={phase} setType={setPhase}/>
                                    </Form.Group>
                                    {phase!='Select Phase' && (
                                        <Form.Group controlId="quarterInput" >
                                            <Form.Label><b style={{ color: 'maroon' }}>Enter Quarter Number:</b></Form.Label>
                                            <Form.Control type="string" placeholder="Enter your quarter number" onChange={handleQuarterChange} value={quarter} style={{ borderColor: '#edd8d8' }} />
                                        </Form.Group>
                                    )}
                                    {showSubmitButton && (
                                        <Space quarter={quarter} phase={phase} location={location}/>
                                    )}
                                </React.Fragment>
                            )}
                            {location === 'Plant' && (
                                <React.Fragment>
                                    <Form.Group controlId="locationInput">
                                        <Form.Label><b style={{ color: 'maroon' }}>Enter Location:</b></Form.Label>
                                        <Form.Control type="text" placeholder="Enter your Location" onChange={handleLocationChange} value={quarter} style={{ borderColor: '#edd8d8' }} />
                                    </Form.Group>
                                    {showSubmitButton && (
                                        <Space quarter={quarter} phase={phase} location={location}/>
                                    )}
                                </React.Fragment>
                            )}
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MyForm;