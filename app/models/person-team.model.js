const sql = require("./db.js");

// constructor
const PersonTeam = function (personTeam) {
  this.personId = personTeam.personId;
  this.teamId = personTeam.teamId;
  this.role = personTeam.role;
  this.percentage = personTeam.percentage;
};

PersonTeam.create = async (newPersonTeam) => {
  try {
    const [res] = await sql.promise().query("INSERT INTO PersonTeam SET ?", newPersonTeam);
    console.log("created person team: ", { id: res.insertId, ...newPersonTeam });
    return { err: null, data: { id: res.insertId, ...newPersonTeam } };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { err, data: null };
    }
  }
};

PersonTeam.getAll = async (personId, teamId) => {
  let query = "SELECT * FROM PersonTeam";

  if (personId && teamId) {
    query += ' WHERE personId = ? AND teamId = ?';
  }

  try {
    const [res] = await sql.promise().query(query, [personId, teamId]);
    console.log("person: ", res);
    return { err: null, data: res };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

PersonTeam.remove = async (personId, teamId) => {
  try {
    const [rows] = await sql.promise().query(`DELETE FROM PersonTeam WHERE personId = ? ${teamId ? 'AND teamId = ?' : ''}`, [personId, teamId]);
    if (rows == 0) {
      // not found person team with the id
      return { err: { kind: "not_found" }, err: null };
    }
    console.log("deleted person team with personId and teamId: ", personId, teamId);
    return { err: null, data: null };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

PersonTeam.removeByPersonId = async (personId) => {
  try {
    const [rows] = await sql.promise().query(`DELETE FROM PersonTeam WHERE personId = ?' : ''}`, [personId]);
    if (rows == 0) {
      // not found person team with the id
      return { err: { kind: "not_found" }, err: null };
    }
    console.log("deleted person teams for personId: ", personId, teamId);
    return { err: null, data: null };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

module.exports = PersonTeam;
