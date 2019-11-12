import React, { Component,useState } from 'react';
import { FormGroup, Form, FormText } from 'reactstrap'
import Chat from './Chat';
import { withRouter} from 'react-router';

export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password: '',
            isAuthenticate: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        //this.Validate();//呼叫API
        
    }

    handleSubmit(e) {
        e.preventDefault();

        var { username, password } = this.state;

        if (username == "") {
            alert("insert username");
            return false;
        }
        if (password == "") {
            alert("insert password");
            return false;
        }

        this.Validate(username, password);//呼叫API
    }
    handleInputChange(event) {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    render() {

        return (
            <div className="container" style={{ height: '100vh' }}>

                <div className="row" style={{ height: '10vh' }}>
                    <div className="col"></div>
                </div>
                <div className="row" style={{ height: '70vh' }}>
                    <div className="col-sm-8" style={{
                        overflow: 'hidden',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(https://cdn.pixabay.com/photo/2016/11/15/07/55/feedback-1825508_1280.jpg)`}}>
                    </div>
                    <div className="col-sm-4">
                        <div className="row" style={{ height: '10vh' }}>
                        </div>
                        <div className="current-target">
                            <input name="username" type="text" placeholder="username" value={this.state.username} onChange={this.handleInputChange.bind(this)} /><br />
                            <input name="password" type="password" placeholder="password"  value={this.state.password} onChange={this.handleInputChange.bind(this)} /><br />
                            <div className="row">
                                <div className="col-sm-4">
                                    <form onSubmit={this.open.bind(this)}>
                                        <button className="btn btn-secondary" >register</button>
                                    </form>
                                    </div>
                                <div className="col-sm-8">
                                    <form onSubmit={this.handleSubmit}>
                                        <button className="btn btn-info" >login</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>)
    }

    Validate(a, b ) {

        const js = JSON.stringify({ Account: a, Password: b });
        const context = {
            method: "post", headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: js
        };
        const arg = `?account= ${a} &password= ${b} `;
        const response = fetch(`Loginfo/${a}/${b}`);
        
        const data = response.then(res => res.json());
        data.then(d => {
            this.setState({ isAuthenticate: d.Account == null ? false : true });
            if (this.state.isAuthenticate) {
                alert("login");
                sessionStorage.setItem("user", d.Account);
                sessionStorage.setItem("pic", process.env.PUBLIC_URL + '/Image/' + d.Picture);
                this.props.history.push("/Chat");
            }
            else
                alert("帳號或密碼有誤!");
                });
    }
    open() {
        this.props.history.push("/Register");
    }

}
