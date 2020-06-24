import React, { Component } from "react";
import NavBar from "./NavBar";
import { Switch, Route, Redirect } from "react-router-dom";
import RegisterCategory from "./RegisterCategory";
import ListCategory from "./ListCategory";
import ProductList from "./ProductList";
import RegisterProduct from "./RegisterProduct";
import EditProduct from "./EditProduct";

export default class Home extends Component {
  state={token:this.props.token, login:this.props.login}
  render() {
    return (
      <div>

        <NavBar login={this.state.login}/>
        <Switch>
          {
          this.state.login
          ? <Redirect from="/Login" to="/Home"/>
          : <Redirect from="/Home" to="/Login"/>
          }
          <Route path="/Home/RegisterCategory" component={()=><RegisterCategory token={this.state.token} login={this.state.login}/>}/>
          <Route path="/Home/ListCategory" component={()=><ListCategory token={this.state.token} login={this.state.login}/>}/>
          <Route path="/Home/ProductList" component={()=><ProductList token={this.state.token} login={this.state.login}/>}/>
          <Route path="/Home/RegisterProduct" component={()=><RegisterProduct token={this.state.token} login={this.state.login}/>}/>
          <Route path="/Home/EditProduct" component={()=><EditProduct token={this.state.token} login={this.state.login}/>}/>
      
        </Switch>
      </div>
    );
    }
  
}

