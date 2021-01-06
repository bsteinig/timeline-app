import React, { useState } from 'react'
import {Nav, Dropdown, Button} from 'react-bootstrap'

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

    const [link, setLink] = useState({
        link: "",
        linkCreated: false,
    })

    function handleEventChange(e) {
        setEvent({...event, title: e.target.value})
    }
    
    function createSheet() {
        var spreadsheetBody = {
          "properties": {
              "title": event.title,
          },
        };
   
        var request = window.gapi.client.sheets.spreadsheets.create({}, spreadsheetBody);
        request.then(function(response) {
          console.log(response.result);
          setLink({ link: response.result.spreadsheetUrl, linkCreated: true})
        }, function(reason) {
          console.error('error: ' + reason.result.error.message);
        });
        
    }

    return (
        <>
            <nav variant="pills">
                <div>Timeline.JS Tool</div>
                <img className="push" src={imageUrl} alt="Me"/>
                <Dropdown>
                    <Dropdown.Toggle as='a'>
                        {email}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/" onClick={handleSignOut}>Sign out</Dropdown.Item>
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
                <p>Your Google Sheet is here:</p>
                { link.linkCreated ? <a href={link.link} target="_blank">Google Sheet</a> : <p></p> }
            </div>
        </>
    )
}

export default Dashboard