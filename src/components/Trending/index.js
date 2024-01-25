import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {AiFillFire} from 'react-icons/ai'
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

class Trending extends Component {
  state = {trendingVideosList: [], apiStatus: apiStatusConstants.initial}

  getTrendingVideosList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/videos/trending`

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
        trendingVideosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  componentDidMount = () => this.getTrendingVideosList()

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
      <li className="trending-video-item-card">
        <img src={thumbnailUrl} className="thumbnail-url" alt="thumbnail url" />
        <div>
          <p className="title">{title}</p>
          <p className="name">{name}</p>
          <div className="views-year-container">
            <p className="name">{viewCount} Views</p>
            <p className="name">{publishedAt}</p>
          </div>
        </div>
      </li>
    )
  }

  renderVideosListSuccessView = () => {
    const {trendingVideosList} = this.state
    return (
      <ul className="trending-video-items-container">
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
            <div className="trending-container">
              <AiFillFire className="trending-icon" />
              <h1 className="trending-text">Trending</h1>
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

export default Trending
