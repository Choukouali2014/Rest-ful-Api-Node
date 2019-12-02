const mongoose = require('mongoose');
const validate = require('validator');
const Schema = mongoose.Schema;
const schema = new Schema({
    username :{type: String, unique: true, required: true, trim: true},
    password : { type:String, required: true, trim: true },
    firstname: { type: String, required: true, trim: true},
    lastname: {type:String, required: true, trim: true},
    createdDate: { type: Date, default: Date.now},
    picture: { type:String} 

});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('User',schema);