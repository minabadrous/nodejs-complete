const Product = require("../models/product");

exports.getAddProduct = (req, res) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: false,
    });
};

exports.postAddProduct = (req, res, next) => {
    const data = req.body;

    const product = new Product(data);
    product.save();
    res.redirect("/");
};

exports.getEditProduct = (req, res) => {
    const { edit } = req.query;
    const { productId } = req.params;

    const editing = edit === "true";

    if (!editing) return res.redirect("/");

    Product.findById(productId, (product) => {
        if (!product) return res.redirect("/");

        res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/edit-product",
            product,
            editing,
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    const data = req.body;
    const product = new Product(data);
    product.save();
    res.redirect("/");
};

exports.deleteProduct = (req, res) => {
    const { productId } = req.body;
    Product.deleteById(productId);
    res.redirect("/");
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("admin/products", {
            prods: products,
            pageTitle: "Admin Products",
            path: "/admin/products",
        });
    });
};
