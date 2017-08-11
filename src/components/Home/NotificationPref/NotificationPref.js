import React, {Component} from "react";

export default class NotificationPref extends Component {

constructor () {
  super()
  this.state={
    phoneNumNum: "",
    email: ""
  }
}

  handleNumNumChange(value){
    this.setState({
      phoneNumNum: value 
    })
  }

    handleEmailChange(value){
    this.setState({
      email: value 
    })
  }

    adaptiveParagraph() {
      if(this.state.phoneNumNum && this.state.email){
        return " text and email "
      }else if(this.state.phoneNumNum){
        return " text "
      }else if(this.state.email){
        return " email "
      }
    }

  render()
  {
    const messageParagraph=(<h2>Awesome! We'll message you via{this.adaptiveParagraph()}10 minutes before you should 
          leave for the airport. Would you like a reminder to be sent the morning of 
          the pickup as well? </h2>)


    return (
      <div style={{'display': `${this.props.display}`}}>
        <h1>How do you want us to send you a reminder for the pickup?</h1>
        <h2>Do you want us to send you a text? If so give us a number to use.</h2>
        <input onChange={(e)=>{this.handleNumNumChange(e.target.value)}} placeholder="888-888-8888"/>
        <h2>Would you like an email as a reminder? We can do that too!</h2>
        <input onChange={(e)=>{this.handleEmailChange(e.target.value)}} placeholder="example@email.com"/>
        <br />
        {this.state.phoneNumNum ||this.state.email ? messageParagraph:null}
        <button onClick={this.props.show}>Yes</button>
        <button onClick={this.props.show}>No</button>

        
      </div>
    );
  }
}
