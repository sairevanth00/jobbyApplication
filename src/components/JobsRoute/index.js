import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BiSearch} from 'react-icons/bi'
import Header from '../Header'
import EmploymentTypeList from '../EmploymentTypeList'
import SalaryRangeListItem from '../SalaryRangeListItem'
import UserProfileDetails from '../UserProfileDetails'

import JobItemCard from '../JobItemCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsRoute extends Component {
  state = {
    searchInput: '',
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    selectedEmploymentId: '',
    selectedSalaryRange: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  renderFetchedJobsData = () => this.getJobs()

  renderJobsFailureView = () => (
    <div className="emptyListMainCon">
      <div className="emptyListImgCon">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="emptyListImg"
        />
      </div>
      <h1 className="emptyListMainHeading">Oops! Something Went Wrong</h1>
      <p className="emptyListDesc">
        We cannot seem to find the page you are looking for.
      </p>
      <div>
        <button
          type="button"
          className="retryBtn"
          onClick={this.renderFetchedJobsData}
        >
          Retry
        </button>
      </div>
    </div>
  )

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput, selectedEmploymentId, selectedSalaryRange} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${selectedEmploymentId}&minimum_package=${selectedSalaryRange}&search=${searchInput}`
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
      const updatedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        id: eachJob.id,
        packagePerAnnum: eachJob.package_per_annum,
        title: eachJob.title,
        rating: eachJob.rating,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobsList: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderEmptyListView = () => (
    <div className="emptyListMainCon">
      <div className="emptyListImgCon">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="emptyListImg"
        />
      </div>
      <h1 className="emptyListMainHeading">No Jobs Found</h1>
      <p className="emptyListDesc">
        we could not found any jobs. try other filters
      </p>
    </div>
  )

  renderFetchedJobDetailsList = () => {
    const {jobsList} = this.state
    return jobsList.length > 0 ? (
      <ul className="jobItemListCon">
        {jobsList.map(eachItem => (
          <JobItemCard jobDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    ) : (
      this.renderEmptyListView()
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getChangedSalaryRange = salaryRangeId => {
    this.setState({selectedSalaryRange: salaryRangeId}, this.getJobs)
  }

  renderSalaryRange = () => {
    const {selectedSalaryRange} = this.state
    return (
      <div className="salaryRangeListMainCon">
        <h1 className="salaryRangeTxt">Salary Range</h1>
        <ul className="salaryRangeListCon">
          <form onChange={this.getSelectedSalaryId}>
            {salaryRangesList.map(eachItem => (
              <SalaryRangeListItem
                salaryRangeListData={eachItem}
                key={eachItem.salaryRangeId}
                selectedSalaryRange={selectedSalaryRange}
                getChangedSalaryRange={this.getChangedSalaryRange}
              />
            ))}
          </form>
        </ul>
      </div>
    )
  }

  getChangedEmploymentId = employmentId => {
    this.setState({selectedEmploymentId: employmentId}, this.getJobs)
  }

  renderTypeOfEmployment = () => {
    const {selectedEmploymentId} = this.state
    return (
      <div className="employmentTypeCon">
        <h1 className="employmentHeading">Type of Employment</h1>
        <ul className="employmentListCon">
          {employmentTypesList.map(eachItem => (
            <EmploymentTypeList
              employmentTypesList={eachItem}
              key={eachItem.employmentTypeId}
              selectedEmploymentId={selectedEmploymentId}
              getChangedEmploymentId={this.getChangedEmploymentId}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderUserProfile = () => <UserProfileDetails />

  enterSearchInput = () => this.getJobs()

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.enterSearchInput()
    }
  }

  onChangeSearchInput = e => {
    this.setState({searchInput: e.target.value}, this.getJobs)
  }

  renderSearchInputDesktop = () => {
    const {searchInput} = this.state
    return (
      <div className="searchInputElConDesktop">
        <input
          value={searchInput}
          type="search"
          className="searchInputEl"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
        />
        <button
          type="button"
          className="searchIconCon"
          testid="searchButton"
          onClick={this.onEnterSearchInput}
        >
          <BiSearch className="searchIcon" />
        </button>
      </div>
    )
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="searchInputElCon">
        <input
          value={searchInput}
          type="search"
          className="searchInputEl"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
        />
        <button
          type="button"
          className="searchIconCon"
          testid="searchButton"
          onClick={this.onEnterSearchInput}
        >
          <BiSearch className="searchIcon" />
        </button>
      </div>
    )
  }

  renderFetchedAllJobDetailsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderFetchedJobDetailsList()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobsMainCon">
        <Header />
        <div className="jobsBodyCon">
          <div className="desktopLeftCon">
            {this.renderSearchInput()}
            {this.renderUserProfile()}
            <hr className="horizontalLine" />
            {this.renderTypeOfEmployment()}
            <hr className="horizontalLine" />
            {this.renderSalaryRange()}
            <div className="jobDetailsMainCon">
              {this.renderFetchedAllJobDetailsList()}
            </div>
          </div>
          <div className="desktopView">
            {this.renderSearchInputDesktop()}
            <div className="jobDetailsMainConDesktop">
              {this.renderFetchedAllJobDetailsList()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default JobsRoute
