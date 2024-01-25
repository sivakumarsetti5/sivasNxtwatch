import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'
import './index.css'
import Header from '../Header'
import Sidebar from '../Sidebar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    videosList: [],
    apiStatus: apiStatusConstants.initial,
    isPremium: true,
  }

  getHomeVideos = async () => {
    const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/videos/all`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok) {
      const updatedData = data.videos.map(each => ({
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
      }))
      this.setState({
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  componentDidMount = () => this.getHomeVideos()

  renderVideoItemsList = each => {
    const {
      id,
      name,
      profileImageUrl,
      publishedAt,
      thumbnailUrl,
      title,
      viewCount,
    } = each
    return (
      <li className="video-item-card" key={id}>
        <img
          src={thumbnailUrl}
          className="thumbnail-url"
          alt="video thumbnail"
        />
        <div className="profile-details-container">
          <img
            src={profileImageUrl}
            className="profile-image"
            alt="channel logo"
          />
          <div>
            <p className="title">{title}</p>
            <p className="name">{name}</p>
            <div className="views-year-container">
              <p className="name">{viewCount} Views</p>
              <p className="name">{publishedAt}</p>
            </div>
          </div>
        </div>
      </li>
    )
  }

  renderVideosListSuccessView = () => {
    const {videosList} = this.state
    return (
      <ul className="video-items-container">
        {videosList.map(each => this.renderVideoItemsList(each))}
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

  onClickPremium = () => {
    this.setState({isPremium: false})
  }

  render() {
    const {isPremium} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="home-container">
        <Header />
        <div className="home-sub-container">
          <Sidebar />
          <div className="home-items-container">
            {isPremium && (
              <div className="premium-main-container" data-testid="banner">
                <div className="nxt-watch-premium-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="nxt watch logo"
                    className="website-logo"
                  />
                  <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                  <button type="button" className="get-it-now-btn">
                    GET IT NOW
                  </button>
                </div>
                <button
                  type="button"
                  data-testid="close"
                  className="close-btn"
                  onClick={this.onClickPremium}
                >
                  <AiOutlineClose />
                </button>
              </div>
            )}
            <div className="search-video-items-container">
              <div className="search-main-cont">
                <div className="search-container">
                  <input
                    type="search"
                    placeholder="Search"
                    className="search-element"
                    onChange={this.onChangeSearchInput}
                  />
                </div>
                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-btn"
                  onClick={this.onClickSearchBtn}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.renderVideosListView()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
