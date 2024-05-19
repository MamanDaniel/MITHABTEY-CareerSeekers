import tkinter as tk
from tkinter import messagebox
import genAlg

# Function to show selected traits and run genetic algorithm
def show_selected_traits():
    selected_traits = [trait for trait, var in checkbox_vars.items() if var.get() == 1]
    result_label.config(text=f"You chose: {', '.join(selected_traits)}")
    
    num_generations = 100
    population_size = 50

    profession_traits = [
        {'name': 'Business Consultant', 'traits': ['Business', 'Organization']},
        {'name': 'Operations Manager', 'traits': ['Organization', 'Technology']},
        {'name': 'Cultural Researcher', 'traits': ['General culture', 'Arts and Entertainment']},
        {'name': 'Healthcare Administrator', 'traits': ['Service', 'Organization']},
        {'name': 'Actor', 'traits': ['Arts and Entertainment', 'General culture']},
        {'name': 'Wildlife Biologist', 'traits': ['Outdoor', 'Science']},
        {'name': 'Data Scientist', 'traits': ['Science', 'Technology']},
        {'name': 'Software Engineer', 'traits': ['Technology', 'Science', 'Arts and Entertainment']}
    ]

    matched_professions = genAlg.genetic_algorithm_code(selected_traits, profession_traits, num_generations, population_size)
    
    # Ensure matched_professions is a list of dictionaries
    if isinstance(matched_professions, list) and all(isinstance(prof, dict) for prof in matched_professions):
        matched_profession_names = [prof['name'] for prof in matched_professions]
    else:
        matched_profession_names = ["No matching professions found or invalid data returned"]
    
    # Update the result label with the matched professions
    result_label.config(text=f"You chose: {', '.join(selected_traits)}\nMatched Professions: {', '.join(matched_profession_names)}")
    print(selected_traits)
    print(matched_professions)

    # Show matched professions in a new window
    show_matched_professions(matched_profession_names)

def show_matched_professions(professions):
    # Create a new window
    top = tk.Toplevel()
    top.title("Matched Professions")
    top.geometry("300x200")  # Set the window size
    
    # Create a label to display the matched professions
    label = tk.Label(top, text="\n".join(professions))
    label.pack()

# Create the main window
root = tk.Tk()
root.title("Character Traits Selection")
root.geometry("400x300")  # Set the window size

# Create a label
label = tk.Label(root, text="Choose your character traits")
label.pack(pady=10)

# Define the character traits
traits = ["Business", "Organization", "General culture", "Service", "Arts and Entertainment", "Outdoor", "Science", "Technology"]

# Create a dictionary to hold the IntVar for each checkbox
checkbox_vars = {}

# Create and pack the checkboxes
for trait in traits:
    var = tk.IntVar()
    checkbox = tk.Checkbutton(root, text=trait, variable=var)
    checkbox.pack(anchor="w")
    checkbox_vars[trait] = var

# Create the button
button = tk.Button(root, text="Find me jobs", command=show_selected_traits)
button.pack(pady=10)

# Create a label to display the result
result_label = tk.Label(root, text="")
result_label.pack(pady=10)

# Run the main event loop
root.mainloop()
