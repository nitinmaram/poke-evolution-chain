import express from 'express';
import { getEvolutionChain } from '../controllers/evolutionController.js';

const router = express.Router();

router.get('/:pokemonName', getEvolutionChain);

export default router;
