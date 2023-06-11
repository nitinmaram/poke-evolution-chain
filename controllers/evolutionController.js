import axios from 'axios';
import { extractEvolutionChain } from '../utils/evolutionUtils.js';

export const getEvolutionChain = async (req, res) => {
  try {
    const pokemonName = req.params.pokemonName;

    // Fetch the evolution chain
    const evolutionChain = await fetchEvolutionChain(pokemonName);
    if (!evolutionChain) {
      return res.status(404).json({ error: 'Pokemon not found.' });
    }

    // Return the evolution chain as a JSON response
    res.json(evolutionChain);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const fetchEvolutionChain = async (pokemonName) => {
  try {
    // Fetch the Pokemon data
    const pokemonData = await fetchPokemonData(pokemonName);

    if (!pokemonData) {
      return null;
    }

    // Get the species URL from the Pokemon data
    const speciesURL = pokemonData.species.url;

    // Fetch the species data
    const speciesData = await fetchSpeciesData(speciesURL);

    if (!speciesData) {
      return null;
    }

    // Get the evolution chain URL from the species data
    const evolutionChainURL = speciesData.evolution_chain.url;

    // Fetch the evolution chain data
    const evolutionChainData = await fetchEvolutionChainData(evolutionChainURL);

    if (!evolutionChainData) {
      return null;
    }
    // Extract the evolution chain
    const evolutionChain = extractEvolutionChain(evolutionChainData.chain);

    return evolutionChain;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
};

export const fetchPokemonData = async (pokemonName) => {
  try {
    const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    return pokemonResponse.data;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
};

export const fetchSpeciesData = async (speciesURL) => {
  try {
    const speciesResponse = await axios.get(speciesURL);
    return speciesResponse.data;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
};

export const fetchEvolutionChainData = async (evolutionChainURL) => {
  try {
    const evolutionChainResponse = await axios.get(evolutionChainURL);
    return evolutionChainResponse.data;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
};
