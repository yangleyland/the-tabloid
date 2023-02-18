const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        // type: Date,
        // default: Date.now
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true,
        enum: ['art','literature', 'music', 'fashion']
    },
    imageUrl: {
        type: String,
        required: true,
    }
});

blogSchema.index({ title: 'text', body: 'text' });

module.exports = mongoose.model('BlogPost',blogSchema);
