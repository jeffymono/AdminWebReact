import React from 'react'
import { Modal, Button, Row, Col, Form, InputGroup, FormControl} from 'react-bootstrap'

import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'

class DeleteProduct extends React.Component{

    constructor(props){
        super(props)
        this.state={
            
        }
        this.state = {snackbaropen: false, snackbarmsg: ''}
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    snackbarClose = (e) =>{
        this.setState({snackbaropen : false})
    }

    handleSubmit = e =>{

        const token = this.props.token
        const categoriaID = e.target.categoriaId.value
        e.preventDefault();
    
        fetch(`https://api-xiaominario.herokuapp.com/categories/${categoriaID}/products/${this.props.proid}`, {
            method : 'PUT',
            headers : {'Content-Type':'application/json',
            'Authorization':`bearer ${token}`},
            body : JSON.stringify({
            
                pro_estado: 0,
            })
        })
        .then(res => res.json())
        .then((result) =>{
            //alert(result);
            this.setState({snackbaropen: true, snackbarmsg: "Producto eliminado!"})
        },
        (error) =>{
            //alert('Ocurrio un error')
            this.setState({snackbaropen: true, snackbarmsg: "Ocurrio un error al eliminar"})
        })
    }
    render(){

        return(

            <div className="container pt-3">

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
                    Eliminar producto
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="container">
                    <Row>
                        <Col sm={12}>
                            <Form onSubmit={this.handleSubmit}>

                                <InputGroup className="mb-3">
                                <FormControl
                                type="hidden"
                                name="productId"
                                defaultValue={this.props.proid}
                               // disabled
                                />
                                </InputGroup>

                                <Form.Row>
                                    <Form.Group sm={7} controlId="formGridEmail">
                                    <Form.Label><b>Estás seguro de eliminar el producto? :</b></Form.Label>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <input
                                        name="marcaProduct"
                                        defaultValue={this.props.promarca}
                                        placeholder="Marca del producto"
                                        disabled
                                        style={{
                                            border:"none"
                                        }}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <InputGroup >
                                    <Form.Control
                                    type="hidden"
                                    name="categoriaId"
                                    defaultValue={this.props.proidcategoria}
                                    />
                                </InputGroup>
                                
                                <br/>
                                <Form.Group>
                                    <Button variant="danger" type="submit" style={{float:'right'}}>Si, eliminar</Button>
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
export default DeleteProduct