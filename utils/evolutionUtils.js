export const extractEvolutionChain = (chainData) => {
    const evolutionChain = {
      name: chainData.species?.name,
      variations: [],
    };
  
    if (chainData.evolves_to && chainData.evolves_to.length > 0) {
      chainData.evolves_to.forEach((variationData) => {
        const variation = extractEvolutionChain(variationData);
        evolutionChain.variations.push(variation);
      });
    }
  
    return evolutionChain;
  };
  