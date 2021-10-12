import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <header className="headerCon">
      <div className="appLogoCon">
        <Link to="/" className="headerAppLogo">
          <button type="button" className="headerAppLogoImgCon">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="headerAppLogoImg"
            />
          </button>
        </Link>
      </div>
      <div className="navLinksCon">
        <p className="navLinkTxt">
          <Link to="/" className="linkCon">
            Home
          </Link>
        </p>
        <p className="navLinkTxt">
          <Link to="/jobs" className="linkCon">
            Jobs
          </Link>
        </p>
      </div>
      <div className="logoutBtnCon">
        <button type="button" className="logoutBtn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <ul className="header-mobile-view-con">
        <li className="linkCon">
          <Link to="/" className="mobileLink">
            <AiFillHome className="mobileViewImgLogo" />
          </Link>
        </li>
        <li className="linkCon">
          <Link to="/jobs" className="mobileLink">
            <BsFillBriefcaseFill className="mobileViewImgLogo" />
          </Link>
        </li>
        <li className="linkCon">
          <button type="button" className="mobileLink" onClick={onClickLogout}>
            <FiLogOut className="mobileViewImgLogo" />
          </button>
        </li>
      </ul>
    </header>
  )
}
export default withRouter(Header)
