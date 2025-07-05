const express = require("express");
const billingService = require("../services/billingService");
const authMiddleware = require("../middlewares/authMiddleware");
const actionMiddleware = require("../middlewares/actionMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.use(actionMiddleware);
router.route("/").post(billingService.createBill).get(billingService.listBills);
router
  .route("/:id")
  .get(billingService.getBill)
  .patch(billingService.updateBill)
  .delete(billingService.deleteBill);

module.exports = router;
