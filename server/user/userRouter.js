const Router = require("express");
const {set} = require("express/lib/application");
const router = new Router()


const comments = []

router.post("/", (req, res) => {

    const body = req.body;

    let dateNow = new Date()
    const commentObj = {
        name: req.body.name,
        // rating: req.body.rating,
        comment: req.body.comment,
        createdAt:`${dateNow.getDate()}.${dateNow.getMonth() + 1}.${dateNow.getFullYear()}`,
    }

    comments.push(commentObj)

    res.json(commentObj)
});


router.get("/", (req, res) => {
    res.json(comments)
});

module.exports = router;