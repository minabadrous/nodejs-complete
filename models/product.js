const fs = require("fs");
const path = require("path");
const Cart = require("./cart");

const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "products.json"
);

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

const update = (products, cb) => {
    fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
        cb?.(err);
    });
};

module.exports = class Product {
    constructor(product) {
        this.product = product;
    }

    save() {
        getProductsFromFile((products) => {
            if (this.product.id) {
                const existingProductIndex = products.findIndex(
                    (p) => p.id === this.product.id
                );
                products[existingProductIndex] = this.product;
            } else {
                this.product.id = Math.random().toString();
                products.push(this.product);
            }

            update(products);
        });
    }

    static deleteById(id) {
        getProductsFromFile((products) => {
            const filtered = products.filter((p) => p.id !== id);
            update(filtered, () => {
                Cart.deleteById(id);
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile((products) => {
            const product = products.find((p) => p.id === id);
            cb(product);
        });
    }
};
