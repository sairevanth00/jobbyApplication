import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Cookies from 'js-cookie'
import SimilarJobs from '../SimilarJobsItem'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
    skillsListData: [],
  }

  componentDidMount() {
    this.getJobItemData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.job_details.company_logo_url,
    companyWebsiteUrl: data.job_details.company_website_url,
    employmentType: data.job_details.employment_type,
    id: data.job_details.id,
    jobDescription: data.job_details.job_description,
    lifeAtCompanyDescription: data.job_details.life_at_company.description,
    lifeAtCompanyImageUrl: data.job_details.life_at_company.image_url,
    location: data.job_details.location,
    packagePerAnnum: data.job_details.package_per_annum,
    rating: data.job_details.rating,
  })

  getFormattedSimilarData = similarJobs => ({
    companyLogoUrl: similarJobs.company_logo_url,
    employmentType: similarJobs.employment_type,
    id: similarJobs.id,
    jobDescription: similarJobs.job_description,
    location: similarJobs.location,
    rating: similarJobs.rating,
    title: similarJobs.title,
  })

  getJobItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData)
      const updatedSimilarJobsData = fetchedData.similar_jobs.map(
        eachSimilarJob => this.getFormattedSimilarData(eachSimilarJob),
      )
      const updatedSkillsListData = fetchedData.job_details.skills.map(
        eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        }),
      )
      this.setState({
        jobData: updatedData,
        similarJobsData: updatedSimilarJobsData,
        skillsListData: updatedSkillsListData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="job-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="job-details-error-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="error-view-image"
      />
      <h1 className="job-Item-not-found-heading">Oops! Something Went Wrong</h1>
      <p className="job-Item-not-found-desc">
        We cannot seem to find the page you are looking for.
      </p>
      <Link to="/jobs">
        <button type="button" className="button">
          Retry
        </button>
      </Link>
    </div>
  )

  renderJobDetailsView = () => {
    const {jobData, similarJobsData, skillsListData} = this.state
    return (
      <>
        <div className="cardMainCon">
          <div className="logoCon">
            <div>
              <img
                src={jobData.companyLogoUrl}
                alt={similarJobsData.title}
                className="companyLogo"
              />
            </div>
            <div className="title-rating-con">
              <h3 className="titleTxt">{jobData.title}</h3>
              <div className="ratingTxt-star-logo-con">
                <AiFillStar className="starLogo" />
                <span className="ratingTxt">{jobData.rating}</span>
              </div>
            </div>
          </div>
          <div className="location-job-type-salary-con">
            <div className="location-job-type-Con">
              <div className="location-con">
                <MdLocationOn className="location-logo" />
                <p className="spItem-location-txt">{jobData.location}</p>
              </div>
              <div className="job-type-con">
                <BsFillBriefcaseFill className="job-logo" />
                <p className="spItem-job-type-txt">{jobData.employmentType}</p>
              </div>
            </div>
            <p className="package-txt">{jobData.packagePerAnnum}</p>
          </div>
          <hr className="jobCard-horizontalLine" />
          <div className="descriptionCon">
            <p className="description-heading">Description</p>
            <span>
              <a href={jobData.companyWebsiteUrl} className="webLinkCon">
                Visit <FiExternalLink className="companyWebSiteLink" />
              </a>
            </span>
          </div>
          <p className="itemDetails-description-txt">
            {jobData.jobDescription}
          </p>
          <p className="description-heading">Skills</p>
          <ul className="skillsListCon">
            {skillsListData.map(eachSkill => (
              <li className="skillItemCon">
                <img
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                  className="skillImg"
                />
                <p className="skillName">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <p className="description-heading">Life at Company</p>
          <div className="jobDescContainer">
            <p className="lifeAtCompanyDesc">
              {jobData.lifeAtCompanyDescription}
            </p>
            <div className="lifeAtCompanyImgCon">
              <img
                src={jobData.lifeAtCompanyImageUrl}
                alt="lifeAtDataImg"
                className="lifeAtCompanyImg"
              />
            </div>
          </div>
        </div>
        <h2 className="similarJobsHeading">Similar Jobs</h2>
        <ul className="similarJobsListCon">
          {similarJobsData.map(eachJobItem => (
            <SimilarJobs similarJobsData={eachJobItem} key={eachJobItem.id} />
          ))}
        </ul>
      </>
    )
  }

  renderJobItemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="cardItemMainContainer">
          {this.renderJobItemDetails()}
        </div>
      </>
    )
  }
}
export default JobItemDetails
