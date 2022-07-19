const PersonVacation = require("../models/person-vacation.model.js");

// Create and Save a new PersonVacation
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a PersonVacation
  const personVacation = new PersonVacation({
    id: -1,
    personId: req.body.personId,
    date: new Date(req.body.date),
    fractionOfDay: req.body.fractionOfDay
  });

  // Save PersonVacation in the database
  const { err, data } = await PersonVacation.create(personVacation);
  if (err && !data)
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the PersonVacation."
    });
  else {
    res.send(data);
  }
};

// Retrieve all PersonVacation from the database (with condition).
exports.findAll = async (req, res) => {
  const name = req.query.name

  const { err, data } = await PersonVacation.getAll(name);
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving person vacations."
    });
  else {
    res.send(data);
  }
};

// Find a single PersonVacation by Id
exports.findOne = async (req, res) => {
  const { err, data } = await PersonVacation.findById(req.params.id);
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found PersonVacation with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving PersonVacation with id " + req.params.id
      });
    }
  } else res.send(data);
};

// Update a Person Vacation identified by the id in the request
exports.update = async (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const personVacation = new PersonVacation({
    id: req.body.id,
    personId: req.body.personId,
    date: new Date(req.body.date),
    fractionOfDay: req.body.fractionOfDay
  });

  const { err, data } = await PersonVacation.updateById(req.params.id, new PersonVacation(personVacation));
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found PersonVacation with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Error updating PersonVacation with id " + req.params.id
      });
    }
  } else {
    res.send(data);
  }
};

// Delete a PersonVacation with the specified id in the request
exports.delete = async (req, res) => {
  let { err } = await PersonVacation.remove(req.params.id);
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found PersonVacation with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Could not delete PersonVacation with id " + req.params.id
      });
    }
  } else res.send({ message: `PersonVacation was deleted successfully!` });
};

// Delete all PersonVacation from the database.
exports.deleteAll = async (req, res) => {
  const { err, data } = await PersonVacation.removeAll();
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all person vacations."
    });
  else res.send({ message: `All person vacations were deleted successfully!` });
};
