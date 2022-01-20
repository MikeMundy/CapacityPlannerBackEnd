const ProgramIncrement = require("../models/program-increment.model.js");

// Create and Save a new ProgramIncrement
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a ProgramIncrement
  const programIncrement = new ProgramIncrement({
    name: req.body.name
  });

  // Save ProgramIncrement in the database
  const { err, data } = await ProgramIncrement.create(programIncrement);
  if (err && !data)
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the ProgramIncrement."
    });
  else {
    res.send(data);
  }
};

// Retrieve all ProgramIncrement from the database (with condition).
exports.findAll = async (req, res) => {
  const name = req.query.name

  const { err, data } = await ProgramIncrement.getAll(name);
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving program increments."
    });
  else {
    res.send(data);
  }
};

// Find a single ProgramIncrement by Id
exports.findOne = async (req, res) => {
  const { err, data } = await ProgramIncrement.findById(req.params.id);
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found ProgramIncrement with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving ProgramIncrement with id " + req.params.id
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

  const { err, data } = await ProgramIncrement.updateById(req.params.id, new ProgramIncrement(req.body));
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found ProgramIncrement with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Error updating ProgramIncrement with id " + req.params.id
      });
    }
  } else {
    res.send(data);
  }
};

// Delete a ProgramIncrement with the specified id in the request
exports.delete = async (req, res) => {
  let { err } = await ProgramIncrement.remove(req.params.id);
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found ProgramIncrement with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Could not delete ProgramIncrement with id " + req.params.id
      });
    }
  } else res.send({ message: `ProgramIncrement was deleted successfully!` });
};

// Delete all ProgramIncrement from the database.
exports.deleteAll = async (req, res) => {
  const { err, data } = await ProgramIncrement.removeAll();
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all program increments."
    });
  else res.send({ message: `All program increments were deleted successfully!` });
};
