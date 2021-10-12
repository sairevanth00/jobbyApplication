import './index.css'

const SalaryRangeListItem = props => {
  const {
    salaryRangeListData,
    selectedSalaryRange,
    getChangedSalaryRange,
  } = props
  const {label, salaryRangeId} = salaryRangeListData
  const onChangeRadioBtn = () => {
    getChangedSalaryRange(salaryRangeId)
  }

  return (
    <li className="salaryRangeListItemCon">
      <input
        id={label}
        type="radio"
        value={selectedSalaryRange}
        className="radioBtnEl"
        onChange={onChangeRadioBtn}
      />
      <label htmlFor={label} className="radioBtnLabelTxt">
        {label}
      </label>
    </li>
  )
}

export default SalaryRangeListItem
