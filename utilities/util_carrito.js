import { Carrito } from "./classes.js";
const carrito = new Carrito();
import Factory from "./DAO.js";

const DATABASE = new Factory().aplicarDatabase();

const getProductosFromCarrito = (req,res,next) => {
    DATABASE.READcarrito(res,req,(data)=>{
        res.status(200).json(data);
    });
};

const postProductoToCarrito = (req,res,next) => {
    DATABASE.CREATEproductoCarrito(res,req.body.id);
    
};

const deleteProductoFromCarrito = (req,res,next) => {
    DATABASE.DELETEproductoCarrito(res,req.params.id);
};

export default {
    getProductosFromCarrito,
    postProductoToCarrito,
    deleteProductoFromCarrito
};