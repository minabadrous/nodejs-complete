exports.get404 = (req, res) => {
    console.log("🚀 ~ _req:", req.url);

    res.status(404).render("404", { pageTitle: "Page Not Found" });
};
