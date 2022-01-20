const sql = require("./db.js");

// constructor
const Person = function (person) {
  this.locationId = person.locationId;
  this.firstName = person.firstName;
  this.lastName = person.lastName;
};

Person.create = async (newPerson) => {
  try {
    const [res] = await sql.promise().query("INSERT INTO Person SET ?", newPerson);
    console.log("created person: ", { id: res.insertId, ...newPerson });
    return { err: null, data: { id: res.insertId, ...newPerson } }
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { err, data: null };
    }
  }
};

Person.findById = async (id) => {
  try {
    const [res] = await sql.promise().query(`SELECT * FROM Person WHERE id = ${id}`);
    if (res.length) {
      console.log("found person: ", res[0]);
      return { err: null, data: res[0] };
    }

    // not found person with the id
    return { err: { kind: "not_found" }, data: null };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { err, data: null };
    }
  }
};

Person.getAll = async (firstName, lastName) => {
  let query = "SELECT * FROM Person";

  if (firstName && lastName) {
    query += ` WHERE firstName LIKE '%${firstName}%' AND lastName LIKE '%${lastName}%'`;
  }

  try {
    const [res] = await sql.promise().query(query);
    console.log("person: ", res);
    return { err: null, data: res };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

Person.updateById = async (id, person) => {
  try {
    const [res] = await sql.promise().query("UPDATE Person SET firstName = ?, lastName = ? WHERE id = ?", [person.firstName, person.lastName, id]);
    if (res.affectedRows == 0) {
      // not found person with the id
      return { err: { kind: "not_found" }, data: null };
    }

    console.log("updated person: ", { id: id, ...person });
    return { err: null, data: { id: id, ...person } }
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

Person.remove = async (id) => {
  try {
    const [res] = await sql.promise().query("DELETE FROM Person WHERE id = ?", id);
    if (res.affectedRows == 0) {
      // not found person with the id
      return { err: { kind: "not_found" }, data: null };
    }

    console.log("deleted person with id: ", id);
    return { err: null, data: res };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

Person.removeAll = async () => {
  try {
    const [res] = await sql.promise().query("DELETE FROM Person");
    console.log(`deleted ${res.affectedRows} persons`);
    return { data: null, data: res };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

module.exports = Person;
