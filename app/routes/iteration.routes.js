module.exports = app => {
  const iteration = require("../controllers/iteration.controller.js");

  var router = require("express").Router();

  // Create a new Iteration
  router.post("/", iteration.create);

  // Retrieve all Iteration
  router.get("/", iteration.findAll);

  // Retrieve a single Iteration with id
  router.get("/:id", iteration.findOne);

  // Update a Iteration with id
  router.put("/:id", iteration.update);

  // Delete a Iteration with id
  router.delete("/:id", iteration.delete);

  // Delete all Iteration
  router.delete("/", iteration.deleteAll);

  app.use('/api/iteration', router);
};
