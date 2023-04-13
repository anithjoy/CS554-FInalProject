const express = require("express");
const app = express();
const cors = require("cors");
const configRoutes = require("./routes");

app.use(express.json({ limit: "50mb" }));
app.use(cors());

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});

// state function tester
const state = require("./data/state");

async function main() {
  // try {
  //   // stateID, companyID, Name, transition, description;
  //   const res = await state.createState(
  //     "reliance",
  //     "12345679",
  //     ["6435e4ba5519cecf406f6265", "6435f456d1bc60608daf3f97"],
  //     "Hey this is trial test of create function"
  //   );
  //   console.log(res);
  // } catch (error) {
  //   console.log("error", error);
  // }
  // try {
  //   const res = await state.getStateById("6435e4ba5519cecf406f6265");
  //   console.log(res);
  // } catch (error) {}
  // try {
  //   const res = await state.getAllState("1234");
  //   console.log(res);
  // } catch (error) {
  //   console.log(error);
  // }
  // try {
  //   const res = await state.updateState(
  //     "6435e4ba5519cecf406f6265",
  //     "tesla",
  //     "6435f456d1bc60608daf3f97",
  //     ["6435e4ba5519cecf406f6265", "6435f456d1bc60608daf3f97"],
  //     "This is updated function description -->X2"
  //   );
  //   console.log(res);
  // } catch (error) {
  //   console.log(error);
  // }
  // 6436aca6df5b7300ddf3c10e
}

main();
