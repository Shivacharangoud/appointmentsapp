import './index.css'

const AppointmentItem = props => {
  const {details, changeStar} = props
  const {id, name, date, isStared} = details
  const starClicked = () => {
    changeStar(id)
  }

  const starImage = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="list-con">
      <div>
        <p className="para-name">{name}</p>
        <p className="para-time">{date}</p>
      </div>
      <button
        testid="star"
        onClick={starClicked}
        type="button"
        className="extra"
      >
        <img className="image-star" alt="star" src={starImage} />
      </button>
    </li>
  )
}

export default AppointmentItem
