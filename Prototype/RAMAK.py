import tkinter as tk
import ttkbootstrap as tb
from ttkbootstrap.constants import *
import genAlg
import random

# Function to open a window centered on the screen
def open_centered_window(window, width=400, height=300):
    """Open a window centered on the screen."""
    screen_width = window.winfo_screenwidth()
    screen_height = window.winfo_screenheight()
    x = (screen_width - width) // 2
    y = (screen_height - height) // 2
    window.geometry(f"{width}x{height}+{x}+{y}")
    window.mainloop()

# Function to show selected traits and run genetic algorithm
def show_selected_traits():
    # selected_traits will be randomly selected from the list of traits
    selected_traits = random.sample(traits, k=3)
    
    if not selected_traits:
        result_text_widget.delete("1.0", tk.END)
        result_text_widget.insert(tk.END, "Please select at least one trait")
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

        result_text_widget.delete("1.0", tk.END)
        result_text_widget.insert(tk.END, f"Your traits from the survey is: ", 'bold')
        result_text_widget.insert(tk.END, f"{', '.join(selected_traits)}\n", 'normal')
        result_text_widget.insert(tk.END, "The three most suitable professions for you:\n", 'bold')
        result_text_widget.insert(tk.END, f"{', '.join(matched_profession_names)}", 'normal')

    except Exception as e:
        result_text_widget.delete("1.0", tk.END)
        result_text_widget.insert(tk.END, f"An error occurred: {e}")

    # Hide the "Find me jobs" button
    find_jobs_button.pack_forget()

    print("Done")

def open_survey():
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
        score = 0
        for var in answers.values():
            score += int(var.get())
        
        result = f"Final Score: {score}\n\nKey for scoring the Ramak:\nScore 2 points for a Yes, 1 point for a Not sure, and 0 for a No."

        # Display the result in the main window's text widget
        result_text_widget.delete("1.0", tk.END)
        result_text_widget.insert(tk.END, result)

        # Show the "Find me jobs" button after calculating the score
        find_jobs_button.pack(pady=10)
        
        # Close the survey window
        survey_window.destroy()

    for question in questions:
        frame = tk.Frame(survey_window)
        frame.pack(anchor="w", pady=5)

        label = tk.Label(frame, text=question)
        label.pack(anchor="w")

        var = tk.StringVar(value="0")
        answers[question] = var

        rb1 = tk.Radiobutton(frame, text="Yes", variable=var, value="2")
        rb1.pack(anchor="w")

        rb2 = tk.Radiobutton(frame, text="Not sure", variable=var, value="1")
        rb2.pack(anchor="w")

        rb3 = tk.Radiobutton(frame, text="No", variable=var, value="0")
        rb3.pack(anchor="w")

    submit_button = tk.Button(survey_window, text="Submit", command=calculate_score)
    submit_button.pack(pady=10)

    result_label = tk.Label(survey_window, text="")
    result_label.pack(pady=10)

    open_centered_window(survey_window, 600, 500)

# Create the main window
root = tb.Window(themename="minty")
root.title("Character Traits Selection")

# Create a label
label = tk.Label(root, text="MITHABTEY - Career Seeker")
label.pack(pady=10)

# Define the character traits
traits = ["Business", "Organization", "General culture", "Service", "Arts and Entertainment", "Outdoor", "Science", "Technology"]

# Add a button to open the survey
survey_button = tk.Button(root, text="Take Ramak Survey", command=open_survey)
survey_button.pack(pady=10)

# Create the button, initially hidden
find_jobs_button = tk.Button(root, text="Find me jobs", command=show_selected_traits)

# Create a Scrollbar
scrollbar = tk.Scrollbar(root)
scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

# Create a Text widget for the result
result_text_widget = tk.Text(root, yscrollcommand=scrollbar.set, wrap=tk.WORD, height=10)
result_text_widget.pack(pady=10, fill=tk.BOTH, expand=True)

# Configure the Scrollbar to scroll the Text widget
scrollbar.config(command=result_text_widget.yview)

# Configure the tags for bold and normal text
result_text_widget.tag_configure('bold', font=('Helvetica', 10, 'bold'))
result_text_widget.tag_configure('normal', font=('Helvetica', 10))

# Run the main event loop
open_centered_window(root, 400, 350)
root.mainloop()
