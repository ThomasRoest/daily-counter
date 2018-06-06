import React, { Component } from "react";
import "./App.css";


class ListItem extends Component {
  render() {
    if(!this.props) return null;
    const { id, day, count, handleClick } = this.props;
    return (
      <div className="counter">
      <button onClick={(e) => this.props.deleteDay(e, id)}>X</button>
        <span className="counter-item">{day}</span>
        <span className="counter-item counter-count">{count}</span>
        <button
          className="counter-item btn btn-primary"
          onClick={e => handleClick(e, id)}
        >
          Click
        </button>
      </div>
    )
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.addNewDay = this.addNewDay.bind(this);
    this.deleteDay = this.deleteDay.bind(this);
    this.state = {
      days: []
    };
  }

  componentDidMount() {
    console.log("component did mount")
    const localStorageRef = localStorage.getItem('daily-counter-app')
    if(localStorageRef) {
      this.setState({ days: JSON.parse(localStorageRef) })
    }
  }

  componentDidUpdate() {
    console.log('component did update')
    localStorage.setItem('daily-counter-app', JSON.stringify(this.state.days))
  }

  handleClick(e, id) {
    const days = [...this.state.days];
    const updatedItem = days.find(item => item.id === id);
    updatedItem.count++;
    this.setState({ days: days });
  }

  addNewDay() {
    const newDay = { id: Date.now(), date: new Date().toDateString(), count: 0 };
    const updateddays = [...this.state.days, newDay];
    this.setState({ days: updateddays });
  }

  deleteDay(e, id) {
    console.log(`${id}`)
    
    const currentDays = [...this.state.days];
    
    const days = currentDays.filter(item =>
      item.id !== id
    )
    this.setState({ days })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">counter</header>
        <div>
          {this.state.days.map(day => (
            <ListItem
              id={day.id}
              key={day.id}
              day={day.date}
              count={day.count}
              handleClick={this.handleClick}
              deleteDay={this.deleteDay}
            />
          ))}
        </div>
        <button
          className="btn btn-success btn-lg btn-addnew"
          onClick={this.addNewDay}
        >
          add new day
        </button>
      </div>
    );
  }
}

export default App;
