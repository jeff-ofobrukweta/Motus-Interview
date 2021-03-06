import React, { Component } from 'react';
import axios from 'axios';
import './Edit.css';

class Edit extends Component {
    constructor(props){
        super(props);
    }
        state ={
            updatawnd:''
        }
    handleEdit=(event)=>{
        event.preventDefault();
        const {a,b,c,d,e,f,g,pics1,pics2} = this.refs;
        const user ={
            BuisnessName :a.value,
            BuisnessCategory:b.value,
            BuisnessDescription :g.value ,
            ConactUrl :c.value,
            BuisnessEmail: e.value,
            BuisnessPhonenumber :d.value,
            BuisnessAddress: f.value,
            pictureUrl1 :pics1.value,
            pictureUrl2: pics2.value
        }
            axios.post(`http://localhost:1337/updateProduct/${this.props.propFieldvalue}`,user)
              .then(res => {
                if(res.data===200){
                    this.setState({updatawnd:'Update Sucessful'})
                    window.location.reload();
                }
              })
            
    }
  render() {
    const {updatawnd} = this.state;
    return (
      <div className="modal-body-container">
          <div className="contain">
            <div className="wrapper">
                <div className="contacts">
                <h3>Our contacts</h3>
                <ul>
                    <li>Yaba Jibowu St.</li>
                    <li>+234-1212121-11</li>
                    <li>mail@mail.com</li>
                </ul>
                </div>

            <div className="form">
            <h3>Edit Dialogue For Product(s)</h3>
            <small><b style={{color:'green',fontWeight:'bold'}}>{updatawnd}</b></small>
            <form action="" id="form">
                <p>
                <label For="BuisnessName-LABEL">BuisnessName</label>
                <input type="text" id="input" className="BuisnessName" ref="a"/>
                </p>
                <p>
                <label For="">Buisness Category</label>
                <input type="text" id="input" className="Category" ref="b"/>
                </p>
                <p>
                <label For="">Contact Url</label>
                <input type="text" id="input" className="Url" ref="c"/>
                </p>
                <p>
                <label For="">Buisness PhoneNumber</label>
                <input type="text" id="input" className="PhoneNumber" ref="d"/>
                </p>
                <p>
                <label For="">Buisness Email</label>
                <input type="text" id="input" className="Email" ref="e"/>
                </p>
                <p>
                <label For="">Buisness Address</label>
                <input type="text" id="input" ref="f"/>
                </p>
                <p className="full-width">
                <label For="">Write your description</label>
                <textarea name="" id="" cols="30" rows="7" ref="g"></textarea>
                </p>
                <p>
                <label For="">Picture Url</label>
                <input type="text" id="input" ref="pics1"/>
                </p> <p>
                <label For="">Picture Url</label>
                <input type="text" id="input" ref="pics2"/>
                </p>
                <p className="full-width">
                <button id="button" onClick={this.handleEdit}>Send</button>
                </p>
            </form>
            </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Edit;
