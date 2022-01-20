const sql = require("./db.js");

// constructor
const PersonVacation = function (personVacation) {
  this.personId = personVacation.personId;
  this.date = personVacation.date;
  this.fractionOfDay = personVacation.fractionOfDay;
};

PersonVacation.create = async (newPersonVacation) => {
  try {
    const [res] = await sql.promise().query("INSERT INTO PersonVacation SET ?", newPersonVacation);
    console.log("created person vacation: ", { id: res.insertId, ...newPersonVacation });
    return { err: null, data: { id: res.insertId, ...newPersonVacation } };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { err, data: null };
    }
  }
};

PersonVacation.findById = async (id) => {
  try {
    const [res] = await sql.promise().query(`SELECT * FROM PersonVacation WHERE id = ${id}`);
    if (res.length) {
      console.log("found person vacation: ", res[0]);
      return { err: null, data: res[0] };
    }

    // not found person vacation with the id
    return { err: { kind: "not_found" }, data: null };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { err, data: null }
    }
  }
};

PersonVacation.getAll = async (name) => {
  let query = "SELECT * FROM PersonVacation";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  try {
    const [res] = await sql.promise().query(query);
    console.log("person vacation: ", res);
    return { err: null, data: res };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

PersonVacation.updateById = async (id, personVacation) => {
  try {
    const [res] = await sql.promise().query("UPDATE PersonVacation SET name = ? WHERE id = ?", [personVacation.name, id]);
    if (res.affectedRows == 0) {
      // not found person vacation with the id
      return { err: { kind: "not_found" }, data: null };
    }

    console.log("updated person vacation: ", { id: id, ...personVacation });
    return { err: null, data: { id: id, ...personVacation } };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

PersonVacation.remove = async (id) => {
  try {
    const [res] = await sql.promise().query("DELETE FROM PersonVacation WHERE id = ?", id);
    if (res.affectedRows == 0) {
      // not found person vacation with the id
      return { err: { kind: "not_found" }, data: null };
    }

    console.log("deleted person vacation with id: ", id);
    return { err: null, data: res };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

PersonVacation.removeAll = async () => {
  try {
    const [res] = await sql.promise().query("DELETE FROM PersonVacation");
    console.log(`deleted ${res.affectedRows} person vacations`);
    return { err: null, data: res };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

module.exports = PersonVacation;
