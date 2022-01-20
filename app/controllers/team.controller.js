const Team = require("../models/team.model.js");

// Create and Save a new Team
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Team
  const team = new Team({
    name: req.body.name
  });

  // Save Team in the database
  const { err, data } = await Team.create(team);
  if (err && !data)
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Team."
    });
  else {
    res.send(data);
  }
};

// Retrieve all Team from the database (with condition).
exports.findAll = async (req, res) => {
  const name = req.query.name

  const { err, data } = await Team.getAll(name);
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving teams."
    });
  else {
    res.send(data);
  }
};

// Find a single Team by Id
exports.findOne = async (req, res) => {
  const { err, data } = await Team.findById(req.params.id);
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Team with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving Team with id " + req.params.id
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

  const { err, data } = await Team.updateById(req.params.id, new Team(req.body));
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Team with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Error updating Team with id " + req.params.id
      });
    }
  } else {
    res.send(data);
  }
};

// Delete a Team with the specified id in the request
exports.delete = async (req, res) => {
  let { err } = await Team.remove(req.params.id);
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Team with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Could not delete Team with id " + req.params.id
      });
    }
  } else res.send({ message: `Team was deleted successfully!` });
};

// Delete all Team from the database.
exports.deleteAll = async (req, res) => {
  const { err, data } = await Team.removeAll();
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all teams."
    });
  else res.send({ message: `All teams were deleted successfully!` });
};
