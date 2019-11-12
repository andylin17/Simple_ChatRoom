import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
export class Register extends Component {
    static displayName = Register.name;
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            a: true,
            pictures: [],
            file:'profile'
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.selectedPic = this.selectedPic.bind(this)
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
        this.handleUpload();//呼叫API
    }

    handleInputChange(event) {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    selectedPic = (e) => {
        e.preventDefault();
        let file = e.target.files[0];
        this.setState({ pictures: e.target.files[0] });
    }

    handleUpload = () => {
        const file = this.state.pictures;
        const formdata = new FormData();
        formdata.append('file', file);

        fetch("File/" + this.state.username, {
            method: 'POST',
            body: formdata,
            //headers: {
            //    "Content-Type": "multipart/form-data"
            //}
        }).then(response => response.json())    
        .then(data => {
            this.setState({ file: data.n });
            this.Validate();
        })
        .catch(error => console.log(error));
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col" style={{ height: '10vh' }}>
                        username : &nbsp;
                        <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange.bind(this)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col" style={{ height: '10vh' }}>
                        password : &nbsp;
                        <input type="text" name="password" value={this.state.password} onChange={this.handleInputChange.bind(this)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col" style={{ height: '50vh' }}>
                            Profile : &nbsp;
                        <form method="post" encType="multipart/form-data" action="File">
                            <input type="file" accept='image/*' onChange={this.selectedPic} />
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col" style={{ height: '10vh' }}>
                        <form onSubmit={this.handleSubmit}>
                            <button className="btn btn-info" >submit</button>
                        </form>
                    </div>
                </div>
            </div>
            )
    }

    Validate() {

        ///////////////
        const js = JSON.stringify({ Account: this.state.username, Password: this.state.password, Picture: this.state.file, index:[] });
        const context = {
            method: "post", headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: js
        };
        const response = fetch(`Loginfo`, context);
        const data = response.then(res => res.json());
        data.then(d => {
            this.setState({ isAuthenticate: d });
            if (this.state.isAuthenticate) {
                alert("success");
                this.props.history.push("/Login");
            }
            else
                alert("your username has been use!!");
        });
    }

}