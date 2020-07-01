import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import Home from "./Home";
import {Alert} from 'react-bootstrap'
import { Redirect } from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "",loginParams:[], login:false, store:null, loading:false,MessageSucess:false,MessageError:false };
  }
  componentDidMount(){
    this.unmounted= true
    this.storeColletor()
  }
  storeColletor(){
    let store = JSON.parse(localStorage.getItem('login'))
    if(store&&store.login){
      this.setState({login:true,store})
    }
  }
  componentWillUnmount(){
    this.unmounted = false
  }
  callApiLogin=(e)=> {
    const {email,password}=this.state
    const requestApi = {
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        email,
        password

      }),
    }
   
    e.preventDefault()
    fetch("https://api-xiaominario.herokuapp.com/login",requestApi)
    .then(response =>{ 
      if(response.ok){
        this.setState({loading:true})
        return(
          response.json()
        )
      }else{
        this.setState({MessageError:true})
      }
    }) 
    .then(data=>{
      localStorage.setItem('login',JSON.stringify({
        login:true,
        token:data.token
      }))
      this.storeColletor()
      
    })
    .catch(error => {
      this.setState({MessageError:true})
    });
    
  }

  
  render() {
    if(!this.state.login){
      return(
      
        <div className="container-sm m-5 p-5 ">
          <Redirect to="/Login"/>
            <h2>Iniciar sesión</h2>
            <hr className="w-50 p-3 " align="left" />
            <Form onSubmit={this.callApiLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  required
                  type="email"
                  value={this.state.email}
                  onChange={(e)=>this.setState({email:e.target.value})}
                  placeholder="Ingrese correo electrónico"
                />
                
              </Form.Group>
    
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  required
                  type="password"
                  value={this.state.password}
                  onChange={(e)=>this.setState({password: e.target.value})}
                  placeholder="ingrese contraseña"
                />
              </Form.Group>
              <Button variant="primary" type="submit" style={{float:'right'}}>
                Entrar
              </Button>
              {this.state.loading
                   ? <Form.Text className="text-muted">espere...</Form.Text>
                   : ""
                  }
              
            </Form>
            {this.state.MessageError===true 
        ? <Alert  variant={"danger"}>
        No se pudo iniciar la sesión
        </Alert> 
        :""}
        
          </div> 
          )
          }
          else
          {
          return( 
          <div>
          <Home 
          token={this.state.store.token}
          login={this.state.login}
          />
          </div>
          )
        }
      }
    }

export default Login;
