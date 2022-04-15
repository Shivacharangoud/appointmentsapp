import {Component} from 'react'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    details: [],
    name: '',
    date: '',
    staredValues: false,
  }

  onInputname = event => {
    this.setState({name: event.target.value})
  }

  onInputDate = event => {
    this.setState({date: event.target.value})
  }

  changeStar = id => {
    const {details} = this.state
    const filteredDetails = details.map(each => {
      if (each.id === id) {
        const value = {
          id: each.id,
          name: each.name,
          date: each.date,
          isStared: !each.isStared,
        }
        return value
      }
      return each
    })
    this.setState({details: filteredDetails})
  }

  filterButton = () => {
    this.setState(prevState => ({staredValues: !prevState.staredValues}))
  }

  onAdd = event => {
    event.preventDefault()
    const {name, date} = this.state
    if (name !== '' && date !== '') {
      const newDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
      const newData = {
        id: uuidv4(),
        name,
        date: newDate,
        isStared: false,
      }
      this.setState(prevState => ({details: [...prevState.details, newData]}))
      this.setState({name: '', date: ''})
    }
  }

  render() {
    const {name, date, staredValues} = this.state
    const classNameBlue = staredValues ? 'blue-back' : ''
    let {details} = this.state
    if (staredValues === true) {
      details = details.filter(each => each.isStared)
    }

    return (
      <div className="back-container">
        <div className="card-container">
          <div className="next-con">
            <div>
              <h1 className="heading">Add Appointment</h1>
              <form className="inputs-container">
                <label htmlFor="input">TITLE</label>
                <input
                  onChange={this.onInputname}
                  value={name}
                  id="input"
                  className="input-title"
                  type="text"
                  placeholder="Title"
                />
                <label htmlFor="date">DATE</label>
                <input
                  onChange={this.onInputDate}
                  value={date}
                  id="date"
                  type="date"
                  className="input-date"
                />
                <button
                  onClick={this.onAdd}
                  type="submit"
                  className="add-button"
                >
                  Add
                </button>
              </form>
            </div>
            <img
              className="big-image"
              alt="appointments"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            />
          </div>
          <hr />
          <div className="star-button-con">
            <h1 className="paraa">Appointments</h1>
            <button
              onClick={this.filterButton}
              type="button"
              className={`${classNameBlue} star-button`}
            >
              Starred
            </button>
          </div>
          <ul className="unorder-con">
            {details.map(each => (
              <AppointmentItem
                changeStar={this.changeStar}
                details={each}
                key={each.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
