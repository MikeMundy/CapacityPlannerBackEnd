const sql = require("./db.js");

// constructor
const Iteration = function (iteration) {
  this.programIncrementId = iteration.programIncrementId;
  this.name = iteration.name;
  this.startDate = iteration.startDate;
  this.lengthInDays = iteration.lengthInDays;
  this.points = iteration.points;
};

Iteration.create = async (newIteration) => {
  try {
    const [res] = await sql.promise().query("INSERT INTO Iteration SET ?", newIteration);
    console.log("created iteration: ", { id: res.insertId, ...newIteration });
    return { err: null, data: { id: res.insertId, ...newIteration } };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { err, data: null };
    }
  }
};

Iteration.findById = async (id) => {
  try {
    const [res] = await sql.promise().query(`SELECT * FROM Iteration WHERE id = ${id}`);
    if (res.length) {
      console.log("found iteration: ", res[0]);
      return { err: null, data: res[0] };
    }

    // not found iteration with the id
    return { err: { kind: "not_found" }, data: null };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { err, data: null }
    }
  }
};

Iteration.getAll = async (name) => {
  let query = "SELECT * FROM Iteration";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  try {
    const [res] = await sql.promise().query(query);
    console.log("iteration: ", res);
    return { err: null, data: res };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

Iteration.updateById = async (id, iteration) => {
  try {
    const [res] = await sql.promise().query("UPDATE Iteration SET name = ?, startDate = ?, lengthInDays = ?, points = ? WHERE id = ?", [iteration.name, iteration.startDate, iteration.lengthInDays, iteration.points, id]);
    if (res.affectedRows == 0) {
      // not found iteration with the id
      return { err: { kind: "not_found" }, data: null };
    }

    console.log("updated iteration: ", { id: id, ...iteration });
    return { err: null, data: { id: id, ...iteration } };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

Iteration.remove = async (id) => {
  try {
    const [res] = await sql.promise().query("DELETE FROM Iteration WHERE id = ?", id);
    if (res.affectedRows == 0) {
      // not found iteration with the id
      return { err: { kind: "not_found" }, data: null };
    }

    console.log("deleted iteration with id: ", id);
    return { err: null, data: res };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

Iteration.removeAll = async () => {
  try {
    const [res] = await sql.promise().query("DELETE FROM Iteration");
    console.log(`deleted ${res.affectedRows} iterations`);
    return { err: null, data: res };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

module.exports = Iteration;
