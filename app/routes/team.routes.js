module.exports = app => {
  const team = require("../controllers/team.controller.js");

  var router = require("express").Router();

  // Create a new Team
  router.post("/", team.create);

  // Retrieve all Team
  router.get("/", team.findAll);

  // Retrieve a single Team with id
  router.get("/:id", team.findOne);

  // Update a Team with id
  router.put("/:id", team.update);

  // Delete a Team with id
  router.delete("/:id", team.delete);

  // Delete all Team
  router.delete("/", team.deleteAll);

  app.use('/api/team', router);
};
