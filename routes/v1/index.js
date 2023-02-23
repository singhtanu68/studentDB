const { Router } = require('express');
const router = Router();

const studentRouter = require('./student');

router.use('/student' , studentRouter);

// const studentRouter = require('./student');

// router.use('/student', studentRouter);


module.exports = router;
