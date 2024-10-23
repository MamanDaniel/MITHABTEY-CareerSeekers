# MITHABTEY - CareerSeekers

A capstone project developed by Daniel Maman and Ben Avner Merigen as part of the final year of our Software Engineering degree at Braude College of Engineering.

## Project Overview

**MITHABTEY - CareerSeekers** is a web-based platform designed to help users discover job opportunities that align with their personality traits. This project was initially conceived to assist members of the Facebook group "Mithabtey Miktzoa," which has 40,000 members, in finding suitable career paths by utilizing a **Genetic Algorithm** to match character traits with jobs. Users answer the **RAMAK questionnaire**, and based on their responses, the algorithm suggests the best-matched jobs.

Visit the live website here: **[mithabtey-careerseekers.onrender.com](https://mithabtey-careerseekers.onrender.com/)**.

This project spanned two semesters, with the first focusing on research and the second on development.

## Features

- **RAMAK Questionnaire**: Users fill out the questionnaire to determine their personality traits.
- **Genetic Algorithm**: Matches users' personality traits with jobs in our database.
- **Admin Panel**: Administrators can add, delete, or modify jobs.
- **User Authentication**: Registration and login system.
- **Job Search**: Search functionality that allows users to find jobs by field.
- **Job Suggestions**: Personalized job recommendations based on traits.
- **Profile Management**: Users can edit their profiles and save job listings.
- **Notifications**: Users are notified when new jobs matching their traits are available.

## Job Pages

### The Most 3 Suit Jobs Page
On this page, users view the three jobs that best suit them after filling out the RAMAK questionnaire.

![The most 3 suit jobs Page](https://github.com/user-attachments/assets/335f97e1-3450-41b3-aede-447610fcba88)


### RAMAK Questionnaire Page
In this page, the user fills in their answers to the questionnaire. After completing all questions, a calculation is made that describes their traits and the three jobs that best suit them.
![RAMAK questionnaire Page](https://github.com/user-attachments/assets/3a77be94-3ab6-4278-a50b-ae88908eddad)



## Tech Stack

- **Frontend**: React.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, MongoDB, JWT for authentication
- **Hosting**: Deployed on Render

## Research Process

During the research phase of the project, we analyzed various job search platforms like **Truity** and **CareerExplorer**, both internationally and in Israel, and identified that most platforms fail to incorporate personality traits when matching users with jobs. We decided to use the **RAMAK questionnaire** due to its accuracy and relevance to the Israeli job market, as recommended by occupational psychologist **Ra'anan Hess**.

We also explored various personality trait models, including the **Big Five** and the **Holland Code (RIASEC)**. However, we selected the RAMAK questionnaire for its modern approach to matching work domains with personality traits.

## Future Improvements

- **Course Integration**: Connect users to relevant online courses for skill development.
- **Mentorship**: Integrate mentorship programs for career advice and guidance.
- **Advanced Analytics**: Provide users with feedback on their job search activity and career progress over time.

## Documentation

For a detailed explanation of the project, including the **User Guide** and **Maintenance Guide**, please refer to the [full project documentation](https://docs.google.com/document/d/e/2PACX-1vSm_E2YrwwV3mTLDtL7RYLfZG3Zpe28KjU9sEvL6o273UzoaMAnx4pkGrSuJP6XEM_PM9Rip4VN80ij/pub).

## License

This project is licensed under the MIT License.
