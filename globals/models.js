import mongoose from "mongoose";

const productos_schema = new mongoose.Schema({
    id:{type:String,required:true},
    timestamp:{type:Number,required:true},
    nombre:{type:String,required:true},
    descripcion:{type:String,required:true},
    codigo:{type:String,required:true},
    url:{type:String,required:true},
    precio:{type:Number,required:true},
    stock:{type:Number,required:true}
});

const carrito_schema = new mongoose.Schema({
    id:{type:String,required:true},
    timestamp:{type:Number,required:true},
    nombre:{type:String,required:true},
    descripcion:{type:String,required:true},
    codigo:{type:String,required:true},
    url:{type:String,required:true},
    precio:{type:Number,required:true},
    stock:{type:Number,required:true}
});

const productos_model = mongoose.model("productos",productos_schema);
const carrito_model = mongoose.model("carrito",carrito_schema);

export default {
    productos_model,
    carrito_model
};
