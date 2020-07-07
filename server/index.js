const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const route = require("./routes/route");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/", route);

app.listen(5000, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
