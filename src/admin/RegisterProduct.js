import React from "react"
import { Modal, Button, Row, Col, Form, InputGroup, FormControl} from 'react-bootstrap'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel';


class RegisterProduct extends React.Component{

    constructor(props){
        super(props);
        this.state={
            //categories: [],
            categoriaID :'',
            selectedFile: ''
    }

        this.state = {snackbaropen: false, snackbarmsg: ''}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeCatID = this.handleChangeCatID.bind(this);
        // Image bas64
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    // GET CATEGORIES
    componentDidMount(){
        const token = this.props.token
        fetch("https://api-xiaominario.herokuapp.com/categories", {
            method: 'GET',
            headers:{'Content-Type':'application/json',
                'Authorization':`bearer ${token}`}
        })
        .then(response => response.json())
        .then(data =>{
            this.setState({categories : data})
        })
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

    handleChangeCatID(event) {
        console.log(`Seleccionaste ${event.target.value}`);
        this.setState({categoriaID: event.target.value});
        setTimeout(() => console.clear(), 2000);
    }

    handleSubmit(e){
        const {categoriaID}= this.state
        const {selectedFile} = this.state 
        const token = this.props.token
        e.preventDefault();

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
                pro_enlace: e.target.enlaceProduct.value,
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

        const{categories}= this.state;
        
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

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Control
                                        type="text"
                                        name="marcaProduct"
                                        placeholder="Marca del producto"
                                        />
                                        </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Control
                                        type="text"
                                        name="modeloProduct"
                                        placeholder="Modelo del producto"
                                        />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group >
                                    <Form.Control
                                    type="text"
                                    name="dimensionesProduct"
                                    placeholder="Dimensiones del producto"
                                    />
                                </Form.Group>                              

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                    <br/>
                                        <Form.File 
                                        id="custom-file"
                                        label="Seleccionar imagen..."
                                        custom
                                        data-browse="Abrir"
                                        onChange={this.handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                    <img src = {this.state.selectedFile}
                                    style={{
                                        border:'1px solid #c8cbce',
                                        height:'80px',
                                        float: 'right',
                                        padding:'5px',
                                        borderRadius:'4px'
                                    }} 
                                    />
                                    </Form.Group>
                                </Form.Row>
                            
                                <InputLabel id="demo-simple-select-label">Seleccionar categoría:</InputLabel>
                                <Select
                                style={{
                                    width: "100%"
                                }}
                                required
                                name="categoriaId"
                                value={this.state.categoriaID} 
                                onChange={this.handleChangeCatID}>
                                    {categories && categories.map(cat => 
                                    <MenuItem key={cat.id} value={cat.id}>{cat.cat_nombre}</MenuItem>
                                    )}
                                </Select>
                                <br/>
                                <br/>
                                <InputLabel id="demo-simple-select-label">Ingresa el enlace del producto</InputLabel>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon3">
                                        https://producto/...
                                    </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl 
                                    id="basic-url" 
                                    aria-describedby="basic-addon3"
                                    name="enlaceProduct"
                                     />
                                </InputGroup> 

                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Control 
                                    as="textarea" 
                                    rows="3"
                                    name="descripcionProduct"
                                    placeholder="Descripción del producto"
                                    />
                                </Form.Group>
                                <br/>
                                <Form.Group>
                                    <Button variant="primary" type="submit" style={{float:'right'}}>Guardar</Button>
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