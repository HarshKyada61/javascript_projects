const Repositoriy = require('./repository');

class CartsRepository extends Repositoriy {}

module.exports = new CartsRepository('carts.json');