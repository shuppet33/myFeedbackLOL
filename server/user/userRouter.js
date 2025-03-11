const Router = require("express");
const {set} = require("express/lib/application");
const router = new Router()


const comments = []

router.post("/", (req, res) => {

    const body = req.body;

    const commentObj = {
        name: req.body.name,
        rating: req.body.rating,
        comment: req.body.comment,
        createdAt: Date.now(),
    }

    comments.push(commentObj)
    console.log(commentObj)
    res.json(commentObj)
});


router.get("/", (req, res) => {
    res.json(comments)
});

module.exports = router;