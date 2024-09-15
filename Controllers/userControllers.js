const prisma = require("../db");
const bcryptjs = require("bcryptjs");
const config = require("../Config/auth");
const jwt = require("jsonwebtoken");
const Validator = require('../middleware/Validator')
const userSchema  = require('../middleware/Validator')


const CreateUser = async (req, res) => {
  const {value , error} = userSchema.validate(req.body)
  
  if(error){
    return res.status(400).json({
      message: error.details[0].message
    })
  }
  try {
    const { name, email, password } =value

    const checkEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (checkEmail) {
      return res.status(404).json({
        message: "Email Already exist",
      });
    }

    const hashPassword = bcryptjs.hashSync(password);

    const NewUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
      },
    });
    res.status(201).json({
      ...NewUser,
      status: "Success",
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).send(error, "SERVER ERROR");
  }
};

// const LoginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const checkEmail = await prisma.user.findUnique({
//       where: {
//         email: email,
//       },
//     });
//     if (!checkEmail) {
//       return res.status(404).json({ message: "Email not found" });
//     }
//     const comparePassword = bcryptjs.compareSync(password, checkEmail.password);
//     if (!comparePassword) {
//       return res.status(404).json({ message: "Password is incorrect" });
//     }
//     const token = jwt.sign({ id: checkEmail.id }, config.secret, {
//       expiresIn: "1h",
//     });
//     if(!token){
//         return res.status(404).json({ message: "Token not found" });
//     }
//     res.status(200).json( {
//         ...checkEmail,
//         accessToken: token,

//     });

//   } catch (error) {
//     res.status(500).send(error, "SERVER ERROR");
//   }
// };

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!checkEmail) {
      return res.status(404).json({ message: "Email not found" });
    }

    const token = jwt.sign({ id: checkEmail.id }, config.secret, {
      expiresIn: "1h",
    });
    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }
    res.status(200).json({
      ...checkEmail,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send(error, "SERVER ERROR");
  }
};

// Update User

const userUpdate = async (req, res) => {
  try {
    const userModi = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },

      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    });

    res.status(201).json({
      isScucess: true,
      message: "User updated successfully",
      ...userModi,
    });
  } catch (error) {
    res.status(500).send(error, "SERVER ERROR");
  }
};

// get One User

const getoneUser = async (req, res) => {
  try {
    const getOne = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!getOne) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(getOne);
  } catch (error) {
    res.status(500).send(error, "SERVER ERROR");
  }
};

// getAll Data

const getAll = async (req, res) => {
  try {
    const getall = await prisma.user.findMany({});
    res.status(200).json({
      isScucess: true,
      message: "User data fetched successfully",
      data: getall,
    });
  } catch (error) {
    res.status(500).send(error, "SERVER ERROR");
  }
};

// update Role 
const  updateRole = async (req, res) => {
  try {
  
 
    const checkid  = await prisma.user.findUnique({
      where: {
        id:Number(req.body.id)
      }
    })
    if(!checkid){
      return res.status(404).json({message: "User not found"})
    }
    const updateRole = await prisma.user.update({
      where: {
        id: Number(req.body.id),
        },
        data: {
          role: req.body.role 
         },
          });
          res.status(200).json(updateRole);
          } catch (error) {
            res.status(500).send(error, "SERVER ERROR");
            }
            };



module.exports = {
  CreateUser,
  Login,
  userUpdate,
  getoneUser,
  getAll,
  updateRole
};
