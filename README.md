# Getting Started with MentorView
-This project provides a web-based solution for mentors to evaluate and manage students for a semester-long project in college. Mentors can add, edit, and remove assigned students, assign marks based on various parameters, and submit final marks.


## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Installation](#installation)

## Features

1. Adding Students:
- Mentors can add students they are interested in evaluating.
- A mentor can accommodate a minimum of 3 and a maximum of 4 students at a time.
- No two mentors can assign the same student during the evaluation period.

2. Assigning Marks:
- Mentors can assign marks to each student based on parameters such as Ideation, Execution, Viva/Pitch, etc.
- Total marks are visible to the mentor.

3. Editing/Removing Students:
- Mentors can edit/remove assigned students.
- Mentors can also edit assigned marks for students.

4. Final Submit:
- Mentors can lock the marks of all students after submitting.
- Marks cannot be edited after submission and lock.
- If some students have unassigned marks, mentors cannot submit/lock the marks.

5. View Page:
- Mentors have a view page to see all students and their assigned marks.
- Filters are available to view students whose marks are yet to be assigned or already assigned.



## Technologies Used
- Node.js
- Express.js
- MongoDB
- HTML/CSS
- JavaScript

## Usage
- Register as a mentor and log in to the system.
- Add students you wish to evaluate, ensuring the conditions are met (3-4 students per mentor, unique assignments).
- Assign marks to each student based on the evaluation parameters.
- Edit or remove students or marks as needed.
- Submit final marks when ready. Marks will be locked after submission.
- View all students and their marks, filtered by assignment status.
 
 
## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/evaluation_dashboard.git

2. Install dependencies:

    ```bash
    npm install 

3. Set up the database and environment variables as described in the .env.example file.

4. Go into server Directory and install dependencies:
    
    ```bash
    cd server
    npm install

5. Set up environment variables as described in the .env.example file.

6. start server

    ```bash
    npm run start
