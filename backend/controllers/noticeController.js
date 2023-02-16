const Notice = require("../models/noticeModel");
const asyncHandler = require("express-async-handler");
const getNotice = asyncHandler(async (req, res) => {
  const notice = await Notice.find({ user: req.user._id });
  res.json(notice);
});

const createNotice = asyncHandler(async (req, res) => {
  const { title, pic } = req.body;

  if (!title || !pic) {
    res.status(400);
    throw new Error("Please Fill all the fields");
    return;
  } else {
    const notice = new Notice({ user: req.user._id, title, pic });

    const createdNotice = await notice.save();

    res.status(201).json(createdNotice);
  }
});

const deleteNotice = asyncHandler(async (req, res) => {
  const notice = await Notice.findById(req.params.id);

  //   IF NOTICE BELONGS TO THIS USER
  //   if (notice.user.toString() !== req.user._id.toString()) {
  //     res.status(401);
  //     throw new Error("You can't perform this action");
  //   }

  if (notice) {
    await notice.remove();
    res.json({ message: "Notice Removed" });
  } else {
    res.status(404);
    throw new Error("Notice not Found");
  }
});

module.exports = { getNotice, createNotice, deleteNotice };
