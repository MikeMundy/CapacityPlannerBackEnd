const sql = require("./db.js");

// constructor
const ProgramIncrement = function (programIncrement) {
  this.name = programIncrement.name;
};

ProgramIncrement.create = async (newProgramIncrement) => {
  try {
    const [res] = await sql.promise().query("INSERT INTO ProgramIncrement SET ?", newProgramIncrement);
    console.log("created programIncrement: ", { id: res.insertId, ...newProgramIncrement });
    return { err: null, data: { id: res.insertId, ...newProgramIncrement } };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { err, data: null };
    }
  }
};

ProgramIncrement.findById = async (id) => {
  try {
    const [res] = await sql.promise().query(`SELECT * FROM ProgramIncrement WHERE id = ${id}`);
    if (res.length) {
      console.log("found programIncrement: ", res[0]);
      return { err: null, data: res[0] };
    }

    // not found programIncrement with the id
    return { err: { kind: "not_found" }, data: null };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { err, data: null }
    }
  }
};

ProgramIncrement.getAll = async (name) => {
  let query = "SELECT * FROM ProgramIncrement";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  try {
    const [res] = await sql.promise().query(query);
    console.log("programIncrement: ", res);
    return { err: null, data: res };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

ProgramIncrement.updateById = async (id, programIncrement) => {
  try {
    const [res] = await sql.promise().query("UPDATE ProgramIncrement SET name = ? WHERE id = ?", [programIncrement.name, id]);
    if (res.affectedRows == 0) {
      // not found programIncrement with the id
      return { err: { kind: "not_found" }, data: null };
    }

    console.log("updated programIncrement: ", { id: id, ...programIncrement });
    return { err: null, data: { id: id, ...programIncrement } };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

ProgramIncrement.remove = async (id) => {
  try {
    const [res] = await sql.promise().query("DELETE FROM ProgramIncrement WHERE id = ?", id);
    if (res.affectedRows == 0) {
      // not found programIncrement with the id
      return { err: { kind: "not_found" }, data: null };
    }

    console.log("deleted programIncrement with id: ", id);
    return { err: null, data: res };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

ProgramIncrement.removeAll = async () => {
  try {
    const [res] = await sql.promise().query("DELETE FROM ProgramIncrement");
    console.log(`deleted ${res.affectedRows} program increments`);
    return { err: null, data: res };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

module.exports = ProgramIncrement;
