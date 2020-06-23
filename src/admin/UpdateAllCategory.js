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
      const token= props.token
      const requestApi = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            `bearer ${token}`,
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
          window.location.reload();
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
  export default UpdateAllCategory