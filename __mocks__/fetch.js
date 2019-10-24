// Mock diseñado para hacer tests de la apiIngresar en el HOC de login
const fetch = () => Promise.resolve({
    data: [
        'Promise',
        'has',
        'been',
        'resolved'
    ]
})

module.exports = fetch;
