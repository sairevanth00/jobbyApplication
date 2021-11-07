import UserProfileDetails from '../UserProfileDetails'
import './index.css'

const FiltersGroup = props => {
  const renderTypeOfEmploymentList = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(type => {
      const {changeActiveTypeOfEmployment, activeTypeOfEmployment} = props
      const onClickTypeOfEmployment = () =>
        changeActiveTypeOfEmployment(type.employmentTypeId)

      return (
        <li key={type.employmentTypeId} className="category-item">
          <input
            value={activeTypeOfEmployment}
            type="checkbox"
            id={type.employmentTypeId}
            onChange={onClickTypeOfEmployment}
          />
          <label className="category-name" htmlFor={type.employmentTypeId}>
            {type.label}
          </label>
        </li>
      )
    })
  }

  const renderTypeofEmployment = () => (
    <div className="employeeTypeMainCon">
      <h1 className="employment-type-heading">Type Of Employment</h1>
      <ul className="employment-type-list">{renderTypeOfEmploymentList()}</ul>
    </div>
  )

  const renderSalaryRangeList = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(salary => {
      const {changeActiveSalaryRange, activeSalaryRange} = props

      const onClickSalaryRange = () =>
        changeActiveSalaryRange(salary.salaryRangeId)

      const salaryRangeClassName =
        activeSalaryRange === salary.salaryRangeId
          ? 'and-above active-salary'
          : 'and-above'

      return (
        <li
          className="salary-item"
          key={salary.salaryRangeId}
          onClick={onClickSalaryRange}
        >
          <input
            value={activeSalaryRange}
            type="radio"
            id={salary.salaryRangeId}
            checked={activeSalaryRange === salary.salaryRangeId}
          />
          <label
            htmlFor={salary.salaryRangeId}
            className={salaryRangeClassName}
          >
            {salary.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRange = () => (
    <div className="salary-range-container">
      <h1 className="salary-range-heading">Salary Range</h1>
      <ul className="salary-range-list">{renderSalaryRangeList()}</ul>
    </div>
  )

  return (
    <div className="filters-group-container">
      <div className="profile-filter-container">
        <UserProfileDetails />
        <hr className="hr-filter" />
        {renderTypeofEmployment()}
        <hr className="hr-filter" />
        {renderSalaryRange()}
      </div>
    </div>
  )
}

export default FiltersGroup
