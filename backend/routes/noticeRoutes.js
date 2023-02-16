const express = require("express");
const {
  getNotice,
  createNotice,
  deleteNotice,
} = require("../controllers/noticeController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getNotice);
router.route("/create").post(protect, createNotice);
router.route("/:id").delete(protect, deleteNotice);

module.exports = router;
