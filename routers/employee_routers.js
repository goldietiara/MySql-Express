// const express = require("express");
const express = require("express");

const { employee_controller } = require("../controller");
const { getData } = require("../controller/employee_controller");

const routers = express.Router();
// define routing
// routers.get("/get", getData);

routers.get("/", employee_controller.getData);
routers.post("/add-data_employee", employee_controller.addData);
routers.patch("/edit-data_employee/:id", employee_controller.patchData);
routers.delete("/delete-data_employee/:id", employee_controller.deleteData);

module.exports = routers;
