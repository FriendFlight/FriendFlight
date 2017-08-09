import React, {Component} from "react";

export default class NotificationPref extends Component
{
  render()
  {
    return (
      <div style={{'display': `${this.props.display}`}}>
        <h1>How would you like us to let you know when to leave?</h1>
        <h2>A messsage the morning of your trip</h2>
        <input type="checkbox" checked></input>
        <h2>A messsage 10 min of when to leave</h2>
        <input type="checkbox" checked></input>
        <h2>What number should we text?</h2>
        <input placeholder="888-888-8888" />
        <h2>What email should we use?</h2>
        <input placeholder="Email@example.com"/>
        <br />
        <button onClick={this.props.show}>Submit</button>
        
      </div>
    );
  }
}
