import React from "react"
import { Modal, Button, Row, Col, Form, InputGroup, FormControl} from 'react-bootstrap'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel';

class EditProduct extends React.Component{

    constructor(props){
        super(props)
        this.state={
            selectedFile: '',
            categoriaID :'',
            
        }
        this.state = {snackbaropen: false, snackbarmsg: ''}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeCatID = this.handleChangeCatID.bind(this);

        // Image bas64
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    // GET CATEGORIES
    componentDidMount(){
        this.mounted= true
        const token = this.props.token
        if(this.mounted){
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
}
    componentWillUnmount(){
        this.mounted=false
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

    handleSubmit (e){

        const {selectedFile} = this.state 
        const token = this.props.token
        //const categoriaID = e.target.categoriaId.value
        const categoriaID = this.props.proidcategoria
        console.log(categoriaID)
        e.preventDefault();
        //console.log(`https://api-xiaominario.herokuapp.com/categories/${categoriaID}/products`)
        fetch(`https://api-xiaominario.herokuapp.com/categories/${categoriaID}/products/${this.props.proid}`, {
            method : 'PUT',
            headers : {'Content-Type':'application/json',
            'Authorization':`bearer ${token}`},
            body : JSON.stringify({
                
                pro_marca: e.target.marcaProduct.value,
                pro_modelo: e.target.modeloProduct.value,
                pro_imagen: selectedFile,
                pro_dimesiones: e.target.dimensionesProduct.value,
                categoria_id: e.target.categoriaId.value,
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
                    Editar producto
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
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Control
                                        type="text"
                                        name="marcaProduct"
                                        defaultValue={this.props.promarca}
                                        placeholder="Marca del producto"
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Control
                                        type="text"
                                        name="modeloProduct"
                                        defaultValue={this.props.promodelo}
                                        placeholder="Modelo del producto"
                                        />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group >
                                    <Form.Control
                                    type="text"
                                    name="dimensionesProduct"
                                    defaultValue={this.props.prodimensiones}
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
                                    <img src={this.props.proimagen} alt="Producto"
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

                                <InputLabel id="demo-simple-select-label">Categoría del producto:</InputLabel>
                                <Select
                                style={{
                                    width: "100%"
                                }}
                                required
                                defaultValue={this.props.proidcategoria}
                                name="categoriaId"
                                value={this.state.categoriaID} 
                                onChange={this.handleChangeCatID}>
                                    {categories && categories.map(cat => 
                                    <MenuItem key={cat.id} value={cat.id}>{cat.cat_nombre}</MenuItem>
                                    )}
                                </Select>
                                <br/>
                                <br/>
                                <InputLabel id="demo-simple-select-label">Enlace del producto</InputLabel>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                    </InputGroup.Prepend>
                                    <FormControl 
                                    id="basic-url" 
                                    aria-describedby="basic-addon3"
                                    name="enlaceProduct"
                                    defaultValue={this.props.proenlace}
                                     />
                                </InputGroup> 
                                
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Descripción del producto</Form.Label>
                                    <Form.Control 
                                    as="textarea" 
                                    rows="3"
                                    name="descripcionProduct"
                                    defaultValue={this.props.prodescripcion}
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
                {/*<Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Cerrar</Button>
                </Modal.Footer>*/}
                </Modal>
            </div>
        );
    }
    
}
export default EditProduct