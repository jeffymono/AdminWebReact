import React, { Component } from "react";
import {Alert} from 'react-bootstrap'
export default class RegisterCategory extends Component {
  state = { nameCategory: "", descriptionCategory: "", MessageSucess:false,MessageError:false, MessageIncompleted:false};

  changeNameCategory = (e) => {
    this.setState({ nameCategory: e.target.value });
  };
  changeDescriptionCategory = (e) => {
    this.setState({ descriptionCategory: e.target.value });
  };

  submitData = (e) => {
    const { nameCategory, descriptionCategory } = this.state;
    const token = this.props.token
    const requestApi = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `bearer ${token}`,
      },
      body: JSON.stringify({
        cat_nombre: nameCategory,
        cat_descripcion: descriptionCategory,
        cat_estado: 1,
      }),
    };
    e.preventDefault();
    if(this.state.nameCategory && this.state.descriptionCategory !== ""){
    fetch("https://api-xiaominario.herokuapp.com/categories", requestApi)
      .then((data) =>{ 
        if(data.ok){
        data.json()
        this.setState({MessageSucess:true,nameCategory: "", descriptionCategory: ""})
        }else{
          this.setState({MessageError:true})
        }
      })
    }else{
      this.setState({MessageIncompleted:true})
    }
  };

  render() {
    return (
      <div className="container-sm">
        <br />
        <h2>Registar categoría</h2>
        <hr className="w-50 p-3 " align="left" />
        <form
          className="shadow p-3 mb-5 bg-white rounded mx-5 p-5"
          onSubmit={this.submitData}
        >
          <div className="form-group">
            <label htmlFor="nameCategory">Nombre de la categoría</label>
            <input
              type="text"
              className="form-control"
              id="nameCategory"
              placeholder="Nombre de la categoría"
              value={this.state.nameCategory}
              onChange={this.changeNameCategory}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="descriptionCategory">
              Descripción de la categoría
            </label>
            <textarea
              className="form-control"
              id="descriptionCategory"
              rows="3"
              value={this.state.descriptionCategory}
              onChange={this.changeDescriptionCategory}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </form>
        {this.state.MessageSucess===true 
        ? <Alert  variant={"success"}>
        categoría guadada con éxito
        </Alert> 
        :""}
        {this.state.MessageError===true 
        ? <Alert  variant={"danger"}>
        No se pudo guardar la categoría
        </Alert> 
        :""}
        {this.state.MessageIncompleted===true 
        ? <Alert  variant={"danger"}>
        Lene todos los campos del formulario
        </Alert> 
        :""}
        
      </div>
    );
  }
}
