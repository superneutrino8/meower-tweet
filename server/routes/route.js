const express = require("express");
const router = express.Router();
const monk = require("monk");

const db = monk("localhost/meower");
const mews = db.get("mews");

function isValidMew(body) {
    return (
        body.name &&
        body.name.toString().trim() !== "" &&
        body.content &&
        body.content.toString().trim() !== ""
    );
}

router.get("/", (req, res) => {
    res.send("Hello");
});

router.post("/mews", (req, res) => {
    if (isValidMew(req.body)) {
        const mew = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date(),
        };

        mews.inert(mew).then((createdMew) => {
            res.json(createdMew);
        });
    } else {
        res.status(422);
        res.json({
            message: "Hey! Name and Content are requires!",
        });
    }
});

module.exports = router;
