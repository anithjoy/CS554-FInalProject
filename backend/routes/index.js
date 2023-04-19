const companyRoutes = require("./company");
const userRoutes = require("./user");
const projectRoutes = require("./project");
const stateRoutes = require("./state");
const ticketRoutes = require("./ticket");

const constructorMethod = (app) => {
  app.use("/company", companyRoutes);
  app.use("/user", userRoutes);
  app.use("/project", projectRoutes);
  app.use("/state", stateRoutes);
  app.use("/ticket", ticketRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
