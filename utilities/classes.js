import uniqid from "uniqid";

export class Producto {
    #id
    #timestamp
    #nombre
    #descripcion
    #codigo
    #url
    #precio
    #stock

    constructor(nombre,descripcion,url,precio,stock){
        this.#id = uniqid.time();
        this.#timestamp = Date.now();
        this.#nombre = nombre;
        this.#descripcion = descripcion;
        this.#codigo = uniqid();
        this.#url = url;
        this.#precio = precio;
        this.#stock = stock;
    }

    getProductoElementos(){
        return {
            id:this.#id,
            timestamp:this.#timestamp,
            nombre:this.#nombre,
            descripcion:this.#descripcion,
            codigo:this.#codigo,
            url:this.#url,
            precio:this.#precio,
            stock:this.#stock
        }
    }
}

export class Carrito {
    #id
    #timestamp
    #productos

    constructor(){
        this.#id = uniqid.time();
        this.#timestamp = Date.now();
        this.#productos = [];
    }

    setListaProductos(nueva_lista){
        this.#productos = nueva_lista;
    }

    getProductos(){
        return this.#productos;
    }

    getId(){
        return this.#id;
    }
}

