import './index.css'

const EmploymentTypeList = props => {
  const {
    employmentTypesList,
    selectedEmploymentId,
    getChangedEmploymentId,
  } = props
  const {employmentTypeId, label} = employmentTypesList
  const onClickCheckBox = () => {
    getChangedEmploymentId(employmentTypeId)
  }
  return (
    <li className="employeeListItemCon">
      <input
        id={label}
        value={selectedEmploymentId}
        type="checkbox"
        className="checkBoxInput"
        onClick={onClickCheckBox}
      />
      <label htmlFor={label} className="employeeTypeLabelTxt">
        {label}
      </label>
    </li>
  )
}
export default EmploymentTypeList
