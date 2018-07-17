const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Blog', blogSchema);