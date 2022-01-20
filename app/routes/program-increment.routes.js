module.exports = app => {
  const programIncrement = require("../controllers/program-increment.controller.js");

  var router = require("express").Router();

  // Create a new ProgramIncrement
  router.post("/", programIncrement.create);

  // Retrieve all ProgramIncrement
  router.get("/", programIncrement.findAll);

  // Retrieve a single ProgramIncrement with id
  router.get("/:id", programIncrement.findOne);

  // Update a ProgramIncrement with id
  router.put("/:id", programIncrement.update);

  // Delete a ProgramIncrement with id
  router.delete("/:id", programIncrement.delete);

  // Delete all ProgramIncrement
  router.delete("/", programIncrement.deleteAll);

  app.use('/api/program-increment', router);
};
