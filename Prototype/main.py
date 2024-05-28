# main.py
import tkinter as tk
import ttkbootstrap as tb
from ttkbootstrap.constants import *
import random
import genAlg
from ramak_survey import open_survey, open_centered_window

def display_result(message, bold_parts=None):
    """Display a message in the result text widget with specified parts in bold."""
    result_text_widget.delete("1.0", tk.END)
    
    if bold_parts is None:
        result_text_widget.insert(tk.END, message, 'normal')
    else:
        current_pos = 0
        for part in bold_parts:
            start, end = part
            if start > current_pos:
                result_text_widget.insert(tk.END, message[current_pos:start], 'normal')
            result_text_widget.insert(tk.END, message[start:end], 'bold')
            current_pos = end
        if current_pos < len(message):
            result_text_widget.insert(tk.END, message[current_pos:], 'normal')

def show_selected_traits():
    """Show selected traits and run the genetic algorithm."""
    selected_traits = random.sample(traits, k=3)
    
    if not selected_traits:
        display_result("Please select at least one trait")
        return

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

    try:
        matched_professions = genAlg.genetic_algorithm_code(selected_traits, profession_traits, num_generations, population_size)
        matched_profession_names = [profession['name'] for profession in matched_professions]

        message = (f"Your traits from the survey are: {', '.join(selected_traits)}\n"
                   f"The three most suitable professions for you: {', '.join(matched_profession_names)}")
        bold_parts = [
            (0, len("Your traits from the survey are:")),
            (len("Your traits from the survey are: ") + len(', '.join(selected_traits)) + 1, 
             len("Your traits from the survey are: ") + len(', '.join(selected_traits)) + 1 + len("The three most suitable professions for you:"))
        ]
        display_result(message, bold_parts)

    except Exception as e:
        display_result(f"An error occurred: {e}")

    find_jobs_button.pack_forget()
    print("Done")

# Create the main window
root = tb.Window(themename="minty")
root.title("MITHABTEY - Career Seeker")

# Create a label
tk.Label(root, text="Match jobs to your character Traits", font=('Helvetica', 12, 'bold')).pack(pady=10)
# Define the character traits
traits = ["Business", "Organization", "General culture", "Service", "Arts and Entertainment", "Outdoor", "Science", "Technology"]

# Add a button to open the survey
tk.Button(root, text="Make RANAK questionnaire", command=lambda: open_survey(root, display_result, find_jobs_button)).pack(pady=10)

# Create the button, initially hidden
find_jobs_button = tk.Button(root, text="Find me jobs", command=show_selected_traits)

# Create a Scrollbar and a Text widget for the result
scrollbar = tk.Scrollbar(root)
scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
result_text_widget = tk.Text(root, yscrollcommand=scrollbar.set, wrap=tk.WORD, height=10)
result_text_widget.pack(pady=10, fill=tk.BOTH, expand=True)
scrollbar.config(command=result_text_widget.yview)

# Configure the tags for bold and normal text
result_text_widget.tag_configure('bold', font=('Helvetica', 10, 'bold'))
result_text_widget.tag_configure('normal', font=('Helvetica', 10))

# Run the main event loop
open_centered_window(root, 400, 350)
