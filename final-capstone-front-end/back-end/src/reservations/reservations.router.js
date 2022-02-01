const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

router
    .route("/:reservation_id")
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

router
    .route("/reservations/new")
    .get(controller.read)
    .post(controller.create)
    .all(methodNotAllowed);

router
    .route("/:reservation_id/status")
    .put(controller.updateStatus)
    .all(methodNotAllowed);

module.exports = router;