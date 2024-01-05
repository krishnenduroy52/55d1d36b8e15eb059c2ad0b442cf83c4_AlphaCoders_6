import React, { useRef } from 'react'
import './numPlateDetection.module.css'

const NumPlateDetection = () => {

    const inputRef = useRef(null);

    const sendPlateNumber = async() => {
        const number_plate = inputRef.current.value;
        const url = `http://localhost:8000/sendnumber?value=${encodeURIComponent(number_plate)}`;
        const data = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const response = await data.json();
    }

    return (
        <div
            style={{
                backgroundColor: "#F8F6F5",
                padding: "4rem 1rem",
                borderRadius: "30px 30px 30px 30px",
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: '100%',
                gap: '5rem',
            
            }}>
                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    color: '#1E9010',
                    textAlign: 'center',
                    margin: '0px',
                    padding: '0px',
                
                }}>Number Plate Detection</h1>
                <input style={{
                    width: '200px',
                    height: '40px',
                    fontSize: '20px',
                    padding: '10px'
                }} ref={inputRef} type='string'/>
                <button style={{
                    width: '100px',
                    height: 'auto',
                    padding: '10px',
                    fontSize: '1rem',
                    color: 'white',
                    backgroundColor: '#1E9010',
                    textAlign: 'center',
                    borderRadius: '10px',
                }} onClick={sendPlateNumber} type='button'>Submit</button>
            </div>
        </div>
    )
}

export default NumPlateDetection