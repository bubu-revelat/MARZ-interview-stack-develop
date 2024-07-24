const getProducts = (req, res, db) => {
    let response = {
        result: false,
        message: ""
    }
    try {
        db.select('*').from('Product')
            .then(products => {
                response.result = true;
                response.products = products;
                res.send(response);
            }).catch(error => {
                console.error("error getting products: ", error);
                response.message = "Error procesing the request";
                res.status(500).json(response);
            });

    } catch (error) {
        console.error("error getting products: ", error);
        response.message = "Error procesing the request";
        res.status(500).json(response);
    }
}

module.exports = {
    getProducts: getProducts
}