/** @format */

const app = require("./index");
const connect = require("./configs/db");

app.listen(8000, async () => {
  try {
    await connect();
    console.log("Connected Successfully");
  } catch (error) {
    console.log(error.message);
  }
  console.log("Listening to port 8000");
});
