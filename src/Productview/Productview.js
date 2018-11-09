import React, { Component } from 'react';
import FormEdit from '../Edit/Edit';
import logo from '../logo.svg';
import axios from 'axios';
import './Productview.css';

function handlesearchingFor(term){
    return function(x){
        return x.BuisnessName.toLowerCase().includes(term.toLowerCase())  || !term
    }
}
class Productview extends Component {
    constructor(props){
        super(props);
    }
    state = {
        persons: [],
        clicks:0,
        search:'',
        admin:false,
        alertwnd:'',
        propval:'',
        displaymodal:false
    }

    handleViewCount=(event)=>{
        // console.log(event.currentTarget.dataset.view)
        // axios.get(`http://localhost:1337/All`)
        //   .then(res => {const persons = res.data[0].ProductModel;this.setState({ persons });})
        // }
    }
    
    handlecloseModalClick=(event)=>{
        const outercontainermodal = this.refs.outercontainermodal.className;
        if(event.target.className === outercontainermodal){this.setState({displaymodal:false})}
        return;

    }
    handlesearchViaapi=(event)=>{
        event.preventDefault();
        const collect = this.refs.searchbaritemflex.value;
        const user ={
             BuisnessDescription :collect
        }
        axios.post(`http://localhost:1337/search`, user)
        .then((res) => {
        this.setState({persons:res.data})
        })
    }
    handlesearchByName=(event)=>{
        this.setState({search:event.target.value})
    }
    HandleModalAction=(event)=>{
        if(event.target.className === 'Edit-button'){
            this.setState({ displaymodal:true,propval:event.currentTarget.dataset.edit})
        }
    }
    HandleDeleteItem = (event) => {
        axios.delete(`http://localhost:1337/destroyProduct/${event.currentTarget.dataset.item}`)
          .then(res => {
            if(res.data===200){
                this.setState({alertwnd:'Delete Sucessful'})
                window.location.reload();
            }
          })
        this.setState({ clicks: this.state.clicks + 1 });
    }
    componentDidMount() {
        axios.post(`http://localhost:1337/verify/${localStorage.getItem('testObject')}`)
            .then((res) => {
                if(res.status == 200){
                   this.setState({admin:true})
                   this.props.history.push('/')
                }
                
            })
        //the below is to fetch all product from storage
        axios.get(`http://localhost:1337/All`)
          .then(res => {const persons = res.data[0].ProductModel;this.setState({ persons });})
        }
  render() {
      const {persons,search,admin,displaymodal} =this.state;
      const modalDisplay = (
          <div>
            <div className="outer-container-modal" ref="outercontainermodal" 
                 onClick={this.handlecloseModalClick}>
            <div className="inner-container-modal" ref="innercontainermodal"><FormEdit propFieldvalue={this.state.propval}/></div>
            </div>
          </div>
      )
      
    return (
      <div>
            {displaymodal ? modalDisplay : ''}
          <div className="nav-bar-parent-container">
          <div className="parent-container-main">
              <input type="text"  placeholder="Quick Search on buisness name"  value={search} className="search-bar item-flex"  onChange={this.handlesearchByName}/>
              <input type="text"  placeholder="Search by Description" className="search-bar-item-flex" ref="searchbaritemflex"/>
              <button className="item-flex-button" style={{color:'#fff'}} onClick={this.handlesearchViaapi}>search</button>
          </div>
          </div>
          <div className="main-parent-div">
            <small style={{color:'red',fontWeight:'bold'}}>{this.state.alertwnd}</small>
        { persons.filter(handlesearchingFor(search)).map((buisness,i) =>  
                (
                    <div className="card card-1" id="card-1-data" data-view={buisness.id} onClick={this.handleViewCount}  ref="test"   key={i}>
                        <div className="float-view-button" ref="view"><b><i>134k</i></b></div>
                    <img src={`${logo}`} alt="logo here" className="parent-img-container"/>
                        <section>
                            <small>
                            <div><span><b>Name: </b></span>{buisness.BuisnessName}</div>
                            <div><span><b>Buisness Category: </b></span>{buisness.BuisnessCategory}</div>
                            <div><span><b>Buisness Description: </b></span>{buisness.BuisnessDescription}</div>
                            <div><span><b>Contact Url: </b></span>{buisness.ConactUrl}</div>
                            <div><span><b>Buisness Email: </b></span>{buisness.BuisnessEmail}</div>
                            <div><span><b>Buisness Address: </b></span>{buisness.BuisnessAddress}</div>
                            </small>
                            <div>{admin ? 
                                        (
                                        <div className="container-main-flex">
                                            <button className="Edit-button" data-edit={buisness.id}  onClick={this.HandleModalAction}>Edit</button>
                                            <button className="Delete-button" data-item={buisness.id} onClick={this.HandleDeleteItem}>Delete</button>
                                        </div>
                                      )
                                 : ''}</div>
                        </section>
                    </div>
                )
            )}
      </div>

      </div>
    );
  }
}

export default Productview;
