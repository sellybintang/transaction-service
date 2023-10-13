const express = require("express");
const app = express();

const routes = require("./routes/index");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3015;
app.use(bodyParser.json());
app.use(cors());

app.use(routes);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
