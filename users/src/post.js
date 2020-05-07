const moongose = require ('mongoose');
const Schema = moongose.Schema;

const PostSchema = new Schema({
    title: String
});

module.exports = PostSchema;