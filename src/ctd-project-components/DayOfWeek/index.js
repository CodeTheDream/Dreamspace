import React from 'react';

class DayOfWeek extends React.Component {
  state = {
    date: new Date()
  }

  componentDidMount() {
    this.timerID = setInterval(()=>
    this.tick(),
    1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }
  render() {
    let date = new Date();
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    let getTheDayOfTheWeek = weekday[date.getDay()];
    let getCurrentTime = this.state.date.toLocaleTimeString();
    return(
      <div className = 'today'>
        <p className = 'style-day'>{getTheDayOfTheWeek}</p>
        <p className = 'style-time'>{getCurrentTime}</p>
      </div>
    )
  }
}

export default DayOfWeek;