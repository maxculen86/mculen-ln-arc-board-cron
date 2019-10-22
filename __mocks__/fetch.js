// Mock diseñado para hacer tests de la apiIngresar en el HOC de login
const fetch = {
    get: jest.fn(() => Promise.resolve({ data: {} }))
};

module.exports = fetch;
