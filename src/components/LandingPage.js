import React from 'react'
import {Link } from 'react-router-dom'

const LandingPage = () => {
    return (
        <div className="container">
            <h1>Timeline.JS Generator Tool</h1>
            <p>Simple way to create Timeline.JS projects</p>
            <Link to="/dashboard">Go to Dashboard</Link>
        </div>
    )
}

export default LandingPage