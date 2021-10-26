import { Router } from "express";
import Utilities from "../utilities/util_carrito.js";
const router = Router();

router.get("/listar/:id?",Utilities.getProductosFromCarrito);
router.post("/agregar",Utilities.postProductoToCarrito);
router.delete("/borrar/:id",Utilities.deleteProductoFromCarrito);

export default router;