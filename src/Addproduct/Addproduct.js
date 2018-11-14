import React, { Component } from 'react';
import axios from 'axios';
import './Addproduct.css';

class Addproduct extends Component {
    state={
        inputValue: '',
        message:true
    }

    async addContact(event){
        event.preventDefault();
        const BuisnessName = this.refs.BuisnessName.value;
        const BuisnessDescription = this.refs.BuisnessDescription.value.replace(/\s+/g,' ').trim();;
        const BuisnessEmail = this.refs.BuisnessEmail.value;
        const BuisnessPhonenumber = this.refs.BuisnessPhonenumber.value;
        const BuisnessAddress = this.refs.BuisnessAddress.value;
        const BuisnessCategory = this.refs.BuisnessCategory.value;
        const ConactUrl = this.refs.ConactUrl.value;
        const pictureUrl1 = this.refs.pictureUrl1;
        const pictureUrl2 = this.refs.pictureUrl2;
        const data = {
            BuisnessName,
            BuisnessDescription,
            BuisnessEmail,
            BuisnessPhonenumber,
            BuisnessCategory,
            BuisnessAddress,
            ConactUrl,
            pictureUrl1,
            pictureUrl2
            
        }
        let token = localStorage.getItem('testObject');
       await axios.post(`http://localhost:1337/verify/${token}`)
            .then((res) => {
                if(res.status == 200){
                    axios.post(`http://localhost:1337/addProduct/${res.data.user.id}`,data)
                    .then(res => {
                       if(res.data.status === 200){
                            this.setState({message:false})
                       }
                    }).catch((err) => {
                        console.log(err)
                    });
                }
                
            })
    }
   
  render() {
    const {message} = this.state;
    return (
      <div>
            <div className="container">  
            <form id="contact" action="" method="post" onSubmit={this.addContact.bind(this)}>
                <h3>Motus Buisness Product</h3>
                <h4 style={{color:'#FFF',fontWeight:'bold'}}>{message ? '' : `Product Added Sucessfully`}</h4>
                <fieldset>
                <input  placeholder="Buisness name" ref="BuisnessName" type="text" tabIndex="1" required autoFocus/>
                </fieldset>
                <fieldset>
                <input placeholder="Buisness Email" ref="BuisnessEmail" type="email" tabIndex="2" required/>
                </fieldset>
                <fieldset>
                <input placeholder="Phone (required)" type="tel" ref="BuisnessPhonenumber" tabIndex="3" required/>
                </fieldset>
                <fieldset>
                <input placeholder="Contact Url (required)" ref="ConactUrl" type="url" tabIndex="4" required/>
                </fieldset>
                <fieldset>
                <input placeholder="Address" ref="BuisnessAddress" type="text" tabIndex="4" required/>
                </fieldset>
                <fieldset>
                <input placeholder="Buisness Category" ref="BuisnessCategory" type="text" tabIndex="4" required/>
                </fieldset>
                <fieldset>
                <textarea placeholder="Buisness description...." ref="BuisnessDescription" tabIndex="5" required></textarea>
                </fieldset>
                <fieldset>
                <input placeholder="image(1) Url (optional)" type="url" ref="pictureUrl1" tabIndex="4" required/>
                </fieldset>
                <fieldset>
                <input placeholder="image(2) Url (optional)" type="url" ref="pictureUrl2" tabIndex="4" required/>
                </fieldset>
                <fieldset>
                <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
                </fieldset>
                <p className="copyright">Designed by <a href="https://google.com"  title="Colorlib">Motus Engineering</a></p>
            </form>
            </div>
      </div>
    );
  }
}

export default Addproduct;
