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
    <li className="salaryRangeListItemCon" key={salaryRangeId}>
      <input
        id={label}
        type="radio"
        name="salaryRange"
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
