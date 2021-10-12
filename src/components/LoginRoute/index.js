import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showSubmitErrorMsg: false,
    errorMsg: '',
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitErrorMsg: true, errorMsg})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
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

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  onChangeUsername = e => {
    this.setState({username: e.target.value})
  }

  renderUserNameInputEl = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="labelTxt">
          USERNAME
        </label>
        <input
          id="username"
          value={username}
          type="text"
          className="usernameInputEl"
          placeholder="Username"
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderUserPasswordInputEl = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="labelTxt">
          PASSWORD
        </label>
        <input
          value={password}
          id="password"
          type="password"
          className="passwordInputEl"
          placeholder="Password"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {showSubmitErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginMainCon">
        <form className="formCon" onSubmit={this.onSubmitForm}>
          <div className="appLogoCon">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="appLogoImg"
            />
          </div>
          {this.renderUserNameInputEl()}
          {this.renderUserPasswordInputEl()}
          <div className="formSubmitBtnCon">
            <button type="submit" className="loginBtn">
              Login
            </button>
            {showSubmitErrorMsg && <p className="errorMsgTxt">*{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}
export default LoginRoute
