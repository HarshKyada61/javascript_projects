const Repository = require('./repository');


class Productrepository extends Repository {

}

module.exports = new Productrepository('products.json');