import express from 'express';
import {createWord, getWords, getWord, deleteWord, updateWord} from '../controllers/words.js';

const router = express.Router();


//We already expose the endpoint "/words" in index.js file thus the '/' parameter in get() and the subsequent resquests
router.get('/', getWords);

router.post('/', createWord);


//next three resquest method is for a specific word with specific id
router.get('/:id', getWord);

router.delete('/:id', deleteWord)

router.patch('/:id', updateWord)

export default router;