const router = require("express").Router();

const Post = require("../models/Post");

router.delete("/deletepost/:_id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params._id).then(() => {
      res.redirect("/myposts");
    });
    // await postToDelete.remove();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
