import './index.css'

const FilterGroup = prop => {
  const renderEmployment = () => {
    const {employmentTypesList} = prop
    console.log(employmentTypesList)
  }

  return <div className="">{renderEmployment()}</div>
}

export default FilterGroup
