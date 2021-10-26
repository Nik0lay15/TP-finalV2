import { Producto } from "./classes.js";
import { is_admin } from "../globals/globales.js";
import Factory from "./DAO.js";

const DATABASE = new Factory().aplicarDatabase();

const getProductos = (req,res) =>{
  console.log(req.query);
  
  DATABASE.READproductos(res,req,(data)=>{
    if(data.length == 0){
        res.status(404).json({info:"Producto no encontrado"});
    }else{
      return res.status(200).json(data);
    }
  });
};


const postProducto = (req,res,next) => {
  if(is_admin == false)
    next({route:"localhost:8080/productos",method:req.method});
  
  const {nombre,descripcion,url,precio,stock} = req.body;
  const producto_nuevo = new Producto(nombre,descripcion,url,precio,stock);
  DATABASE.CREATEproducto(res,producto_nuevo.getProductoElementos());
  res.status(200).json({info:"Producto agregado"});
};

const putProducto = (req,res,next) => {
  if(is_admin == false)
    next({route:"localhost:8080/productos",method:req.method});

  DATABASE.PUTproducto(res,req.params.id,req.body);
  return res.status(200).json({info:"Producto actualizado",descripcion:req.body});
};

const deleteProducto = (req,res,next) => {
  if(is_admin == false)
    next({route:"localhost:8080/productos",method:req.method});
  
  DATABASE.DELETEproducto(res,req.params.id);
  return res.status(200).json({info:"Producto eliminado"});
};

export default {
  getProductos,
  postProducto,
  putProducto,
  deleteProducto
};
