import React, {Component} from 'react'
import { Table } from 'react-bootstrap'

import { Button, ButtonToolbar } from 'react-bootstrap'
import RegisterProduct from './RegisterProduct';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';

class ProductList extends Component{

    constructor(props){
        super(props);
        this.state ={
            prods: [], 
            addModalShow : false, 
            editModalShow : false,
            deleteModalShow : false,
            token:this.props.token
        }
    }

    componentDidMount(){
        this.refreshList();

    }

    refreshList(){
        const {token} = this.state
        fetch('https://api-xiaominario.herokuapp.com/products', {
            method: 'GET',
            headers:{'Content-Type':'application/json',
                'Authorization':`bearer ${token}`}
        })
        .then(response => response.json())
        .then(data =>{
            this.setState({prods:data})
        })
    }
    showUpdateModal(product){
        this.setState({editModalShow: true, proId: product.id, proMarca: product.pro_marca, 
            proModelo: product.pro_modelo, proDimensiones: product.pro_dimesiones,
            proIdCategoria: product.categoria_id, proImagen: product.pro_imagen, proEnlace: product.pro_enlace,
            proDescripcion: product.pro_descripcion })
    }

    showDeleteModal(product){
        this.setState({deleteModalShow: true, proId: product.id, proIdCategoria: product.categoria_id, 
            proMarca: product.pro_marca})
    }

    componentWillUnmount(){
        this.refreshList()
    }

    render(){

        const{prods, proId, proMarca, proModelo, proDimensiones, proIdCategoria, proImagen, proEnlace, proDescripcion} = this.state;
        let addModalClose =() => this.setState({addModalShow : false})
        let editModalClose =() => this.setState({editModalShow : false})
        let deleteModalClose =() => this.setState({deleteModalShow : false})

        return(
            <div className="container-sm">
                <br/>
                <h2>Lista de productos</h2>
                <hr/>

                <ButtonToolbar>
                        <Button variant="success"
                        onClick={()=> this.setState({addModalShow: true})}>
                            Registrar producto
                        </Button>

                        <RegisterProduct
                            show={this.state.addModalShow}
                            onHide={addModalClose}
                            token={this.state.token}
                        />
                </ButtonToolbar>
                <br/>
               
                <Table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">MARCA</th>
                        <th scope="col">MODELO</th>
                        <th scope="col">DESCRIPCIÓN</th>
                        <th scope="col">DIMENSIONES</th>
                        <th scope="col">CATEGORÍA</th>
                        <th scope="col" style={{ textAlign: "center"}}>IMAGEN</th>
                        <th scope="col" style={{ textAlign: "center"}}>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {prods.map(product =>
                        <tr key={product.id}>
                        <th scope="row">{product.id}</th>
                        <td>{product.pro_marca}</td>
                        <td>{product.pro_modelo}</td>
                        <td>{product.pro_descripcion}</td>
                        <td>{product.pro_dimesiones}</td>
                        <td>{product.categoria_id}</td>
                        <td style={{ textAlign: "center"}}><img src={`${product.pro_imagen}`} style={{width: '30px'}} alt="Product" /></td>
                        <td>
                            <ButtonToolbar style={{ textAlign: "center"}}>
                                <Button variant="success"
                                onClick={()=>this.showUpdateModal(product)}
                                >
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </Button>
                                <Button variant="danger"
                                onClick={()=>this.showDeleteModal(product)}
                                >
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                    </svg>
                                </Button>
                            </ButtonToolbar>
                        </td>
                    </tr>
                        )}
                </tbody>
                </Table>
                <EditProduct
                    show = {this.state.editModalShow}
                    onHide = {editModalClose}
                    proid = {proId}
                    promarca = {proMarca}
                    promodelo = {proModelo}
                    proimagen = {proImagen}
                    prodimensiones = {proDimensiones}
                    proidcategoria = {proIdCategoria}
                    proenlace = {proEnlace}
                    prodescripcion = {proDescripcion}
                    token={this.state.token}
                /> 

                <DeleteProduct
                    show = {this.state.deleteModalShow}
                    onHide = {deleteModalClose}
                    proid = {proId}
                    proidcategoria = {proIdCategoria}
                    promarca = {proMarca}
                    token={this.state.token}
                /> 

            </div>
        )
    }
}
export default ProductList