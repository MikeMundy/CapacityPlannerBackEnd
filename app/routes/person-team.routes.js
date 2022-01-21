module.exports = app => {
  const pearsonTeam = require("../controllers/person-team.controller.js");

  var router = require("express").Router();

  // Create a new PearsonTeam
  router.post("/", pearsonTeam.create);

  // Retrieve all PearsonTeam
  router.get("/", pearsonTeam.findAll);

  // Retrieve a single PearsonTeam with id
  router.get("/:id", pearsonTeam.findOne);

  // Update a PearsonTeam with id
  router.put("/:id", pearsonTeam.update);

  // Delete a PearsonTeam with id
  router.delete("/:id", pearsonTeam.delete);

  // Delete all PearsonTeam
  router.delete("/", pearsonTeam.deleteAll);

  app.use('/api/person-team', router);
};
