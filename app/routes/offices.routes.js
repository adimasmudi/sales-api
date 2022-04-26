module.exports = app => {
    const offices = require("../controllers/offices.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", offices.create);
    // Retrieve all offices
    router.get("/", offices.getAll);
    // Retrieve a single Tutorial with id
    router.get("/:id", offices.findOne);
    // Update a Tutorial with id
    router.put("/:id", offices.update);
    // Delete a Tutorial with id
    router.delete("/:id", offices.delete);
    // Delete all offices
    router.delete("/", offices.deleteAll);
    app.use('/api/offices', router);
};