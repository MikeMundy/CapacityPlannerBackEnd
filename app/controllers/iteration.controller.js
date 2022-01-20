const Iteration = require("../models/iteration.model.js");

// Create and Save a new Iteration
exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Iteration
    const iteration = new Iteration({
        programIterationId: req.body.programIterationId,
        name: req.body.name,
        startDate: req.body.startDate,
        lengthInDays: req.body.lengthInDays,
        points: req.body.points
    });

    // Save Iteration in the database
    const { err, data } = await Iteration.create(iteration);
    if (err && !data)
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Iteration."
        });
    else {
        res.send(data);
    }
};

// Retrieve all Iteration from the database (with condition).
exports.findAll = async (req, res) => {
    const name = req.query.name

    const { err, data } = await Iteration.getAll(name);
    if (err)
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving iterations."
        });
    else {
        res.send(data);
    }
};

// Find a single Iteration by Id
exports.findOne = async (req, res) => {
    const { err, data } = await Iteration.findById(req.params.id);
    if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Iteration with id ${req.params.id}.`
            });
        } else {
            res.status(500).send({
                message: "Error retrieving Iteration with id " + req.params.id
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

    const { err, data } = await Iteration.updateById(req.params.id, new Iteration(req.body));
    if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Iteration with id ${req.params.id}.`
            });
        } else {
            res.status(500).send({
                message: "Error updating Iteration with id " + req.params.id
            });
        }
    } else {
        res.send(data);
    }
};

// Delete a Iteration with the specified id in the request
exports.delete = async (req, res) => {
    let { err } = await Iteration.remove(req.params.id);
    if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Iteration with id ${req.params.id}.`
            });
        } else {
            res.status(500).send({
                message: "Could not delete Iteration with id " + req.params.id
            });
        }
    } else res.send({ message: `Iteration was deleted successfully!` });
};

// Delete all Iteration from the database.
exports.deleteAll = async (req, res) => {
    const { err, data } = await Iteration.removeAll();
    if (err)
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all iterations."
        });
    else res.send({ message: `All iterations were deleted successfully!` });
};
