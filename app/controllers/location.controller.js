const Location = require("../models/location.model.js");

// Create and Save a new Location
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Location
  const location = new Location({
    name: req.body.name
  });

  // Save Location in the database
  const { err, data } = await Location.create(location);
  if (err && !data)
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Location."
    });
  else {
    res.send(data);
  }
};

// Retrieve all Location from the database (with condition).
exports.findAll = async (req, res) => {
  const name = req.query.name

  const { err, data } = await Location.getAll(name);
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving locations."
    });
  else {
    res.send(data);
  }
};

// Find a single Location by Id
exports.findOne = async (req, res) => {
  const { err, data } = await Location.findById(req.params.id);
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Location with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving Location with id " + req.params.id
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

  const { err, data } = await Location.updateById(req.params.id, new Location(req.body));
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Location with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Error updating Location with id " + req.params.id
      });
    }
  } else {
    res.send(data);
  }
};

// Delete a Location with the specified id in the request
exports.delete = async (req, res) => {
  let { err } = await Location.remove(req.params.id);
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Location with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Could not delete Location with id " + req.params.id
      });
    }
  } else res.send({ message: `Location was deleted successfully!` });
};

// Delete all Location from the database.
exports.deleteAll = async (req, res) => {
  const { err, data } = await Location.removeAll();
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all locations."
    });
  else res.send({ message: `All locations were deleted successfully!` });
};
