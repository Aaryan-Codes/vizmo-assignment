const router = require("express").Router();
const authMiddleware = require("../Middlewares/authMiddleware");
const Post = require("../Models/blogModel");

// Add Post

router.post("/add-post", authMiddleware, async (req, res) => {
  try {
    const { title, content, author,images } = req.body;
    const userID = req.body.userID;
    // console.log(req.body);
    const newPost = new Post({
      title,
      content,
      author,
      images,
      postedBy: userID,
    });
    await newPost.save();
    res.send({
      success: true,
      message: "New Blog Posted!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Delete Post

router.delete("/delete-post", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.body.postID);
    res.send({
      success: true,
      message: "Post Successfully Deleted!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Update Post

router.put("/update-post", async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.body.postID, req.body);
    res.send({
      success: true,
      message: "Post Successfully Updated!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Get Post by ID

router.get("/post/:id", async (req, res) => {
  try {
    const postByID = await Post.findById(req.params.id);
    res.send({
      success: true,
      message: `Post id:${req.params.id}`,
      data: postByID,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Get all posts & filter for title,author,content

router.get("/all-posts", async (req, res) => {
  try {
    const { title, content, author } = req.query;

    const queryObject = {};

    if (title) {
      queryObject.title = { $regex: title, $options: "i" }; 
    }

    if (content) {
      queryObject.content = { $regex: content, $options: "i" }; 
    }

    if (author) {
      queryObject.author = { $regex: author, $options: "i" };
    }

    const allPosts = await Post.find(queryObject).populate("postedBy", "name");

    res.send({
      success: true,
      message: "All Blogs Fetched",
      results:allPosts.length,
      data: allPosts
      
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
