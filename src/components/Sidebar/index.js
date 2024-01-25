import {Link} from 'react-router-dom'
import {AiFillHome, AiFillFire, AiFillFolderAdd} from 'react-icons/ai'
import {FaGamepad} from 'react-icons/fa'
import './index.css'

const Sidebar = () => (
  <div className="sidebar-container">
    <ul className="sidebar-list-items">
      <li>
        <Link to="/" className="home-icon-container">
          <AiFillHome className="home-icon" />
          <p className="home-text">Home</p>
        </Link>
      </li>
      <li>
        <Link to="trending" className="home-icon-container">
          <AiFillFire className="home-icon" />
          <p className="home-text">Trending</p>
        </Link>
      </li>
      <li>
        <Link to="gaming" className="home-icon-container">
          <FaGamepad className="home-icon" />
          <p className="home-text">Gaming</p>
        </Link>
      </li>
      <li>
        <Link to="savedVideos" className="home-icon-container">
          <AiFillFolderAdd className="home-icon" />
          <p className="home-text">Saved Videos</p>
        </Link>
      </li>
    </ul>
    <div>
      <p className="contact-us-text">CONTACT US</p>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          alt="facebook logo"
          className="facebook-logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
          alt="twitter logo"
          className="facebook-logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
          alt="linked in logo"
          className="facebook-logo"
        />
      </div>
      <p>Enjoy! Now to see your channels and recommendations!</p>
    </div>
  </div>
)

export default Sidebar
