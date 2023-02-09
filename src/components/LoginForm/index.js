import {Component} from 'react'
import './index.css'

const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'

class LoginFrom extends Component {
  state = {username: '', password: '', errText: ''}

  onChangeUsername = e => this.setState({username: e.target.value})

  onChangePassword = e => this.setState({password: e.target.value})

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <div className="username-field">
        <label className="login-labels" htmlFor="username">
          USERNAME
        </label>
        <input
          id="username"
          className="login-inputs"
          placeholder="Username"
          type="text"
          value={username}
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <div className="password-field">
        <label className="login-labels" htmlFor="password">
          PASSWORD
        </label>
        <input
          id="password"
          className="login-inputs"
          placeholder="Password"
          type="password"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userCredentials = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSuccessLogin()
    } else {
      console.log(data.error_msg)
      this.setState({errText: data.error_msg})
    }
  }

  onSuccessLogin = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const {errText} = this.state

    return (
      <div className="bg-container">
        <div className="responsive-container">
          <img
            className="login-img-lg"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
            alt="website login"
          />
          <form className="login-form" onSubmit={this.onSubmitForm}>
            <img
              className="login-website-logo"
              src={websiteLogo}
              alt="website logo"
            />
            <img
              className="login-img-sm"
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
              alt="website"
            />
            {this.renderUsernameField()}
            {this.renderPasswordField()}
            <button className="submit-btn" type="submit">
              Login
            </button>
            <p className="err-text">{errText}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginFrom
