import React from 'react';

export default class LoginForm extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            uname: "",
            pword: ""
        }
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    change(event) {
        if(event.target.name === "uname") {
            this.setState({
                uname:event.target.value
            })
        }
        if (event.target.name === "pword") {
            this.setState({
                pword: event.target.value
            })
        }
    }
    submit (event) {
        event.preventDefault();
        let user =  {
            "uname":this.state.uname,
            "pword":this.state.pword
        }
        if (event.target.name === "Register") {
            this.props.onRegister(user);
        }
        if (event.target.name === "Login") {
            this.props.onLogin(user);
        }
    }

    render() {
        return(
            <form>
                Username:
                    <input type="text"
                    name="uname"
                    onChange={this.change}
                    value={this.state.uname}/>
            <br/>
            Password:
            <input  type="password"
                    name="pword"
                    onChange={this.change}
                    value={this.state.pword}/>
            <br/>
            <input  type="button"
                    name="Register"
                    onClick={this.submit}
                    value="Register"/>
            <input  type="button"
                    name="Login"
                    onClick={this.submit}
                    value="Login"/></form>
        )
    }
}