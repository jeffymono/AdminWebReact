import React, { Component } from "react";
export default class RegisterCategory extends Component {
    state={nameCategory:'',descriptionCategory:''}

    changeNameCategory=(e)=>{
        this.setState({nameCategory:e.target.value})
    }
    changeDescriptionCategory=(e)=>{
        this.setState({descriptionCategory:e.target.value})
    }
    submitData=(e)=>{
        console.log(this.state)
        const{nameCategory,descriptionCategory}=this.state
        const requestApi = {
            method:'POST',
            headers:{'Content-Type':'application/json',
            'Authorization':'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkteGlhb21pbmFyaW8uaGVyb2t1YXBwLmNvbVwvbG9naW4iLCJpYXQiOjE1OTIzNjcwOTksImV4cCI6MTU5MjM3MDY5OSwibmJmIjoxNTkyMzY3MDk5LCJqdGkiOiJYR1VjMnNVYzV6ZUpCWWVJIiwic3ViIjoxLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.9YNMQtFL5NYEr0qroz3PXv5taKxJBJ0sa-mLRp28Hhk'},
            body:JSON.stringify({cat_nombre:nameCategory,cat_descripcion:descriptionCategory,cat_estado:1})
        }
        e.preventDefault()
        fetch('https://api-xiaominario.herokuapp.com/categories',requestApi)
        .then(data=>data.json())
        .then(res=>console.log(res)) 
    }
 
  render() {
    return (
      <div className="container-sm">
          <br/>
          <h2>Registar categoría</h2>
          <hr className="w-50 p-3 " align="left" />
        <form className="shadow p-3 mb-5 bg-white rounded" onSubmit={this.submitData}>
          <div className="form-group">
            <label htmlFor="nameCategory">Nombre de la categoría</label>
            <input
              type="text"
              className="form-control"
              id="nameCategory"
              placeholder="Nombre de la categoría"
              value={this.state.nameCategory}
              onChange={this.changeNameCategory}
            />
          </div>

          <div className="form-group">
            <label htmlFor="descriptionCategory">Descripción de la categoría</label>
            <textarea
              className="form-control"
              id="descriptionCategory"
              rows="3"
              value={this.state.descriptionCategory}
              onChange={this.changeDescriptionCategory}   
    ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </form>
      </div>
    );
  }
}
