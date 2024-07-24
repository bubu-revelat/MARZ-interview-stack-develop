const express = require('express');
const app = express();
const knex = require('knex');
const products = require('./controllers/products');
const PORT = process.env.PORT || 5002;

const db = knex({
    client: 'mysql2',
    connection: {
        database: 'marz',
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    },
});

const checkDbConnection = (req, res, next) => {
    db.raw('SELECT 1')
        .then(() => {
            next();
        })
        .catch((error) => {
            console.error('Database connection error:', error);
            res.status(503).json({ error: 'Service Unavailable', message: 'Database connection error' });
        });
};

function startServer() {
    app.use(checkDbConnection); 
    app.get('/api/products', (req, res) => { products.getProducts(req, res, db) });

    if (process.env.NODE_ENV !== 'test') {
        app.listen(PORT, () => {
            console.log(`Products micro-service running on port ${PORT}`);
        });
    }
}

// Export for testing
module.exports = {
    checkDbConnection,
    productsRoute: (req, res) => products.getProducts(req, res, db),
    startServer,
    app
};

if (process.env.NODE_ENV !== 'test') {
    db.raw('SELECT 1')
        .then(() => {
            console.log('Database connection successful!');
            startServer();
        })
        .catch((error) => {
            console.error('Error connecting to the database:', error);
            process.exit(1);
        });
}