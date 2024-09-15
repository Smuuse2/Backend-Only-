const { Prisma } = require("@prisma/client");
const prisma = require("../db");
const { get } = require("../Routes/Routes");

const createPost = async (req, res) => {
  try {
    const { PostBody, PostTitle } = req.body;
    const create = await prisma.post.create({
      data: {
        PostTitle,
        PostBody,
      },
    });
    res.status(201).json({
    
        isSuccess :  true,
        message: "Post created successfully",
        ...create
    })
  } catch (error) {}
};

// get all 
const getAll = async(req,res)=>{
    try {
        const post = await prisma.post.findMany({ })
        res.status(200).json({
            isSuccess :  true,
            message: "Post retrieved successfully",
            post
            })
    } catch (error) {
        
        res.status(500).json({ isSuccess : false, message: "Error retrieving post" })
    }
}


module.exports = {
    createPost, 
    getAll
}