import tkinter as tk
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

# Function to show selected traits and run genetic algorithm
def show_selected_traits():
    selected_traits = [trait for trait, var in checkbox_vars.items() if var.get() == 1]

    if not selected_traits:
        result_text_widget.delete("1.0", tk.END)
        result_text_widget.insert(tk.END, "Please select at least one trait")
        return

    result_text.set(f"You chose: {', '.join(selected_traits)}")

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

        result_text_widget.insert(tk.END, f"You choose: ", 'bold')
        result_text_widget.insert(tk.END, f"{', '.join(selected_traits)}\n", 'normal')
        result_text_widget.insert(tk.END, f"\nThe three most suitable professions for you:\n", 'bold')
        result_text_widget.insert(tk.END, f"{', '.join(matched_profession_names)}", 'normal')

        # Configure the tag for bold text
        result_text_widget.tag_configure('bold', font=('Helvetica', 10, 'bold'))
        result_text_widget.tag_configure('normal', font=('Helvetica', 10))


    except Exception as e:
        result_text_widget.delete("1.0", tk.END)
        result_text_widget.insert(tk.END, f"An error occurred: {e}")

    print("Done")


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

# Create a Scrollbar
scrollbar = tk.Scrollbar(root)
scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

# Create a Text widget for the result
result_text = tk.StringVar()
result_text.set("")
result_text_widget = tk.Text(root, yscrollcommand=scrollbar.set, wrap=tk.WORD, height=10)
result_text_widget.pack(pady=10, fill=tk.BOTH, expand=True)

# Configure the Scrollbar to scroll the Text widget
scrollbar.config(command=result_text_widget.yview)

# Run the main event loop
open_centered_window(root, 500, 400)
root.mainloop()
