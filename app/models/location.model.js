const sql = require("./db.js");

// constructor
const Location = function (location) {
  this.name = location.name;
};

Location.create = async (newLocation) => {
  try {
    const [res] = await sql.promise().query("INSERT INTO Location SET ?", newLocation);
    console.log("created location: ", { id: res.insertId, ...newLocation });
    return { err: null, data: { id: res.insertId, ...newLocation } };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { err, data: null };
    }
  }
};

Location.findById = async (id) => {
  try {
    const [res] = await sql.promise().query(`SELECT * FROM Location WHERE id = ${id}`);
    if (res.length) {
      console.log("found location: ", res[0]);
      return { err: null, data: res[0] };
    }

    // not found location with the id
    return { err: { kind: "not_found" }, data: null };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { err, data: null }
    }
  }
};

Location.getAll = async (name) => {
  let query = "SELECT * FROM Location";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  try {
    const [res] = await sql.promise().query(query);
    console.log("location: ", res);
    return { err: null, data: res };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

Location.updateById = async (id, location) => {
  try {
    const [res] = await sql.promise().query("UPDATE Location SET name = ? WHERE id = ?", [location.name, id]);
    if (res.affectedRows == 0) {
      // not found location with the id
      return { err: { kind: "not_found" }, data: null };
    }

    console.log("updated location: ", { id: id, ...location });
    return { err: null, data: { id: id, ...location } };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

Location.remove = async (id) => {
  try {
    const [res] = await sql.promise().query("DELETE FROM Location WHERE id = ?", id);
    if (res.affectedRows == 0) {
      // not found location with the id
      return { err: { kind: "not_found" }, data: null };
    }

    console.log("deleted location with id: ", id);
    return { err: null, data: res };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

Location.removeAll = async () => {
  try {
    const [res] = await sql.promise().query("DELETE FROM Location");
    console.log(`deleted ${res.affectedRows} locations`);
    return { err: null, data: res };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

module.exports = Location;
