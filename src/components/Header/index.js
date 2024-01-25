import './index.css'
import {Link} from 'react-router-dom'
import {HiMoon} from 'react-icons/hi'

const Header = () => (
  <nav className="nav-container">
    <Link to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        alt="website logo"
        className="website-logo"
      />
    </Link>

    <div className="nav-sub-container">
      <button type="button" data-testid="theme" className="mode-btn">
        <HiMoon className="dark-mode-image" />
      </button>

      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
        alt="profile"
        className="profile-img"
      />
      <button type="button" className="logout-btn">
        Logout
      </button>
    </div>
  </nav>
)

export default Header
