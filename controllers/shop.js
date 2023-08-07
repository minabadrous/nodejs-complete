const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("shop/product-list", {
            prods: products,
            pageTitle: "All Products",
            path: "/products",
        });
    });
};

exports.getProduct = (req, res, next) => {
    const { productId } = req.params;

    Product.findById(productId, (product) => {
        res.render("shop/product-detail", {
            product,
            pageTitle: product.title,
            path: "products",
        });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("shop/index", {
            prods: products,
            pageTitle: "Shop",
            path: "/",
        });
    });
};

exports.getCart = (req, res, next) => {
    Cart.getCart((cart) => {
        Product.fetchAll((products) => {
            const items = [];

            products.map((p) => {
                const foundIndex = cart.products.findIndex(
                    (pr) => pr.id === p.id
                );

                if (foundIndex > -1) {
                    items.push({ ...p, qty: cart.products[foundIndex].qty });
                }
            });

            res.render("shop/cart", {
                path: "/cart",
                pageTitle: "Your Cart",
                products: items,
            });
        });
    });
};

exports.postCart = (req, res, next) => {
    const { productId } = req.body;

    Product.findById(productId, (product) => {
        Cart.addProduct(productId, product.price);
        res.redirect("/");
    });
};

exports.postCartDeleteProduct = (req, res) => {
    const { productId } = req.body;
    Cart.deleteById(productId);
    res.redirect("/");
};

exports.getOrders = (req, res, next) => {
    res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
    });
};

exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        path: "/checkout",
        pageTitle: "Checkout",
    });
};
