// import mongoose, { Schema } from 'mongoose';
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            trim: true,
            required: true,
            index: {unique: true}
        },
        name: {
            type: String,
            trim: true,
            required: true,
        },
        lastname: {
            type: String,
            trim: true,
            required: true,
        },
        age: {
            type: Number,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('users', UserSchema);