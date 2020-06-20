import React, { Component } from "react";
import NavBar from "./NavBar";
import { Switch, Route } from "react-router-dom";
import RegisterCategory from "./RegisterCategory";
import ListCategory from "./ListCategory";
export default class Home extends Component {
  state={token:this.props.token}
  render() {
    return (
      <div>
        <NavBar/>
        <Switch>
          <Route path="/RegisterCategory" component={()=><RegisterCategory token={this.state.token}/>} />
          <Route path="/ListCategory" component={() => <ListCategory token={this.state.token} />}/>
          <Route path="/Home" component={Home} />
          <Route path="/home" component={NavBar} />
        </Switch>
      </div>
    );
    }
  
}

