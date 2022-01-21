const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./app/routes/person.routes.js")(app);
require("./app/routes/team.routes.js")(app);
require("./app/routes/person-team.routes.js")(app);
require("./app/routes/location.routes.js")(app);
require("./app/routes/location-holiday.routes.js")(app);
require("./app/routes/person-vacation.routes.js")(app);
require("./app/routes/iteration.routes.js")(app);
require("./app/routes/program-increment.routes.js")(app);

// set port, listen for requests
const PORT = process.env.APP_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
