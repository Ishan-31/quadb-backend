const express = require("express")
const morgan = require("morgan")
const compression = require("compression")
const bodyParser = require("body-parser")
const cors = require("cors")
const routes = require("./routes/index")

const { getEnvironment } = require("./config/environment");
const { Mongoose } = require("./config/database")

const app = express()

app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan("tiny"))
app.use(cors())
app.options("*", cors())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "*")
  next()
})


Mongoose

app.use("/api/v1/", routes);

app.get("/", (req, res, next) => {
  res.status(200).send("Looko Web App API suite")
});

app.listen(getEnvironment().PORT, () => {
  console.log(`Backend app is listening on port ${getEnvironment().PORT} with environment ${getEnvironment().ENVIRONMENT}`);
});
