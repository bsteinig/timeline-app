import React from 'react'
import {Dropdown} from 'react-bootstrap'

const Dashboard = () => {
    const authInstance = window.gapi.auth2.getAuthInstance()
    const user = authInstance.currentUser.get()
    const profile = user.getBasicProfile()
    const email = profile.getEmail()
    const imageUrl = profile.getImageUrl()

    const handleSignOut = () => {
        authInstance.signOut();
    }

    return (
        <>
            <nav>
                <div>Timeline.JS Tool</div>
                <img className="push" src={imageUrl} alt="Me"/>
                <Dropdown>
                    <Dropdown.Toggle as="a">
                        {email}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </nav>
            <div className="container">
                <p>Timeline Generator</p>
                <form>
                    <textarea></textarea>
                </form>
            </div>
        </>
    )
}

export default Dashboard