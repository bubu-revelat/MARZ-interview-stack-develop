const request = require('supertest');
const express = require('express');

jest.mock('knex', () => {
  const mKnex = jest.fn(() => ({
    raw: jest.fn().mockResolvedValue([{ '1': 1 }])
  }));
  mKnex.mockReturnValue(mKnex());
  return mKnex;
});

jest.mock('./controllers/products', () => ({
  getProducts: jest.fn((req, res) => res.json({ products: [] }))
}));

let app;
let server;
let mockKnex;

describe('Server Tests', () => {
  beforeEach(() => {
    jest.resetModules();
    
    mockKnex = require('knex')();

    const serverSetup = require('./index');
    app = express();
    app.use(serverSetup.checkDbConnection);
    app.get('/api/products', serverSetup.productsRoute);
  });

  afterEach(() => {
    if (server) {
      server.close();
    }
  });

  test('Database connection successful', async () => {
    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
  });

  test('Products endpoint returns data', async () => {
    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('products');
  });

  test('Database connection failure', async () => {
    mockKnex.raw.mockRejectedValueOnce(new Error('Connection failed'));

    const response = await request(app).get('/api/products');
    expect(response.status).toBe(503);
    expect(response.body).toHaveProperty('error', 'Service Unavailable');
  });
});