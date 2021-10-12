import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="homeMainCon">
      <Header />
      <div className="homeBodyCon">
        <h1 className="homeMainHeading">Find the Job That Fits Your Life</h1>
        <p className="homeDesc">
          Millions of people are searching for jobs, salary information,
          <br /> company reviews.Find th job that fits your <br />
          abilities and potential.
        </p>
        <div>
          <Link to="/jobs" className="findJobsLink">
            <button type="button" className="findJobsBtn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Home
