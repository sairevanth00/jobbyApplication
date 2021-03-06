import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobsItem = props => {
  const {similarJobsData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobsData
  return (
    <li className="similarJobListItemCon">
      <div className="similarLogoCon">
        <div>
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="companyLogoSimilar"
          />
        </div>
        <div className="title-rating-similar-con">
          <h3 className="similarTitleTxt">{title}</h3>
          <div className="similar-ratingTxt-star-logo-con">
            <AiFillStar className="starLogo" />
            <p className="ratingTxtSimilar">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similarCardDescHeading">Description</h1>
      <p className="similarDescTxt">{jobDescription}</p>
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
    </li>
  )
}
export default SimilarJobsItem
