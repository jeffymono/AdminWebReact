import React from "react"
import { Modal, Button, Row, Col, Form} from 'react-bootstrap'

import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'


class RegisterProduct extends React.Component{

    constructor(props){
        super(props);
        this.state={
            categoriaID :'',
            selectedFile: '',
            //token:this.props.token
    }

        this.state = {snackbaropen: false, snackbarmsg: ''}
        this.handleSubmit = this.handleSubmit.bind(this)

        // Image bas64
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        let files = event.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        
        reader.onload = (e) => {
            
            this.setState({
                selectedFile: e.target.result,
                
              })      
        }
    }
    
    snackbarClose = (e) =>{
        this.setState({snackbaropen : false})
    }

    handleChange = e =>{
        this.setState(
            {categoriaID : e.target.value}   
        ) 
    }

    handleSubmit = e =>{
        const{categoriaID} = this.state
        const {selectedFile} = this.state 
        const token = this.props.token
        e.preventDefault();
        //console.log(`https://api-xiaominario.herokuapp.com/categories/${categoriaID}/products`)
        fetch(`https://api-xiaominario.herokuapp.com/categories/${categoriaID}/products`, {
            method : 'POST',
            headers : {'Content-Type':'application/json',
            'Authorization':`bearer ${token}`},
            body : JSON.stringify({
                
                pro_marca: e.target.marcaProduct.value,
                pro_modelo: e.target.modeloProduct.value,
                pro_imagen: selectedFile,
                pro_dimesiones: e.target.dimensionesProduct.value,
                categoriaId: e.target.categoriaId.value,
                pro_descripcion: e.target.descripcionProduct.value,
                
                pro_estado: 1,
            })
        })
        .then(res => res.json())
        .then((result) =>{
            //alert(result);
            this.setState({snackbaropen: true, snackbarmsg: "Producto guardado exitosamente!"})
        },
        (error) =>{
            //alert('Ocurrio un error')
            this.setState({snackbaropen: true, snackbarmsg: "Ocurrio un error al guardar!"})
        })
    }

    render(){
        return(

            <div className="container">

                <Snackbar
                anchorOrigin={{vertical:'bottom', horizontal: 'left'}}
                open= {this.state.snackbaropen}
                autoHideDuration = {3000}
                onClose = {this.snackbarClose}

                message = {<span id="message-id">{this.state.snackbarmsg}</span>}
                action = {[
                <IconButton
                key="close"
                arial-label="Close"
                color="inherit"
                onClick={this.snackbarClose}
                >
                    x
                </IconButton>
                ]}
                />

                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Añadir producto
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="container">
                    <Row>
                        <Col sm={12}>
                            <Form onSubmit={this.handleSubmit}>
                            
                                <Form.Group>
                                    <Form.Control
                                    type="text"
                                    name="marcaProduct"
                                    
                                    placeholder="Marca del producto"
                                    />
                                </Form.Group>

                                <Form.Group >
                                    <Form.Control
                                    type="text"
                                    name="modeloProduct"
                                    
                                    placeholder="Modelo del producto"
                                    />
                                </Form.Group>

                                <Form.Group >
                                    <Form.Control
                                    type="text"
                                    name="dimensionesProduct"
                                    placeholder="Dimensiones del producto"
                                    />
                                </Form.Group>

                                <Form.Group >
                                    <Form.Control
                                    type="text"
                                    name="categoriaId"
                                    placeholder="Categoria del producto"
                                    onChange={this.handleChange}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <input
                                    id="exampleFormControlFile1" 
                                    label="Imagen del producto"
                                    name="imagenProduct" 
                                    type="file"
                                    onChange={this.handleInputChange}
                                    />
                                </Form.Group>


                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Descripción del producto</Form.Label>
                                    <Form.Control 
                                    as="textarea" 
                                    rows="3"
                                    name="descripcionProduct"
                                    
                                    />
                                </Form.Group>
                                <br/>
                                <Form.Group>
                                    <Button variant="primary" type="submit">Guardar</Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </div>
                </Modal.Body>
               
                </Modal>
            </div>
        );
    }
}
export default RegisterProduct 