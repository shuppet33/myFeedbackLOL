const express = require('express')
const router = require('./user/userRouter.js');
const cors = require('cors');

const PORT = 8000

const app = express();


app.use(express.json());
app.use(cors());
app.use((req,res,next) => {
    setTimeout(() => next(), 2000)
});
app.use('/api', router);



app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));