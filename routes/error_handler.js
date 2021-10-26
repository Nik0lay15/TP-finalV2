const errorHandler = (error,req,res,next) => {
    res.status(500).json({
        error :-2,
        descripcion : `Ruta ${error.route} metodo ${error.method} no autorizada` 
    });
};

export default errorHandler;