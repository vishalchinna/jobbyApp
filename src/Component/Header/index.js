import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const removeToken = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
        alt="website logo"
        className="header-logo"
      />
      <div className="link-box">
        <Link to="/">
          <p className="links">Home</p>
        </Link>
        <Link to="/jobs">
          <p className="links">Jobs</p>
        </Link>
      </div>
      <button type="button" onClick={removeToken} className="logOut">
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
