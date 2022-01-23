const sql = require("./db.js");

// constructor
const LocationHoliday = function (locationHoliday) {
  this.locationId = locationHoliday.locationId;
  this.name = locationHoliday.name;
  this.date = new Date(locationHoliday.date);
};

LocationHoliday.create = async (newLocationHoliday) => {
  try {
    const [res] = await sql.promise().query("INSERT INTO LocationHoliday SET ?", newLocationHoliday);
    console.log("created location holiday: ", { id: res.insertId, ...newLocationHoliday });
    return { err: null, data: { id: res.insertId, ...newLocationHoliday } };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { err, data: null };
    }
  }
};

LocationHoliday.findById = async (id) => {
  try {
    const [res] = await sql.promise().query(`SELECT * FROM LocationHoliday WHERE id = ${id}`);
    if (res.length) {
      console.log("found location holiday: ", res[0]);
      return { err: null, data: res[0] };
    }

    // not found location holiday with the id
    return { err: { kind: "not_found" }, data: null };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { err, data: null }
    }
  }
};

LocationHoliday.getAll = async (name) => {
  let query = "SELECT * FROM LocationHoliday";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  try {
    const [res] = await sql.promise().query(query);
    console.log("location holiday: ", res);
    return { err: null, data: res };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

LocationHoliday.updateById = async (id, locationHoliday) => {
  try {
    const [res] = await sql.promise().query("UPDATE LocationHoliday SET name = ?, date = ? WHERE id = ?", [locationHoliday.name, locationHoliday.date, id]);
    if (res.affectedRows == 0) {
      // not found location holiday with the id
      return { err: { kind: "not_found" }, data: null };
    }

    console.log("updated location holiday: ", { id: id, ...locationHoliday });
    return { err: null, data: { id: id, ...locationHoliday } };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

LocationHoliday.remove = async (id) => {
  try {
    const [res] = await sql.promise().query("DELETE FROM LocationHoliday WHERE id = ?", id);
    if (res.affectedRows == 0) {
      // not found location holiday with the id
      return { err: { kind: "not_found" }, data: null };
    }

    console.log("deleted location holiday with id: ", id);
    return { err: null, data: res };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

module.exports = LocationHoliday;
