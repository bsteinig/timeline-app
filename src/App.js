import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './css/App.css'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import Dashboard from './components/Dashboard'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isSignedIn: null
        }
    }

    initializeGoogleSignIn() {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: '564893688827-083ol0fcip1gmf2b9qm43pt1dab4dq58.apps.googleusercontent.com'
        }).then(() => {
          const authInstance =  window.gapi.auth2.getAuthInstance()
          const isSignedIn = authInstance.isSignedIn.get()
          this.setState({isSignedIn})

          authInstance.isSignedIn.listen(isSignedIn => {
            this.setState({isSignedIn})
          })
        })
      })
    }

    componentDidMount() {
      const script = document.createElement('script')
      script.src = 'https://apis.google.com/js/platform.js'
      script.onload = () => this.initializeGoogleSignIn()
      document.body.appendChild(script)
    }

    ifUserSignedIn(Component) {
        if (this.state.isSignedIn === null) {
            return (
                <h1>Checking if you're signed in...</h1>
            )
        }
        return this.state.isSignedIn ?
            <Component/> :
            <LoginPage/>
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <LandingPage/>
                    </Route>
                    <Route path="/dashboard" render={() => this.ifUserSignedIn(Dashboard)}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App
