import random

# Initialize the population with random individuals
def initialize_population(size, num_professions):
    # return a list of individuals, where each individual is a list of 3 random professions
    return [[random.randint(0, num_professions-1) for _ in range(3)] for _ in range(size)]

# Calculate the match percentage between a person's traits and a profession's traits
def calculate_match_percentage(person_traits, profession_traits):
    match = sum([1 for trait in person_traits if trait in profession_traits]) # Count the number of matching traits between person and profession
    return match / len(profession_traits) * 100

# Evaluate the fitness of an individual by calculating the average match percentage for their professions
def evaluate_individual(individual, person_traits, profession_traits):
    match_percentages = []
    for profession_index in individual: # Iterate over the professions in the individual
        profession = profession_traits[profession_index] # Get the profession traits based on the index
        match = calculate_match_percentage(person_traits, profession['traits'])
        match_percentages.append(match)
    return sum(match_percentages)/len(individual) # Return the average match percentage for the individual

# Select two parents from the population based on their fitness scores using roulette wheel selection
def select_parents(population, fitness_scores):
    total_fitness = sum(fitness_scores)
    # Calculate the selection probabilities based on fitness scores
    selection_probs = [score / total_fitness for score in fitness_scores] 
    return random.choices(population, weights=selection_probs, k=2)

# Perform one-point crossover between two parents to produce two offspring
def crossover(parent1, parent2):
    crossover_point = random.randint(1, len(parent1) - 2)
    offspring1 = parent1[:crossover_point] + parent2[crossover_point:]
    offspring2 = parent2[:crossover_point] + parent1[crossover_point:]
    return offspring1, offspring2

# Mutate an individual by randomly changing one of their professions
def mutate(individual, num_professions):
    mutation_index = random.randint(0, len(individual) - 1)
    individual[mutation_index] = random.randint(0, num_professions - 1)

# The main genetic algorithm function
def genetic_algorithm(person_traits, profession_traits, num_generations, population_size):
    # Initialize the population
    population = initialize_population(population_size, len(profession_traits))

    # Run the genetic algorithm for a specified number of generations
    for generation in range(num_generations):
        # Evaluate the fitness of each individual in the population
        fitness_scores = [evaluate_individual(individual, person_traits, profession_traits) for individual in population]
        # Sort the population based on fitness scores
        sorted_population = [x for _, x in sorted(zip(fitness_scores, population), reverse=True)]
        # Keep the top 2 individuals (elitism)
        new_population = sorted_population[:2]
        # Generate new individuals through crossover and mutation
        while len(new_population) < population_size:
            parent1, parent2 = select_parents(sorted_population, fitness_scores) # Select parents using roulette wheel selection
            offspring1, offspring2 = crossover(parent1, parent2) # Perform crossover to produce offspring
            mutate(offspring1, len(profession_traits)) 
            mutate(offspring2, len(profession_traits))
            new_population.extend([offspring1, offspring2]) # Add offspring to the new population
        population = new_population
        

    # Evaluate the final population
    final_fitness_scores = [evaluate_individual(individual, person_traits, profession_traits) for individual in population]
    # Sort the final population based on fitness scores
    final_sorted_population = [x for _, x in sorted(zip(final_fitness_scores, population), reverse=True)]

    # Extract the top 3 unique professions from the final sorted population
    unique_professions = []
    for individual in final_sorted_population:
        for profession_index in individual:
            profession_name = profession_traits[profession_index]['name']
            if profession_name not in unique_professions:
                unique_professions.append(profession_name)
            if len(unique_professions) == 3:
                break
        if len(unique_professions) == 3:
            break

    return unique_professions

# Example usage
# person_traits = ['smart', 'diligent', 'initiative']
# Example usage with RAMAK traits


def genetic_algorithm_code(person_traits, profession_traits, num_generations, population_size):
    matched_professions = genetic_algorithm(person_traits, profession_traits, num_generations, population_size)
    return matched_professions