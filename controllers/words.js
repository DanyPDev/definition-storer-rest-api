import mongoose from 'mongoose';
import WordModel from '../models/wordModel.js';


/* For HTTP status code info: https://www.restapitutorial.com/httpstatuscodes.html */

//Create one word
export const createWord = async (req,res) => {
    const word = req.body;  // returns request body
    const newWord = new WordModel(word); //passing word which is received from the request body


    try {
        //waiting for newWord to be created
        await newWord.save(); //update mongoose document by saving newWord to DB 

        res.status(201).json(newWord); //if successful, send newWord to user with json()
    } catch (error) {
        res.status(409).json({message: error.message});
    }

}

//get all the words
export const getWords =  async (req, res) => {
    try{
        const words = await WordModel.find(); //finding all the words in model

        res.status(200).json(words);
        
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
//get a specific word
export const getWord = async (req,res) => {
    const { id: _id } = req.params; //return id associated to uri parameter
    try{
        //if there does not exist a word in DB, error is return, and stops searching for word
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({message: 'Word does not exist'});
        const words = await WordModel.findById(_id); //finding all the words in model
        res.status(200).json(words);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//delete a specific word
export const deleteWord = async (req,res) => {
    const { id: _id } = req.params; //return id associated to uri parameter

    try{
        //if there does not exist a word in DB, error is return, and stops searching for word
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({message: 'Word does not exist'});
        await WordModel.findByIdAndRemove(_id);
        res.json({message: 'word deleted successfully'});
    } catch {
        res.status(500).json({ message: err.message })
    }
}

//change property from a specific word
export const updateWord = async (req,res) => {
    const { id: _id } = req.params; //returns word id prop
    const word = req.body; //return word from update request body, will be used to patch 

    try{
        //if there does not exist a word in DB, error is return, and stops searching for word
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({message: 'Word does not exist'});

        const updatedWord = await WordModel.findByIdAndUpdate(_id, word, {new: true})

        res.json(updatedWord); //send backto user the updated word
    } catch {
        res.status(500).json({ message: err.message })
    }
}

