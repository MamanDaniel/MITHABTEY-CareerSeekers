import tkinter as tk
from ttkbootstrap.constants import *
import ttkbootstrap as tb
import genAlg

# Function to open a window centered on the screen
def open_centered_window(window, width=400, height=300):
    """Open a window centered on the screen."""
    screen_width = window.winfo_screenwidth()
    screen_height = window.winfo_screenheight()
    x = (screen_width - width) // 2
    y = (screen_height - height) // 2
    window.geometry(f"{width}x{height}+{x}+{y}")
    window.mainloop()

# Function to show matched professions in a new window
def show_matched_professions(professions):
    # Create a new window
    top = tk.Toplevel()
    top.title("Matched Professions")
    
    # Create a label to display the matched professions
    label = tk.Label(top, text="\n".join(professions))
    label.pack()

    # Open the window centered on the screen
    open_centered_window(top,350,250)

# Function to show selected traits and run genetic algorithm
def show_selected_traits():
    selected_traits = [trait for trait, var in checkbox_vars.items() if var.get() == 1]
    result_label.config(text=f"You chose: {', '.join(selected_traits)}")

    if not selected_traits:
        result_label.config(text="Please select at least one trait")
        return

    num_generations = 100
    population_size = 50
    
    try:
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
        matched_profession_names = [profession['name'] for profession in matched_professions]
        result_text = f"You chose: {', '.join(selected_traits)}\nMatched Professions: {', '.join(matched_profession_names)}"
   
    except Exception as e:
        result_text = f"An error occurred: {e}"

    result_label.config(text=result_text)
    print("Done")

    #if matched_professions:
    #    show_matched_professions(matched_profession_names)



# Create the main window
root = tb.Window(themename="minty")
root.title("Character Traits Selection")

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
open_centered_window(root, 500, 400)

# Run the main event loop
root.mainloop()
