import React, {Component} from "react";
export default class NotificationPref extends Component {

  constructor ()
  {
    super()
    this.state={
      phoneNumNum: "",
      valEmail:""
    }
    this.validateEmail=this.validateEmail.bind(this);
    this.validate=this.validate.bind(this);
    this.validPhone=this.validPhone.bind(this);
    this.handleNumNumChange=this.handleNumNumChange.bind(this);
    this.handleEmailChange=this.handleEmailChange.bind(this);
    this.adaptiveParagraph=this.adaptiveParagraph.bind(this);
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validate(email)
  {
    if (this.validateEmail(email))
    {
      //valid
      this.setState({
        valEmail:"✔"
      })
    }
    else
    {
      this.setState({
        valEmail:"X"
      })
    }
    return false;
  }

  validPhone(value)
  {
    if(value)
    {
      if(value.length>9)
      {
        return true
      }
      else
      {
        return false
      }
    }
  }
  valPhone(value)
  {
    if(this.validPhone(value))
    {
      this.setState({
        valPhone:"✔"
      })
    }
    else
    {
      this.setState({
        valPhone:"X"
      })
    }
  }

  handleNumNumChange(value)
  {
    this.setState({
      phoneNumNum: value.match(/\d/g)
    })
    this.valPhone(value.match(/\d/g))
  }

  handleEmailChange(value)
  {
    this.setState({
      email: value
    })
    this.validate(value)
  }

  adaptiveParagraph()
  {
    if(this.validPhone(this.state.phoneNumNum)&& this.validateEmail(this.state.email))
    {
      return " text and email "
    }
    else if(this.validPhone(this.state.phoneNumNum))
    {
      return " text "
    }
    else if(this.validateEmail(this.state.email))
    {
      return " email "
    }
  }

  render()
  {
    const messageParagraph=(<div>
                            <h2>Awesome! We'll message you via{this.adaptiveParagraph()}10 minutes before you should
                              leave for the airport. Would you like a reminder to be sent the morning of
                              the pickup as well? </h2>
                            <button onClick={this.props.show}>Yes</button>
                            <button onClick={this.props.show}>No</button>
                          </div>)

    return (
      <div style={{'display': `${this.props.display}`}}>
        <h1>How do you want us to send you a reminder for the pickup?</h1>
        <h2>Do you want us to send you a text? If so give us a number to use.</h2>
        <input type="tel" onChange={(e)=>{this.handleNumNumChange(e.target.value)}} placeholder="888-888-8888"/>{this.state.phoneNumNum?this.state.valPhone:null}
        <h2>Would you like an email as a reminder? We can do that too!</h2>
        <input onChange={(e)=>{this.handleEmailChange(e.target.value)}} placeholder="example@email.com"/>{this.state.email ? this.state.valEmail:null}
        <br />

// friday-notifications branch
//         {this.state.phoneNumNum ||this.state.email ? messageParagraph:null}
//         <button onClick={this.props.show}>Yes</button>
//         <button onClick={this.props.show}>No</button>

        

        {this.validPhone(this.state.phoneNumNum)|| this.validateEmail(this.state.email)? messageParagraph:null}

      </div>
    );
  }
}
