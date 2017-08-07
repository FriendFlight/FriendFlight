import React, {Component} from "react";

export default class NotificationPref extends Component
{
  render()
  {
    return (
      <div>
        <h1>How would you like us to let you know when to leave?</h1>
        <h2>A messsage the morning of your trip</h2>
        <input type="checkbox" checked></input>
        <h2>A messsage 10 min of when to leave</h2>
        <input type="checkbox" checked></input>
        <h2>Send a text?</h2>
        <input placeholder="888-888-8888" />
        <h2>Send an email?</h2>
        <input placeholder="Email@example.com"/>
        <br />
        <button>Submit</button>
        <h1>Awesome, weve got everything we need to make sure you leave on time!</h1>
        <h1>We will be in touch!</h1>
      </div>
    );
  }
}
