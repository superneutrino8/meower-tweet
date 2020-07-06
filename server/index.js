const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const route = require("./routes/route");

app.use("/", route);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
