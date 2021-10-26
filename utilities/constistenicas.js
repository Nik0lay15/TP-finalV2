import knex from "knex";
import mongoose from "mongoose";
import admin from "firebase-admin";

import db_cfg from "../globals/db_config.js";
import models from "../globals/models.js";
import service_acount from "../database/ecommerce-47745-firebase-adminsdk-7mi2q-39bd7b32f8.json";

admin.initializeApp({
    credential : admin.credential.cert(service_acount),
    databaseURL : "https://ecommerce-47745.firebaseio.com",
});

class MariaDB{
    #KNEX   
    
    constructor(){
        this.#KNEX = knex(db_cfg.maria_cfg);
        this.startUp();
    }

    async Connection(){
        this.#KNEX = knex(db_cfg.maria_cfg);
    }

    async startUp(){
        try{
            if(await this.#KNEX.schema.hasTable("productos")==false){
                await this.#KNEX.schema.createTable("productos",(table)=>{
                    table.string("id"),
                    table.string("timestamp"),
                    table.string("nombre"),
                    table.string("descripcion"),
                    table.string("codigo"),
                    table.string("url"),
                    table.integer("precio"),
                    table.integer("stock")
                });
            }
            if(await this.#KNEX.schema.hasTable("carrito")==false){
                await this.#KNEX.schema.createTable("carrito",(table)=>{
                    table.string("id"),
                    table.string("timestamp"),
                    table.string("nombre"),
                    table.string("descripcion"),
                    table.string("codigo"),
                    table.string("url"),
                    table.integer("precio"),
                    table.integer("stock")
                });
            }
            this.#KNEX.destroy();
        }catch(error){
            console.log(error);
        }
    }

    async READproductos(res,req,callback){
        this.Connection();
        const pro = Object.entries(req.query);
        const param = pro.length > 0 ? pro[0][0] : "*";
        try{
            if(req.params.id == undefined){
                const query = await this.#KNEX.from("productos").select(param);
                await callback(query);
            }else{
                const query = await this.#KNEX.from("productos").where("id","=",req.params.id).select(param);
                await callback(query);
            }
            this.#KNEX.destroy();
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo leer la lista de productos"});
        }
    }

    async READcarrito(res,req,callback){
        this.Connection();
        try{
            if(req.params.id == undefined){
                const query = await this.#KNEX.from("carrito").select("*");
                await callback(query);
            }else{
                const query = await this.#KNEX.from("carrito").where("id","=",req.params.id).select("*");
                await callback(query);
            }
            this.#KNEX.destroy();
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo leer la lista de productos del carrito"});
        }
    }
    
    async CREATEproducto(res,producto){
        this.Connection();
        try{
            await this.#KNEX("productos").insert({
                id:producto.id,
                timestamp:`${producto.timestamp}`,
                nombre:`${producto.nombre}`,
                descripcion:producto.descripcion,
                codigo:`${producto.codigo}`,
                url:producto.url,
                precio:producto.precio,
                stock:producto.stock
            });
            this.#KNEX.destroy();
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo crear el productos"});
        }
    }

    async CREATEproductoCarrito(res,id){
        this.Connection();
        try{
            console.log(id);
            const busqueda = await this.#KNEX.from("productos").where("id","=",id).select("*");
            console.log(busqueda);
            if(busqueda.length != 0){
                await this.#KNEX("carrito").insert({
                    id:busqueda[0].id,
                    timestamp:`${busqueda[0].timestamp}`,
                    nombre:`${busqueda[0].nombre}`,
                    descripcion:busqueda[0].descripcion,
                    codigo:`${busqueda[0].codigo}`,
                    url:busqueda[0].url,
                    precio:busqueda[0].precio,
                    stock:busqueda[0].stock
                })
                this.#KNEX.destroy();
                res.status(200).json({info:"Producto agregado al carrito"});
            }
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo crear el producto"});
        }
    }

    async PUTproducto(res,id,producto){
        this.Connection();
        try{
            const query = await this.#KNEX.from("productos").where("id","=",id).update({
                id:producto.id,
                timestamp:`${producto.timestamp}`,
                nombre:`${producto.nombre}`,
                descripcion:producto.descripcion,
                codigo:`${producto.codigo}`,
                url:producto.url,
                precio:producto.precio,
                stock:producto.stock
            });
            this.#KNEX.destroy();
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo actualizar el producto"});
        }
    }

    async DELETEproducto(res,id){
        this.Connection()
        try{
            await this.#KNEX.from("productos").where('id','=',id).del();
            this.#KNEX.destroy();
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo eliminar el productos"});
        }
    }

    async DELETEproductoCarrito(res,id){
        this.Connection();
        try{
           await this.#KNEX.from("carrito") .where("id","=",id).del();
           this.#KNEX.destroy();
           res.status(200).json({info:"Producto eliminado al carrito"});
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo eliminar el producto"});
        }
    }
}

class SQLite3DB{
    #KNEX   
    
    constructor(){
        this.#KNEX = knex(db_cfg.maria_cfg);
        this.startUp();
    }

    async Connection(){
        this.#KNEX = knex(db_cfg.maria_cfg);
    }

    async startUp(){
        try{
            if(await this.#KNEX.schema.hasTable("productos")==false){
                await this.#KNEX.schema.createTable("productos",(table)=>{
                    table.string("id"),
                    table.string("timestamp"),
                    table.string("nombre"),
                    table.string("descripcion"),
                    table.string("codigo"),
                    table.string("url"),
                    table.integer("precio"),
                    table.integer("stock")
                });
            }
            if(await this.#KNEX.schema.hasTable("carrito")==false){
                await this.#KNEX.schema.createTable("carrito",(table)=>{
                    table.string("id"),
                    table.string("timestamp"),
                    table.string("nombre"),
                    table.string("descripcion"),
                    table.string("codigo"),
                    table.string("url"),
                    table.integer("precio"),
                    table.integer("stock")
                });
            }
            this.#KNEX.destroy();
        }catch(error){
            console.log(error);
        }
    }

    async READproductos(res,req,callback){
        this.Connection();
        const pro = Object.entries(req.query);
        const param = pro.length > 0 ? pro[0][0] : "*";
        try{
            if(req.params.id == undefined){
                const query = await this.#KNEX.from("productos").select(param);
                await callback(query);
            }else{
                const query = await this.#KNEX.from("productos").where("id","=",req.params.id).select(param);
                await callback(query);
            }
            this.#KNEX.destroy();
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo leer la lista de productos"});
        }
    }

    async READcarrito(res,req,callback){
        this.Connection();
        try{
            if(req.params.id == undefined){
                const query = await this.#KNEX.from("carrito").select("*");
                await callback(query);
            }else{
                const query = await this.#KNEX.from("carrito").where("id","=",req.params.id).select("*");
                await callback(query);
            }
            this.#KNEX.destroy();
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo leer la lista de productos del carrito"});
        }
    }
    
    async CREATEproducto(res,producto){
        this.Connection();
        try{
            await this.#KNEX("productos").insert({
                id:producto.id,
                timestamp:`${producto.timestamp}`,
                nombre:`${producto.nombre}`,
                descripcion:producto.descripcion,
                codigo:`${producto.codigo}`,
                url:producto.url,
                precio:producto.precio,
                stock:producto.stock
            });
            this.#KNEX.destroy();
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo crear el productos"});
        }
    }

    async CREATEproductoCarrito(res,id){
        this.Connection();
        try{
            console.log(id);
            const busqueda = await this.#KNEX.from("productos").where("id","=",id).select("*");
            console.log(busqueda);
            if(busqueda.length != 0){
                await this.#KNEX("carrito").insert({
                    id:busqueda[0].id,
                    timestamp:`${busqueda[0].timestamp}`,
                    nombre:`${busqueda[0].nombre}`,
                    descripcion:busqueda[0].descripcion,
                    codigo:`${busqueda[0].codigo}`,
                    url:busqueda[0].url,
                    precio:busqueda[0].precio,
                    stock:busqueda[0].stock
                })
                this.#KNEX.destroy();
                res.status(200).json({info:"Producto agregado al carrito"});
            }
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo crear el producto"});
        }
    }

    async PUTproducto(res,id,producto){
        this.Connection();
        try{
            const query = await this.#KNEX.from("productos").where("id","=",id).update({
                id:producto.id,
                timestamp:`${producto.timestamp}`,
                nombre:`${producto.nombre}`,
                descripcion:producto.descripcion,
                codigo:`${producto.codigo}`,
                url:producto.url,
                precio:producto.precio,
                stock:producto.stock
            });
            this.#KNEX.destroy();
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo actualizar el producto"});
        }
    }

    async DELETEproducto(res,id){
        this.Connection()
        try{
            await this.#KNEX.from("productos").where('id','=',id).del();
            this.#KNEX.destroy();
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo eliminar el productos"});
        }
    }

    async DELETEproductoCarrito(res,id){
        this.Connection();
        try{
           await this.#KNEX.from("carrito") .where("id","=",id).del();
           this.#KNEX.destroy();
           res.status(200).json({info:"Producto eliminado al carrito"});
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo eliminar el producto"});
        }
    }
}

class MongoDB{
    #PATH

    constructor(){
        this.#PATH = "mongodb+srv://guest:guest123@tp-final.pzbmj.mongodb.net/ecommerce?retryWrites=true&w=majority"
    }

    async Connection(path){
        try{
            await mongoose.connect(path,{
                useNewUrlParser:true,
                useUnifiedTopology:true,
                serverSelectionTimeoutMS:1000
            });
            console.log("Base conectada");
        }catch(error){
            console.log(error);
        }
    }

    async READproductos(res,req,callback){
        const key = Object.keys(req.query);
        const param = {...req.query,[key[0]]:1};
        try{
            await this.Connection(this.#PATH);
            if(req.params.id == undefined){
                const query = key.length > 0 ? await models.productos_model.find({},param) : await models.productos_model.find({});
                await callback(query);
            }else{
                const query = key.length > 0 ? await models.productos_model.find({"id":req.params.id},param) : await models.productos_model.find({"id":req.params.id});
                await callback(query);
            }
            mongoose.connection.close();
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo procesar el pedido"});
        }
    }

    async READcarrito(res,req,callback){
        try{
            await this.Connection(this.#PATH);
            if(req.params.id != undefined){
                const query = await models.carrito_model.find({"id":req.params.id});
                await callback(query);
            }else{
                const query = await models.carrito_model.find({});
                await callback(query);
            }
            mongoose.connection.close();
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo procesar el pedido"});
        }
    }
    
    async CREATEproducto(res,producto){
        try{
            await this.Connection(this.#PATH);
            await models.productos_model.insertMany({
                "id":producto.id,
                "timestamp":producto.timestamp,
                "nombre":producto.nombre,
                "descripcion":producto.descripcion,
                "codigo":producto.codigo,
                "url":producto.url,
                "precio":producto.precio,
                "stock":producto.stock
            });
            mongoose.connection.close();
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo crear el producto"});
        }
    }

    async CREATEproductoCarrito(res,id){
        try{
            await this.Connection(this.#PATH);
            const busqueda = await models.productos_model.find({"id":id});
            if(busqueda.length != 0){
                await models.carrito_model.insertMany({
                    "id":busqueda[0].id,
                    "timestamp":busqueda[0].timestamp,
                    "nombre":busqueda[0].nombre,
                    "descripcion":busqueda[0].descripcion,
                    "codigo":busqueda[0].codigo,
                    "url":busqueda[0].url,
                    "precio":busqueda[0].precio,
                    "stock":busqueda[0].stock
                }); 
                res.status(200).json({info:"Producto agreagado al carrito",data:busqueda[0]});
            }else{
                res.status(404).json({error:"Producto no encontrado"});
            }
            mongoose.connection.close();
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo crear el producto"});
        }
    }

    async PUTproducto(res,p_id,producto){
        try{
            await this.Connection(this.#PATH);
            await models.productos_model.updateOne({"id":p_id},{"$set":{
                "id":producto.id,
                "timestamp":producto.timestamp,
                "nombre":producto.nombre,
                "descripcion":producto.descripcion,
                "codigo":producto.codigo,
                "url":producto.url,
                "precio":producto.precio,
                "stock":producto.stock
            }});
            mongoose.connection.close();
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo actualizar el producto"});
        }
    }

    async DELETEproducto(res,id){
        try{
            await this.Connection(this.#PATH);
            await models.productos_model.deleteOne({"id":id});
            mongoose.connection.close();
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo eliminar el producto"});
        }
    }

    async DELETEproductoCarrito(res,id){
        try{
            await this.Connection(this.#PATH);
            const query = await models.carrito_model.findOneAndDelete({"id":id});
            mongoose.connection.close();
            res.status(200).json({info:"Producto eliminado"});
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se puedo eliminar el producto del carrito"});
        }
    }
}

class FirebaseDB{
    #FIRE
    #QUERYPRODUCTO
    #QUERYCARRITO   
    
    constructor(){
        this.Connection();
    }

    async Connection(){
        this.#FIRE = admin.firestore();
        this.#QUERYPRODUCTO = this.#FIRE.collection("productos");
        this.#QUERYCARRITO = this.#FIRE.collection("carrito")
    }

    async READproductos(res,req,callback){
        try{
            const query_snapshot = await this.#QUERYPRODUCTO.get();
            const docs = query_snapshot.docs;
            const res = docs.map((e)=>({
                id:e.data().id,
                timestamp:e.data().timestamp,
                nombre:e.data().nombre,
                descripcion:e.data().descripcion,
                codigo:e.data().codigo,
                url:e.data().url,
                precio:e.data().precio,
                stock:e.data().stock
            }));
            if(req.params.id == undefined){
                await callback(res);
            }else{
                const busqueda = res.find(e => e.id == req.params.id);
                if(busqueda != undefined){
                    await callback(busqueda);
                }else{
                    res.status(404).json({error:"El producto no existe"});
                }
            }
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo buscar los datos"});
        }
    }

    async READcarrito(res,req,callback){
        try{
            const query_snapshot = await this.#QUERYCARRITO.get();
            const docs = query_snapshot.docs;
            const res = docs.map((e)=>({
                id:e.data().id,
                timestamp:e.data().timestamp,
                nombre:e.data().nombre,
                descripcion:e.data().descripcion,
                codigo:e.data().codigo,
                url:e.data().url,
                precio:e.data().precio,
                stock:e.data().stock
            }));
            if(req.params.id == undefined){
                await callback(res);
            }else{
                const busqueda = res.find(e => e.id == req.params.id);
                if(busqueda != undefined){
                    await callback(busqueda);
                }else{
                    res.status(404).json({error:"El producto no existe en el carrito"});
                }
            }
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo buscar los datos"});
        }
    }
    
    async CREATEproducto(res,producto){
        try{
            const doc = this.#QUERYPRODUCTO.doc();
            await doc.create({
                "id":producto.id,
                "timestamp":producto.timestamp,
                "nombre":producto.nombre,
                "descripcion":producto.descripcion,
                "codigo":producto.codigo,
                "url":producto.url,
                "precio":producto.precio,
                "stock":producto.stock
            });
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo crear el producto"});
        }
    }

    async CREATEproductoCarrito(res,id){
        try{ 
            const query_snapshot = await this.#QUERYPRODUCTO.get();
            const docs = query_snapshot.docs;
            const res = docs.map((e)=>({
                id:e.data().id,
                timestamp:e.data().timestamp,
                nombre:e.data().nombre,
                descripcion:e.data().descripcion,
                codigo:e.data().codigo,
                url:e.data().url,
                precio:e.data().precio,
                stock:e.data().stock
            }));
            const busqueda = res.find(e => e.id == id);
            if(busqueda != undefined){
                const doc = this.#QUERYCARRITO.doc();
                await doc.create({
                    "id":busqueda.id,
                    "timestamp":busqueda.timestamp,
                    "nombre":busqueda.nombre,
                    "descripcion":busqueda.descripcion,
                    "codigo":busqueda.codigo,
                    "url":busqueda.url,
                    "precio":busqueda.precio,
                    "stock":busqueda.stock
                });
            }else{
                res.status(404).json({error:"El producto no existe"});
            }
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo crear el producto"});
        }
    }

    async PUTproducto(res,id,producto){
        try{ 
            const query_snapshot = await this.#QUERYPRODUCTO.get();
            const docs = query_snapshot.docs;
            const res = docs.map((e)=>({
                id:e.id,

            }));
            const busqueda = res.find(e => e.id == id);
            if(busqueda != undefined){
                const doc = this.#QUERYCARRITO.doc(res.id);
                await doc.update({
                    "id":producto.id,
                    "timestamp":producto.timestamp,
                    "nombre":producto.nombre,
                    "descripcion":producto.descripcion,
                    "codigo":producto.codigo,
                    "url":producto.url,
                    "precio":producto.precio,
                    "stock":producto.stock
                });
            }else{
                res.status(404).json({error:"El producto no existe"});
            }
        }catch(error){
            console.log(error);
            res.status(404).json({error:"No se pudo crear el producto"});
        }
    }

    async DELETEproducto(res,id){
        try{
            const query_snapshot = await this.#QUERYPRODUCTO.get();
            const docs = query_snapshot.docs;
            const res = docs.map((e)=>({
                id:e.id
            }));
            const eliminar_id = res.find(e => e.id == id);
            console.log(eliminar_id);
            if(eliminar_id != undefined){
                const doc = await this.#QUERYPRODUCTO.doc(eliminar_id.id);
                const item = await doc.delete();
            }
        }catch(error){
            console.log(error);
        }
    }

    async DELETEproductoCarrito(res,id){
        try{
            const query_snapshot = await this.#QUERYCARRITO.get();
            const docs = query_snapshot.docs;
            const res = docs.map((e)=>({
                id:e.id
            }));
            const eliminar_id = res.find(e => e.id == id);
            console.log(eliminar_id);
            if(eliminar_id != undefined){
                const doc = await this.#QUERYCARRITO.doc(eliminar_id.id);
                const item = await doc.delete();
            }
        }catch(error){
            console.log(error);
        }
    }
}

export default {
    MariaDB,
    SQLite3DB,
    MongoDB,
    FirebaseDB
};
