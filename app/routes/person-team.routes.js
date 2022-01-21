module.exports = app => {
  const personTeam = require("../controllers/person-team.controller.js");

  var router = require("express").Router();

  // Create a new PersonTeam
  router.post("/", personTeam.create);

  // Retrieve all PersonTeam
  router.get("/", personTeam.findAll);

  // Retrieve a single PersonTeam with id
  router.get("/:id", personTeam.findOne);

  // Update a PersonTeam with id
  router.put("/:id", personTeam.update);

  // Delete a PersonTeam with id
  router.delete("/:id", personTeam.delete);

  // Delete all PersonTeam
  router.delete("/", personTeam.deleteAll);

  app.use('/api/person-team', router);
};
