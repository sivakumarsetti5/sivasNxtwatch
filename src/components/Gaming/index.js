import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaGamepad} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import Sidebar from '../Sidebar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {trendingVideosList: [], apiStatus: apiStatusConstants.initial}

  getTrendingVideosList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/videos/gaming`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = data.videos.map(each => ({
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      console.log(updatedData)
      this.setState({
        trendingVideosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  componentDidMount = () => this.getTrendingVideosList()

  renderVideoItemsList = each => {
    const {id, thumbnailUrl, title, viewCount} = each
    return (
      <li className="gaming-video-item-card">
        <img
          src={thumbnailUrl}
          className="game-thumbnail-url"
          alt="thumbnail url"
        />
        <p className="title">{title}</p>
        <p className="name">{viewCount} Views</p>
      </li>
    )
  }

  renderVideosListSuccessView = () => {
    const {trendingVideosList} = this.state
    return (
      <ul className="gaming-video-items-container">
        {trendingVideosList.map(each => this.renderVideoItemsList(each))}
      </ul>
    )
  }

  renderJobsListFailureView = () => (
    <div className="notfound-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request.Please try again.
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.onClickRetryBtn2}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )

  renderVideosListView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosListSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobsListFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <Header />
        <div className="home-sub-container">
          <Sidebar />
          <div className="home-items-container">
            <div className="trending-container">
              <FaGamepad className="trending-icon" />
              <h1 className="trending-text">Gaming</h1>
            </div>
            <div className="search-video-items-container">
              {this.renderVideosListView()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Gaming
