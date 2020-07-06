const express = require("express");
const router = express.Router();
const monk = require("monk");

const db = monk("localhost/meower");
const mews = db.get("mews");

function isValidMew(body) {
    return (
        body.nameData &&
        body.nameData.toString().trim() !== "" &&
        body.contentData &&
        body.contentData.toString().trim() !== ""
    );
}

router.get("/", (req, res) => {
    res.send("Hello");
});

router.get("/mews", (req, res) => {
    mews.find().then((mews) => {
        res.json(mews);
    });
});

router.post("/mews", (req, res) => {
    console.log(req.body);
    if (isValidMew(req.body)) {
        const mew = {
            name: req.body.nameData.toString(),
            content: req.body.contentData.toString(),
            created: new Date(),
        };

        mews.insert(mew).then((createdMew) => {
            res.json(createdMew);
        });
    } else {
        res.status(422);
        res.json({
            message: "Hey! Name and Content are required!",
        });
    }
});

module.exports = router;
