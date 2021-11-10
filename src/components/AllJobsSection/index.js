import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import FiltersGroup from '../FiltersGroup'

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
    selectedEmploymentId: [],
    selectedSalaryRange: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput, selectedEmploymentId, selectedSalaryRange} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${selectedEmploymentId.join()}&minimum_package=${selectedSalaryRange}&search=${searchInput}`
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

  onClickRetry = () => this.getJobs()

  getChangedSalaryRange = salaryRangeId => {
    this.setState({selectedSalaryRange: salaryRangeId}, this.getJobs)
  }

  getChangedEmploymentId = employmentId => {
    this.setState(
      prevState => ({
        selectedEmploymentId: [...prevState.selectedEmploymentId, employmentId],
      }),
      this.getJobs,
    )
  }

  onChangeSearchInput = event => {
    if (event.target.value !== undefined) {
      this.setState({searchInput: event.target.value}, this.getJobs)
    }
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

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
          className="retry-button"
          onClick={this.onClickRetry}
        >
          Retry
        </button>
      </div>
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
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
        />
        <button
          type="button"
          className="search-btn"
          testid="searchButton"
          onClick={this.onChangeSearchInput}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderLargeDisplaySearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
        />
        <button
          type="button"
          className="search-btn"
          testid="searchButton"
          onClick={this.onChangeSearchInput}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

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

  removeAllFilters = () => {
    this.setState({
      searchInput: '',
      selectedEmploymentId: [],
      selectedSalaryRange: '',
    })
  }

  render() {
    const {selectedEmploymentId, selectedSalaryRange} = this.state
    return (
      <div className="jobsMainCon">
        <div className="jobsBodyCon">
          <div className="search-container">{this.renderSearchInput()}</div>

          <div className="desktopLeftCon">
            <div className="filtersGroupCon">
              <FiltersGroup
                activeSalaryRange={selectedSalaryRange}
                activeTypeOfEmployment={selectedEmploymentId}
                salaryRangesList={salaryRangesList}
                employmentTypesList={employmentTypesList}
                changeActiveSalaryRange={this.getChangedSalaryRange}
                changeActiveTypeOfEmployment={this.getChangedEmploymentId}
                removeAllFilters={this.removeAllFilters}
              />
            </div>
            <div className="jobDetailsMainCon">
              <div className=".larger-device-search-container">
                {this.renderSearchInput()}
              </div>
              <div>{this.renderFetchedAllJobDetailsList()}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default JobsRoute
