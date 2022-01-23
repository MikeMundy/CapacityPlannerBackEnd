const Person = require("../models/person.model.js");
const PersonTeam = require("../models/person-team.model.js");

// Create and Save a new Person
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Person
  const person = new Person({
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    locationId: req.body.locationId,
  });

  // Save Person in the database
  const { err, data } = await Person.create(person);
  if (err && !data)
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Person."
    });
  else {
    console.log("data: " + JSON.stringify(data));
    const thisPersonId = data.id;
    const personTeams = [];
    for (const team of req.body.personTeams) {

      const newPersonTeam = {
        personId: thisPersonId,
        teamId: team.teamId,
        role: team.role,
        percentage: team.percentage
      };

      console.log("newPersonTeam: " + JSON.stringify(newPersonTeam));

      const { err, data } = await PersonTeam.create(newPersonTeam);
      if (err && !data)
        console.log(err.message);
      else personTeams.push(data);
    }
    res.send({ ...data, personTeams });
  }
};

// Retrieve all Person from the database (with condition).
exports.findAll = async (req, res) => {
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;

  const { err, data } = await Person.getAll(firstName, lastName);
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving persons."
    });
  else {
    const { err, data: persons } = await Person.getAll(data.personId, data.teamId);
    res.send(data);
  }
};

// Find a single Person by Id
exports.findOne = async (req, res) => {
  const { err, data } = await Person.findById(req.params.id);
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Person with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving Person with id " + req.params.id
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

  const { err, data } = await Person.updateById(req.params.id, new Person(req.body));
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Person with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Error updating Person with id " + req.params.id
      });
    }
  } else {
    const personId = data.id;
    const personTeams = [];
    await PersonTeam.remove(personId, data.teamId);
    for (const team of req.body.personTeams) {
      const { err, data } = await PersonTeam.create({
        personId,
        teamId: team.teamId,
        role: team.role,
        percentage: team.percentage,
      });
      if (err && !data)
        console.log(err.message);
      else personTeams.push(data);
    }
    res.send({ ...data, personTeams });
  }
};

// Delete a Person with the specified id in the request
exports.delete = async (req, res) => {
  // Delete the Person.
  let { err } = await Person.remove(req.params.id);
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Person with id ${req.params.id}.`
      });
    } else {
      res.status(500).send({
        message: "Could not delete Person with id " + req.params.id
      });
    }
  } else {
    res.send({ message: `Person was deleted successfully!` });
  }
};

// Delete all Person from the database.
exports.deleteAll = async (req, res) => {
  const { err, data } = await Person.removeAll();
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all persons."
    });
  else res.send({ message: `All persons were deleted successfully!` });
};
