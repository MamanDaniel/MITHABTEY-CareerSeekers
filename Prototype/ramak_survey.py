# ramak_survey.py

import tkinter as tk

def open_centered_window(window, width=400, height=300):
    """Open a window centered on the screen."""
    screen_width = window.winfo_screenwidth()
    screen_height = window.winfo_screenheight()
    x = (screen_width - width) // 2
    y = (screen_height - height) // 2
    window.geometry(f"{width}x{height}+{x}+{y}")
    window.mainloop()

def open_survey(root, display_result, find_jobs_button):
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
