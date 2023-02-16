const mongoose = require("mongoose");

const noticeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      required: true,
    },
    // which user created this notice
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Notice = mongoose.model("Notice", noticeSchema);

module.exports = Notice;
