const Contracts = require("../models/assignment.model.js");

exports.create = (req, res) => {
  // Validate request
  console.log("body "+req.body.contract_name);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const contracts = new Contracts({
 
    contract_name: req.body.contract_name,
    contract_description: req.body.contract_description,
    user_id: req.body.user_id,
    contract_amount:req.body.contract_amount
  });
  console.log(contracts.contract_name);

  Contracts.create(contracts, (err, data) => {
    console.log(contracts);
    console.log("Amount "+contracts.contract_amount);
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contarcts."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Contracts.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Contracts."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Contracts.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Contracts with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Contracts with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
  Contracts.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Contratcs."
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Contracts.updateById(
    req.params.user_id,
    new Contracts(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Assignment with id ${req.params.user_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Assignment with id " + req.params.user_id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Contracts with the specified id in the request
exports.delete = (req, res) => {
  Contracts.remove(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Contract with id ${req.params.user_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Contract with id " + req.params.user_id
        });
      }
    } else res.send({ message: `Contract was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Contracts.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Contracts."
      });
    else res.send({ message: `All Contracts were deleted successfully!` });
  });
};
