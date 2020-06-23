import React, { Component } from "react";
import {
  Table,
  ButtonToolbar,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import UpdateAllCategory  from "./UpdateAllCategory";
import DeleteCategory from './DeleteCategory'

export default class ListCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryData: [],
      modalShow: false,
      modalShowDelete:false,
      cat_nombre: "",
      cat_descripcion: "",
      idCat: 0,
      idCatDelete:0,
      token:this.props.token,
    };
  }
  componentDidMount() {
    this.mounted = true
    const {token} = this.state
    const requestApi = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `bearer ${token}`,
      },
    };
    fetch("https://api-xiaominario.herokuapp.com/categories", requestApi)
      .then((response) => response.json())
      .then((categoryData) => {
        this.setState({ categoryData });
      });
  }
  componentWillUnmount(){
    this.mounted = false
  }
  
  displayModal(category) {
    this.setState({
      modalShow: true,
      idCat: category.id,
      cat_nombre: category.cat_nombre,
      cat_descripcion: category.cat_descripcion,
    });
  }
  displayModalDelete(category){
    this.setState({
      modalShowDelete: true,
      idCatDelete: category.id
    })
  }
  displayCategory() {
    const { categoryData } = this.state;
    return categoryData.map((category) => {
      return (
        <tr key={category.id}>
          <td>{category.id}</td>
          <td>{category.cat_nombre}</td>
          <td>{category.cat_descripcion}</td>
          <td>{category.cat_estado}</td>
          <td>{category.created_at}</td>
          <td>{category.updated_at}</td>
          <td>
            <ButtonToolbar aria-label="Toolbar with button groups">
              <ButtonGroup className="mr-2" aria-label="Second group">
                <Button
                  variant="success"
                  onClick={() => this.displayModal(category)}
                >
                  UP
                </Button>
                <Button variant="danger" onClick={()=>this.displayModalDelete(category)}>De</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </td>
        </tr>
      );
    });
  }

  render() {
    
    const { cat_nombre, cat_descripcion, idCat } = this.state;
    let login = this.props.login
    if(login){
    return (
      <div className="container-sm">
        <br />
        <h2>Lista de categorías</h2>
        <hr className="w-50 p-3 " align="left" />
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre de la categoría</th>
              <th>Descripción de la categoría</th>
              <th>Estado</th>
              <th>Creado</th>
              <th>Actualizado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{this.displayCategory()}</tbody>
        </Table>
        <UpdateAllCategory
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
          cat_id={idCat}
          cat_nombre={cat_nombre}
          cat_descripcion={cat_descripcion}
          token={this.state.token}
        />
        <DeleteCategory
        show={this.state.modalShowDelete}
        onHide={() => this.setState({ modalShowDelete: false })}
        cat_id={this.state.idCatDelete}
        token={this.state.token}
        />
      </div>
    );
    }
    else{
      return(<Redirect to="/Login"/>)
    }
  }
}
