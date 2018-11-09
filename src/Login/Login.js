import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import './Login.css';

class Login extends Component {
  state = {
    email:'',
    password:'',
    message:'',
    error:false

  }
  handleChange = (event) => {
    const Email = this.refs.Email.value;
    const Password = this.refs.Password.value;
    this.setState({ email: Email,password:Password});
  }
  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

  axios.post(`https://classicdsmotus-123.herokuapp.com/login`, user)
    .then((res) => {
      const user = res.data;
      this.setState({message:res.data.message,error:true});
      if(res.data.status === 200){
          const testObject = user.userToken;
          // Put the object into storage
          localStorage.setItem('testObject', testObject);
          this.props.history.push('/');
      }
    })
  }
  render() {
    const {message} = this.state;
    return (
      <div className="Login-body-container">
        <main>
        <div class="left">
      <img src={`https://images.unsplash.com/photo-1509310257498-b97f8488bf03?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6faa5ed40dc7e9e828bd358799983c53&auto=format&fit=crop&w=500&q=80`}/>
        <h1>
                Login 
            <section style={{fontFamily:"Roboto",fontSize:'20px'}}><small>Motus Technology<a href="/" style={{paddingLeft: '23px',textDecoration:'none',color:'#9b3a03'}}><small>view all</small></a></small><br/><small style={{color:'red',fontSize:'13px',fontWeight:'bold'}}>{message}</small></section>
        </h1>
        <form onSubmit={this.handleSubmit}>
        <ul>
          <li>
            <p>
              <input type="text" ref="Email" placeholder="Email" class="input" onChange={this.handleChange}/>
            </p>
          </li>
          <li>
            <p>
                <input type="password" ref="Password" placeholder="Password" class="input" onChange={this.handleChange}/>
            </p>
          </li>
          <li>
            <div>
              <button type="submit" className="login-submit"><b style={{fontWeight: 'bold',color:' #fff'}}>Submit</b></button>
            </div>
          </li>
        </ul>
        </form>
        </div>
    <div class="right">
      <img src={`https://images.unsplash.com/photo-1540316019888-86d7de0e8781?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0b80cb2c833f4321c9aae11eb0576eab&auto=format&fit=crop&w=1268&q=80`} alt="autumn leaves"/>
    </div>
    </main>
      </div>
    );
  }
}

export default Login;
