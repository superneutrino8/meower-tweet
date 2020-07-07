const express = require("express");
const router = express.Router();
const monk = require("monk");
const Filter = require("bad-words");
const rateLimit = require("express-rate-limit");

const db = monk("localhost/meower");
const mews = db.get("mews");
const filter = new Filter();

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

const createAccountLimiter = rateLimit({
    windowMs: 30 * 1000, // 30 sec window
    max: 1, // start blocking after 5 requests
    message:
        "Too many accounts created from this IP, please try again after 30 seconds",
});

router.post("/mews", createAccountLimiter, (req, res) => {
    console.log(req.body);
    if (isValidMew(req.body)) {
        const mew = {
            name: filter.clean(req.body.nameData.toString()),
            content: filter.clean(req.body.contentData.toString()),
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
