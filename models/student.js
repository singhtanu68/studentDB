const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();
const { sendCustomError } = require('../helper/response');
const bcrypt = require('bcryptjs');

const nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [0, 40],
        message: 'Name must not exceed {ARGS[1]} characters.'
    })
];


const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate: nameValidator
    },
    rollNo: {
        type: String,
        required: true,
        trim: true,
        unique: [true, 'Student no has already registered.'],
        validate: nameValidator
    },
    className: {
        type: String,
        required: true,
        trim: true,
        validate: nameValidator
    },
    address: {
        type: String,
        required: true,
        trim: true,
        validate: nameValidator
    },
   
},{ timestamps: true, strict: true })

module.exports= { Student : db.model('student', StudentSchema), ObjectId };