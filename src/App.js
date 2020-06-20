import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import Home from "./admin/Home";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "",loginParams:[], login:false, store:null };
  }
  componentDidMount(){
    this.storeColletor()
  }
  storeColletor(){
    let store = JSON.parse(localStorage.getItem('login'))
    if(store&&store.login){
      this.setState({login:true,store})
    }
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
        return(
          response.json()
        )
      }else{
        throw new Error("Ocurrio algo")
      }
    }) 
    .then(data=>{
      localStorage.setItem('login',JSON.stringify({
        login:true,
        token:data.token
      }))
      this.storeColletor()
      
    })
    
  }
  
  render() {
    if(!this.state.login){
      return(
      
        <div className="container-sm m-5 p-5 ">
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
                <Form.Text className="text-muted">
                  {/* We'll never share your email with anyone else. */}
                </Form.Text>
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
              <Button variant="primary" type="submit" >
                Entrar
              </Button>
            </Form>
        
          </div> 
          )
          }
          else
          {
          return( 
          <div>
          <Home 
          token={this.state.store.token}
          />
          </div>
          )
        }
      }
    }

export default App;
