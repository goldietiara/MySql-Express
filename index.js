const express = require("express");
const cors = require("cors");

// const bodyParser
const PORT = 3300;
const app = express();

app.use(cors());
app.use(express.json()); //pengganti body parser

// app.use("/", (req, res) => {
//   res.status(200).send("<h4>mysql Integrated with express, YEAY!!</h4>");
// });

const { employee_routers } = require("./routers");
app.use("/data_employee", employee_routers);

app.listen(PORT, () => console.log(`YEAYY API RUNNING ${PORT}`));
