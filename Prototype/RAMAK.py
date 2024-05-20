import tkinter as tk
import ttkbootstrap as tb
from ttkbootstrap.constants import *
import genAlg
import random

def open_centered_window(window, width=400, height=300):
    """Open a window centered on the screen."""
    screen_width = window.winfo_screenwidth()
    screen_height = window.winfo_screenheight()
    x = (screen_width - width) // 2
    y = (screen_height - height) // 2
    window.geometry(f"{width}x{height}+{x}+{y}")
    window.mainloop()

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

        display_result(f"Your traits from the survey are: {', '.join(selected_traits)}\n"
                       f"The three most suitable professions for you: {', '.join(matched_profession_names)}")

    except Exception as e:
        display_result(f"An error occurred: {e}")

    find_jobs_button.pack_forget()
    print("Done")

def display_result(message):
    """Display a message in the result text widget."""
    result_text_widget.delete("1.0", tk.END)
    result_text_widget.insert(tk.END, message, 'normal')

def open_survey():
    """Open the Ramak survey window."""
    survey_window = tk.Toplevel(root)
    survey_window.title("Ramak Survey")
    
    questions = [
        "Would you be interested in working as a musician?",
        "Would you be interested in working as an electronics technician?",
        "Would you be interested in working as a chemist?",
        "Would you be interested in working as a social worker?"
    ]
    
    answers = {}
    
    def calculate_score():
        score = sum(int(var.get()) for var in answers.values())
        result = (f"Final Score: {score}\n\nKey for scoring the Ramak:\n"
                  f"Score 2 points for a Yes, 1 point for a Not sure, and 0 for a No.")
        display_result(result)
        find_jobs_button.pack(pady=10)
        survey_window.destroy()

    for question in questions:
        frame = tk.Frame(survey_window)
        frame.pack(anchor="w", pady=5)
        tk.Label(frame, text=question).pack(anchor="w")
        var = tk.StringVar(value="0")
        answers[question] = var
        for text, value in [("Yes", "2"), ("Not sure", "1"), ("No", "0")]:
            tk.Radiobutton(frame, text=text, variable=var, value=value).pack(anchor="w")
    
    tk.Button(survey_window, text="Submit", command=calculate_score).pack(pady=10)
    open_centered_window(survey_window, 600, 500)

# Create the main window
root = tb.Window(themename="minty")
root.title("Character Traits Selection")

# Create a label
tk.Label(root, text="MITHABTEY - Career Seeker").pack(pady=10)

# Define the character traits
traits = ["Business", "Organization", "General culture", "Service", "Arts and Entertainment", "Outdoor", "Science", "Technology"]

# Add a button to open the survey
tk.Button(root, text="Take Ramak Survey", command=open_survey).pack(pady=10)

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
root.mainloop()
