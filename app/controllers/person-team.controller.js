const PersonTeam = require("../models/person-team.model.js");

// Create and Save a new PersonTeam
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a PersonTeam
  const personTeam = new PersonTeam({
    name: req.body.name
  });

  // Save PersonTeam in the database
  const { err, data } = await PersonTeam.create(personTeam);
  if (err && !data)
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the PersonTeam."
    });
  else {
    res.send(data);
  }
};

// Retrieve all PersonTeam from the database (with condition).
exports.findAll = async (req, res) => {
  const personId = req.query.personId;
  const teamId = req.query.teamId;

  const { err, data } = await PersonTeam.getAll(personId, teamId);
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving personTeams."
    });
  else {
    res.send(data);
  }
};

// Find a single PersonTeam by Id
exports.findOne = async (req, res) => {
  const { err, data } = await PersonTeam.findById(req.params.id);
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found PersonTeam with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving PersonTeam with id " + req.params.id
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

  const { err, data } = await PersonTeam.updateById(req.params.id, new PersonTeam(req.body));
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found PersonTeam with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Error updating PersonTeam with id " + req.params.id
      });
    }
  } else {
    res.send(data);
  }
};

// Delete a PersonTeam with the specified id in the request
exports.delete = async (req, res) => {
  let { err } = await PersonTeam.remove(req.params.id);
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found PersonTeam with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Could not delete PersonTeam with id " + req.params.id
      });
    }
  } else res.send({ message: `PersonTeam was deleted successfully!` });
};

// Delete all PersonTeam from the database.
exports.deleteAll = async (req, res) => {
  const { err, data } = await PersonTeam.removeAll();
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all personTeams."
    });
  else res.send({ message: `All personTeams were deleted successfully!` });
};
