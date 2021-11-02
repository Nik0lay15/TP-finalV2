import express  from "express";
import router_carrito from "../routes/carrito.js";
import router_productos from "../routes/productos.js";
import router_error from "../routes/error_handler.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/carrito",router_carrito);
app.use("/productos",router_productos);
app.use(router_error);

export default app;