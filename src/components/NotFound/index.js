import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div className="notFoundMainCon">
    <Header />
    <div className="notFoundImgCon">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="notfoundImg"
      />
      <h1 className="notFoundHeading">Page Not Found</h1>
      <p className="notFoundDesc">
        we’re sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound
