import React, { Component, useState, useEffect } from "react";
import {
  Table,
  ButtonToolbar,
  ButtonGroup,
  Button,
  Modal,
} from "react-bootstrap";

function UpdateAllCategory(props) {
  const [categoryName, setName] = useState(props.cat_nombre);
  const [categoryDescripcion, setDescripcion] = useState(props.cat_descripcion);
  const [categoryId, setId] = useState(props.cat_id);
  useEffect(() => {
    setName(props.cat_nombre);
  }, [props.cat_nombre]);

  useEffect(() => {
    setDescripcion(props.cat_descripcion);
  }, [props.cat_descripcion]);

  useEffect(() => {
    setId(props.cat_id);
  }, [props.cat_id]);

  const updateCategory = (e) => {
    const requestApi = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkteGlhb21pbmFyaW8uaGVyb2t1YXBwLmNvbVwvbG9naW4iLCJpYXQiOjE1OTI0NTE4OTksImV4cCI6MTU5MjQ1NTQ5OSwibmJmIjoxNTkyNDUxODk5LCJqdGkiOiJhc1JpZUxBaVZBOWx2a29FIiwic3ViIjoxLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.gp6516xKZupB5_dn0UIIxG8i_iBFO4uS5xH8cVN7TrY",
      },
      body: JSON.stringify({
        cat_nombre: categoryName,
        cat_descripcion: categoryDescripcion,
      }),
    };
    e.preventDefault();
    fetch(
      `https://api-xiaominario.herokuapp.com/categories/${categoryId}`,
      requestApi
    )
      .then((response) =>{
        if(response.ok){
        response.json()
        window.location.replace("")
        }
      })
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="title">Modificar categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className=" mx-5 px-5" onSubmit={updateCategory}>
        <input type="hidden" value={categoryId} onChange={(e)=>setId(e.target.value)}/>
          <div className="form-group">
            <label htmlFor="nameCategory">Nombre de la categoría</label>
            <input
              type="text"
              className="form-control"
              id="nameCategory"
              placeholder="Nombre de la categoría"
              value={categoryName}
              onChange={(e) => setName(e.target.value)}
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
              value={categoryDescripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
function DeleteCategory(props) {
  const [deleteId, setId] = useState(props.cat_id);

  useEffect(() => {
    setId(props.cat_id);
  }, [props.cat_id]);

  const deleteCategory = (e) => {
    const requestApi = {
      method: "DELETE",
      headers: {
        Authorization:
          "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkteGlhb21pbmFyaW8uaGVyb2t1YXBwLmNvbVwvbG9naW4iLCJpYXQiOjE1OTI0NTU2MjMsImV4cCI6MTU5MjQ1OTIyMywibmJmIjoxNTkyNDU1NjIzLCJqdGkiOiI4N1NPREk5VGxKTzhvNklGIiwic3ViIjoxLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.RqkPdURdznY5q0WIcaee5XC1RU-AMaesvpfh8eXJ_vk",
      },
    }
    e.preventDefault();
    fetch(
      `https://api-xiaominario.herokuapp.com/categories/${deleteId}`,
      requestApi
    )
      .then((response) =>{
        if(response.ok){
        response.json()
        window.location.replace("")
        }
      })
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="title">Eliminar categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className=" mx-5 px-5" onSubmit={deleteCategory}>
        { <input type="hidden" value={deleteId} onChange={(e)=>setId(e.target.value)}/> }
        <h2>¿Seguro desea eliminar la categoría?</h2>
        <br/>
          <button type="submit" className="btn btn-danger">
            Eliminar
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default class ListCategory extends Component {
  constructor() {
    super();
    this.state = {
      categoryData: [],
      modalShow: false,
      modalShowDelete:false,
      cat_nombre: "",
      cat_descripcion: "",
      idCat: 0,
      idCatDelete:0
    };
  }
  componentDidMount() {
    const requestApi = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkteGlhb21pbmFyaW8uaGVyb2t1YXBwLmNvbVwvbG9naW4iLCJpYXQiOjE1OTI0NTU2MjMsImV4cCI6MTU5MjQ1OTIyMywibmJmIjoxNTkyNDU1NjIzLCJqdGkiOiI4N1NPREk5VGxKTzhvNklGIiwic3ViIjoxLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.RqkPdURdznY5q0WIcaee5XC1RU-AMaesvpfh8eXJ_vk",
      },
    };
    fetch("https://api-xiaominario.herokuapp.com/categories", requestApi)
      .then((response) => response.json())
      .then((categoryData) => {
        this.setState({ categoryData });
      });
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
        />
        <DeleteCategory
        show={this.state.modalShowDelete}
        onHide={() => this.setState({ modalShowDelete: false })}
        cat_id={this.state.idCatDelete}
        />
      </div>
    );
  }
}
