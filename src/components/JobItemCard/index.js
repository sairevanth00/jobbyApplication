import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItemCard = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    title,
    rating,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="cardLinkMainCon">
      <li className="cardMainCon">
        <div className="logoCon">
          <div>
            <img src={companyLogoUrl} alt={title} className="companyLogo" />
          </div>
          <div className="title-rating-con">
            <h1 className="titleTxt">{title}</h1>
            <div className="ratingTxt-star-logo-con">
              <AiFillStar className="starLogo" />
              <p className="ratingTxt">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-job-type-salary-con">
          <div className="location-job-type-Con">
            <div className="location-con">
              <MdLocationOn className="location-logo" />
              <p className="location-txt">{location}</p>
            </div>
            <div className="job-type-con">
              <BsFillBriefcaseFill className="job-logo" />
              <p className="job-type-txt">{employmentType}</p>
            </div>
          </div>
          <p className="package-txt">{packagePerAnnum}</p>
        </div>
        <hr className="jobCard-horizontalLine" />
        <h1 className="description-heading">Description</h1>
        <p className="description-txt">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobItemCard
