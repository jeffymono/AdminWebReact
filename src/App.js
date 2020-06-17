import React, { Component } from 'react';
import NavBar from './admin/NavBar'
import { Switch, Route} from 'react-router-dom';
import RegisterCategory from './admin/RegisterCategory'
class App extends Component {
  render(){
  return (
    <div>
      <NavBar/>

      <Switch>
        <Route path="/RegisterCategory" component={RegisterCategory}/>
      </Switch>
    </div>
  )
  }
}

export default App;
