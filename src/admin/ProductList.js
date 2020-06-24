import React from 'react'
import { Table } from 'react-bootstrap'

import { Button, ButtonToolbar } from 'react-bootstrap'
import RegisterProduct from './RegisterProduct';
import EditProduct from './EditProduct';

class ProductList extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            prods: [], 
            addModalShow : false, 
            editModalShow : false,
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

    componentDidUpdate(){
        this.refreshList()
    }

    render(){

        const{prods, proId, proMarca, proModelo, proDimensiones, proIdCategoria, proImagen, proDescripcion} = this.state;
        let addModalClose =() => this.setState({addModalShow : false})
        let editModalClose =() => this.setState({editModalShow : false})

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
                        <td style={{ textAlign: "center"}}><img src={`${product.pro_imagen}`} style={{width: '30px'}} /></td>
                        <td style={{ textAlign: "center"}}>
                            <ButtonToolbar>
                                <Button variant="info"
                                onClick={()=> this.setState({editModalShow: true, proId: product.id, proMarca: product.pro_marca, 
                                    proModelo: product.pro_modelo, proDimensiones: product.pro_dimesiones, proIdCategoria: product.categoria_id,
                                    proDescripcion: product.pro_descripcion })}
                                >
                                    Editar
                                </Button>
                                <EditProduct
                                show = {this.state.editModalShow}
                                onHide = {editModalClose}
                                proId = {proId}
                                proMarca = {proMarca}
                                proModelo = {proModelo}
                                proDimensiones = {proDimensiones}
                                proIdCategoria = {proIdCategoria}
                                proDescripcion = {proDescripcion}
                                /> 
                            </ButtonToolbar>
                        </td>
                    </tr>
                        )}
                </tbody>
                </Table>

            </div>
        )
    }
}
export default ProductList