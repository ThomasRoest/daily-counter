import React, { Component } from "react";
import "./App.css";

const Counter = ({id, day, count, handleClick}) =>
    <div className="counter">
      <span className="counter-item">{day}</span>
      <span className="counter-item">{count}</span>
      <button className="counter-item btn btn-primary"onClick={(e) => handleClick(e, id)}>Click</button>
    </div>

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.addNewDay = this.addNewDay.bind(this);
    this.state = {
      days: [{ id: 1, date: new Date(), count: 0 }, {id: 2, date: new Date(), count: 50 }]
    };
  }

  handleClick(e, id) {
    const days = [...this.state.days]
    const updatedItem = days.find(item => item.id === id)
    updatedItem.count++
    this.setState({ days: days})
  }

  addNewDay() {
    const newDay = { id: Date.now(), date: new Date(), count: 0 };
    const updateddays = [...this.state.days, newDay]
    this.setState({days: updateddays})
  }
 
  render() {
    return (
      <div className="App">
        <header className="App-header">counter</header>
        <div>
          {this.state.days.map(day => (
            <Counter
              id={day.id}
              key={day.id}
              day={day.date.toDateString()}
              count={day.count}
              handleClick={this.handleClick}
            />
          ))}
        </div>
        <button className="btn btn-success btn-lg btn-addnew" onClick={this.addNewDay}>add new day</button>
      </div>
    );
  }
}

export default App;
