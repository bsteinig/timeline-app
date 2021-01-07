import React, { useState } from 'react'
import { Dropdown, Button} from 'react-bootstrap'

const Dashboard = () => {
    const authInstance = window.gapi.auth2.getAuthInstance()
    const user = authInstance.currentUser.get()
    const profile = user.getBasicProfile()
    const email = profile.getEmail()
    const imageUrl = profile.getImageUrl()

    const handleSignOut = () => {
        authInstance.signOut();
    }

    const [disabled, setDisabled] = useState(true);

    const [event, setEvent] = useState({
        title: "",
    })

    const [sheet, setSheet] = useState({
        link: "",
        id: "",
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
          console.log(response.result)
          setSheet({ link: response.result.spreadsheetUrl, id: response.result.spreadsheetId })
          setDisabled(false)
        }, function(reason) {   
          console.error('error: ' + reason.result.error.message);
        });
        
    }

    function updateSheet() {

        
        var values = [['Year',"Month","Day","Time","End Year", "End Month", "End Day", "End Time", "Display Date", "Headline", "Text", "Media", "Media Credit", "Media Caption", "Media Thumbnail", "Type", "Group", "Background"]]

        var body = {
            values: values
        }

        var params = {
            spreadsheetId: sheet.id,
            range: 'A1:R1',
            valueInputOption: 'USER_ENTERED',
            resource: body
        }
        console.log(params.spreadsheetId)
        

        var updateRequest = window.gapi.client.sheets.spreadsheets.values.update(params);
        updateRequest.then(function(response) {
            console.log('Sheet updated')
        }, function(reason) {
            console.error('error: ' + reason.result.error.message)
        })
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
                <span>
                <Button variant="primary" onClick={createSheet}>Create Google Sheet</Button>
                <p>Create Sheet to Submit Data</p>
                <Button variant="success" disabled={disabled} onClick={updateSheet}>Submit Data</Button>
                </span>
                <p>Your Google Sheet is here:</p>
                { sheet.linkCreated ? <a href={sheet.link} rel="noreferrer" target="_blank">Google Sheet</a> : <p></p> }
            </div>
        </>
    )
}

export default Dashboard