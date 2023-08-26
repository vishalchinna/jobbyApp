import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', loginStatus: false, errorMsg: ''}

  renderUsername = event => {
    this.setState({username: event.target.value})
  }

  renderPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({loginStatus: true, errorMsg})
  }

  onSubmitForm = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {errorMsg, loginStatus} = this.state

    return (
      <div className="login-container">
        <div className="login-box">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <div className="user-box">
            <label className="label" htmlFor="user">
              USERNAME
            </label>
            <input
              type="text"
              id="user"
              placeholder="Username"
              className="input"
              onChange={this.renderUsername}
            />
          </div>
          <div className="password-box">
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="input"
              onChange={this.renderPassword}
            />
          </div>
          <button type="button" onClick={this.onSubmitForm} className="btn">
            Login
          </button>
          {loginStatus && <p className="error">{errorMsg}</p>}
        </div>
      </div>
    )
  }
}

export default LoginForm
