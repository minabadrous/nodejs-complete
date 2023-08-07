const fs = require("fs");
const path = require("path");

const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "cart.json"
);

module.exports = class Cart {
    static addProduct(id, price) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };

            if (!err) {
                cart = JSON.parse(fileContent);
            }

            const existingProductIndex = cart.products.findIndex(
                (prod) => prod.id === id
            );
            const existingProduct = cart.products[existingProductIndex];

            if (existingProduct) {
                cart.products[existingProductIndex].qty++;
            } else {
                cart.products.push({ id: id, qty: 1 });
            }

            cart.totalPrice += +price;
            fs.writeFile(p, JSON.stringify(cart), (err) => {});
        });
    }

    static deleteById(id, price) {
        fs.readFile(p, (err, fileContent) => {
            if (err) return;

            const cart = JSON.parse(fileContent);
            if (!cart.products.length) return;

            let qtyToDelete;
            const filtered = cart.products.filter((p) => {
                if (p.id !== id) {
                    qtyToDelete = p.qty;
                    return true;
                }
                return false;
            });

            cart.products = filtered;
            cart.totalPrice -= qtyToDelete * price;
            fs.writeFile(p, JSON.stringify(cart), (err) => {});
        });
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            if (err) return cb({ products: [], totalPrice: 0 });
            return cb(JSON.parse(fileContent));
        });
    }
};
