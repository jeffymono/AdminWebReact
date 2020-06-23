import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

function DeleteCategory(props) {
    const [deleteId, setId] = useState(props.cat_id);
  
    useEffect(() => {
      setId(props.cat_id);
    }, [props.cat_id]);
  
    const deleteCategory = (e) => {
      const token = props.token
      const requestApi = {
        method: "DELETE",
        headers: {
          Authorization:
            `bearer ${token}`,
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
  export default DeleteCategory