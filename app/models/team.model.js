const sql = require("./db.js");

// constructor
const Team = function (team) {
  this.name = team.name;
};

Team.create = async (newTeam) => {
  try {
    const [res] = await sql.promise().query("INSERT INTO Team SET ?", newTeam);
    console.log("created team: ", { id: res.insertId, ...newTeam });
    return { err: null, data: { id: res.insertId, ...newTeam } };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { err, data: null };
    }
  }
};

Team.findById = async (id) => {
  try {
    const [res] = await sql.promise().query(`SELECT * FROM Team WHERE id = ${id}`);
    if (res.length) {
      console.log("found team: ", res[0]);
      return { err: null, data: res[0] };
    }

    // not found team with the id
    return { err: { kind: "not_found" }, data: null };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { err, data: null }
    }
  }
};

Team.getAll = async (name) => {
  let query = "SELECT * FROM Team";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  try {
    const [res] = await sql.promise().query(query);
    console.log("team: ", res);
    return { err: null, data: res };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

Team.updateById = async (id, team) => {
  try {
    const [res] = await sql.promise().query("UPDATE Team SET name = ? WHERE id = ?", [team.name, id]);
    if (res.affectedRows == 0) {
      // not found team with the id
      return { err: { kind: "not_found" }, data: null };
    }

    console.log("updated team: ", { id: id, ...team });
    return { err: null, data: { id: id, ...team } };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

Team.remove = async (id) => {
  try {
    const [res] = await sql.promise().query("DELETE FROM Team WHERE id = ?", id);
    if (res.affectedRows == 0) {
      // not found team with the id
      return { err: { kind: "not_found" }, data: null };
    }

    console.log("deleted team with id: ", id);
    return { err: null, data: res };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

Team.removeAll = async () => {
  try {
    const [res] = await sql.promise().query("DELETE FROM Team");
    console.log(`deleted ${res.affectedRows} teams`);
    return { err: null, data: res };
  } catch (err) {
    if (err) {
      console.log("error: ", err);
      return { data: null, err };
    }
  }
};

module.exports = Team;
