
  const assignment = require("../controllers/assignment.controller.js");

  var router = require("express").Router();

  router.post("/", assignment.create);

  router.get("/", assignment.findAll);


  router.get("/:user_id", assignment.findOne);

  router.put("/:user_id", assignment.update);

  router.delete("/:user_id", assignment.delete);

  router.delete("/", assignment.deleteAll);


  module.exports = router;