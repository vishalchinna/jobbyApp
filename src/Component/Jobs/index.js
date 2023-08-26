import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import FilterGroup from '../FilterGroup'
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

class Jobs extends Component {
  state = {profileData: [], jobList: []}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const jobUrl =
      'https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search='
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, option)
    const data = await response.json()
    const profile = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }
    const jobResponse = await fetch(jobUrl, option)
    const jobData = await jobResponse.json()
    const updateData = jobData.jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))
    this.setState({profileData: profile, jobList: updateData})
  }

  renderAllProducts = () => (
    <div className="products-container">
      <div className="search-container">
        <input type="search" placeholder="search" className="search" />
        <button
          type="button"
          className="search-button"
          data-testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    </div>
  )

  render() {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="job-bg-container">
        <Header />
        <div className="all-product-section">
          <div className="filter-container">
            <div className="profile-box">
              <img src={profileImageUrl} alt="profile" className="profile" />
              <h1 className="profile-name">{name}</h1>
              <p className="profile-bio">{shortBio}</p>
            </div>
            <hr />
            <FilterGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
            />
          </div>

          <div className="job-details-container">
            {this.renderAllProducts()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
