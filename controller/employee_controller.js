const { db } = require("../database");

module.exports = {
  getData: (req, res) => {
    let scriptQuery = "SELECT * FROM exercise.data_employee;";

    if (req.query.id) {
      scriptQuery = `SELECT * FROM exercise.data_employee WHERE id = ${db.escape(
        req.query.id
      )};`; // method yang di pake sama mysql buat detect data type
    } else if (req.query.first_name) {
      scriptQuery = `SELECT * FROM exercise.data_employee WHERE first_name = ${db.escape(
        req.query.first_name
      )};`;
    } else if (req.query.last_name) {
      scriptQuery = `SELECT * FROM exercise.data_employee WHERE last_name = ${db.escape(
        req.query.last_name
      )};`;
    }

    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  addData: (req, res) => {
    console.log(req.body);
    let {
      first_name,
      last_name,
      entry_date,
      line_of_service,
      salary,
      contract_type,
    } = req.body;
    let insertQuery = `INSERT INTO exercise.data_employee VALUES (NULL,
                ${db.escape(first_name)},
                ${db.escape(last_name)},
                ${db.escape(entry_date)},
                ${db.escape(line_of_service)},
                ${db.escape(salary)},
                ${db.escape(contract_type)}
                );`;
    console.log(insertQuery);

    db.query(insertQuery, (err, results) => {
      if (err) res.status(500).send(err);

      db.query(
        `SELECT * FROM exercise.data_employee WHERE first_name = ${db.escape(
          first_name
        )}`,
        (err2, results2) => {
          if (err2) res.status(500).send(err2);
          res.status(200).send({ message: "INSERT Success: ", data: results });
        }
      );
    });

    // res.status(200).send(results);
  },

  patchData: (req, res) => {
    let dataUpdate = [];
    for (let prop in req.body) {
      dataUpdate.push(`${prop}=${db.escape(req.body[prop])}`);
    }
    let updateQuery = `UPDATE exercise.data_employee SET ${dataUpdate} WHERE ( id = ${req.params.id} )`;
    console.log(updateQuery);

    db.query(updateQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  deleteData: (req, res) => {
    let deleteQuery = `DELETE FROM exercise.data_employee WHERE id = ${db.escape(
      req.params.id
    )}`;

    db.query(deleteQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
};
