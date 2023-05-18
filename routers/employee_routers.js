// const express = require("express");
const express = require("express");

const { employee_controller } = require("../controller");
const { getData } = require("../controller/employee_controller");

const routers = express.Router();
// define routing
// routers.get("/get", getData);

routers.get("/", employee_controller.getData);
routers.post("/", employee_controller.addData);
routers.patch("/", employee_controller.patchData);
routers.delete("/", employee_controller.deleteData);

module.exports = routers;
