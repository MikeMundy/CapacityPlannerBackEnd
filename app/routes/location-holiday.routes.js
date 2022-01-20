module.exports = app => {
  const locationHoliday = require("../controllers/location-holiday.controller.js");

  var router = require("express").Router();

  // Create a new LocationHoliday
  router.post("/", locationHoliday.create);

  // Retrieve all LocationHoliday
  router.get("/", locationHoliday.findAll);

  // Retrieve a single LocationHoliday with id
  router.get("/:id", locationHoliday.findOne);

  // Update a LocationHoliday with id
  router.put("/:id", locationHoliday.update);

  // Delete a LocationHoliday with id
  router.delete("/:id", locationHoliday.delete);

  // Delete all LocationHoliday
  router.delete("/", locationHoliday.deleteAll);

  app.use('/api/location-holiday', router);
};
