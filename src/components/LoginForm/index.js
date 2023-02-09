import {Component} from 'react'
import './index.css'

const loginImg =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png'
const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'

class LoginFrom extends Component {
  state = {username: '', password: '', errText: false}

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

    if (response.ok) {
      this.onSuccessLogin()
    } else {
      this.onFailureLogin()
    }
  }

  onSuccessLogin = () => {
    const {history} = this.props
    history.replace('/')
  }

  onFailureLogin = () => {
    this.setState({errText: true})
  }

  errText = () => <p className="err-text">*Username is not found</p>

  render() {
    const {errText} = this.state

    return (
      <div className="bg-container">
        <div className="responsive-container">
          <img className="login-img-lg" src={loginImg} alt="website login" />
          <form className="login-form" onSubmit={this.onSubmitForm}>
            <img className="website-logo" src={websiteLogo} alt="" />
            <img className="login-img-sm" src={loginImg} alt="website login" />
            {this.renderUsernameField()}
            {this.renderPasswordField()}
            <button className="submit-btn" type="submit">
              Login
            </button>
            {errText ? this.errText() : null}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginFrom
