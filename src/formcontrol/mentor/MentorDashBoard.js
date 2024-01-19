import React, { Component } from "react";

export default class MentorDashBoard extends Component{
    constructor(props){
        super(props);
        this.state={
            userData:"",
        }
    }
    componentDidMount(){
        fetch("http://localhost:5000/userData",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        token:window.localStorage.getItem("token"),
      }),
    })
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data,"userData");
        this.setState({userData: data.data});
        if(data.data=='token expired'){
            alert("Token expired login again");
            window.localStorage.clear();
            window.location.href="./";
        }
      });
    }
    logout=()=>{
        window.localStorage.clear();
        window.location.href="./";
    }
    render(){
        return(
            <div>
                <h1>Mentor</h1>
                Name<h1>{this.state.userData.fullname}</h1>
                Email<h1>{this.state.userData.email}</h1>
                <br/>
                <button onClick={this.logout} className="btn btn-primary">Log Out</button>
            </div>
        );
    }
}