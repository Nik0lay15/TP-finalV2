//--> Dependencias
import { Router } from "express";
import Utilities from "../utilities/util_productos.js";
const router = Router();

//--> Router
router.get("/listar/:id?",Utilities.getProductos);
router.post("/agregar",Utilities.postProducto);
router.put("/actualizar/:id",Utilities.putProducto);
router.delete("/borrar/:id",Utilities.deleteProducto);

export default router;
