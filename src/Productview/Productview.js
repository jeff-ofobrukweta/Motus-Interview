import React, { Component } from 'react';
import FormEdit from '../Edit/Edit';
import logo from '../logo.svg';
import axios from 'axios';
import './Productview.css';

function handlesearchingFor(term){
    return (x)=>{
        return x.BuisnessCategory.toLowerCase().includes(term.toLowerCase())||x.BuisnessName.toLowerCase().includes(term.toLowerCase())|| !term;
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
    handlelogin=(event)=>{
            event.preventDefault();
            localStorage.clear('testObject');
            this.props.history.push('/login')
    }
    handleViewCount=(event)=>{
        let targetCard = event.currentTarget.dataset.view
        this.setState({clicks:this.state.clicks+1})
        axios.get(`https://classicdsmotus-123.herokuapp.com/singlecard/${targetCard}`)
        .then(res => {
            let valcount =res.data.countView;
            let newIncrement = valcount +1;
            let county = {count:newIncrement}
            axios.put(`https://classicdsmotus-123.herokuapp.com/updateCount/${targetCard}`,county)
            .then(res => {
                    console.log(res.data)
            })
        })
        }
       
        
    
    handlecloseModalClick=(event)=>{
        const outercontainermodal = this.refs.outercontainermodal.className;
        if(event.target.className === outercontainermodal){
            // document.getElementById('body').style.overflow='';
            this.setState({displaymodal:false})}
        return;

    }
    
    handlesearchByCategory=(event)=>{
        this.setState({search:event.target.value})
    }
    HandleModalAction=(event)=>{
        if(event.target.className === 'Edit-button'){
            // document.getElementById('body').style.overflow='hidden';
            this.setState({ displaymodal:true,propval:event.currentTarget.dataset.edit})
        }
    }
    HandleDeleteItem = (event) => {
        axios.delete(`https://classicdsmotus-123.herokuapp.com/destroyProduct/${event.currentTarget.dataset.item}`)
          .then(res => {
            if(res.data===200){
                this.setState({alertwnd:'Deleted Sucessfully'})
                window.location.reload();
            }
          })
        this.setState({ clicks: this.state.clicks + 1 });
    }
   async componentDidMount() {
         axios.post(`https://classicdsmotus-123.herokuapp.com/verify/${localStorage.getItem('testObject')}`)
            .then((res) => {
                if(res.status == 200){
                   this.setState({admin:true})
                   this.props.history.push('/')
                }
                
            })
        //the below is to fetch all product from storage
         await axios.get(`https://classicdsmotus-123.herokuapp.com/Allproduct`)
          .then(res => {
              const persons = res.data;this.setState({ persons });
            })
        }
  render() {
    const {persons,search,admin,displaymodal} =this.state;
    return (
      <div>
            {displaymodal ?  (
                    <div>
                        <div className="outer-container-modal" ref="outercontainermodal" 
                            onClick={this.handlecloseModalClick}>
                        <div className="inner-container-modal" ref="innercontainermodal"><FormEdit propFieldvalue={this.state.propval}/></div>
                        </div>
                    </div>
                ) : ''}
          <div className="nav-bar-parent-container">
          <div className="parent-container-main">
              <input type="text"  placeholder="Quick Search on buisness category"  value={search} className="search-bar item-flex"  onChange={this.handlesearchByCategory}/>
              {admin ? (<button className="item-flex-button" onClick={this.handlelogin} style={{color:'#fff'}}>Sign out</button>): ''}
              <span><small style={{color:'red',fontWeight:'bold'}}>{this.state.alertwnd}</small></span>
          </div>
          </div>
          <div className="main-parent-div">
            { persons.filter(handlesearchingFor(search)).map((buisness,i) =>  
                (
                    <div className="card card-1" id="card-1-data" data-view={buisness.id} onClick={this.handleViewCount}  ref="test"   key={i}>
                        <div className="float-view-button" ref="view"><b><i>{buisness.countView}</i></b></div>
                    <img src={`${logo}`} alt="logo here" className="parent-img-container"/>
                        <section>
                            <small>
                            <div><span><b>Buisness Name: </b><span className="buisness-data-font">{buisness.BuisnessName}</span></span></div>
                            <div><span><b>Buisness Category:</b><span className="buisness-data-font">{buisness.BuisnessCategory}</span></span></div>
                            <div><span><b>Buisness Description: </b><span className="buisness-data-font">{buisness.BuisnessDescription}</span></span></div>
                            <div><span><b>Contact Url: </b><span className="buisness-data-font">{buisness.ConactUrl}</span></span></div>
                            <div><span><b>Buisness Email: </b><span className="buisness-data-font">{buisness.BuisnessEmail}</span></span></div>
                            <div><span><b>Buisness Address:</b><span className="buisness-data-font">{buisness.BuisnessAddress}</span></span></div>
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
