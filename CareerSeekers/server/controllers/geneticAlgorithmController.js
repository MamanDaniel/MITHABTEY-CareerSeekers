function initializePopulation(size, numProfessions) {
    let population = [];
    for (let i = 0; i < size; i++) {
        let individual = [];
        for (let j = 0; j < 3; j++) {
            individual.push(Math.floor(Math.random() * numProfessions));
        }
        population.push(individual);
    }
    return population;
}

function calculateMatchPercentage(personTraits, professionTraits) {
    let match = 0;
    let totalWeight = Object.values(personTraits).reduce((a, b) => a + b, 0);
    for (let trait in personTraits) {
        match += (professionTraits[trait] || 0) * (personTraits[trait] / totalWeight);
    }
    return match;
}

function normalizeMatchPercentage(match) {
    return Math.min(Math.max(match, 0), 100);
}

function evaluateIndividual(individual, personTraits, professionTraits) {
    let matchPercentages = individual.map(professionIndex => {
        let profession = professionTraits[professionIndex];
        let match = calculateMatchPercentage(personTraits, profession.Prerequisites);
        return normalizeMatchPercentage(match);
    });
    return matchPercentages.reduce((a, b) => a + b, 0) / matchPercentages.length;
}

function selectParents(population, fitnessScores) {
    let totalFitness = fitnessScores.reduce((a, b) => a + b, 0);
    let selectionProbs = fitnessScores.map(score => score / totalFitness);
    
    function weightedRandomChoice(items, weights) {
        let cumulativeWeight = 0;
        let randomValue = Math.random() * weights.reduce((a, b) => a + b, 0);
        for (let i = 0; i < items.length; i++) {
            cumulativeWeight += weights[i];
            if (randomValue < cumulativeWeight) {
                return items[i];
            }
        }
    }
    
    return [
        weightedRandomChoice(population, selectionProbs),
        weightedRandomChoice(population, selectionProbs)
    ];
}

function crossover(parent1, parent2) {
    let crossoverPoint = Math.floor(Math.random() * (parent1.length - 1)) + 1;
    let offspring1 = parent1.slice(0, crossoverPoint).concat(parent2.slice(crossoverPoint));
    let offspring2 = parent2.slice(0, crossoverPoint).concat(parent1.slice(crossoverPoint));
    return [offspring1, offspring2];
}

function mutate(individual, numProfessions) {
    let mutationIndex = Math.floor(Math.random() * individual.length);
    individual[mutationIndex] = Math.floor(Math.random() * numProfessions);
}

function geneticAlgorithm(personTraits, professionTraits, numGenerations, populationSize) {
    let population = initializePopulation(populationSize, professionTraits.length);
    
    for (let generation = 0; generation < numGenerations; generation++) {
        let fitnessScores = population.map(individual => evaluateIndividual(individual, personTraits, professionTraits));
        let sortedPopulation = population.slice().sort((a, b) => {
            return evaluateIndividual(b, personTraits, professionTraits) - evaluateIndividual(a, personTraits, professionTraits);
        });
        let newPopulation = sortedPopulation.slice(0, 2);
        
        while (newPopulation.length < populationSize) {
            let [parent1, parent2] = selectParents(sortedPopulation, fitnessScores);
            let [offspring1, offspring2] = crossover(parent1, parent2);
            mutate(offspring1, professionTraits.length);
            mutate(offspring2, professionTraits.length);
            newPopulation.push(offspring1, offspring2);
        }
        population = newPopulation;
    }
    
    let finalFitnessScores = population.map(individual => evaluateIndividual(individual, personTraits, professionTraits));
    let finalSortedPopulation = population.slice().sort((a, b) => {
        return evaluateIndividual(b, personTraits, professionTraits) - evaluateIndividual(a, personTraits, professionTraits);
    });
    
    let matchedProfessions = [];
    for (let individual of finalSortedPopulation) {
        for (let professionIndex of individual) {
            let professionName = professionTraits[professionIndex].jobName;
            if (!matchedProfessions.includes(professionName)) {
                matchedProfessions.push(professionName);
            }
            if (matchedProfessions.length === 3) {
                break;
            }
        }
        if (matchedProfessions.length === 3) {
            break;
        }
    }
    
    return matchedProfessions;
}

export { geneticAlgorithm}