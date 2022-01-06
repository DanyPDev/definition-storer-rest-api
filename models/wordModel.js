import mongoose from 'mongoose';

//defining stucture of MongoDB document
const wordSchema = new mongoose.Schema({
    //As per the "required" keyword, any word has to have a word name, a definition and a source asscociated to it. Each property type is set to a String
    word: {
        type: String,
        required: true
    },
    definition: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    }
});

//Wrapping mongoose schema with a mongoose model
const WordModel = mongoose.model('WordModel', wordSchema);

export default WordModel;