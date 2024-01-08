const sql = require("./db.js");

// constructor
const contratcs_databsae = function(Contracts) {
  this.contract_name = Contracts.contract_name;
  this.contract_description = Contracts.contract_description;
  this.user_id = Contracts.user_id;
  this.contract_amount=Contracts.contract_amount
};  

contratcs_databsae.create = (newContract, result) => {
  sql.query("INSERT INTO CONTRACTS SET ?", newContract, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created contract: ", { id: res.contract_id , user:res.user_id, ...newContract });
    result(null, { id: res.insertId, ...newContract });
  });
};

contratcs_databsae.findById = (id, result) => {
  sql.query(`SELECT * FROM CONTRACTS WHERE user_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found CONTRATCS: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

contratcs_databsae.getAll = (title, result) => {
  let query = "SELECT * FROM contracts";

  if (title) {
   }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("CONTRATCS: ", res);
    result(null, res);
  });
};



contratcs_databsae.updateById = (user_id, contratcs, result) => {
  sql.query(
    "UPDATE CONTRACTS SET contract_name = ?, contract_description = ? WHERE user_id = ?",
    [contratcs.contract_name, contratcs.contract_description, user_id],
    (err, res) => {
      if (err) {
        console.log("user_ud",user_id);
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated contracts: ", { user_id: user_id, ...contracts });
      result(null, { user_id: contract_id, ...contract });
    }
  );
};

contratcs_databsae.remove = (id, result) => {
  sql.query("DELETE FROM contracts WHERE user_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted contracts with id: ", id);
    result(null, res);
  });
};

contratcs_databsae.removeAll = result => {
  sql.query("DELETE FROM CONTRACTS", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} contractcs`);
    result(null, res);
  });
};

module.exports = contratcs_databsae;
