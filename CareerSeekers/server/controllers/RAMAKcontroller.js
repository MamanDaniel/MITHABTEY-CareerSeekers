// Calculate the normalized scores for RAMAK questionnaire
function calculateNormalizedScores(answers) {
    // Map of traits and their corresponding questions based on RAMAK questionnaire
    const traits = {
        'Business': {
            'Level 1': [10, 46, 55],
            'Level 2': [21, 29, 37],
            'Level 3': [3, 60, 69]
        },
        'General Culture': {
            'Level 1': [22, 31, 52],
            'Level 2': [5, 11, 47],
            'Level 3': [36, 63, 72]
        },
        'Arts and Entertainment': {
            'Level 1': [4, 28, 53],
            'Level 2': [14, 35, 61],
            'Level 3': [24, 45, 68]
        },
        'Science': {
            'Level 1': [8, 16, 58],
            'Level 2': [23, 26, 44],
            'Level 3': [33, 54, 66]
        },
        'Organization': {
            'Level 1': [13, 19, 67],
            'Level 2': [8, 38, 41],
            'Level 3': [12, 30, 42]
        },
        'Service': {
            'Level 1': [1, 34, 49],
            'Level 2': [20, 59, 65],
            'Level 3': [12, 30, 42]
        },
        'Outdoor': {
            'Level 1': [39, 64, 70],
            'Level 2': [2, 32, 51],
            'Level 3': [3, 9, 18]
        },
        'Technology': {
            'Level 1': [25, 40, 43],
            'Level 2': [17, 50, 71],
            'Level 3': [6, 15, 62]
        }
    };
    
    const scoreMap = { 'Y': 2, '?': 1, 'N': 0 }; // Map of scores for each answer
    const weights = { "Level 1": 3, "Level 2": 2, "Level 3": 1 }; // Weights for each level
    const traitScores = {};
    const maxRawScore = 18; // Maximum raw score for each trait (9 questions, 2 points each)
    const maxWeightedScore = (3 * 2 * 3) + (2 * 2 * 3) + (1 * 2 * 3); // Maximum weighted score for each trait
    const totalMaxWeightedScore = maxWeightedScore * Object.keys(traits).length; // Total max weighted score for all traits

    let totalWeightedScores = 0; // To accumulate the total weighted scores across all traits
    // Calculate the raw and weighted scores for each trait
    for (const trait in traits) {
        let totalRawScore = 0;
        let totalWeightedScore = 0;
        const levels = traits[trait];
        for (const level in levels) {
            const items = levels[level];

            items.forEach(item => {
                const rawScore = scoreMap[answers[item]];
                // if rawScore is not undefined, add it to the total raw and weighted scores
                if (rawScore !== undefined) {
                    totalRawScore += rawScore;
                    totalWeightedScore += rawScore * weights[level];
                }
             
            });    
        }
        // Normalize the raw and weighted scores
        const normalizedRawScore = (totalRawScore / maxRawScore) * 100;
        const normalizedWeightedScore = (totalWeightedScore / maxWeightedScore) * 100;
        traitScores[trait] = {
            raw_score: normalizedRawScore,
            weighted_score: normalizedWeightedScore,
            total_weighted_score: totalWeightedScore
        };

        // Accumulate the total weighted scores
        totalWeightedScores += totalWeightedScore;
    }
    // Calculate the percentage contribution of each trait to the total weighted score
    const overallPercentages = {};
    for (const trait in traitScores) {
        const percentage = (traitScores[trait].total_weighted_score / totalWeightedScores) * 100;
        overallPercentages[trait] = parseFloat(percentage.toFixed(2));
    }

    return overallPercentages;
}

export { calculateNormalizedScores };
