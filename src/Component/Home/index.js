import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="home-bg-container">
      <Header />
      <div className="home-box">
        <h1 className="head-title">Find The job That Fits Your Life</h1>
        <p className="intro">
          Millions of people searching for jobs, salary, information, company
          reviews.Find the job that fits yours abilities and potentials.
        </p>
        <Link to="jobs">
          <button type="button" className="btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
