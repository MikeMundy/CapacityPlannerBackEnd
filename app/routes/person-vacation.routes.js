module.exports = app => {
  const personVacation = require("../controllers/person-vacation.controller.js");

  var router = require("express").Router();

  // Create a new PersonVacation
  router.post("/", personVacation.create);

  // Retrieve all PersonVacation
  router.get("/", personVacation.findAll);

  // Retrieve a single PersonVacation with id
  router.get("/:id", personVacation.findOne);

  // Update a PersonVacation with id
  router.put("/:id", personVacation.update);

  // Delete a PersonVacation with id
  router.delete("/:id", personVacation.delete);

  // Delete all PersonVacation
  router.delete("/", personVacation.deleteAll);

  app.use('/api/person-vacation', router);
};
