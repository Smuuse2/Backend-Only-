const express = require("express");
const dotenv = require('dotenv')
const cors = require("cors");


dotenv.config()
const Port  = process.env.PORT 
const app = express();

app.use(express.json());
app.use(cors());

require('./Routes/Api')(app)

app.listen(Port, () => {
  console.log(`SERVER IS RUNING ${Port}`);
});
