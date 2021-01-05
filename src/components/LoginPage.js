import React from 'react'

class LoginPage extends React.Component {
    componentDidMount() {
        window.gapi.load('signin2', () => {
            window.gapi.signin2.render('login-button')
        })
    }

    render() {
        return (
            <div className="container">
                <div id="login-button">Sign in with Google</div>
            </div>
        )
    }
}

export default LoginPage