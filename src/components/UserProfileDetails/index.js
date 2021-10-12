import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

class UserProfileDetails extends Component {
  state = {
    userData: {},
    isLoading: false,
  }

  componentDidMount() {
    this.fetchedUserDetails()
  }

  renderFetchedProfileData = () => this.fetchedUserDetails()

  renderFailureView = () => (
    <div className="profileFailureViewCon">
      <button
        type="button"
        className="retryBtn"
        onClick={this.renderFetchedProfileData}
      >
        Retry
      </button>
    </div>
  )

  fetchedUserDetails = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/profile`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedUserData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        isLoading: false,
        userData: updatedUserData,
      })
    }
    if (response.status === 404) {
      this.renderFailureView()
    }
  }

  renterProfileDetails = () => {
    const {userData} = this.state
    return (
      <div className="profileCon">
        <div className="profileIcon">
          <img
            src={userData.profileImageUrl}
            alt="profile"
            className="userProfileAvatar"
          />
        </div>
        <h1 className="profileHeading">{userData.name}</h1>
        <p className="profileProfession">{userData.shortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renterProfileDetails()
  }
}
export default UserProfileDetails
