const LocationHoliday = require("../models/location-holiday.model.js");

// Create and Save a new LocationHoliday
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a LocationHoliday
  const locationHoliday = new LocationHoliday({
    locationId: req.body.locationId,
    name: req.body.name,
    date: req.body.date
  });

  // Save LocationHoliday in the database
  const { err, data } = await LocationHoliday.create(locationHoliday);
  if (err && !data)
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the LocationHoliday."
    });
  else {
    res.send(data);
  }
};

// Retrieve all LocationHoliday from the database (with condition).
exports.findAll = async (req, res) => {
  const name = req.query.name

  const { err, data } = await LocationHoliday.getAll(name);
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving location holidays."
    });
  else {
    res.send(data);
  }
};

// Find a single LocationHoliday by Id
exports.findOne = async (req, res) => {
  const { err, data } = await LocationHoliday.findById(req.params.id);
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found LocationHoliday with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving LocationHoliday with id " + req.params.id
      });
    }
  } else res.send(data);
};

// Update a Person identified by the id in the request
exports.update = async (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const { err, data } = await LocationHoliday.updateById(req.params.id, new LocationHoliday(req.body));
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found LocationHoliday with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Error updating LocationHoliday with id " + req.params.id
      });
    }
  } else {
    res.send(data);
  }
};

// Delete a LocationHoliday with the specified id in the request
exports.delete = async (req, res) => {
  let { err } = await LocationHoliday.remove(req.params.id);
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found LocationHoliday with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Could not delete LocationHoliday with id " + req.params.id
      });
    }
  } else res.send({ message: `LocationHoliday was deleted successfully!` });
};

// Delete all LocationHoliday from the database.
exports.deleteAll = async (req, res) => {
  const { err, data } = await LocationHoliday.removeAll();
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all location holidays."
    });
  else res.send({ message: `All location holidays were deleted successfully!` });
};
