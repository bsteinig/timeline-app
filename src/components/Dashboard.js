import React, { useState } from 'react'
import {Dropdown, Button} from 'react-bootstrap'

const Dashboard = () => {
    const authInstance = window.gapi.auth2.getAuthInstance()
    const user = authInstance.currentUser.get()
    const profile = user.getBasicProfile()
    const email = profile.getEmail()
    const imageUrl = profile.getImageUrl()

    const handleSignOut = () => {
        authInstance.signOut();
    }

    const [event, setEvent] = useState({
        title: "",
    })

    function handleEventChange(e) {
        setEvent({...event, title: e.target.value})
    }
    
    function createSheet() {
        var spreadsheetBody = {
          "properties": {
              "title": "Created by Google API",
          },
        };
   
        var request = window.gapi.client.sheets.spreadsheets.create({}, spreadsheetBody);
        request.then(function(response) {
          console.log(response.result);
        }, function(reason) {
          console.error('error: ' + reason.result.error.message);
        });
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
                    <textarea placeholder="Sheet Title" onChange={handleEventChange}/>
                </form>
                <p>{event.title}</p>
                <Button variant="primary" onClick={createSheet}>Create Google Sheet</Button>
            </div>
        </>
    )
}

export default Dashboard