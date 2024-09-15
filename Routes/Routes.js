const ApiRoutes = require("express").Router();
const controller = require("../Controllers/userControllers");
const authUser = require("../middleware/authUser");
const reqBody = require("../middleware/reqBody");
const ReqBody = require("../middleware/reqBody");

// Create User
ApiRoutes.post(
  "/Create",
  // ReqBody("name", "email", "password"),
  controller.CreateUser
);
// UPDATE USER

ApiRoutes.put(
  "/Update/:id",
  reqBody("name", "email", "password"),
  controller.userUpdate
);

// GetOne User
ApiRoutes.get("/getOne/:id", controller.getoneUser);

// getALL DATA
ApiRoutes.get("/getAll", controller.getAll);

// Update Role 
ApiRoutes.post('/Role',authUser, controller.updateRole);


ApiRoutes.post("/Login", reqBody("email", "password"), controller.Login);



module.exports = ApiRoutes;
